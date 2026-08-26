import assert from 'node:assert/strict';
import { test } from 'node:test';

import { buildProperties, fillPath } from '../nodes/Securo/properties.ts';
import { OPERATIONS } from '../nodes/Securo/operations.generated.ts';

test('every generated operation is reachable from the dropdowns', () => {
	const props = buildProperties(OPERATIONS);
	const ressourcen = new Set(
		(props.find((p) => p.name === 'resource')!.options as { value: string }[]).map((o) => o.value),
	);
	for (const op of OPERATIONS) {
		assert.ok(ressourcen.has(op.resource), `Ressource fehlt: ${op.resource}`);
		const dropdown = props.find(
			(p) =>
				p.name === 'operation' &&
				(p.displayOptions?.show?.resource as string[])?.includes(op.resource),
		);
		assert.ok(dropdown, `kein Operations-Dropdown fuer ${op.resource}`);
		const werte = (dropdown!.options as { value: string }[]).map((o) => o.value);
		assert.ok(werte.includes(op.operation), `${op.resource}.${op.operation} fehlt im Dropdown`);
	}
});

test('operation values are unique per resource', () => {
	const gesehen = new Set<string>();
	for (const op of OPERATIONS) {
		const key = `${op.resource}:${op.operation}`;
		assert.ok(!gesehen.has(key), `doppelt: ${key}`);
		gesehen.add(key);
	}
});

test('every path placeholder has a matching declared parameter', () => {
	for (const op of OPERATIONS) {
		for (const m of op.path.matchAll(/\{([^}]+)\}/g)) {
			assert.ok(
				op.pathParams.includes(m[1]),
				`${op.method} ${op.path}: Platzhalter ${m[1]} nicht deklariert`,
			);
		}
	}
});

test('fillPath substitutes and encodes', () => {
	assert.equal(fillPath('/api/assets/{asset_id}', { asset_id: 'a b/c' }), '/api/assets/a%20b%2Fc');
});

test('fillPath names the parameter it is missing', () => {
	assert.throws(() => fillPath('/api/assets/{asset_id}', {}), /asset_id/);
	assert.throws(() => fillPath('/api/assets/{asset_id}', { asset_id: '' }), /asset_id/);
});

test('the spec really did cover more than a handful of routes', () => {
	// Kontrolle: eine leere oder halbe Tabelle wuerde die Tests oben stumm
	// bestehen lassen.
	assert.ok(OPERATIONS.length > 200, `nur ${OPERATIONS.length} Operationen`);
	assert.ok(OPERATIONS.some((o) => o.path === '/api/assets/import' && o.method === 'POST'));
	assert.ok(OPERATIONS.some((o) => o.path === '/api/asset-groups' && o.method === 'GET'));
});
