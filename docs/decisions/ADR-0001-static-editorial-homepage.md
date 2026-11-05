# ADR-0001 — Portable static editorial homepage

**Date:** 2026-11-05 · **Status:** Implemented for review · **Owner:** Scelo Nkabinde.

## Context

The target repository was empty. The request is a homepage resembling a supplied photographic portfolio reference, using the current website’s authentic information and media, under the Website Engineering Framework. Visitors need readable content and direct contact, not an account or application backend.

## Decision and alternatives

Generate semantic HTML from portable JSON with a small Node script; serve local CSS, a minimal optional privacy-dialog script and optimised WebP assets. Use native anchors, telephone/email links and `details/summary` so core tasks work without JavaScript. Keep hosting metadata outside content.

| Alternative | Benefit | Reason not selected for this scope |
|---|---|---|
| React SPA | Familiar component ecosystem | Adds browser runtime and client rendering without needed application behaviour |
| Server application / CMS | Dynamic editing, forms and account support | Adds operations and permissions beyond the homepage request |
| Single hard-coded HTML file | Minimal setup | Mixes portable client content and presentation |
| Static JSON-to-HTML export | Small, accessible, portable output | Selected; editing currently uses Git |

## Consequences

- Public content and core visitor actions have no dependency on a CMS, analytics collector or developer administration service.
- All site facts and contact details are editable in one JSON content source; HTML is escaped and URLs validated.
- No live visitor telemetry is collected. Comprehensive analytics capabilities are assessed and gaps labelled, rather than silently deploying tracking or reporting false outcomes.
- Private review deployment and branch review support the requested workflow. They do not claim enforced GitHub approval policies.
- No secrets, form data or database records are introduced. New backend integrations require a new ADR, scoped runtime credentials and appropriate tests.
- Local media avoids third-party image requests. Standard static export supports migration with no source rewrite.

## Cost, performance and recovery

No paid application dependency or API usage. Hosting costs are account-specific and unverified. Build budgets are enforced in `npm run check`; mobile/desktop visual evidence is recorded separately. Commit history plus a clean rebuild is the restore path; private hosting versions provide deployment rollback. See [deployment](../DEPLOYMENT.md).

## Verification and revisit

See [test evidence](../TEST-EVIDENCE.md). Revisit when enquiries must be accepted server-side, there are verified case studies or new pages, client editing is authorised, a CMS is selected, lawful telemetry is commissioned, or the existing domain is migrated. The future system must keep content, operational data, telemetry and administration separate.
