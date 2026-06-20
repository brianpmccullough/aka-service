# AGENTS.md

This file guides agents and contributors working in this repository.

## Project Summary

aka-service is a NestJS service for short and vanity URLs. It is planned as a
multi-tenant SaaS product where tenants use hostnames such as `tenant.aka.com`
and own independent path namespaces such as `/jobs`, `/it`, and `/it/support`.

SharePoint URLs are ordinary target URLs unless a future feature explicitly adds
Microsoft Entra ID, Microsoft Graph, or SharePoint-specific behavior.

## Architecture Direction

- Prefer tenant-isolated runtime services and tenant-isolated databases for
  production.
- Keep local development simple, but do not add design assumptions that require
  all tenants to share one runtime or database.
- Treat tenant host plus normalized path as the redirect lookup identity.
- Keep public redirects unauthenticated unless a future tenant policy changes
  that behavior.
- Keep integration-specific metadata out of core models until it is required.

## Planning Workflow

- Maintain the durable roadmap in `docs/roadmap.md`.
- Create or update a focused plan under `docs/plans/` before implementing a
  feature.
- Keep feature increments small enough to implement, test, and commit in one
  round.
- Update plans when scope changes.

## Expected Commands

The NestJS scaffold must provide these commands. Run the relevant commands after
each round of changes.

```sh
npm run lint
npm run format:check
npm test
npm run test:e2e
```

Use these additional commands when available and relevant:

```sh
npm run build
npm run start:dev
```

If a command is not available yet, add it as part of the project foundation
increment instead of silently skipping it.

When dependency changes are made, also run:

```sh
npm audit --omit=dev
```

Document any remaining full-audit findings that are intentionally left in place,
especially when they are dev-only or would require breaking changes.

## Change Discipline

- Read existing plans and nearby code before changing behavior.
- Keep commits focused on one completed increment.
- Do not introduce SharePoint-specific behavior unless the active plan calls for
  it.
- Add or update tests with behavior changes.
- Prefer conventional NestJS structure and simple module boundaries.
- Do not perform broad refactors unless they are required by the current plan.

## Verification Before Commit

Before committing, verify:

- lint passes
- formatting check passes
- unit tests pass
- end-to-end tests pass when touched behavior is externally visible
- roadmap or feature plans are updated when scope or design changes
