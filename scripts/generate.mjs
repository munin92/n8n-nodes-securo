#!/usr/bin/env node
/**
 * Erzeugt die Operationstabelle der Node aus Securos OpenAPI-Beschreibung.
 *
 * 235 Operationen in 33 Tags von Hand zu pflegen waere bei einem Release-Takt
 * von rund vier Tagen aussichtslos. Stattdessen: Beschreibung holen, Tabelle
 * erzeugen, Diff ansehen, Release.
 *
 *   node scripts/generate.mjs                     # aus dem Schnappschuss
 *   node scripts/generate.mjs --url https://...   # frisch holen und Schnappschuss aktualisieren
 */
import { readFileSync, writeFileSync } from 'node:fs';

const SNAPSHOT = new URL('./openapi.snapshot.json', import.meta.url);
const OUT = new URL('../nodes/Securo/operations.generated.ts', import.meta.url);
const METHODS = ['get', 'post', 'put', 'patch', 'delete'];

const urlArg = process.argv.indexOf('--url');
let spec;
if (urlArg !== -1) {
	const url = process.argv[urlArg + 1];
	const res = await fetch(url);
	if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
	spec = await res.json();
	writeFileSync(SNAPSHOT, JSON.stringify(spec, null, '\t') + '\n');
	console.log(`Schnappschuss aktualisiert aus ${url}`);
} else {
	spec = JSON.parse(readFileSync(SNAPSHOT, 'utf8'));
}

const titel = (s) =>
	String(s).replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
		.replace(/\b\w/g, (c) => c.toUpperCase());

const camel = (s) => {
	const t = titel(s).replace(/\s+/g, '');
	return t.charAt(0).toLowerCase() + t.slice(1);
};

const comps = spec.components?.schemas ?? {};

/** Loest $ref auf und reduziert FastAPIs `Optional[x]` (anyOf mit null) auf x. */
function entpacke(sch, tiefe = 0) {
	if (!sch || tiefe > 5) return {};
	if (sch.$ref) return entpacke(comps[sch.$ref.split('/').pop()] ?? {}, tiefe + 1);
	if (sch.allOf?.length === 1) return entpacke(sch.allOf[0], tiefe + 1);
	for (const k of ['anyOf', 'oneOf']) {
		if (sch[k]) {
			const echte = sch[k].filter((v) => v.type !== 'null');
			if (echte.length === 1) return { ...entpacke(echte[0], tiefe + 1), nullable: true };
			return { komplex: true };
		}
	}
	return sch;
}

/** Uebersetzt ein Schema in ein Feld der Node. */
function feldVon(name, roh, pflicht) {
	const sch = entpacke(roh ?? {});
	const basis = {
		name,
		required: !!pflicht,
		description: (roh?.description ?? sch.description ?? '').split('\n')[0].slice(0, 160) || undefined,
	};
	if (sch.komplex) return { ...basis, kind: 'json' };
	if (Array.isArray(sch.enum) && sch.enum.length) {
		return { ...basis, kind: 'options', options: sch.enum.map(String) };
	}
	if (sch.type === 'boolean') return { ...basis, kind: 'boolean' };
	if (sch.type === 'integer' || sch.type === 'number') {
		return {
			...basis,
			kind: 'number',
			minimum: typeof sch.minimum === 'number' ? sch.minimum : undefined,
			maximum: typeof sch.maximum === 'number' ? sch.maximum : undefined,
		};
	}
	if (sch.type === 'array') {
		const eintrag = entpacke(sch.items ?? {});
		// Listen von Skalaren nimmt der Nutzer als Kommaliste; Listen von
		// Objekten bleiben JSON, weil eine Zeile dafuer nicht reicht.
		if (!eintrag.type || eintrag.type === 'string' || eintrag.type === 'number' || eintrag.type === 'integer') {
			return { ...basis, kind: 'csv' };
		}
		return { ...basis, kind: 'json' };
	}
	if (sch.type === 'string') return { ...basis, kind: 'string' };
	// Verschachtelte Objekte bleiben JSON. Sie flach zu klopfen hiesse, eine
	// Struktur zu erfinden, die der Server so nicht annimmt.
	return { ...basis, kind: 'json' };
}

/** Body-Schema in Felder zerlegen. Ohne properties bleibt es ein Rohfeld. */
function bodyFelder(def) {
	const rb = def.requestBody;
	if (!rb) return null;
	const sch = entpacke(rb.content?.['application/json']?.schema);
	const props = sch.properties;
	if (!props || !Object.keys(props).length) return { raw: true, fields: [] };
	const pflicht = new Set(sch.required ?? []);
	return {
		raw: false,
		fields: Object.entries(props).map(([n, ps]) => feldVon(n, ps, pflicht.has(n))),
	};
}

const ops = [];
for (const [pfad, methoden] of Object.entries(spec.paths ?? {})) {
	for (const [methode, def] of Object.entries(methoden)) {
		if (!METHODS.includes(methode)) continue;
		const tag = (def.tags ?? ['misc'])[0];

		// operationId ist bei FastAPI lang und enthaelt Pfad und Methode. Der
		// sprechende Teil davor reicht als Name.
		const roh = def.summary || def.operationId || `${methode} ${pfad}`;
		const params = [...(methoden.parameters ?? []), ...(def.parameters ?? [])];

		ops.push({
			resource: camel(tag),
			resourceName: titel(tag),
			operation: camel(`${methode} ${roh}`.slice(0, 60)),
			operationName: titel(roh),
			description: (def.description ?? '').split('\n')[0].slice(0, 120),
			method: methode.toUpperCase(),
			path: pfad,
			pathParams: params.filter((p) => p.in === 'path').map((p) => p.name),
			query: params
				.filter((p) => p.in === 'query')
				.map((p) => feldVon(p.name, { ...(p.schema ?? {}), description: p.description }, p.required)),
			body: bodyFelder(def),
			bodyRequired: !!def.requestBody?.required,
		});
	}
}

// Doppelte Operationsnamen innerhalb einer Ressource durchnummerieren, sonst
// zeigt das Dropdown zweimal denselben Eintrag und n8n nimmt den ersten.
const gesehen = new Map();
for (const o of ops) {
	const key = `${o.resource}:${o.operation}`;
	const n = (gesehen.get(key) ?? 0) + 1;
	gesehen.set(key, n);
	if (n > 1) {
		o.operation += String(n);
		o.operationName += ` (${n})`;
	}
}

const kollisionen = [];
for (const o of ops) {
	const namen = new Map();
	for (const [herkunft, liste] of [
		['Pfad', o.pathParams.map((n) => ({ name: n }))],
		['Query', o.query],
		['Body', o.body?.fields ?? []],
	]) {
		for (const f of liste) {
			if (namen.has(f.name)) kollisionen.push(`${o.method} ${o.path}: ${f.name} (${namen.get(f.name)} und ${herkunft})`);
			namen.set(f.name, herkunft);
		}
	}
}
if (kollisionen.length) {
	console.error('Gleiche Feldnamen aus verschiedenen Quellen - n8n koennte nur einen speichern:');
	for (const k of kollisionen) console.error('  ' + k);
	process.exit(1);
}

ops.sort((a, b) => a.resource.localeCompare(b.resource) || a.operationName.localeCompare(b.operationName));

const kopf = `/**
 * ERZEUGT - nicht von Hand aendern.
 *
 * Quelle: Securo OpenAPI ${spec.info?.version ?? '?'} (${ops.length} Operationen,
 * ${new Set(ops.map((o) => o.resource)).size} Ressourcen).
 * Neu erzeugen mit: npm run generate -- --url https://<host>/api/openapi.json
 */

export interface SecuroField {
	name: string;
	required: boolean;
	description?: string;
	kind: 'string' | 'number' | 'boolean' | 'options' | 'csv' | 'json';
	options?: string[];
	minimum?: number;
	maximum?: number;
}

export interface SecuroOperation {
	resource: string;
	resourceName: string;
	operation: string;
	operationName: string;
	description: string;
	method: string;
	path: string;
	pathParams: string[];
	query: SecuroField[];
	body: { raw: boolean; fields: SecuroField[] } | null;
	bodyRequired: boolean;
}

export const OPERATIONS: SecuroOperation[] = `;

writeFileSync(OUT, kopf + JSON.stringify(ops, null, '\t') + ';\n');
console.log(`${ops.length} Operationen in ${new Set(ops.map((o) => o.resource)).size} Ressourcen -> nodes/Securo/operations.generated.ts`);
