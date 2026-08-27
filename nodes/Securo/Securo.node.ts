import type {
	ICredentialsDecrypted,
	ICredentialTestFunctions,
	IDataObject,
	IExecuteFunctions,
	INodeCredentialTestResult,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeConnectionType,
} from 'n8n-workflow';
import { NodeApiError, NodeOperationError } from 'n8n-workflow';

import { errorDetail, securoDetail } from './errorDetail';
import { OPERATIONS } from './operations.generated';
import { buildProperties, buildRequest, fillPath } from './properties';
import { ensureToken, type SecuroTokenStore } from './tokenStore';

export class Securo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Securo',
		name: 'securo',
		// String-Literale statt NodeConnectionTypes: der Community-Lader
		// instanziiert die Klasse, und in einem geteilten ~/.n8n/nodes liegt oft
		// eine aeltere n8n-workflow-Kopie ohne diese Konstante. Der Zugriff wirft
		// dann einen TypeError, den n8n als "Class could not be found" meldet.
		icon: { light: 'file:securo.light.svg', dark: 'file:securo.dark.svg' },
		group: ['input'],
		version: [1, 2],
		usableAsTool: true,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Work with Securo. Every route from its OpenAPI description.',
		defaults: { name: 'Securo' },
		inputs: ['main' as NodeConnectionType],
		outputs: ['main' as NodeConnectionType],
		credentials: [{ name: 'securoApi', required: true, testedBy: 'securoApiTest' }],
		properties: buildProperties(OPERATIONS),
	};

	methods = {
		credentialTest: {
			async securoApiTest(
				this: ICredentialTestFunctions,
				credential: ICredentialsDecrypted,
			): Promise<INodeCredentialTestResult> {
				const d = (credential.data ?? {}) as Record<string, string>;
				const basis = String(d.baseUrl ?? '').trim().replace(/\/+$/, '');
				if (!basis || !d.username || !d.password) {
					return { status: 'Error', message: 'Base URL, username and password are all required.' };
				}
				try {
					// eslint-disable-next-line @n8n/community-nodes/no-deprecated-workflow-functions
					const res = (await this.helpers.request({
						method: 'POST',
						uri: `${basis}/api/auth/login`,
						form: { grant_type: 'password', username: d.username.trim(), password: d.password },
						json: true,
					})) as { access_token?: string };
					if (!res?.access_token) return { status: 'Error', message: 'Login returned no access_token.' };
					return { status: 'OK', message: 'Connected' };
				} catch (error) {
					return { status: 'Error', message: errorDetail(error) };
				}
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const out: INodeExecutionData[] = [];

		const c = await this.getCredentials('securoApi');
		const basis = String(c.baseUrl ?? '').trim().replace(/\/+$/, '');
		const store = (($getStatic(this).securo ??= {}) as SecuroTokenStore);

		const token = await ensureToken(store, {
			now: () => Date.now(),
			login: async () => {
				try {
					return (await this.helpers.httpRequest({
						method: 'POST',
						url: `${basis}/api/auth/login`,
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						body: new URLSearchParams({
							grant_type: 'password',
							username: String(c.username ?? '').trim(),
							password: String(c.password ?? ''),
						}).toString(),
						json: true,
					})) as { access_token?: string };
				} catch (error) {
					throw new NodeOperationError(
						this.getNode(),
						`Securo login failed: ${errorDetail(error)}`,
					);
				}
			},
		});

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				const op = OPERATIONS.find((o) => o.resource === resource && o.operation === operation);
				if (!op) {
					throw new NodeOperationError(this.getNode(), `Unknown operation ${resource}.${operation}`, {
						itemIndex: i,
					});
				}

				const pfadWerte: Record<string, string> = {};
				for (const p of op.pathParams) {
					pfadWerte[p] = String(this.getNodeParameter(`path_${p}`, i, '') ?? '').trim();
				}

				let qs: IDataObject;
				let body: IDataObject | undefined;

				if (this.getNode().typeVersion >= 2) {
					// Version 2 liest echte Felder und sortiert sie selbst nach
					// Query und Body - die Tabelle weiss, wohin welches gehoert.
					try {
						const gebaut = buildRequest(op, (name, fallback) =>
							this.getNodeParameter(name, i, fallback),
						);
						qs = gebaut.qs as IDataObject;
						body = gebaut.body as IDataObject | undefined;
					} catch (e) {
						throw new NodeOperationError(this.getNode(), (e as Error).message, { itemIndex: i });
					}
				} else {
					qs = this.getNodeParameter('queryParameters', i, {}) as IDataObject;
					if (op.body) {
						const roh = this.getNodeParameter('body', i, '{}');
						if (typeof roh !== 'string') {
							body = (roh ?? {}) as IDataObject;
						} else {
							try {
								body = JSON.parse(roh || '{}') as IDataObject;
							} catch (e) {
								throw new NodeOperationError(
									this.getNode(),
									`Body is not valid JSON: ${(e as Error).message}`,
									{ itemIndex: i },
								);
							}
						}
					}
				}

				// httpRequestWithAuthentication scheidet hier aus: es setzt einen
				// deklarativen authenticate-Block im Credential voraus. Securo hat
				// keine API-Schluessel - das Token entsteht erst durch die Anmeldung
				// und wird oben zwischengespeichert.
				// eslint-disable-next-line @n8n/community-nodes/no-http-request-with-manual-auth
				const response = (await this.helpers.httpRequest({
					method: op.method as 'GET',
					url: `${basis}${fillPath(op.path, pfadWerte)}`,
					headers: { Authorization: `Bearer ${token}` },
					qs: Object.keys(qs).length ? qs : undefined,
					body,
					json: true,
				})) as unknown;

				if (Array.isArray(response)) {
					out.push(...response.map((r) => ({ json: r as IDataObject, pairedItem: { item: i } })));
				} else if (response && typeof response === 'object') {
					out.push({ json: response as IDataObject, pairedItem: { item: i } });
				} else {
					out.push({ json: { result: response as string }, pairedItem: { item: i } });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					out.push({ json: { error: errorDetail(error) }, pairedItem: { item: i } });
					continue;
				}
				// Securos 422 nennt genau das fehlende Feld - roh ist das unlesbar.
				throw error instanceof NodeOperationError || error instanceof NodeApiError
					? error
					: new NodeApiError(this.getNode(), error as JsonObject, {
							message:
								securoDetail((error as { response?: { data?: unknown } })?.response?.data) ||
								errorDetail(error),
							itemIndex: i,
						});
			}
		}

		return [out];
	}
}


function $getStatic(ctx: IExecuteFunctions): Record<string, unknown> {
	return ctx.getWorkflowStaticData('global') as Record<string, unknown>;
}
