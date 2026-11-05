# Deployment, promotion and recovery

## Current boundary

This change is a private, noindexed review homepage. The existing domain and website remain in place. `config/site.json` controls the review origin and explicit production flag. `.openai/hosting.json` holds the opaque private hosting identity; it is not a credential.

## Build and preview

Run `npm ci --ignore-scripts`, `npm run check`, `npm test`, `npm run build`, then serve `dist/`. The site needs no database, environment variables, server runtime or secrets. Managed review hosting receives an archive built from the exact pushed source SHA. Generated `_headers` contains CSP, frame restrictions, MIME protections, referrer and permissions policy. Hosts that do not support this file need equivalent configuration.

`production: false` emits HTML noindex, a noindex response header and disallow-all robots. The review page has a self-canonical and no public sitemap. Owner-only hosting access is a separate enforced boundary; robots/noindex alone are not access control.

## Production promotion

1. Review the feature PR, content and media provenance, and actual test evidence with the authorised owner/developer.
2. Verify domain/DNS ownership, the required audience, existing URL inventory and analytics/search ownership. Confirm contact destinations and media reuse rights.
3. Map old URLs such as `/services/`, `/contact/`, `/about-zamayirha-peter/`, `/rate-card/` and existing blog URLs. Do not redirect all legacy paths blindly; this first homepage does not replace those pages.
4. Decide whether supporting external biography/experience links should become first-party pages before migrating the old domain. Otherwise they would point back to replaced content.
5. Set the approved production origin and `production: true` in the release branch, update canonical/domain configuration if required, rebuild and review robots/sitemap/Person metadata and response headers.
6. Promote the approved SHA through isolated environments using scoped credentials or supported provider identity. Configure and verify required GitHub checks and production reviewers where supported. No such protections are claimed by documentation alone.
7. Deploy, smoke-test links, headers and assets, and record exact SHA/version/provider result. Monitor genuine incidents and authoritative outcomes once services are commissioned.

No production domain or audience change is part of this implementation.

## Recovery and portability

- Keep the last working deployment version and its exact commit. Redeploy that saved version for fast rollback.
- To restore elsewhere, check out the reviewed commit, run the checks/build and upload `dist/` to a static host. Match `_headers` semantics and domain/TLS settings on the destination.
- Content, source and optimised media are versioned in the client repository. There is no application database to restore. Raw source photographs are linked in the source register; preserve originals separately under the client’s control.
- If a bad edit ships, revert it on a new branch, run the same checks and publish the reviewed version. Avoid destructive history rewrites.
- Validate private access and noindex on previews; validate intended public indexability only during an approved public release.

Hosting/CDN outages are handled by the hosting provider; independent uptime, cost alerting and a timed disaster-recovery drill are not configured in this scope.
