# Zamayirha Peter

An editorial homepage for communications consultant, multimedia journalist, speaker and moderator **Zamayirha Peter**. The design translates the supplied reference into a full-viewport photographic introduction, oversized typography, quiet navigation and direct contact links. Supporting sections introduce her perspective, work and expertise.

**Status:** First implementation for review. The existing website and domain have not been migrated. The preview is private and noindexed. Contact links open the visitor’s email or phone app; there is no submission backend, visitor tracking, client portal or fabricated delivery confirmation.

## Open the project

Requires Node.js 22 or later. The project has no third-party runtime or build dependencies. Python 3 is used only by the optional local preview command.

```sh
npm ci --ignore-scripts
npm run check
npm test
npm run build
npm run preview
```

Open `http://localhost:4173`. Any static web server can serve `dist/`. Python is not required to build or deploy. On Windows, replace the preview command with `py -m http.server 4173 --directory dist` if necessary.

## Where changes belong

| Responsibility | Location |
|---|---|
| Portable copy, links and content | [content/site.json](content/site.json) |
| Server-built semantic HTML | [src/render.mjs](src/render.mjs) |
| Responsive design and motion preferences | [src/styles.css](src/styles.css) |
| Optional privacy-dialog enhancement | [src/app.js](src/app.js) |
| Local, optimised photography | `public/assets/` |
| Review origin and explicit production switch | [config/site.json](config/site.json) |
| Deterministic static export and security headers | [scripts/build.mjs](scripts/build.mjs) |
| Checks and regression tests | [scripts/check.mjs](scripts/check.mjs), [tests/site.test.mjs](tests/site.test.mjs) |
| Hosting identity | `.openai/hosting.json` |

No credentials are required. Do not add secrets to content, frontend code or Git. Future server integrations must use a scoped, managed secrets provider and stay separate from public rendering.

## Project record

- [Client blueprint and measurement plan](docs/BLUEPRINT.md)
- [Architecture and reasoning](docs/decisions/ADR-0001-static-editorial-homepage.md)
- [Sources, photography and editorial verification](docs/CONTENT-SOURCES.md)
- [Measurement contracts and capability status](docs/MEASUREMENT.md)
- [Test evidence and limitations](docs/TEST-EVIDENCE.md)
- [Preview, production promotion and recovery](docs/DEPLOYMENT.md)
- [Ownership and future editing](docs/HANDOFF.md)
- [Change log](CHANGELOG.md)

The implementation follows the [Website Engineering Framework](https://github.com/SceloNkabinde-95/website-engineering-framework) at commit `285b162faf9abc6e055658cecb8e1592d3329348`, including content/technology separation, user-outcome definitions, review branches, truthful evidence and portability. Its comprehensive analytics catalogue is assessed in the measurement record; those capabilities are not presented as deployed services.
