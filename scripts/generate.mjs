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
			queryParams: params.filter((p) => p.in === 'query').map((p) => ({
				name: p.name,
				required: !!p.required,
				description: (p.description ?? '').slice(0, 100),
			})),
			hasBody: !!def.requestBody,
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

ops.sort((a, b) => a.resource.localeCompare(b.resource) || a.operationName.localeCompare(b.operationName));

const kopf = `/**
 * ERZEUGT - nicht von Hand aendern.
 *
 * Quelle: Securo OpenAPI ${spec.info?.version ?? '?'} (${ops.length} Operationen,
 * ${new Set(ops.map((o) => o.resource)).size} Ressourcen).
 * Neu erzeugen mit: npm run generate -- --url https://<host>/api/openapi.json
 */

export interface SecuroOperation {
	resource: string;
	resourceName: string;
	operation: string;
	operationName: string;
	description: string;
	method: string;
	path: string;
	pathParams: string[];
	queryParams: { name: string; required: boolean; description: string }[];
	hasBody: boolean;
	bodyRequired: boolean;
}

export const OPERATIONS: SecuroOperation[] = `;

writeFileSync(OUT, kopf + JSON.stringify(ops, null, '\t') + ';\n');
console.log(`${ops.length} Operationen in ${new Set(ops.map((o) => o.resource)).size} Ressourcen -> nodes/Securo/operations.generated.ts`);
