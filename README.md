# aka-service

aka-service is a planned NestJS service for short and vanity URLs.

The service is intended to run as a multi-tenant SaaS product. Tenants use host
names such as `tenant.aka.com` and own independent path namespaces such as
`/jobs`, `/it`, and `/it/support`.

SharePoint URLs are treated as ordinary target URLs unless a future feature
explicitly requires Microsoft Entra ID, Microsoft Graph, or SharePoint-specific
behavior.

## Planning

- Roadmap: [docs/roadmap.md](docs/roadmap.md)
- Feature plan template: [docs/plans/feature.md](docs/plans/feature.md)
- Current first increment: [docs/plans/0001-project-foundation.md](docs/plans/0001-project-foundation.md)

## Local Development

Use Node.js 22:

```sh
nvm use
```

Install dependencies:

```sh
npm install
```

Run the service locally:

```sh
npm run start:dev
```

Verify changes:

```sh
npm run lint
npm run format:check
npm test
npm run test:e2e
npm run build
```

## Contributor Guidance

See [AGENTS.md](AGENTS.md) for project workflow, architectural direction, and
verification commands.
