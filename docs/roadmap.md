# Roadmap

aka-service is a multi-tenant SaaS service for short and vanity URLs. Each customer
tenant is addressed by host name, such as `tenant.aka.com`, and each tenant owns an
independent URL namespace.

SharePoint URLs are treated as ordinary target URLs unless a future feature
requires Microsoft Entra ID or Microsoft Graph integration.

## SaaS Architecture

The preferred production model is tenant-isolated infrastructure:

- each tenant has its own runtime service instance or deployment unit
- each tenant has its own database
- shared control-plane services may exist later for provisioning, billing, and
  fleet management

This model reduces noisy-neighbor risk, gives stronger data isolation, and makes
customer-specific scaling or maintenance easier. It also increases operational
complexity, so early implementation should keep local development simple while
avoiding assumptions that require all tenants to share one database or runtime.

At scale, tenant provisioning and management will likely need an orchestration
layer. Kubernetes-based hosting, such as Amazon EKS, Azure Kubernetes Service, or
another managed Kubernetes option, is a candidate direction, but the platform
choice should come after exploring operational needs, cost, deployment workflow,
and customer isolation requirements.

## Product Principles

- Keep the redirect path fast, simple, and highly reliable.
- Treat tenants as the primary isolation boundary.
- Prefer tenant-isolated runtime and persistence for production.
- Support human-readable paths, not just opaque short codes.
- Build in small, tested increments.
- Keep integrations optional until they are required by a specific feature.

## Routing Model

Incoming requests resolve by host and path:

- `tenant.aka.com/jobs`
- `tenant.aka.com/topic-1`
- `tenant.aka.com/it`
- `tenant.aka.com/it/support`
- `tenant.aka.com/it/somethingelse`

The lookup key is:

- tenant host, normalized from the request host
- path, normalized from the request URL path

Query strings are not part of the link identity. They may be preserved, dropped, or
merged into the target URL based on a per-link policy in a later feature.

## Milestones

### 1. Project Foundation

- Scaffold a NestJS service.
- Add automated tests and a repeatable local test command.
- Add config validation.
- Add health check endpoint.
- Add CI-ready lint and test scripts.

### 2. Tenant-Aware Redirect MVP

- Add tenant and link persistence.
- Resolve links by request host and full path.
- Redirect active links to target URLs.
- Return clear responses for missing, disabled, or expired links.
- Cover redirect behavior with unit and end-to-end tests.

### 3. Link Management API

- Create, read, update, disable, and delete links.
- Validate tenant-scoped path uniqueness.
- Support nested paths.
- Add pagination and filtering.
- Generate OpenAPI documentation.

### 4. Basic Analytics

- Record click events.
- Track timestamp, tenant, link, referrer, user agent, and privacy-safe IP hash.
- Add aggregate endpoints for link and tenant summaries.
- Keep analytics writes from blocking redirects where practical.

### 5. SaaS Control Plane

- Add tenant provisioning workflow.
- Track tenant deployment state.
- Manage tenant-specific runtime configuration.
- Manage tenant-specific database provisioning and migrations.
- Add fleet-level health and version visibility.
- Explore Kubernetes-based deployment options such as EKS and AKS.
- Defer provider selection until operational requirements are clearer.

### 6. SaaS Runtime Readiness

- Add tenant onboarding model.
- Add tenant settings.
- Add custom domain support.
- Add rate limiting and abuse controls.
- Add operational logging and request correlation.

### 7. Authentication And Authorization

- Add authenticated admin APIs.
- Support Microsoft Entra ID as one identity provider.
- Add tenant-scoped roles and permissions.
- Keep public redirects unauthenticated unless tenant policy says otherwise.

### 8. Optional Integrations

- Add SharePoint or Microsoft Graph helpers only when required.
- Add URL verification or metadata enrichment as optional workflows.
- Avoid storing integration-specific metadata in the core link model unless it is
  needed for a committed feature.

## Current Focus

The current focus is project foundation followed by tenant-aware redirect behavior.
Each feature should have a plan under `docs/plans/` before implementation starts.
