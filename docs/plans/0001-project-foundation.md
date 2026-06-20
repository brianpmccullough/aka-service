# Project Foundation

Status: planned

## Goal

Create the initial NestJS service skeleton with repeatable local commands,
configuration validation, and a basic health check. This establishes the baseline
for small, tested, committable increments.

## Scope

In scope:

- NestJS application scaffold.
- Package manager and lockfile.
- Test, lint, and format scripts.
- `AGENTS.md` with project workflow and verification commands.
- Basic health endpoint.
- Environment configuration validation.
- Initial README with local development commands.

Out of scope:

- Database setup.
- Link persistence.
- Tenant routing.
- Authentication.
- SharePoint or Microsoft Graph integration.

## Design Notes

- Keep the first service executable before adding persistence.
- Prefer conventional NestJS module structure.
- Use environment variables for runtime config from the start.
- Avoid integration-specific abstractions in the foundation.
- Define package scripts that agents and humans can run after each change:
  `npm run lint`, `npm run format:check`, `npm test`, and `npm run test:e2e`.

## Data Model Changes

- None.

## API Changes

- Add `GET /health`.

## Test Plan

- Unit test the health service or controller.
- End-to-end test `GET /health`.
- Verify `npm test` or equivalent runs locally.

## Implementation Steps

1. Scaffold the NestJS application.
2. Add configuration validation.
3. Add the health module and endpoint.
4. Add `AGENTS.md` and README development instructions.
5. Add lint, format, unit test, and end-to-end test scripts.
6. Run tests and linting.
7. Commit the foundation increment.

## Acceptance Criteria

- The app starts locally.
- `GET /health` returns a successful response.
- Tests pass from a clean checkout after dependency installation.
- `AGENTS.md` documents the expected verification commands.
- No SharePoint-specific code or metadata exists in the foundation.

## Commit Plan

- Commit one foundation change after scaffold, health check, docs, and tests pass.
