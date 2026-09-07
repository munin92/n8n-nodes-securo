import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Laeuft gegen dist und laedt die Klasse mit require - genau wie n8ns
// Community-Lader. Wirft dabei ein Feld-Initialisierer, meldet n8n das als
// "Class could not be found"; genau das ist bei der Schwester-Node mit
// n8n-workflow 1.82.0 passiert.
const wurzel = join(dirname(fileURLToPath(import.meta.url)), '../..');
const req = createRequire(join(wurzel, 'package.json'));
const { Securo } = req('./dist/nodes/Securo/Securo.node.js');

const node = new Securo();
const props = node.description.properties;
const version = (p) => p.displayOptions?.show?.['@version']?.[0];

test('die Klasse laesst sich instanziieren wie vom Community-Lader', () => {
	assert.ok(node.description);
	assert.equal(typeof node.execute, 'function');
	assert.deepEqual(node.description.inputs, ['main']);
	assert.deepEqual(node.description.outputs, ['main']);
});

test('die Node fuehrt beide Versionen', () => {
	assert.deepEqual(node.description.version, [1, 2]);
});

test('Auswahl und Pfadfelder gelten fuer beide Versionen', () => {
	for (const p of props) {
		if (p.name === 'resource' || p.name === 'operation' || p.name.startsWith('path_')) {
			assert.equal(version(p), undefined, `${p.name} haengt an einer Version`);
		}
	}
});

test('Version 1 hat nur Sammlung und JSON-Kasten, keine Einzelfelder', () => {
	const v1 = props.filter((p) => version(p) === 1);
	const namen = new Set(v1.map((p) => p.name));
	assert.deepEqual([...namen].sort(), ['body', 'queryParameters']);
});

test('Version 2 bietet Einzelfelder und trennt Pflicht von Optional', () => {
	const v2 = props.filter((p) => version(p) === 2);
	assert.ok(v2.length > 200, `nur ${v2.length} Felder in Version 2`);
	const pflicht = v2.filter((p) => p.required && p.name !== 'body');
	assert.ok(pflicht.length > 0, 'keine Pflichtfelder in Version 2');
	for (const p of pflicht) {
		assert.notEqual(p.type, 'collection', `${p.name}: Pflichtfeld als Sammlung`);
	}
});
