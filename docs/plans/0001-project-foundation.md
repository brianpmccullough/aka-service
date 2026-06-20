# Project Foundation

Status: completed

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
- Use `npm` as the package manager.
- Use a standard single NestJS application, not a monorepo.
- Use current Node.js LTS and document it with `.nvmrc` and `package.json`
  engines.
- Use environment variables for runtime config from the start.
- Use Zod for configuration validation.
- Use Jest for unit and end-to-end tests.
- Avoid integration-specific abstractions in the foundation.
- Define package scripts that agents and humans can run after each change:
  `npm run lint`, `npm run format:check`, `npm test`, and `npm run test:e2e`.
- Do not add Docker in this phase. Revisit containerization after data storage is
  selected.

## Implementation Decisions

- Used NestJS 11 with the Express platform adapter.
- Kept Express after considering Fastify as a way to avoid the transitive
  `multer` audit finding. Express remains the preferred platform for now.
- Added an npm `overrides` entry for `multer@2.2.0` because
  `@nestjs/platform-express` resolved to a vulnerable `multer@2.1.1` release.
  This keeps the Express platform while making production audit clean.
- Added `.nvmrc` with Node 22 and `package.json` engines set to `>=22.0.0`.
- Used TypeScript strict mode.
- Removed `baseUrl` from `tsconfig.json` instead of silencing the TypeScript 6
  deprecation warning because the foundation does not need path aliases yet.
- Used ESLint flat config with type-aware TypeScript rules.
- Used Prettier for source, root config files, package metadata, and docs.
- Used Jest with `ts-jest` for unit and end-to-end tests.
- Kept the standard Nest/Supertest e2e pattern. In the local sandbox,
  `npm run test:e2e` requires permission to bind an ephemeral local test port.

## Audit Notes

- `npm audit --omit=dev` reports `0 vulnerabilities` after the `multer`
  override.
- Full `npm audit` still reports dev-only moderate findings through
  Jest/Istanbul coverage tooling and `js-yaml`.
- Did not run `npm audit fix --force` because npm indicated breaking dev-tool
  downgrades.

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
