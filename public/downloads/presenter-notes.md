# Elastic Security — Presenter notes

34 scenes · 27:05 suggested pacing · English · CISO and SOC leaders

Core argument: **An attacker crosses boundaries. Your investigation should too.**

Animation sequences play and loop automatically. Arrow, Space, and Page keys move directly between slides; R replays the current slide. Reduced motion shows complete diagrams immediately.

All incident data and UI walkthroughs are illustrative. Verify findings, entitlements, versions, models, connectivity, and action privileges for the customer. Sources checked October 13, 2026. Hide the inline notes before screen sharing.

## 01. Elastic Security. Coordinated defense.

**Chapter:** 01 / Philosophy · **Pacing:** 40 seconds

**Open:** An attacker does not respect our product boundaries, our teams, or our data silos.

**Explain:** Today we follow one fictional incident from identity misuse to containment. Elastic brings searchable evidence, layered detection, investigation, and controlled response into one working context. Keep the emphasis on the analyst making a better decision.

**Transition:** Before the technology, let us agree on what this story needs to prove.

**Qualification:** Synthetic incident and illustrative UI. Capability availability depends on deployment, subscription, version, and configuration. Sources checked October 13, 2026.

**Technical context:** One fictional incident follows a compromised service account across Windows and Linux. The presentation demonstrates an operating philosophy, not a live investigation.

**Evidence:** [Elastic Security](https://www.elastic.co/security)

## 02. One incident. Three decisions.

**Chapter:** 01 / Philosophy · **Pacing:** 40 seconds

**Open:** Three questions define the quality of the response.

**Explain:** The fictional account is svc-backup. The Windows endpoint is WIN-FIN-07; the Linux server is LNX-DB-03. The evidence is deliberately incomplete: a suspicious outbound connection does not establish that data was stolen. That distinction will remain visible throughout.

**Ask:** Which decision takes the longest in your SOC today: scope, confidence, or authority?

**Transition:** The foundation is the ability to ask these questions of our evidence.

**Qualification:** Illustrative sequence; it is not a product benchmark or a claim about response time.

**Technical context:** All timestamps, entities, counts, commands, and response results in the walkthrough are fabricated for teaching. The site sends no queries or security actions.

**Evidence:** [Respond and contain](https://www.elastic.co/docs/solutions/security/respond-and-contain)

## 03. Security starts with searchable evidence.

**Chapter:** 01 / Philosophy · **Pacing:** 45 seconds

**Open:** The durable asset is the evidence, not just the alert that happened to fire.

**Explain:** Elasticsearch provides the search and analytics foundation. Elastic Security places security-specific methods on that foundation. This becomes especially useful when the investigation changes direction: we can return to the underlying data instead of being limited to a summary.

**Transition:** What happens when that evidence stays separated?

**Qualification:** The shared foundation does not imply identical features or entitlements across deployment types.

**Technical context:** The platform matters because a new investigation can ask a new question of existing evidence. Data quality, mappings, privileges, and retention still determine what can be answered.

**Evidence:** [Elastic Security](https://www.elastic.co/security) · [Elastic Agent Builder](https://www.elastic.co/docs/explore-analyze/ai-features/elastic-agent-builder)

## 04. The signals exist. The story is missing.

**Chapter:** 01 / Philosophy · **Pacing:** 45 seconds

**Open:** Every individual system can be telling the truth while the SOC still lacks the story.

**Explain:** At 09:12 we see authentication. At 09:17 there is PowerShell. At 09:24 there is Linux access. None alone proves the full incident. The analyst needs relationships and source events, including evidence that contradicts the initial hypothesis.

**Transition:** That is the problem our three pillars address.

**Qualification:** Synthetic example. Correlation depends on collected data and reliable identity, host, and time fields.

**Technical context:** Our teaching incident spans AD-DC-01, WIN-FIN-07, and LNX-DB-03. Joining the evidence changes the question from “which alert?” to “what happened across these systems?”

**Evidence:** [Elastic Common Schema](https://www.elastic.co/docs/reference/ecs/ecs-getting-started)

## 05. See. Understand. Act with control.

**Chapter:** 01 / Philosophy · **Pacing:** 35 seconds

**Open:** This is the organizing principle for the rest of the conversation.

**Explain:** Seeing is about connected evidence. Understanding is about an explanation you can test. Acting is about the authority and operational discipline to change a system safely. AI supports this chain; it does not remove the need for verification.

**Transition:** Start with what the SOC can see inside an on-premises estate.

**Qualification:** Editorial framework, not official product or subscription names.

**Technical context:** These are editorial pillars for this presentation. They connect Elastic capabilities to the decisions a SOC must make, rather than listing features in isolation.

**Evidence:** [Elastic Security](https://www.elastic.co/security)

## 06. Your environment. One evidence fabric.

**Chapter:** 02 / See the whole attack · **Pacing:** 45 seconds

**Open:** On-premises does not mean one kind of system or one kind of data.

**Explain:** Map collection to the attack path. Our example needs directory events, Windows processes, Linux sessions, and outbound network context. Select the appropriate integration for each source, then verify the events and required fields actually arrive. An installed integration alone is not proof of visibility.

**Transition:** Those events become more useful when they share a language.

**Qualification:** Integration support and field coverage vary. Custom collectors need ECS mappings and configured Security index patterns.

**Technical context:** In the example, directory authentication, endpoint processes, Linux sessions, and network logs supply different parts of the chain. Collection and parsing health are operational requirements.

**Evidence:** [Security data ingestion](https://www.elastic.co/docs/solutions/security/get-started/ingest-data-to-elastic-security)

## 07. Different sources. Shared meaning.

**Chapter:** 02 / See the whole attack · **Pacing:** 45 seconds

**Open:** A common schema is an investigation advantage.

**Explain:** We do not want the analyst to translate every vendor field during an incident. Normalize the identity, host, time, and event category. Validate that svc-backup means the same account across sources, and distinguish host IDs when names can collide.

**Transition:** A shared language also lets us revisit history.

**Qualification:** Custom mappings and enrichments require configuration. ECS does not guarantee complete or accurate source data.

**Technical context:** A collector may call the account AccountName, user, or principal. Normalization makes user.name searchable across the example while preserving useful original source context.

**Evidence:** [Elastic Common Schema](https://www.elastic.co/docs/reference/ecs/ecs-getting-started) · [Security data ingestion](https://www.elastic.co/docs/solutions/security/get-started/ingest-data-to-elastic-security)

## 08. New intelligence. Existing evidence.

**Chapter:** 02 / See the whole attack · **Pacing:** 45 seconds

**Open:** The most useful question may be one we did not know to ask yesterday.

**Explain:** After finding the destination, search earlier data for similar activity. After confirming unauthorized use, identify the earliest reliable evidence. Design retention with the access pattern in mind: older read-only data and active investigations have different performance needs.

**Transition:** Now apply complementary ways to detect the chain.

**Qualification:** Searchable snapshots require Enterprise. Historical answers depend on retained telemetry and tier access; this is not an unlimited retention promise.

**Technical context:** Searchable snapshots can support queries over retained read-only evidence. Storage design should reflect repository reliability, retrieval costs, performance needs, and recovery requirements.

**Evidence:** [Searchable snapshots](https://www.elastic.co/docs/deploy-manage/tools/snapshot-and-restore/searchable-snapshots/)

## 09. One attack. Multiple ways to see it.

**Chapter:** 02 / See the whole attack · **Pacing:** 45 seconds

**Open:** A layered approach gives us different reasons to investigate.

**Explain:** Explicit rules are useful for identifiable behaviors. Anomaly detection can expose a departure from normal patterns. Correlation explains ordered activity, and endpoint protection can intervene on supported hosts. Treat their outputs as evidence inputs with distinct strengths and limitations.

**Transition:** Start with detection logic the team can inspect.

**Qualification:** Rule prerequisites, data requirements, and subscriptions differ. Enable and tune methods against your collected data.

**Technical context:** Detection methods complement one another. A low-level signal can matter when combined with stronger evidence; a high score alone does not establish compromise.

**Evidence:** [Choose a detection rule type](https://www.elastic.co/docs/solutions/security/detect-and-alert/about-detection-rules) · [Elastic endpoint security](https://www.elastic.co/security/endpoint-security/)

## 10. Inspect the logic. Own the decision.

**Chapter:** 02 / See the whole attack · **Pacing:** 45 seconds

**Open:** The useful question is not how many rules exist. It is which behavior we can reliably detect.

**Explain:** Review the conditions, source fields, schedule, exceptions, and investigation guidance. Public development gives the team a place to inspect and discuss detection content. Validate released rules against your telemetry; the repository can contain content that is not yet released.

**Transition:** Known patterns are only one part of detection.

**Qualification:** Public detection repository content is licensed under Elastic License v2. The illustrative rule shown here is teaching content, not a shipped rule.

**Technical context:** The public elastic/detection-rules repository includes rule-development and validation tooling. Public visibility helps review; ATT&CK mappings do not prove complete technique coverage.

**Evidence:** [Public detection rules · ELv2](https://github.com/elastic/detection-rules) · [Detection rule concepts](https://www.elastic.co/docs/solutions/security/detect-and-alert/detection-rule-concepts)

## 11. Known rules. Unfamiliar behavior.

**Chapter:** 02 / See the whole attack · **Pacing:** 45 seconds

**Open:** Anomaly detection asks what is unusual, not whether a user is guilty.

**Explain:** A service identity accessing an unfamiliar system can be worth a look. But a new backup rollout can also change behavior. Use the anomaly as a reason to retrieve evidence and ask about the operational change, then combine it with process and network observations.

**Transition:** The endpoint provides the execution evidence.

**Qualification:** ML rules require configured anomaly jobs, suitable data, and the appropriate entitlement. A model score is not a probability of compromise.

**Technical context:** The chart is synthetic. Our account appears outside its usual pattern; source events and change records decide whether that deviation is an attack.

**Evidence:** [Machine learning rules](https://www.elastic.co/docs/solutions/security/detect-and-alert/machine-learning)

## 12. Protect the host. Keep the context.

**Chapter:** 02 / See the whole attack · **Pacing:** 45 seconds

**Open:** Prevention and investigation need the same execution context.

**Explain:** Elastic Defend offers native protection and endpoint telemetry. In this story, the Windows process tells us what followed authentication. Present supported response actions separately from broader directory or firewall integrations. Evaluate the operating systems and policies the customer actually uses.

**Transition:** Combine host evidence with the rest of the estate.

**Qualification:** OS, policy, version, and subscription determine capabilities. No per-endpoint fee does not eliminate telemetry, infrastructure, or retention costs.

**Technical context:** WIN-FIN-07 records the process evidence in our incident. You can also ingest third-party endpoint evidence; availability and response capabilities depend on the integration.

**Evidence:** [Elastic endpoint security](https://www.elastic.co/security/endpoint-security/) · [Security data ingestion](https://www.elastic.co/docs/solutions/security/get-started/ingest-data-to-elastic-security)

## 13. Connect the events. Expose the sequence.

**Chapter:** 02 / See the whole attack · **Pacing:** 45 seconds

**Open:** A relationship creates a better question; it does not automatically create a verdict.

**Explain:** At 09:12 the account authenticates. At 09:17 the Windows host launches suspicious PowerShell. At 09:24 a Linux session begins from the Windows origin. Matching identity and time help build the chain, while source details distinguish coincidence from meaningful activity.

**Transition:** Walk through how those signals become an investigation.

**Qualification:** Synthetic chain. Correlation is configured detection or analyst logic, not proof of causality.

**Technical context:** Event correlation rules can express ordered behavior using EQL. Cross-source joins need dependable fields; a shared account name alone may be ambiguous.

**Evidence:** [Choose a detection rule type](https://www.elastic.co/docs/solutions/security/detect-and-alert/about-detection-rules) · [Timeline](https://www.elastic.co/docs/solutions/security/investigate/timeline)

## 14. From a login to an attack hypothesis.

**Chapter:** 02 / See the whole attack · **Pacing:** 60 seconds

**Open:** Let the evidence change the hypothesis one step at a time.

**Explain:** Follow the automatic sequence. First show the valid-looking identity event, then execution, then movement. Finish with archive staging and the outbound connection. Do not call this confirmed exfiltration. The useful output is an investigation with specific entities, a time window, and evidence to examine.

**Automatic animation sequence:**

1. **09:12 · Identity** — svc-backup authenticates from an unfamiliar workstation. This is an observation, not a compromise verdict.
2. **09:17 · Execution** — WIN-FIN-07 records encoded PowerShell outside the expected backup job. Review the process and owner context.
3. **09:24 · Movement** — Authentication and process events link the Windows origin to a session on LNX-DB-03.
4. **09:31–09:36 · Impact question** — An archive is staged, then an outbound connection appears. Successful data transfer remains unverified.
5. **Investigation ready** — The related observations form a testable hypothesis. Preserve the source events and assign an analyst to verify it.

**Transition:** We also need to know which entities matter most.

**Qualification:** Illustrative UI and data. The evidence supports suspected compromise and suspected transfer, with impact still to be verified.

**Technical context:** The walkthrough is a scripted explanation. Rule names, counts, and result states are synthetic; no production rule or backend is executed.

**Evidence:** [Detection rule concepts](https://www.elastic.co/docs/solutions/security/detect-and-alert/detection-rule-concepts) · [Respond and contain](https://www.elastic.co/docs/solutions/security/respond-and-contain)

## 15. An alert has severity. An entity has history.

**Chapter:** 02 / See the whole attack · **Pacing:** 45 seconds

**Open:** A medium-severity alert on a critical system can deserve immediate attention.

**Explain:** Add the business role of the Linux server and the privileges of the service account to the observed behavior. Explain the contributing alerts rather than presenting a mysterious score. Risk and criticality help order work; source evidence still establishes the incident.

**Transition:** Without that context, the analyst is left with the queue.

**Qualification:** Requires the appropriate feature entitlement, entity coverage, and configuration. Risk is a prioritization aid, not a probability of compromise.

**Technical context:** Entity risk scoring combines configured inputs to prioritize hosts, users, and services. The example does not represent an actual calculated score.

**Evidence:** [Entity risk scoring](https://www.elastic.co/docs/solutions/security/advanced-entity-analytics/entity-risk-scoring)

## 16. More alerts are not more understanding.

**Chapter:** 03 / Understand what matters · **Pacing:** 40 seconds

**Open:** The alert queue is a starting point, not the unit of understanding.

**Explain:** The fictional incident produces different signals across several sources. Repeatedly opening each alert can fragment the analyst’s attention. The task is to group related evidence while retaining the ability to challenge the grouping.

**Transition:** Attack Discovery provides an attack hypothesis to review.

**Qualification:** Illustrative alert counts are not a product benchmark. Alert quality depends on rule tuning, telemetry, and collection health.

**Technical context:** The alert grid is synthetic. More aggressive filtering can also hide relevant evidence; tune prioritization with attention to missed attacks as well as noise.

**Evidence:** [Manage detection alerts](https://www.elastic.co/docs/solutions/security/detect-and-alert/manage-detection-alerts)

## 17. Related alerts. A potential attack.

**Chapter:** 03 / Understand what matters · **Pacing:** 50 seconds

**Open:** Pause on the word potential.

**Explain:** Attack Discovery uses selected alerts to identify relationships and describe possible attacks. It is not omniscient: the time window, filters, alert content, and model affect the result. In this story it gives the analyst a focused hypothesis and involved entities to examine.

**Transition:** A useful hypothesis shows both evidence and uncertainty.

**Qualification:** Self-managed example requires Enterprise, appropriate privileges, and a suitable configured LLM. Model limits, alert selection, and connectivity affect results.

**Technical context:** Our generated-looking narrative proposes credential misuse followed by cross-host activity. It is an illustrative hypothesis, not a live model result or confirmed attack.

**Evidence:** [Attack Discovery](https://www.elastic.co/docs/solutions/security/ai/attack-discovery)

## 18. A useful hypothesis can be challenged.

**Chapter:** 03 / Understand what matters · **Pacing:** 50 seconds

**Open:** The strongest investigation is willing to disprove its first explanation.

**Explain:** Ask whether the commands were expected, whether the identity links are reliable, and what the network data actually shows. The owner confirms this was not an approved job. That verifies unauthorized activity, while successful transfer remains unproven. Preserve that distinction in the case.

**Transition:** Now organize the evidence in a shared investigation workspace.

**Qualification:** Synthetic analyst findings. AI narratives and suggested attribution require human verification; do not treat them as established facts.

**Technical context:** At 09:44, source-event review and account-owner confirmation establish unauthorized activity in this example. Transfer amount, contents, and wider impact remain open questions.

**Evidence:** [Triage discovery findings](https://www.elastic.co/docs/solutions/security/ai/attack-discovery/triage-attack-discovery-findings)

## 19. Build the chronology. Keep the evidence.

**Chapter:** 03 / Understand what matters · **Pacing:** 50 seconds

**Open:** Chronology is how we test whether the story fits the evidence.

**Explain:** Show the events in order and retain the difference between an alert and its source event. Query across the account and the involved hosts, then save the investigation. A colleague should be able to continue the work without rebuilding the same search from memory.

**Transition:** For execution details, move inside one host.

**Qualification:** Illustrative workspace. Index access, mappings, available telemetry, and Timeline privileges determine what appears.

**Technical context:** Timeline can combine alerts and source events from multiple indices. Saved work and a documented hypothesis keep the handoff grounded in evidence.

**Evidence:** [Timeline](https://www.elastic.co/docs/solutions/security/investigate/timeline)

## 20. Follow the process. Find the cause.

**Chapter:** 03 / Understand what matters · **Pacing:** 50 seconds

**Open:** Inside the Windows host, parentage explains the execution.

**Explain:** Follow the process path on WIN-FIN-07. Ask which process launched PowerShell, which user ran it, and which associated events followed. This view is intentionally confined to one host. We use the wider investigation workspace to connect the Linux activity.

**Transition:** Linux sessions give us a different forensic view.

**Qualification:** Illustrative Analyzer. Supported integrations and compatible process fields are required; unavailable telemetry cannot be reconstructed.

**Technical context:** The teaching diagram is a single-host process chain. Cross-host movement is established through correlated identity and network evidence, not one native cross-host process tree.

**Evidence:** [Visual event analyzer](https://www.elastic.co/docs/solutions/security/investigate/visual-event-analyzer)

## 21. Reconstruct the session. Check the live host.

**Chapter:** 03 / Understand what matters · **Pacing:** 55 seconds

**Open:** History tells us what happened; live interrogation tells us what remains.

**Explain:** Review the Linux session, then ask a focused live question: is the suspicious process running, or does the staged archive still exist? A failed or offline query is not an empty result. Session collection must be enabled before the events occur; do not imply retroactive capture.

**Transition:** The same evidence-first approach works alongside existing tools.

**Qualification:** Session View needs Linux Elastic Defend session collection. Terminal output has kernel requirements. Osquery needs its integration, privileges, and reachable agents.

**Technical context:** The example shows archive creation after SSH activity. Terminal output is optional sensitive telemetry; collect it only with the appropriate policy and platform support.

**Evidence:** [Session View](https://www.elastic.co/docs/solutions/security/investigate/session-view) · [Osquery investigation](https://www.elastic.co/guide/en/security/current/use-osquery.html)

## 22. Keep useful tools. Connect their evidence.

**Chapter:** 04 / Extend analyst expertise · **Pacing:** 40 seconds

**Open:** A useful evaluation can begin with the tools and evidence the customer already has.

**Explain:** Separate ingestion from response. We may be able to collect a tool’s alerts without having its response API or permissions. Map the evidence flow and action ownership explicitly, then choose an incremental use case that improves the existing operation.

**Ask:** Which existing tool or process must remain authoritative during your evaluation?

**Transition:** Migration should follow the same standard of proof.

**Qualification:** Collection and response support differ by integration. Third-party licenses, API access, connectors, and privileges may be required.

**Technical context:** Interoperability has two separate questions: can useful evidence be ingested, and can an authorized action be executed through a supported or configured integration?

**Evidence:** [Security data ingestion](https://www.elastic.co/docs/solutions/security/get-started/ingest-data-to-elastic-security) · [Respond and contain](https://www.elastic.co/docs/solutions/security/respond-and-contain)

## 23. Translate the content. Validate the behavior.

**Chapter:** 04 / Extend analyst expertise · **Pacing:** 55 seconds

**Open:** Migration is a validation project, not a copy-and-paste event.

**Explain:** Automatic Migration can assist with supported SIEM content. The test is whether the translated rule detects the intended behavior on your real mapped data. Include negative cases and late-arriving events, and preserve the current system until acceptance criteria pass. Never promise a universal conversion percentage.

**Automatic animation sequence:**

1. **Inventory** — Choose a supported source and identify assets, data requirements, owners, and expected detections.
2. **Translate** — Review the proposed Elastic content. Resolve field mappings and unsupported or incomplete translations.
3. **Validate** — Replay representative events and benign administration. Compare coverage and behavior against explicit acceptance criteria.
4. **Transition** — Promote validated content in stages. Retain existing coverage until the operational owner accepts the replacement.

**Transition:** Then extend the analyst’s ability to work with that evidence.

**Qualification:** Automatic Migration requires Enterprise on Stack, ML enabled, privileges, and a working LLM. Supported source and asset coverage has limitations.

**Technical context:** Supported migration sources and asset types vary. Query translation alone cannot validate source-field semantics, data coverage, permissions, or detection timing.

**Evidence:** [Automatic migration](https://www.elastic.co/docs/solutions/security/get-started/automatic-migration)

## 24. Elastic AI Agent. Grounded in evidence.

**Chapter:** 04 / Extend analyst expertise · **Pacing:** 50 seconds

**Open:** The goal is to make the next useful question easier to ask.

**Explain:** Elastic AI Agent is powered by Agent Builder. It can help explore data and generate ES|QL through available tools. The analyst should inspect the result and the underlying evidence. This is not a promise of flawless answers or an automatic transfer of AI Assistant privacy features.

**Transition:** Show the retrieval path behind the conversation.

**Qualification:** Self-managed example requires Enterprise, supported Stack version, privileges, and a configured model. Agent Builder and AI Assistant have different controls.

**Technical context:** The agent is a tool-using conversational interface. Its usefulness depends on the available data, assigned tools, permissions, and model quality.

**Evidence:** [Elastic AI Agent](https://www.elastic.co/docs/explore-analyze/ai-features/agent-builder/builtin-agents-reference) · [AI Agent and Assistant differences](https://www.elastic.co/docs/explore-analyze/ai-features/ai-chat-experiences/ai-agent-or-ai-assistant/)

## 25. A question becomes an inspectable query.

**Chapter:** 04 / Extend analyst expertise · **Pacing:** 50 seconds

**Open:** The answer becomes more useful when its evidence path is visible.

**Explain:** Start with a specific question about svc-backup and the incident window. Inspect the generated query before relying on its result. Verify the selected data, time filter, and field meaning. A technically valid query can still answer the wrong investigation question.

**Transition:** Watch that process in a short investigation dialogue.

**Qualification:** Illustrative query and result set. Tools, index privileges, mappings, model behavior, and version determine available retrieval.

**Technical context:** Agent Builder includes tools to generate and execute ES|QL. Custom parameterized tools can provide precise retrieval for recurring investigation questions.

**Evidence:** [Agent Builder tools](https://www.elastic.co/docs/explore-analyze/ai-features/agent-builder/tools/builtin-tools-reference) · [Custom ES|QL tools](https://www.elastic.co/docs/explore-analyze/ai-features/agent-builder/tools/custom-tools)

## 26. Ask. Retrieve. Verify. Then decide.

**Chapter:** 04 / Extend analyst expertise · **Pacing:** 60 seconds

**Open:** Follow the evidence loop, not the eloquence of the answer.

**Explain:** Follow the automatic sequence of the question, query, result rows, and qualified explanation. The scripted answer is intentionally careful about the outbound connection. The account owner verifies the unauthorized commands; the analyst then documents what is known and asks the response owner for a specific action.

**Automatic animation sequence:**

1. **Ask a scoped question** — What activity links svc-backup, WIN-FIN-07, and LNX-DB-03 during the incident window?
2. **Review the retrieval** — Inspect the proposed ES|QL and the data scope. The shown query is a teaching example.
3. **Inspect the evidence** — Source rows connect authentication, encoded PowerShell, SSH activity, archive creation, and an outbound connection.
4. **Qualify the answer** — The evidence suggests a connected attack chain. It does not establish what data successfully left the environment.
5. **Human verification** — The account owner confirms unauthorized activity at 09:44. The analyst records the evidence and requests a defined containment action.

**Transition:** Where that reasoning runs is a deployment decision.

**Qualification:** Illustrative AI Agent UI. These are not real tool calls or measured model results. Source evidence and human review remain necessary.

**Technical context:** The conversation is scripted and runs locally in this presentation. The user sees teaching outputs; no model, index, or endpoint is contacted.

**Evidence:** [Agent Builder tools](https://www.elastic.co/docs/explore-analyze/ai-features/agent-builder/tools/builtin-tools-reference) · [Elastic AI Agent](https://www.elastic.co/docs/explore-analyze/ai-features/agent-builder/builtin-agents-reference)

## 27. Choose the model. Verify the boundary.

**Chapter:** 04 / Extend analyst expertise · **Pacing:** 55 seconds

**Open:** A deployment diagram should make the model boundary visible.

**Explain:** Choose an endpoint and a model that actually supports the required tool behavior. Review the payload and operational controls feature by feature. Agent Builder is a different experience from AI Assistant; knowledge-base, anonymization, and audit behavior cannot be assumed identical. Confirm the customer’s policy before connecting sensitive evidence.

**Ask:** Must all model processing remain inside your network, or can an approved provider receive selected evidence?

**Transition:** AI can assist reasoning while deterministic workflows handle defined steps.

**Qualification:** Enterprise on self-managed; feature-specific model and network requirements apply. Do not assume AI Assistant anonymization or audit controls transfer to Agent Builder.

**Technical context:** Locally hosted OpenAI-compatible models can be configured for Agent Builder. Local deployment is not a blanket claim that every AI feature or dependency operates without external connectivity.

**Evidence:** [Model configuration](https://www.elastic.co/docs/explore-analyze/ai-features/agent-builder/models) · [AI Agent and Assistant differences](https://www.elastic.co/docs/explore-analyze/ai-features/ai-chat-experiences/ai-agent-or-ai-assistant/)

## 28. Turn the finding into a repeatable process.

**Chapter:** 05 / Act with control · **Pacing:** 50 seconds

**Open:** A repeatable runbook should be understandable before it executes.

**Explain:** Elastic Workflows provides native automation with defined steps. Establish input scope, permissions, success checks, and a failure branch. For the GA baseline here, the incident owner approves before an authorized manual run. Native waitForApproval is separately labeled Preview 9.5+.

**Transition:** Make that authorization visible in the response.

**Qualification:** Workflows GA in Stack 9.4+ with Enterprise and privileges. Individual steps can have different status; native waitForApproval is Preview 9.5+.

**Technical context:** The teaching runbook gathers the incident context, prepares a case, requests authorization, performs defined actions, and records results. It does not let a model improvise response authority.

**Evidence:** [Agent Builder and Workflows](https://www.elastic.co/docs/explore-analyze/ai-features/agent-builder/agents-and-workflows) · [Manual workflow triggers](https://www.elastic.co/docs/explore-analyze/workflows/triggers/manual-triggers) · [Approval step · Preview 9.5+](https://www.elastic.co/docs/explore-analyze/workflows/steps/wait-for-approval)

## 29. Decide deliberately. Confirm the result.

**Chapter:** 05 / Act with control · **Pacing:** 65 seconds

**Open:** An approval is for a specific action, not for an open-ended response.

**Explain:** The owner accepts the business impact before the run begins. Isolate both WIN-FIN-07 and LNX-DB-03: disabling credentials alone would not end an existing Linux session. Endpoint isolation is native; the account-disable step is a configured directory integration. Review every result. A sent request is not successful containment.

**Automatic animation sequence:**

1. **Evidence verified** — 09:44 · The analyst and account owner confirm unauthorized activity and document the supporting observations.
2. **Containment approved** — 09:52 · The incident owner approves isolation of WIN-FIN-07 and LNX-DB-03 plus the account action. Nothing has executed yet.
3. **Authorized run** — The authorized responder starts the runbook: native isolation of both affected endpoints plus a separate directory-account integration.
4. **Results confirmed** — 09:54 · The synthetic actions return success. Record the result in SEC-042; successful data transfer remains unverified.

**Transition:** Control also includes where the platform is operated.

**Qualification:** Synthetic response results. Endpoint actions need supported platforms and entitlement. GA pattern: approval before manual run; native approval step is Preview 9.5+.

**Technical context:** At 09:54 the scripted isolation and configured account action return success. This contains the observed chain; transfer impact and wider scope still require investigation.

**Evidence:** [Respond and contain](https://www.elastic.co/docs/solutions/security/respond-and-contain) · [Manual workflow triggers](https://www.elastic.co/docs/explore-analyze/workflows/triggers/manual-triggers) · [Approval step · Preview 9.5+](https://www.elastic.co/docs/explore-analyze/workflows/steps/wait-for-approval)

## 30. Operate where your requirements lead.

**Chapter:** 05 / Act with control · **Pacing:** 45 seconds

**Open:** The right deployment is the one the organization can operate and govern.

**Explain:** For this audience, self-managed is the principal example. ECE and ECK provide orchestration choices; Hosted and Serverless are managed alternatives. Avoid asserting feature parity. Check the selected version, subscription, platform support, network dependencies, and model setup against the customer’s requirements.

**Transition:** Then make the cost drivers as visible as the deployment choices.

**Qualification:** Features, subscriptions, networking, and operational responsibilities vary. EASE is a Serverless project type, not an on-premises installable capability.

**Technical context:** Deployment choice assigns responsibility for capacity, resilience, upgrades, certificates, integration dependencies, and model endpoints. Treat those as design decisions, not a logo selection.

**Evidence:** [Deployment options](https://www.elastic.co/docs/get-started/deployment-options) · [Model configuration](https://www.elastic.co/docs/explore-analyze/ai-features/agent-builder/models)

## 31. Design the coverage. Understand the cost.

**Chapter:** 05 / Act with control · **Pacing:** 55 seconds

**Open:** Better economics begins with an explicit workload and coverage requirement.

**Explain:** No per-endpoint license fee is a meaningful distinction, but it does not make endpoint telemetry or the platform free. Estimate resources for the required data, retention, and investigation concurrency. Searchable snapshots can help with older read-only data; repository retrieval cost and performance still matter.

**Transition:** Customer results show what is possible in their specific environments.

**Qualification:** No universal savings claim. Searchable snapshots require Enterprise; retrieval costs and performance vary. Endpoint feature entitlement and telemetry costs remain relevant.

**Technical context:** For an on-premises estimate, include subscription, hardware or infrastructure, storage repositories, resiliency, operations, and any external model costs. Test retrieval performance with representative investigations.

**Evidence:** [Searchable snapshots](https://www.elastic.co/docs/deploy-manage/tools/snapshot-and-restore/searchable-snapshots/) · [Elastic endpoint security](https://www.elastic.co/security/endpoint-security/)

## 32. Customer outcomes. Their evidence.

**Chapter:** 06 / Prove and close · **Pacing:** 45 seconds

**Open:** Use proof precisely, with the customer and the context attached.

**Explain:** UOL reports 80% faster incident resolution. Proficio reports a 34% reduction in investigation time with AI Assistant summaries and remediation guidance. Those are their outcomes, not universal promises or a measured result from this presentation. Agree a baseline and evaluate the customer’s own incidents.

**Transition:** Return to the incident and the operating model it illustrates.

**Qualification:** Customer-reported outcomes, not guarantees, comparative benchmarks, or a prediction for your deployment.

**Technical context:** These results come from different customers and environments. Proficio’s cited result concerns AI Assistant; it is not a benchmark for this illustrative AI Agent experience.

**Evidence:** [UOL customer-reported results](https://www.elastic.co/customers/uol) · [Proficio customer-reported results](https://www.elastic.co/customers/proficio)

## 33. Contain the incident. Keep learning.

**Chapter:** 06 / Prove and close · **Pacing:** 45 seconds

**Open:** Containment is a milestone, not the end of the investigation.

**Explain:** At 09:54 the scripted actions succeed. We have a documented chain and approved containment, but the transfer question and wider scope remain open. The next operating step is to investigate those gaps, verify recovery, and improve collection and detection based on what the team learned.

**Transition:** Close with the evaluation we can actually prove.

**Qualification:** Fictional outcome and timestamps. This demonstrates a workflow, not a response-time benchmark or a closed-impact claim.

**Technical context:** SEC-042 retains the chronology, supporting events, account-owner confirmation, containment approval, and synthetic action results. Continue scope and impact investigation after containment.

**Evidence:** [Respond and contain](https://www.elastic.co/docs/solutions/security/respond-and-contain) · [Detection rule concepts](https://www.elastic.co/docs/solutions/security/detect-and-alert/detection-rule-concepts)

## 34. One attack path. A measurable evaluation.

**Chapter:** 06 / Prove and close · **Pacing:** 45 seconds

**Open:** The next step should be narrow enough to prove and important enough to matter.

**Explain:** Select one attack path and the data needed to investigate it. Establish a baseline, choose the model boundary, and name the response owner. Evaluate true positives and legitimate administration. The outcome is confidence in your evidence, your decisions, and your control over the response.

**Ask:** Choose the first scenario: service-account misuse, lateral movement, or suspicious data access.

**Transition:** An attacker crosses boundaries. Your investigation should too.

**Qualification:** Evaluation recommendations are a proposed operating approach. Confirm feature support and policy in the selected customer environment.

**Technical context:** Agree the data sources, deployment and entitlement, model boundary, response owner, representative scenarios, and acceptance criteria before the evaluation begins.

**Evidence:** [Elastic Security](https://www.elastic.co/security) · [Deployment options](https://www.elastic.co/docs/get-started/deployment-options)

