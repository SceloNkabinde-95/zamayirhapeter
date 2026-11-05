# Test evidence — homepage v0.1

**Date:** 2026-11-05 · **Environment:** Local build and private review · **Owner:** Scelo Nkabinde / implementation assistant.

The final implementation commit and CI/deployment evidence are linked by the pull request and hosted version. These notes distinguish a performed check from a target or untested claim.

| Test ID | Scenario / expected result | Evidence / current result | Limits |
|---|---|---|---|
| T-01 | Content validation rejects unsafe links, images, duplicate IDs and invalid contact values | Node regression suite | Input contract, not a complete security assessment |
| T-02 | Text and JSON-LD cannot inject HTML/script | Adversarial text regression | Does not replace dependency/host security audit |
| T-03 | Visitor can read biography/services and reach email/phone without rendering JS | Prebuilt HTML and native links/details | Email delivery and external apps not exercised |
| T-04 | Every anchor resolves and images have local assets, alt and dimensions | Automated structural checks | Screen-reader sampling still required |
| T-05 | Review page is noindexed, canonical to review origin | Render tests and generated robots/header review | Auth audience verified through hosting operation |
| T-06 | Person metadata uses real identity and source profiles | JSON parsing regression | Search-result appearance/citation not guaranteed |
| T-07 | Public page has no tracker, cookie or visitor-store code | Script transport/storage regression and source review | Host request logging is outside client code |
| T-08 | Weight budgets are respected | Automated byte measurements | Not a field Core Web Vitals result |
| T-09 | Main controls and disclosures work with keyboard | Native Enter expansion passed; dialog open/Escape/focus restoration passed in Chrome | Full assistive-tech audit not complete |
| T-10 | Hero and content remain readable at desktop/mobile/tablet widths | Chrome desktop and 320/390/768px review frames; no horizontal overflow; portrait sizing/crop corrected | Frame content widths 305/375/753px due to scrollbars; not physical-device testing |
| T-11 | Rebuild and serve standard static output | `npm run build`, local preview and hosted version | Timed provider failover/restore drill not run |
| T-12 | Local documentation references resolve | Documentation-link check | External third-party pages may later move |

## Performance and future evidence

Project budgets: HTML <40 KB; CSS <35 KB; browser JavaScript <5 KB; desktop hero <100 KB; mobile hero <60 KB. Gallery images lazy-load; hero is prioritised; no external font, tracking library or frontend framework is downloaded.

No Lighthouse score, measured regional latency, field LCP/INP/CLS percentile, uptime SLO, load capacity, qualified-lead count or conversion lift is claimed. Those need appropriate tools and representative samples. Full WCAG 2.2 AA validation, participant trust/ease research, email-delivery proof and protected-production approval checks remain open before a public migration.

## Recorded result

- `npm run check`: **25 checks passed**.
- `npm test`: **11 tests passed, 0 failed**.
- `npm run build`: static export succeeded.
- Measured uncompressed build inputs: HTML **14,971 bytes**, CSS **17,927 bytes**, browser JavaScript **825 bytes**, desktop hero **49,162 bytes**, mobile hero **13,590 bytes**.
- Chrome desktop viewport and responsive review frames at 320, 390 and 768px were visually inspected. The frame content widths were 305, 375 and 753px respectively because the desktop scrollbar occupies 15px. Each had `scrollWidth === clientWidth`.
- Native service disclosure opened with Enter. Privacy dialog opened, Escape closed it, and focus returned to the Privacy button. Contact protocols and destinations were inspected without sending mail or making calls.
- The full-page browser capture showed all four displayed image assets and all sections. The about portrait now measures 465×525px at desktop after an intrinsic-height issue was fixed; mobile focal position was adjusted after narrow-width review.
- Browser log entries observed during review came from the browser extension, with no application-origin JavaScript errors observed. An optional cropped mobile evidence export timed out; responsive visual inspection succeeded and the desktop evidence file was saved.

![Desktop homepage preview](screenshots/homepage-desktop.jpg)
