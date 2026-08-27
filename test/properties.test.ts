import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
	buildProperties,
	buildRequest,
	felderVon,
	fillPath,
	titel,
} from '../nodes/Securo/properties.ts';
import { OPERATIONS, type SecuroOperation } from '../nodes/Securo/operations.generated.ts';

const props = buildProperties(OPERATIONS);
const finde = (name: string, o?: SecuroOperation, version?: number) =>
	props.find(
		(p) =>
			p.name === name &&
			(!o || ((p.displayOptions?.show?.resource as string[])?.includes(o.resource) &&
				(p.displayOptions?.show?.operation as string[])?.includes(o.operation))) &&
			(version === undefined ||
				(p.displayOptions?.show?.['@version'] as number[] | undefined)?.[0] === version),
	);

const suche = OPERATIONS.find((o) => o.operation === 'getMarketSearch' && o.resource === 'assets')!;
const importieren = OPERATIONS.find(
	(o) => o.operation === 'postImportAssetOrders' && o.resource === 'assets',
)!;

test('titel macht aus Schluesselnamen lesbare Beschriftungen', () => {
	assert.equal(titel('group_id'), 'Group ID');
	assert.equal(titel('asset_id'), 'Asset ID');
	assert.equal(titel('q'), 'Q');
	assert.equal(titel('external_id'), 'External ID');
});

test('DER Bedienfehler ist weg: q steht in Version 2 als eigenes Pflichtfeld', () => {
	// Version 1 hatte q nur in der optionalen Sammlung. Ohne Wert antwortet
	// Securo 422, ohne dass die Oberflaeche je einen Hinweis gab.
	const v1 = finde('queryParameters', suche, 1);
	assert.ok(v1, 'Version 1 muss ihre Sammlung behalten');

	const v2 = finde('q', suche, 2);
	assert.ok(v2, 'q fehlt in Version 2 als eigenes Feld');
	assert.equal(v2!.required, true);
	assert.equal(v2!.type, 'string');

	// und nicht doppelt in der Sammlung
	const sammlung = finde('additionalFields', suche, 2);
	const drin = ((sammlung?.options ?? []) as Array<{ name: string }>).map((x) => x.name);
	assert.ok(!drin.includes('q'), 'q steckt zusaetzlich in der Sammlung');
	assert.ok(drin.includes('limit'), 'limit gehoert in die Sammlung');
});

test('Typen kommen aus dem Schema, nicht aus Zeichenketten', () => {
	const sammlung = finde('additionalFields', suche, 2)!;
	const limit = (sammlung.options as Array<Record<string, unknown>>).find((x) => x.name === 'limit')!;
	assert.equal(limit.type, 'number');
	assert.deepEqual(limit.typeOptions, { minValue: 1, maxValue: 300 });
});

test('Body-Felder werden einzeln angeboten statt als ein JSON-Kasten', () => {
	assert.ok(finde('body', importieren, 1), 'Version 1 behaelt den JSON-Kasten');
	assert.ok(finde('orders', importieren, 2), 'orders fehlt als eigenes Feld');
	const sammlung = finde('additionalFields', importieren, 2)!;
	const drin = (sammlung.options as Array<{ name: string }>).map((x) => x.name);
	assert.deepEqual(drin.sort(), ['filename', 'group_id']);
});

test('jedes Pflichtfeld jeder Operation ist in Version 2 sichtbar', () => {
	for (const o of OPERATIONS) {
		for (const f of felderVon(o).filter((x) => x.required)) {
			const p = finde(f.name, o, 2);
			assert.ok(p, `${o.method} ${o.path}: Pflichtfeld ${f.name} ist nicht sichtbar`);
			assert.equal(p!.required, true, `${o.method} ${o.path}: ${f.name} nicht als required markiert`);
		}
	}
});

test('Version 1 behaelt Sammlung und JSON-Kasten unveraendert', () => {
	for (const o of OPERATIONS) {
		if (o.query.length) {
			const p = finde('queryParameters', o, 1);
			assert.ok(p, `${o.method} ${o.path}: Version 1 hat die Query-Sammlung verloren`);
			assert.equal(p!.type, 'collection');
		}
		if (o.body) {
			const p = finde('body', o, 1);
			assert.ok(p, `${o.method} ${o.path}: Version 1 hat das Body-Feld verloren`);
			assert.equal(p!.type, 'json');
		}
	}
});

test('Pfadplatzhalter gelten fuer beide Versionen', () => {
	const mitPfad = OPERATIONS.find((o) => o.pathParams.length)!;
	const p = finde(`path_${mitPfad.pathParams[0]}`, mitPfad);
	assert.ok(p, 'Pfadfeld fehlt');
	assert.equal(p!.displayOptions?.show?.['@version'], undefined, 'Pfadfeld haengt an einer Version');
});

test('buildRequest trennt Query und Body und laesst Leeres weg', () => {
	const r = buildRequest(suche, (name, fallback) => {
		if (name === 'q') return 'US0378331005';
		if (name === 'additionalFields') return { limit: 25 };
		return fallback;
	});
	assert.deepEqual(r.qs, { q: 'US0378331005', limit: 25 });
	assert.equal(r.body, undefined, 'GET darf keinen Body bekommen');

	const imp = buildRequest(importieren, (name, fallback) => {
		if (name === 'orders') return '[{"ticker":"SAP.DE"}]';
		if (name === 'additionalFields') return { group_id: 'g-1', filename: '' };
		return fallback;
	});
	assert.deepEqual(imp.qs, {});
	assert.deepEqual(imp.body, { orders: [{ ticker: 'SAP.DE' }], group_id: 'g-1' });
});

test('fillPath setzt ein und meldet Fehlendes', () => {
	assert.equal(fillPath('/api/assets/{asset_id}', { asset_id: 'a b' }), '/api/assets/a%20b');
	assert.throws(() => fillPath('/api/assets/{asset_id}', {}), /Missing path parameter/);
});

test('die Tabelle deckt sich mit der OpenAPI-Beschreibung', async () => {
	const { readFileSync } = await import('node:fs');
	const spec = JSON.parse(
		readFileSync(new URL('../scripts/openapi.snapshot.json', import.meta.url), 'utf8'),
	);
	const methoden = ['get', 'post', 'put', 'patch', 'delete'];
	let gezaehlt = 0;
	for (const ops of Object.values(spec.paths ?? {}) as Array<Record<string, unknown>>) {
		for (const m of Object.keys(ops)) if (methoden.includes(m)) gezaehlt++;
	}
	assert.equal(OPERATIONS.length, gezaehlt, 'erzeugte Tabelle und Beschreibung sind verschieden gross');
});
