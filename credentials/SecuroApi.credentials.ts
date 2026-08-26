import type { ICredentialType, INodeProperties } from 'n8n-workflow';

/**
 * Securo kennt keine API-Schluessel und keine persoenlichen Zugriffstoken - im
 * Quelltext von v0.14.4 gibt es weder ein Token-Modell noch entsprechende
 * Routen. Es bleibt die Anmeldung als Nutzer ueber `POST /api/auth/login`
 * (fastapi-users, OAuth2-Password-Formular).
 *
 * Keycloak taugt dafuer nicht: der OIDC-Rueckspruch endet in
 * `oidc_auth.py:389` mit `get_jwt_strategy().write_token(user)`, Securo stellt
 * also ein eigenes HS256-Token aus. Ein Keycloak-Token (RS256, anderer Issuer)
 * kann die API nicht validieren, auch nicht aus einem Service-Account.
 *
 * Empfehlung: ein eigener Securo-Nutzer fuer n8n mit Workspace-Rolle `editor`
 * (`can_write = owner|editor|manager`; `viewer` bekommt 403 "Read-only role").
 */
export class SecuroApi implements ICredentialType {
	name = 'securoApi';

	displayName = 'Securo API';

	documentationUrl = 'https://github.com/munin92/n8n-nodes-securo';

	icon = { light: 'file:../nodes/Securo/securo.light.svg', dark: 'file:../nodes/Securo/securo.dark.svg' } as const;

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://budget.example.com',
			required: true,
			description: 'Without a trailing slash. The API lives under /api.',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			required: true,
			description: 'A dedicated Securo user for n8n, with workspace role editor',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	];
}
