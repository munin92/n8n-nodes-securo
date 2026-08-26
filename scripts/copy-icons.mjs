import { cp, mkdir } from 'node:fs/promises';
const dir = 'dist/nodes/Securo';
await mkdir(dir, { recursive: true });
for (const f of ['securo.light.svg', 'securo.dark.svg', 'Securo.node.json']) {
	await cp(`nodes/Securo/${f}`, `${dir}/${f}`);
}
