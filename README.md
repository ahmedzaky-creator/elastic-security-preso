# Elastic Security — Coordinated defense

An original animated presentation for CISO and SOC leaders: **An attacker crosses boundaries. Your investigation should too.**

The 34-scene story connects on-premises evidence, layered detection, investigation, AI assistance, and controlled response. Suggested pacing is 27:05. Its explanatory style is inspired by the Elastic Observability presentation, with original Security content, diagrams, and implementation.

## Present

- Published site: https://ahmedzaky-creator.github.io/elastic-security-preso/
- Keyboard: arrows/Space/Page keys move through builds and slides; Home/End select boundaries.
- `G` overview, `T` filmstrip, `N` notes, `F` fullscreen, `1–5` density (default 3).
- `R` replay, `L` laser, `D` drawing, `C` clear drawing, `?` help/downloads.
- Hide inline speaker notes before sharing the presentation window.

The overview and filmstrip use complete rendered previews. Browser back/forward restores the last visited walkthrough build. Reduced motion preserves the narrative without animated transitions.

## Companion files

`public/downloads/` contains the standalone offline HTML, 34-page PDF, presenter notes, and buyer conversation guide. Keep the companion files together when using the downloadable HTML locally. The presentation itself runs without network access; opening public source links requires connectivity.

An optional, separately labeled AlertZero outlook is accessible from Help. It is outside the core presentation and PDF. Availability statements are dated October 13, 2026.

## Content and evidence

All incident entities, events, queries, investigation results, and response outcomes are fictional illustrations. The site has no live Elastic connection, LLM call, or action execution.

Each scene includes public evidence and feature-specific qualifications. Self-managed examples use appropriately entitled/configured capabilities. Model, privilege, subscription, version, and connectivity requirements must be checked for a proposed deployment. Analyst approval before a manual GA workflow run is distinguished from the Preview approval step.

UOL and Proficio outcomes are customer-reported examples, not guaranteed results. The original internal mega deck and its assets are not part of this repository. [Public UOL evidence](https://www.elastic.co/customers/uol) · [Public Proficio evidence](https://www.elastic.co/customers/proficio)

## Develop and update

Requires Node 22.12 or newer.

```sh
npm ci
npm run dev
npm run build
npx playwright install chromium
npm test
```

Edit `src/scenes.ts` for copy, speaker notes, sources, qualifications, and step definitions; `src/incident.ts` holds the fictional incident. `src/visuals.ts` and its stylesheet own the original diagrams. `src/main.ts` owns navigation/presenter state; `src/style.css` owns layout. A new content update should keep these boundaries clear.

```sh
npm run build
npm run export
```

The export command regenerates notes, all 34 thumbnails, settled-state PDF, offline HTML, and the final Pages build. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` when using a custom Chromium executable. The exporter defaults to Chrome's standard macOS path.

`npm test` checks core routing, walkthrough/history behavior, density, keyboard activation, tablet/mobile layout, notes, annotations, reduced motion, and print structure. `node scripts/qa.mjs --all` captures all scenes at density 1/3/5 from the local preview for visual inspection.

Pushes to `main` run verification and publish the Pages artifact. Roll back by reverting the relevant commit and allowing the workflow to redeploy. No runtime backend or secrets are required.

The approved design is recorded under `docs/superpowers/specs/`. [Hive Mind](https://github.com/elastic/hive-mind) is an optional development reference; the presentation has no dependency on it.

## Attribution

Elastic names and logo are Elastic trademarks. The official supplied logo artwork is retained; its outer whitespace was normalized for placement. Inter and IBM Plex Mono are bundled under the SIL Open Font License. See `THIRD_PARTY_NOTICES.md` and `licenses/`.
