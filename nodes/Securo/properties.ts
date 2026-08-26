/**
 * Baut die n8n-Eigenschaften aus der erzeugten Operationstabelle.
 *
 * Bewusst frei von n8n-Importen zur Laufzeit (nur Typen), damit die Ableitung
 * einzeln pruefbar ist - die Tabelle hat 235 Eintraege, ein Fehler hier faellt
 * sonst erst in der Oberflaeche auf.
 */
import type { INodeProperties } from 'n8n-workflow';

import type { SecuroOperation } from './operations.generated';

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
		for (const p of o.pathParams) {
			props.push({
				displayName: titel(p),
				name: `path_${p}`,
				type: 'string',
				required: true,
				default: '',
				description: `Path parameter {${p}} of ${o.method} ${o.path}`,
				displayOptions: { show: { resource: [o.resource], operation: [o.operation] } },
			});
		}

		if (o.queryParams.length) {
			props.push({
				displayName: 'Query Parameters',
				name: 'queryParameters',
				type: 'collection',
				placeholder: 'Add parameter',
				default: {},
				displayOptions: { show: { resource: [o.resource], operation: [o.operation] } },
				options: o.queryParams.map((q) => ({
					displayName: titel(q.name) + (q.required ? ' (required)' : ''),
					name: q.name,
					type: 'string' as const,
					default: '',
					description: q.description || undefined,
				})),
			});
		}

		if (o.hasBody) {
			props.push({
				displayName: 'Body',
				name: 'body',
				type: 'json',
				default: '{}',
				required: o.bodyRequired,
				description: `Request body for ${o.method} ${o.path}`,
				displayOptions: { show: { resource: [o.resource], operation: [o.operation] } },
			});
		}
	}

	return props;
}

function titel(s: string): string {
	return s
		.replace(/[-_]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Setzt {platzhalter} im Pfad ein und meldet, was fehlt. */
export function fillPath(path: string, werte: Record<string, string>): string {
	return path.replace(/\{([^}]+)\}/g, (_, name: string) => {
		const v = werte[name];
		if (v === undefined || v === '') throw new Error(`Missing path parameter "${name}"`);
		return encodeURIComponent(v);
	});
}
