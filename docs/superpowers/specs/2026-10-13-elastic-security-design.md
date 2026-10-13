# Elastic Security: From scattered signals to coordinated defense

Status: approved by the user in the planning conversation and explicitly approved for implementation on October 13, 2026. This document records that design; it does not request another approval.

## Intent and delivery

Build an original 34-scene animated presentation for CISO and SOC leaders, primarily serving on-premises customers. The core presentation lasts 25–30 minutes. Publish the source in the new public GitHub repository `ahmedzaky-creator/elastic-security-preso` and the site through GitHub Pages. Deliver offline HTML, a 34-page PDF, presenter notes, and a customer conversation guide. No PowerPoint export.

The reference is https://elastic.github.io/observability-team/collaterals/observability-presentation/company-preso.html#0. Match its light visual grammar and explanation through animation, without copying its implementation. Its licensing was not established and its backend controls cannot operate on static Pages.

Central argument: **An attacker crosses boundaries. Your investigation should too.** Editorial pillars: **See the whole attack. Understand what matters. Act with control.** These are narrative labels, not official product names.

## Story

Use one clearly fictional on-premises incident: compromised directory credentials, suspicious Windows/Linux activity, lateral movement, suspected data theft, analyst verification, and approved containment. All hosts, users, queries, alerts, and results are illustrative. No live Elastic connection, LLM calls, or security actions.

Fixed sequence:

1. Cover
2. What we will prove and illustrative-demo boundary
3. Elasticsearch/Search AI foundation
4. Fragmented evidence challenge
5. Three editorial pillars
6. On-premises data sources
7. Normalize and enrich
8. Searchable history
9. Layered detection
10. Transparent detection rules and MITRE coverage
11. Behavioral machine learning
12. Endpoint protection
13. Cross-source correlation
14. Synthetic detection walkthrough
15. Entity context and risk
16. Alert overload
17. Attack Discovery reveal
18. Hypothesis and supporting evidence
19. Timeline
20. Process Analyzer
21. Session View and live investigation
22. Existing-tool interoperability
23. Migration with validation
24. Elastic AI Agent reveal
25. Grounded retrieval and ES|QL
26. Illustrative AI investigation walkthrough
27. Model choice and trust
28. Native Workflows
29. Approved response and Cases
30. Deployment choice, with self-managed as the principal example
31. Retention and operating economics
32. Public customer evidence
33. Resolved incident and SOC operating model
34. Three takeaways and a focused evaluation next step

An optional AlertZero appendix is outside the 34-scene core. Label it announced, forthcoming Technical Preview, as of October 13, 2026, with the public announcement source. Do not suggest general availability.

## Visual system

White/light surfaces; spacious editorial layouts; black headlines with blue emphasis; Inter and IBM Plex Mono; fine rules; blue `#0B64DD`, teal `#48EFCF`/`#02BCB7`, pink `#F04E98`. Original isometric SVG diagrams and a restrained dot matrix explain relationships. Use licensed, locally bundled fonts and a correctly attributed Elastic mark.

Use a proportionally scaled 1280×720 stage, approximately 180ms scene transitions, and 600ms staggered entrances. Evidence converges, detections expose sequences, alerts group, queries appear, and approval gates lead to actions. Walkthrough sequences advance and loop automatically while the presenter remains on a scene. Reduced motion shows complete content instantly. Print and thumbnails show the final static state.

## Implementation

**Playback correction approved October 13, 2026:** the user requested continuous animation on each slide and arrow keys exclusively for slide navigation. This replaces the original manual walkthrough navigation. Replay restarts the automatic sequence; browser history records slides.

Use Vite, TypeScript, and vanilla HTML/CSS. Separate controller, visuals, content, and fictional incident data. Scene definitions include stable IDs, title, chapter, notes, sources, availability, density layers, and build steps. The controller owns scene index, step, and density, disposes scene resources, and avoids global timer/listener leaks.

Root `index.html` and a `company-preso.html` alias support `#0`–`#33`, hash changes, reloads, and browser back/forward. Arrow/Space/Page keys move forward/back; Home/End select core boundaries. Every navigation input moves directly between scenes; animation phases never consume navigation input. Density defaults to 3, with levels 1–5 revealing deeper explanation without changing the argument or claims.

Include overview, filmstrip with complete PNG thumbnails, inline speaker notes, presenter timer, fullscreen, laser, drawing, replay, shortcut help, and touch navigation. Inline notes are explicitly approved in place of the split presenter pattern; a presenter popup, recording, server saves, and collaboration services are out of scope.

Bundle all fonts, assets, and code for offline HTML. Export 34 settled-state PDF pages at density 3. Source citations must remain legible in the PDF. GitHub Pages uses relative paths and no runtime external services. GitHub Actions checks and deploys the reproducible build.

## Evidence and publication boundaries

The FY26 Security mega deck remains local. Never publish its PDF, internal/confidential pages, screenshots, or private links. Recreate diagrams from verified public facts. Product illustrations are labeled as illustrative UI.

Attack Discovery identifies potential attacks from selected alerts, requires a suitable LLM, and needs analyst verification: https://www.elastic.co/docs/solutions/security/ai/attack-discovery . Self-managed Enterprise requirements apply to the AI/Workflows examples. Workflows is GA in 9.4 with Enterprise entitlement on Stack; label preview capabilities separately. EASE is a serverless project type and must not be presented as an installable on-premises capability. The self-managed AI example can use supported local OpenAI-compatible models with dependable tool calling/reasoning or an approved external LLM, subject to feature-specific model and connectivity requirements. Qualify version, privilege, platform, OS, model, and connectivity requirements. Do not claim full deployment parity or that every AI path keeps all data local. Do not transfer AI Assistant Knowledge Base, anonymization, or audit controls to Agent Builder: https://www.elastic.co/docs/explore-analyze/ai-features/ai-chat-experiences/ai-agent-or-ai-assistant/ .

Show directory disabling and network blocking as configured integrations, not native endpoint commands. Do not depict one cross-host process tree as a native Analyzer view. Describe suspected data transfer unless the illustrative evidence establishes actual transfer. Use public detection content with its correct license description, not a blanket open-source claim. Scene 31 explains compute/storage cost drivers, lifecycle and searchable snapshots, and no per-endpoint license charge for Elastic Defend within the appropriate entitlement, while telemetry ingestion/retention still consumes resources and incurs cost. Economics must qualify telemetry/storage costs and entitlement, avoiding everything-free or universal-savings claims.

Customer proof is customer-reported and not a guarantee: UOL 80% faster incident resolution (https://www.elastic.co/customers/uol), Proficio 34% less investigation time (https://www.elastic.co/customers/proficio). Every quantitative product/outcome claim needs a public source. Sources and availability are dated October 13, 2026, then rechecked before publication.

The conversation guide includes openings, exact responses to five objections (existing SIEM, AI trust, data control, retention cost, response authority), non-negotiables, closing next steps, and a role-play option. It is honest customer preparation, not adversarial persuasion.

## Execution and acceptance

1. Commit this approved spec and complete independent document review before implementation.
2. Build representative cover, pillars, Attack Discovery, and response scenes first; inspect visual fidelity before the full deck.
3. Review all 34 scenes at density 1/3/5 and every walkthrough state. Verify back/replay, hash routing/history, all presenter controls, and reduced motion.
4. Inspect 1280×720, 1920×1080, 1366×768, and mobile layouts. Require readable content, no overlap/clipping, complete diagrams, no console errors, no missing assets, and no runtime network requirement.
5. Verify offline HTML with networking disabled and PDF page count 34, readable citations, and complete diagrams.
6. Publish only the authored public material; verify the Pages URL, asset paths, controls, and deployment status. Retain a known-good Git revision for rollback.

Hive Mind is suggested as an optional development reference under the supplied AGENTS guidance, not a runtime dependency. No changes to the existing Observability repository.
