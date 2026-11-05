# Website blueprint — Zamayirha Peter

**Version:** 0.1 · **Date:** 2026-11-05 · **Status:** Implemented for private review  
**Client/content owner:** Zamayirha Peter; final content and media approval to be confirmed.  
**Technical/repository owner:** Scelo Nkabinde.

## Purpose, visitors and outcomes

Introduce Zamayirha’s professional identity and perspective, establish relevance through authentic content, and let potential collaborators reach her directly. Priority visitors are communications decision makers, editors/producers, event organisers and people interested in leadership or community impact.

| Priority journey | Visitor outcome | Evidence | Limitation |
|---|---|---|---|
| Understand her work | Identify her disciplines and perspective | Visible biography, work section and service details; task-based review | No usability participant study yet |
| Evaluate fit | Find the relevant service and read context | Native service disclosures and links to existing biography/experience | These are editorial overviews, not verified project case studies |
| Make contact | Reach a published contact destination | Correct `mailto:`, `tel:` and social targets | Opening an app does not prove message delivery or a qualified lead |

## Design and content

Reference: supplied `image(5).png`. Retain full-bleed photography, dark treatment, central oversized white typography, small edge navigation/contact details and a fine inset frame. Translate generic “creative portfolio” into Zamayirha’s name and verified professional story. Follow with warm neutral sections, documentary images, typographic experience references, service disclosures, a sourced quote and a clear contact ending.

System fonts remove external font requests. Palette: off-white `#f4f3ed`, dark green-black `#191b18`, lime `#d8eb82`, muted grey-green. Responsive layouts stack at 640px, tighten at 1000px, and retain the same information hierarchy. WCAG 2.2 AA is the target, not a certification; see [evidence](TEST-EVIDENCE.md).

## Search and discovery

Relevant intent: Zamayirha Peter, communications consultant South Africa, multimedia journalist, speaker and moderator. The entire page is prebuilt HTML, with a single H1, meaningful headings, title/description, social metadata, descriptive links and Person JSON-LD. No invented ratings or endorsements. The review environment is noindexed, disallowed in robots, and privately hosted. Search property ownership and a full old-URL migration plan are required before a domain cutover; rankings and AI citations are not promised.

## Five user-success dimensions

| Dimension | Site-specific measure | Current baseline / evidence plan |
|---|---|---|
| Findability | Can a visitor locate a discipline and contact details? | Anchor and disclosure checks; research baseline not yet collected |
| Task completion | Can a visitor reach the intended contact destination? | Destination checks; delivery outcome remains unmeasured |
| Ease of use | Steps and perceived effort to inspect expertise and contact | One anchor plus direct link; participant feedback pending |
| Accessibility | Semantic, keyboard, readable, responsive experience | Manual browser checks and structural CI; full assistive-tech audit pending |
| Satisfaction and trust | Clear identity, accurate provenance, confidence in content | Sourced facts, no invented testimonials; client/user review pending |

The complete [measurement assessment](MEASUREMENT.md) covers all framework modules, collection scope and missing sources.

## Architecture, permissions and operation

Content in JSON is independent of the semantic renderer and hosting provider. Static output stays available without analytics/admin systems. No database, operational records, account system, contact collector or portal is introduced for a homepage. Future services must be independent and approved separately.

Develop on a feature branch → run checks → private preview → review PR → authorised merge/promotion. Repository settings and protected environments are not assumed to be configured. Client AI edits remain proposals; no client portal or autonomous production publication exists.

There are no application-service costs or dependencies. Hosting billing depends on the selected account; do not interpret this as a verified price quote. The static bundle can move to any static host. Source/content/media in Git are the recovery material; [deployment notes](DEPLOYMENT.md) cover rebuild and rollback.

## Acceptance

| Area | Gate | Status reference |
|---|---|---|
| Content | Published identity/contact, no unsupported achievements | [Source register](CONTENT-SOURCES.md) |
| Functional | Anchors, direct contact, native details, privacy dialog | [Test evidence](TEST-EVIDENCE.md) |
| SEO | Correct review isolation and prebuilt metadata | [Test evidence](TEST-EVIDENCE.md) |
| Privacy | No analytics transport, third-party embeds or contact collection | [Measurement](MEASUREMENT.md) |
| Performance | HTML <40 KB, CSS <35 KB, JS <5 KB, desktop hero <100 KB, mobile <60 KB | Automated asset checks; field CWV unavailable |
| Portability | Rebuild with Node only and serve standard static output | Build and archive verification |
| Public release | Content/media approval, reviewed PR, domain/redirect checks | Pending; existing domain unchanged |
