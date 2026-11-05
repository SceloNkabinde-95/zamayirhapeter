# Measurement contract and comprehensive capability assessment

**Date:** 2026-11-05 · **Status:** Contract and manual/synthetic evidence; no live collection.

Primary business question: can a potential collaborator understand Zamayirha’s relevance and reach a valid contact destination? The five shared dimensions and three journeys are defined in the [blueprint](BLUEPRINT.md).

## Observation versus outcome

| Proposed event | Authoritative source | Meaning | Current state |
|---|---|---|---|
| `page_viewed` | A future lawful browser/edge adapter | An eligible observed visit | Not collected |
| `service_opened` | A future permitted browser adapter | A disclosure was expanded | Native interaction only; no event transport |
| `primary_cta_clicked` | A future permitted browser adapter | A destination was activated | Not a delivered message or conversion; not collected |
| `contact_submission_succeeded` | Server after verified acceptance | A contact request was accepted | Unavailable: there is no form/API |
| `core_web_vital_observed` | Independent field monitoring adapter | Sampled field experience | Not configured |
| `release_deployed` | Deployment provider / CI | Specific source reached an environment | Version and commit provenance, not visitor telemetry |

A future event envelope must include UUID event ID, registered name, schema version, UTC observation time, server-authorised website/environment, release ID, page group, trusted source, consent applicability and coverage/retention labels. Reject unknown payloads and duplicates, enforce client/environment boundaries on the server, and export provider-neutral JSON. Do not collect enquiry text, email, telephone values, IP addresses, arbitrary query strings or persistent visitor identifiers in generic events. No collector or consent UI is enabled here; adding either requires a separate approved design.

## All framework modules assessed

| Module | Source / available evidence | Status and next action |
|---|---|---|
| AN-01 Acquisition/audience | Future lawful aggregate edge or web adapter | Not configured; establish purpose, permission, retention and source |
| AN-02 SEO/indexing | Prebuilt HTML/metadata; future verified search-console exports | Technical checks implemented; search access unavailable |
| AN-03 AI discovery | Future authorised edge/referral and independent citation sources | Not configured; never infer citations from crawler hits |
| AN-04 User success | Three journeys and five dimensions | Defined; manual/synthetic review only, participant research pending |
| AN-05 Journeys/outcomes | Contact destinations | No authoritative lead outcomes; do not report clicks as leads |
| AN-06 Frontend experience | Asset budgets and browser review | Synthetic checks; field CWV insufficient evidence |
| AN-07 Network/edge | Hosting delivery records | Provider data not connected; log retention/access must be reviewed |
| AN-08 Backend/database/integration | None required for homepage | Not applicable to this release; external email/phone apps outside control |
| AN-09 Reliability/incidents | Static export and rollback procedure | Continuous independent probes not configured; no availability claim |
| AN-10 Security/compliance | Escaping, URL validation, headers, CI | Bounded checks only; no claim of complete audit or enforced branch rules |
| AN-11 Accessibility/qualitative UX | Structural checks, keyboard and responsive review | Evidence recorded; full screen-reader/user study pending |
| AN-12 Scale/economics | Static size budgets; hosting account | Billing/load evidence not configured; no live load testing |
| AN-13 Releases/experiments | Git changes, ADR, CI and hosted versions | Release provenance implemented; no outcome comparison yet |
| AN-14 Data quality/governance | Content schema and source register | Content validation implemented; telemetry pipeline absent |
| AN-15 Admin/AI editing | Git branches and review PR | Separate platform not implemented; no client reports or privileged portal |

## Privacy, coverage and resilience

The client application stores no visitor data, makes no analytics requests and sets no cookies. The host may process technical request data under its own delivery/security policies; provider retention has not been audited. Qualitative review samples and lab results must retain provenance, date, environment and limitations. No raw visitor logs belong in Git.

Any future client report must be tenant-authorised and expose only agreed aggregates. Capability design does not authorise unrestricted collection. Missing sources must remain visibly “not configured,” “not applicable” or “insufficient evidence.” Core page rendering and contact navigation must remain functional if future measurement services fail.
