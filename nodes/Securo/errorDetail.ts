/**
 * Pure helpers, free of n8n imports so they can be tested without the runtime.
 */

/** Digs the response body out of whatever shape n8n/axios threw. */
export function errorDetail(error: unknown): string {
	const e = error as {
		response?: { data?: unknown; body?: unknown };
		cause?: { response?: { data?: unknown; body?: unknown } };
		message?: string;
	};
	const kandidaten = [e?.response?.data, e?.response?.body, e?.cause?.response?.data, e?.cause?.response?.body];
	for (const c of kandidaten) {
		if (c === undefined || c === null || c === '') continue;
		const lesbar = securoDetail(c);
		if (lesbar) return lesbar;
	}
	return e?.message ?? String(error);
}

/**
 * FastAPI antwortet auf einen ungueltigen Aufruf mit 422 und einer detail-Liste,
 * die genau sagt, welches Feld fehlt. Roh ist das unlesbar; ausgepackt spart es
 * die Sucherei, die mich bei diesem Backend zwei Laeufe gekostet hat.
 */
export function securoDetail(payload: unknown): string {
	let d: unknown = payload;
	if (typeof d === 'string') {
		try {
			d = JSON.parse(d);
		} catch {
			return d as string;
		}
	}
	const o = d as { detail?: unknown };
	if (o && typeof o === 'object' && 'detail' in o) {
		const det = o.detail;
		if (typeof det === 'string') return det;
		if (Array.isArray(det)) {
			return det
				.map((x: { loc?: unknown[]; msg?: string; type?: string }) => {
					const feld = Array.isArray(x.loc) ? x.loc.filter((p) => p !== 'body').join('.') : '?';
					return `${feld}: ${x.msg ?? x.type ?? 'invalid'}`;
				})
				.join('; ');
		}
	}
	try {
		return JSON.stringify(d);
	} catch {
		return String(d);
	}
}
