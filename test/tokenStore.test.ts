import assert from 'node:assert/strict';
import { test } from 'node:test';

import { ensureToken, expFromJwt, FALLBACK_MS, type SecuroTokenStore } from '../nodes/Securo/tokenStore.ts';
import { errorDetail, securoDetail } from '../nodes/Securo/errorDetail.ts';

const jwt = (exp: number) =>
	'x.' + Buffer.from(JSON.stringify({ exp })).toString('base64url') + '.y';

test('logs in once and reuses the token until shortly before it expires', async () => {
	const store: SecuroTokenStore = {};
	let aufrufe = 0;
	const deps = {
		now: () => 1_000_000,
		login: async () => { aufrufe++; return { access_token: jwt(2000), expires_in: 3600 }; },
	};
	assert.equal(await ensureToken(store, deps), (await Promise.resolve(store.accessToken))!);
	await ensureToken(store, deps);
	assert.equal(aufrufe, 1, 'zweiter Aufruf haette den Speicher nehmen muessen');
});

test('renews once the token is inside the safety margin', async () => {
	const store: SecuroTokenStore = { accessToken: 'alt', expiresAt: 1_030_000 };
	let aufrufe = 0;
	await ensureToken(store, {
		now: () => 1_000_000,
		login: async () => { aufrufe++; return { access_token: 'neu', expires_in: 3600 }; },
	});
	assert.equal(aufrufe, 1);
	assert.equal(store.accessToken, 'neu');
});

test('falls back to the JWT exp when the server sends no expires_in', async () => {
	const store: SecuroTokenStore = {};
	await ensureToken(store, { now: () => 0, login: async () => ({ access_token: jwt(1234) }) });
	assert.equal(store.expiresAt, 1_234_000);
});

test('keeps the token short when neither expires_in nor exp is usable', async () => {
	const store: SecuroTokenStore = {};
	await ensureToken(store, { now: () => 5_000, login: async () => ({ access_token: 'undurchsichtig' }) });
	assert.equal(store.expiresAt, 5_000 + FALLBACK_MS);
});

test('a login without a token is reported, not swallowed', async () => {
	await assert.rejects(
		ensureToken({}, { now: () => 0, login: async () => ({}) }),
		/no access_token/,
	);
});

test('expFromJwt survives rubbish', () => {
	assert.equal(expFromJwt('nicht.ein.jwt'), undefined);
	assert.equal(expFromJwt('zweiteile.nur'), undefined);
});

test('unpacks the FastAPI 422 detail list into something readable', () => {
	const payload = { detail: [
		{ type: 'missing', loc: ['body', 'username'], msg: 'Field required' },
		{ type: 'missing', loc: ['body', 'password'], msg: 'Field required' },
	] };
	assert.equal(securoDetail(payload), 'username: Field required; password: Field required');
});

test('handles a plain string detail and a JSON string payload', () => {
	assert.equal(securoDetail({ detail: 'Read-only role' }), 'Read-only role');
	assert.equal(securoDetail('{"detail":"Not found"}'), 'Not found');
});

test('errorDetail reaches the body through the axios shape', () => {
	const err = { message: 'Request failed with status code 422',
		response: { data: { detail: [{ loc: ['body', 'name'], msg: 'Field required' }] } } };
	assert.match(errorDetail(err), /name: Field required/);
});
