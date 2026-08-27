/**
 * Baut die n8n-Eigenschaften aus der erzeugten Operationstabelle.
 *
 * Bewusst frei von n8n-Importen zur Laufzeit (nur Typen), damit die Ableitung
 * einzeln pruefbar ist - die Tabelle hat 235 Eintraege, ein Fehler hier faellt
 * sonst erst in der Oberflaeche auf.
 *
 * Zwei Versionen nebeneinander:
 *   1 - eine Sammlung fuer alle Query-Parameter, ein JSON-Kasten fuer den Body.
 *   2 - echte Felder je Operation, Pflicht sichtbar, Optionales in einer Sammlung.
 * `resource` und `operation` sind in beiden gleich und deshalb ungeteilt;
 * bestehende Knoten behalten ihre gespeicherte Auswahl.
 */
import type { IDisplayOptions, INodeProperties } from 'n8n-workflow';

import type { SecuroField, SecuroOperation } from './operations.generated';

type Sichtbar = NonNullable<IDisplayOptions['show']>;

export function titel(s: string): string {
	return String(s)
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.replace(/[-_]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/\b\w/g, (c) => c.toUpperCase())
		.replace(/\bId\b/g, 'ID')
		.replace(/\bIsin\b/g, 'ISIN')
		.replace(/\bUrl\b/g, 'URL');
}

function feld(f: SecuroField, sichtbar: Sichtbar): INodeProperties {
	const basis = {
		displayName: titel(f.name),
		name: f.name,
		required: f.required || undefined,
		description: f.description || undefined,
		displayOptions: { show: sichtbar },
	};

	switch (f.kind) {
		case 'boolean':
			return { ...basis, type: 'boolean', default: false };
		case 'number':
			return {
				...basis,
				type: 'number',
				default: f.minimum ?? 0,
				typeOptions: {
					...(f.minimum !== undefined ? { minValue: f.minimum } : {}),
					...(f.maximum !== undefined ? { maxValue: f.maximum } : {}),
				},
			};
		case 'options':
			return {
				...basis,
				type: 'options',
				default: f.options?.[0] ?? '',
				options: (f.options ?? []).map((o) => ({ name: titel(o), value: o })),
			};
		case 'csv':
			return {
				...basis,
				type: 'string',
				default: '',
				placeholder: 'wert1, wert2',
				description: [f.description, 'Mehrere Werte durch Komma trennen.']
					.filter(Boolean)
					.join(' '),
			};
		case 'json':
			return { ...basis, type: 'json', default: '{}' };
		default:
			return { ...basis, type: 'string', default: '' };
	}
}

/** Alle Felder einer Operation, Query und Body zusammen. Namen kollidieren nicht -
 *  der Generator bricht ab, falls das je passiert. */
export function felderVon(o: SecuroOperation): SecuroField[] {
	return [...o.query, ...(o.body && !o.body.raw ? o.body.fields : [])];
}

export function buildProperties(ops: SecuroOperation[]): INodeProperties[] {
	const ressourcen = [...new Map(ops.map((o) => [o.resource, o.resourceName])).entries()].sort(
		(a, b) => a[1].localeCompare(b[1]),
	);

	const props: INodeProperties[] = [
		{
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			noDataExpression: true,
			options: ressourcen.map(([value, name]) => ({ name, value })),
			default: ressourcen[0]?.[0] ?? '',
		},
	];

	for (const [resource] of ressourcen) {
		const eigene = ops.filter((o) => o.resource === resource);
		props.push({
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: { show: { resource: [resource] } },
			options: eigene.map((o) => ({
				name: o.operationName,
				value: o.operation,
				description: o.description || `${o.method} ${o.path}`,
				action: o.operationName,
			})),
			default: eigene[0]?.operation ?? '',
		});
	}

	for (const o of ops) {
		const zeigt: Sichtbar = { resource: [o.resource], operation: [o.operation] };
		const v1: Sichtbar = { ...zeigt, '@version': [1] };
		const v2: Sichtbar = { ...zeigt, '@version': [2] };

		// Pfadplatzhalter sind in beiden Versionen dasselbe Feld.
		for (const p of o.pathParams) {
			props.push({
				displayName: titel(p),
				name: `path_${p}`,
				type: 'string',
				required: true,
				default: '',
				description: `Path parameter {${p}} of ${o.method} ${o.path}`,
				displayOptions: { show: zeigt },
			});
		}

		// --- Version 1: unveraendert -------------------------------------
		if (o.query.length) {
			props.push({
				displayName: 'Query Parameters',
				name: 'queryParameters',
				type: 'collection',
				placeholder: 'Add parameter',
				default: {},
				displayOptions: { show: v1 },
				options: o.query.map((q) => ({
					displayName: titel(q.name) + (q.required ? ' (required)' : ''),
					name: q.name,
					type: 'string' as const,
					default: '',
					description: q.description || undefined,
				})),
			});
		}
		if (o.body) {
			props.push({
				displayName: 'Body',
				name: 'body',
				type: 'json',
				default: '{}',
				required: o.bodyRequired,
				description: `Request body for ${o.method} ${o.path}`,
				displayOptions: { show: v1 },
			});
		}

		// --- Version 2: echte Felder --------------------------------------
		// Ein Pflichtparameter in einer Sammlung, die man erst aufklappen muss,
		// ist ein Bedienfehler: bei getMarketSearch ist `q` pflicht, und ohne
		// ihn antwortet der Server 422, ohne dass die Oberflaeche je einen
		// Hinweis gegeben haette.
		const felder = felderVon(o);
		for (const f of felder.filter((x) => x.required)) props.push(feld(f, v2));

		const optional = felder.filter((x) => !x.required);
		if (optional.length) {
			props.push({
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add field',
				default: {},
				displayOptions: { show: v2 },
				options: optional.map((f) => {
					const eintrag = { ...feld(f, v2) };
					delete eintrag.displayOptions;
					return eintrag;
				}),
			});
		}

		// Ein Body ohne beschriebene Felder bleibt auch in Version 2 roh.
		if (o.body?.raw) {
			props.push({
				displayName: 'Body',
				name: 'body',
				type: 'json',
				default: '{}',
				required: o.bodyRequired,
				description: `Request body for ${o.method} ${o.path} (the description names no fields)`,
				displayOptions: { show: v2 },
			});
		}
	}

	return props;
}

/** Setzt {platzhalter} im Pfad ein und meldet, was fehlt. */
export function fillPath(path: string, werte: Record<string, string>): string {
	return path.replace(/\{([^}]+)\}/g, (_, name: string) => {
		const v = werte[name];
		if (v === undefined || v === '') throw new Error(`Missing path parameter "${name}"`);
		return encodeURIComponent(v);
	});
}

/** Zerlegt die Feldwerte in Query-Parameter und Body. */
export function buildRequest(
	o: SecuroOperation,
	lies: (name: string, fallback?: unknown) => unknown,
): { qs: Record<string, unknown>; body: Record<string, unknown> | undefined } {
	const zusatz = (lies('additionalFields', {}) ?? {}) as Record<string, unknown>;
	const qs: Record<string, unknown> = {};
	const body: Record<string, unknown> = {};

	const uebernimm = (f: SecuroField, ziel: Record<string, unknown>) => {
		const roh = f.required ? lies(f.name, undefined) : zusatz[f.name];
		const wert = deuten(f, roh);
		if (wert !== undefined) ziel[f.name] = wert;
	};

	for (const f of o.query) uebernimm(f, qs);
	if (o.body && !o.body.raw) for (const f of o.body.fields) uebernimm(f, body);

	if (o.body?.raw) {
		const roh = lies('body', '{}');
		const geparst = deuten({ name: 'body', required: true, kind: 'json' }, roh);
		return { qs, body: (geparst as Record<string, unknown>) ?? undefined };
	}

	// Ein Body, den der Server nicht verlangt und der leer bleibt, wird nicht
	// gesendet - sonst wuerde aus "nichts angegeben" ein leeres Objekt.
	const hatBody = !!o.body && (Object.keys(body).length > 0 || o.bodyRequired);
	return { qs, body: hatBody ? body : undefined };
}

function deuten(f: SecuroField, roh: unknown): unknown {
	if (roh === undefined || roh === null) return undefined;

	if (f.kind === 'csv') {
		const teile = String(roh)
			.split(',')
			.map((s) => s.trim())
			.filter(Boolean);
		return teile.length ? teile : undefined;
	}

	if (f.kind === 'json') {
		if (typeof roh !== 'string') return roh;
		const s = roh.trim();
		if (!s || s === '{}') return undefined;
		try {
			return JSON.parse(s);
		} catch (e) {
			// Bewusst ein einfacher Error: dieses Modul haelt sich frei von
			// n8n-Laufzeitimporten. Der Knoten setzt daraus einen NodeOperationError.
			// eslint-disable-next-line @n8n/community-nodes/require-node-api-error
			throw new Error(`Field "${titel(f.name)}" is not valid JSON: ${(e as Error).message}`);
		}
	}

	if (f.kind === 'number') {
		const n = Number(roh);
		return Number.isFinite(n) ? n : undefined;
	}

	if (f.kind === 'boolean') return roh === true || roh === 'true';

	const s = String(roh).trim();
	return s === '' ? undefined : s;
}
