# Ownership and editing handoff

**Repository owner / technical lead:** Scelo Nkabinde. **Subject and content authority:** Zamayirha Peter, with final review to be confirmed.

Edit copy, services and published destinations in [content/site.json](../content/site.json). Update imagery in `public/assets/` and the source register, preserving meaningful image descriptions and intrinsic dimensions. Edit layout in `src/styles.css` and structure in `src/render.mjs`. Run checks and build before previewing.

The local JSON file is the content adapter for this release; a future CMS can supply the same structure without changing the page renderer. `validateContent` rejects unsafe URLs and invalid contact targets; HTML escapes all textual content. There are no operational customer records or telemetry datasets to export. Static output works on any host with appropriate response headers.

Use a review branch and readable PR, recording changed behaviour, tests and rollback. Layout, JavaScript, security, tracking, hosting identities and production publication stay under developer review. No privileged client editor or autonomous AI publishing flow is implemented. Configure actual repository protections and scoped deployment identities separately; this document does not enforce them.

Future priorities are owner content/media review, verified project examples, a decision on supporting pages, an approved domain migration, and genuine usability/accessibility testing. Add a contact backend or measurement system only when delivery, source authority, privacy, retention and permissions are defined.
