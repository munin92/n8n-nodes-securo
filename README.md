# n8n-nodes-securo

An [n8n](https://n8n.io) community node for [Securo](https://github.com/securo-finance/securo).

Every route, because the operations are **generated from Securo's own OpenAPI
description** rather than typed out by hand. Securo ships roughly every four
days; a hand-maintained list would be wrong within a fortnight.

```console
$ npm run generate
235 Operationen in 33 Ressourcen -> nodes/Securo/operations.generated.ts
```

> Not affiliated with Securo.

## Regenerating after a Securo upgrade

```bash
npm run generate -- --url https://budget.example.com/api/openapi.json
git diff nodes/Securo/operations.generated.ts   # read it before releasing
npm test && npm run build
```

The spec snapshot lives in `scripts/openapi.snapshot.json`, so the build is
reproducible without reaching the network.

## Authentication

Securo has **no API keys and no personal access tokens** — there is no token
model anywhere in the v0.14.4 source. What exists is `POST /api/auth/login`
(fastapi-users, an OAuth2 password form), so the credential holds a username and
a password.

Keycloak does not help here even where Securo uses it. The OIDC callback ends in
`oidc_auth.py:389` with `get_jwt_strategy().write_token(user)` — Securo mints its
*own* HS256 token, so a Keycloak token (RS256, different issuer) can never
validate against the API, service account or not.

Create a dedicated Securo user for n8n and give it the workspace role
**`editor`**: `can_write = owner|editor|manager`, while `viewer` gets
`403 Read-only role`.

The node logs in once per execution and keeps the token until shortly before it
expires, so a workflow with ten Securo nodes still authenticates once.

## Errors

FastAPI answers an invalid call with 422 and a `detail` list naming the exact
field. The node unpacks it:

```
username: Field required; password: Field required
```

rather than `Request failed with status code 422`, which is what sent me looking
in the wrong place for two runs while building this.

## Install

In n8n: **Settings → Community nodes → Install**, then
`@munin92/n8n-nodes-securo`.

## Status

Verified: build, the official n8n lint rules, unit tests over the property
generation, the token store and the error unpacking, and an end-to-end run in
n8n 2.36.7 against a stub that records what it receives:

```
POST /api/auth/login    ct=x-www-form-urlencoded  grant_type=password&username=…
GET  /api/asset-groups                            Bearer …
POST /api/assets/import ct=application/json       Bearer …  {"orders":[…]}
```

Also loaded against `n8n-workflow@1.82.0` — an older peer copy in a shared
`~/.n8n/nodes` is what makes a node fail with the misleading
*"Class could not be found"*.

**Not yet run against a live Securo instance.** The stub answers like Securo but
is not Securo.

## License

[MIT](LICENSE)
