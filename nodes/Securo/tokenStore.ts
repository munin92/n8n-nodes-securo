/**
 * Haelt das Securo-Zugangstoken.
 *
 * Securo kennt keine API-Schluessel: fastapi-users gibt nach `POST /auth/login`
 * ein eigenes HS256-Token aus (Keycloak ist dort nur Anmeldeweg, keine
 * Token-Quelle). Das Token wird deshalb hier gehalten und erst kurz vor Ablauf
 * erneuert - sonst meldet sich jeder Knoten einzeln neu an.
 *
 * Frei von n8n-Importen, damit die Faelle einzeln pruefbar sind.
 */

export interface SecuroTokenStore {
	accessToken?: string;
	expiresAt?: number;
}

export interface LoginDeps {
	login(): Promise<{ access_token?: string; expires_in?: number }>;
	now(): number;
	/** Aus dem JWT gelesen, wenn der Server kein expires_in mitschickt. */
	decodeExp?(token: string): number | undefined;
}

export const SKEW_MS = 60_000;
/** Wenn weder expires_in noch exp brauchbar sind: kurz halten statt raten. */
export const FALLBACK_MS = 10 * 60_000;

export function expFromJwt(token: string): number | undefined {
	const teile = token.split('.');
	if (teile.length !== 3) return undefined;
	try {
		const payload = JSON.parse(Buffer.from(teile[1], 'base64').toString('utf8')) as { exp?: number };
		return typeof payload.exp === 'number' ? payload.exp * 1000 : undefined;
	} catch {
		return undefined;
	}
}

export async function ensureToken(store: SecuroTokenStore, deps: LoginDeps): Promise<string> {
	if (store.accessToken && store.expiresAt && store.expiresAt - SKEW_MS > deps.now()) {
		return store.accessToken;
	}

	const res = await deps.login();
	if (!res?.access_token) {
		throw new Error('Login returned no access_token. Check the Securo credential.');
	}

	const exp = (deps.decodeExp ?? expFromJwt)(res.access_token);
	store.accessToken = res.access_token;
	store.expiresAt = res.expires_in
		? deps.now() + res.expires_in * 1000
		: (exp ?? deps.now() + FALLBACK_MS);

	return store.accessToken;
}
