# Tenant-Aware Redirect MVP

Status: planned

## Goal

Resolve public redirect requests by tenant host and URL path. A tenant can own
human-readable paths such as `/jobs`, `/it`, and `/it/support`, all independent
from other tenants.

## Scope

In scope:

- Tenant-aware link lookup.
- Full-path link identity.
- Redirect active links to target URLs.
- Handle missing, disabled, and expired links.
- Tests for host and path matching.

Out of scope:

- Admin authentication.
- Analytics.
- Custom domains beyond the normalized host model.
- SharePoint-specific URL handling.

## Design Notes

- The core lookup key is `(tenantHost, path)`.
- Paths should be normalized consistently before storage and lookup.
- Nested paths are first-class link keys, not hierarchical resources.
- Redirects should remain public and fast.
- Production should assume each tenant can run against its own database and
  runtime deployment. Local development may simulate multiple tenants in one
  process, but the application code should not require cross-tenant tables for
  redirect lookup.

## Data Model Changes

- Add `Tenant`.
- Add `Link`.
- Enforce unique link paths per tenant.
- Keep tenant metadata minimal. Tenant provisioning and fleet-level metadata
  belongs in a later control-plane feature.

## API Changes

- Add public redirect route for arbitrary paths.
- Reserve `/api/*` and `/health` for service endpoints.

## Test Plan

- Unit test path normalization.
- Unit test tenant host normalization.
- End-to-end test successful redirect.
- End-to-end test same path across two tenants.
- End-to-end test missing, disabled, and expired links.

## Implementation Steps

1. Choose and configure persistence.
2. Add tenant and link entities or models.
3. Add path and host normalization utilities.
4. Add redirect lookup service.
5. Add catch-all public redirect route with reserved-path handling.
6. Add tests.
7. Commit the redirect MVP.

## Acceptance Criteria

- `tenant-a.aka.com/jobs` and `tenant-b.aka.com/jobs` can resolve to different
  target URLs.
- `/it/support` resolves as a single tenant-scoped path.
- Missing links do not redirect.
- Disabled and expired links do not redirect.
- No SharePoint-specific behavior exists.

## Commit Plan

- Commit after persistence, redirect behavior, and tests pass together.
