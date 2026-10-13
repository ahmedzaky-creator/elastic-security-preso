import type { Notes, Scene, Source, Takeaway } from "./types";
import { incident as i } from "./incident";

const t = (label: string, value: string, detail: string): Takeaway => ({
  label,
  value,
  detail,
});
const n = (
  opening: string,
  body: string,
  transition: string,
  seconds: number,
  prompt?: string,
): Notes => ({
  opening,
  body,
  transition,
  seconds,
  ...(prompt ? { prompt } : {}),
});
const source = (label: string, url: string): Source => ({ label, url });
const S = {
  overview: source("Elastic Security", "https://www.elastic.co/security"),
  ingest: source(
    "Security data ingestion",
    "https://www.elastic.co/docs/solutions/security/get-started/ingest-data-to-elastic-security",
  ),
  ecs: source(
    "Elastic Common Schema",
    "https://www.elastic.co/docs/reference/ecs/ecs-getting-started",
  ),
  rules: source(
    "Choose a detection rule type",
    "https://www.elastic.co/docs/solutions/security/detect-and-alert/about-detection-rules",
  ),
  ruleConcepts: source(
    "Detection rule concepts",
    "https://www.elastic.co/docs/solutions/security/detect-and-alert/detection-rule-concepts",
  ),
  publicRules: source(
    "Public detection rules · ELv2",
    "https://github.com/elastic/detection-rules",
  ),
  ml: source(
    "Machine learning rules",
    "https://www.elastic.co/docs/solutions/security/detect-and-alert/machine-learning",
  ),
  endpoint: source(
    "Elastic endpoint security",
    "https://www.elastic.co/security/endpoint-security/",
  ),
  risk: source(
    "Entity risk scoring",
    "https://www.elastic.co/docs/solutions/security/advanced-entity-analytics/entity-risk-scoring",
  ),
  alerts: source(
    "Manage detection alerts",
    "https://www.elastic.co/docs/solutions/security/detect-and-alert/manage-detection-alerts",
  ),
  discovery: source(
    "Attack Discovery",
    "https://www.elastic.co/docs/solutions/security/ai/attack-discovery",
  ),
  triage: source(
    "Triage discovery findings",
    "https://www.elastic.co/docs/solutions/security/ai/attack-discovery/triage-attack-discovery-findings",
  ),
  timeline: source(
    "Timeline",
    "https://www.elastic.co/docs/solutions/security/investigate/timeline",
  ),
  analyzer: source(
    "Visual event analyzer",
    "https://www.elastic.co/docs/solutions/security/investigate/visual-event-analyzer",
  ),
  session: source(
    "Session View",
    "https://www.elastic.co/docs/solutions/security/investigate/session-view",
  ),
  osquery: source(
    "Osquery investigation",
    "https://www.elastic.co/guide/en/security/current/use-osquery.html",
  ),
  migrate: source(
    "Automatic migration",
    "https://www.elastic.co/docs/solutions/security/get-started/automatic-migration",
  ),
  agent: source(
    "Elastic Agent Builder",
    "https://www.elastic.co/docs/explore-analyze/ai-features/elastic-agent-builder",
  ),
  builtInAgent: source(
    "Elastic AI Agent",
    "https://www.elastic.co/docs/explore-analyze/ai-features/agent-builder/builtin-agents-reference",
  ),
  tools: source(
    "Agent Builder tools",
    "https://www.elastic.co/docs/explore-analyze/ai-features/agent-builder/tools/builtin-tools-reference",
  ),
  models: source(
    "Model configuration",
    "https://www.elastic.co/docs/explore-analyze/ai-features/agent-builder/models",
  ),
  comparison: source(
    "AI Agent and Assistant differences",
    "https://www.elastic.co/docs/explore-analyze/ai-features/ai-chat-experiences/ai-agent-or-ai-assistant/",
  ),
  workflows: source(
    "Agent Builder and Workflows",
    "https://www.elastic.co/docs/explore-analyze/ai-features/agent-builder/agents-and-workflows",
  ),
  manual: source(
    "Manual workflow triggers",
    "https://www.elastic.co/docs/explore-analyze/workflows/triggers/manual-triggers",
  ),
  approval: source(
    "Approval step · Preview 9.5+",
    "https://www.elastic.co/docs/explore-analyze/workflows/steps/wait-for-approval",
  ),
  respond: source(
    "Respond and contain",
    "https://www.elastic.co/docs/solutions/security/respond-and-contain",
  ),
  deploy: source(
    "Deployment options",
    "https://www.elastic.co/docs/get-started/deployment-options",
  ),
  snapshots: source(
    "Searchable snapshots",
    "https://www.elastic.co/docs/deploy-manage/tools/snapshot-and-restore/searchable-snapshots/",
  ),
  uol: source(
    "UOL customer-reported results",
    "https://www.elastic.co/customers/uol",
  ),
  proficio: source(
    "Proficio customer-reported results",
    "https://www.elastic.co/customers/proficio",
  ),
};

export const scenes: Scene[] = [
  {
    id: "hero",
    chapter: "01 / Philosophy",
    eyebrow: "ELASTIC SECURITY",
    headline: "Elastic Security.",
    emphasis: "Coordinated defense.",
    lead: "An attacker crosses boundaries. Your investigation should too. Connect the evidence, understand the attack, and act with control.",
    visual: "hero",
    layout: "hero",
    illustrative: true,
    takeaways: [
      t(
        "See",
        "The whole attack",
        "Connect identity, endpoint, network, and application evidence.",
      ),
      t(
        "Understand",
        "What matters",
        "Make a testable attack hypothesis, then inspect the underlying events.",
      ),
      t("Act", "With control", "Authorize the response and verify the result."),
    ],
    densityExtra:
      "One fictional incident follows a compromised service account across Windows and Linux. The presentation demonstrates an operating philosophy, not a live investigation.",
    qualification:
      "Synthetic incident and illustrative UI. Capability availability depends on deployment, subscription, version, and configuration. Sources checked October 13, 2026.",
    sources: [S.overview],
    notes: n(
      "An attacker does not respect our product boundaries, our teams, or our data silos.",
      "Today we follow one fictional incident from identity misuse to containment. Elastic brings searchable evidence, layered detection, investigation, and controlled response into one working context. Keep the emphasis on the analyst making a better decision.",
      "Before the technology, let us agree on what this story needs to prove.",
      40,
    ),
  },
  {
    id: "promise",
    chapter: "01 / Philosophy",
    eyebrow: "THE PROMISE",
    headline: "One incident.",
    emphasis: "Three decisions.",
    lead: "Can we see the chain, verify its meaning, and contain it without losing authority over our systems?",
    visual: "promise",
    layout: "split",
    illustrative: true,
    takeaways: [
      t(
        "Scope",
        "Connect the evidence",
        "Follow " +
          i.user +
          " from directory authentication to Windows and Linux activity.",
      ),
      t(
        "Confidence",
        "Separate facts from hypotheses",
        "Treat the outbound connection as suspected transfer until evidence establishes impact.",
      ),
      t(
        "Authority",
        "Approve before response",
        "Make host isolation and the account action explicit, reviewable decisions.",
      ),
    ],
    densityExtra:
      "All timestamps, entities, counts, commands, and response results in the walkthrough are fabricated for teaching. The site sends no queries or security actions.",
    qualification:
      "Illustrative sequence; it is not a product benchmark or a claim about response time.",
    sources: [S.respond],
    notes: n(
      "Three questions define the quality of the response.",
      "The fictional account is svc-backup. The Windows endpoint is WIN-FIN-07; the Linux server is LNX-DB-03. The evidence is deliberately incomplete: a suspicious outbound connection does not establish that data was stolen. That distinction will remain visible throughout.",
      "The foundation is the ability to ask these questions of our evidence.",
      40,
      "Which decision takes the longest in your SOC today: scope, confidence, or authority?",
    ),
  },
  {
    id: "platform",
    chapter: "01 / Philosophy",
    eyebrow: "THE ELASTIC FOUNDATION",
    headline: "Security starts with",
    emphasis: "searchable evidence.",
    lead: "Elasticsearch makes operational evidence retrievable. Security adds the detection, investigation, and response context that turns retrieval into a decision.",
    visual: "platform",
    layout: "split",
    takeaways: [
      t(
        "Foundation",
        "Search and analytics",
        "Use shared indexed evidence to explore activity across different systems.",
      ),
      t(
        "Security",
        "Purpose-built workflows",
        "Apply rules, entity context, forensic views, and case management.",
      ),
      t(
        "AI",
        "Context before conclusions",
        "Retrieve relevant evidence before asking a model to interpret it.",
      ),
    ],
    densityExtra:
      "The platform matters because a new investigation can ask a new question of existing evidence. Data quality, mappings, privileges, and retention still determine what can be answered.",
    qualification:
      "The shared foundation does not imply identical features or entitlements across deployment types.",
    sources: [S.overview, S.agent],
    notes: n(
      "The durable asset is the evidence, not just the alert that happened to fire.",
      "Elasticsearch provides the search and analytics foundation. Elastic Security places security-specific methods on that foundation. This becomes especially useful when the investigation changes direction: we can return to the underlying data instead of being limited to a summary.",
      "What happens when that evidence stays separated?",
      45,
    ),
  },
  {
    id: "fragmented",
    chapter: "01 / Philosophy",
    eyebrow: "THE PROBLEM",
    headline: "The signals exist.",
    emphasis: "The story is missing.",
    lead: "A valid login, a suspicious process, and an outbound connection can look unrelated when each lives in a different queue.",
    visual: "fragmented",
    layout: "split",
    illustrative: true,
    takeaways: [
      t(
        "Identity",
        "Credentials look legitimate",
        "The directory knows who authenticated; it does not explain the later process chain.",
      ),
      t(
        "Endpoint",
        "A process looks suspicious",
        "The Windows event becomes more useful when connected to identity and destination activity.",
      ),
      t(
        "Network",
        "A connection needs context",
        "Timing and host context decide whether an outbound session warrants investigation.",
      ),
    ],
    densityExtra:
      "Our teaching incident spans AD-DC-01, WIN-FIN-07, and LNX-DB-03. Joining the evidence changes the question from “which alert?” to “what happened across these systems?”",
    qualification:
      "Synthetic example. Correlation depends on collected data and reliable identity, host, and time fields.",
    sources: [S.ecs],
    notes: n(
      "Every individual system can be telling the truth while the SOC still lacks the story.",
      "At 09:12 we see authentication. At 09:17 there is PowerShell. At 09:24 there is Linux access. None alone proves the full incident. The analyst needs relationships and source events, including evidence that contradicts the initial hypothesis.",
      "That is the problem our three pillars address.",
      45,
    ),
  },
  {
    id: "pillars",
    chapter: "01 / Philosophy",
    eyebrow: "OUR SECURITY PHILOSOPHY",
    headline: "See. Understand.",
    emphasis: "Act with control.",
    lead: "Connect the evidence, test the hypothesis, and execute an authorized response. Each step should strengthen the next.",
    visual: "pillars",
    layout: "hero",
    takeaways: [
      t(
        "See",
        "The whole attack",
        "Broaden visibility and connect the sequence across sources.",
      ),
      t(
        "Understand",
        "What matters",
        "Prioritize with context, then verify against the evidence.",
      ),
      t(
        "Act",
        "With control",
        "Use explicit permissions, ownership, and recorded outcomes.",
      ),
    ],
    densityExtra:
      "These are editorial pillars for this presentation. They connect Elastic capabilities to the decisions a SOC must make, rather than listing features in isolation.",
    qualification:
      "Editorial framework, not official product or subscription names.",
    sources: [S.overview],
    notes: n(
      "This is the organizing principle for the rest of the conversation.",
      "Seeing is about connected evidence. Understanding is about an explanation you can test. Acting is about the authority and operational discipline to change a system safely. AI supports this chain; it does not remove the need for verification.",
      "Start with what the SOC can see inside an on-premises estate.",
      35,
    ),
  },
  {
    id: "sources",
    chapter: "02 / See the whole attack",
    eyebrow: "VISIBILITY",
    headline: "Your environment.",
    emphasis: "One evidence fabric.",
    lead: "Collect the identity, host, network, and application signals that explain how an attacker moves through your estate.",
    visual: "sources",
    layout: "split",
    illustrative: true,
    takeaways: [
      t(
        "Collect",
        "Use suitable integrations",
        "Elastic Agent, Beats, Logstash, and third-party collectors can supply security evidence.",
      ),
      t(
        "Preserve",
        "Keep source meaning",
        "Retain the fields needed to explain authentication, execution, and communication.",
      ),
      t(
        "Prioritize",
        "Start with the attack path",
        "Bring directory, Windows, Linux, and network evidence into the first evaluation.",
      ),
    ],
    densityExtra:
      "In the example, directory authentication, endpoint processes, Linux sessions, and network logs supply different parts of the chain. Collection and parsing health are operational requirements.",
    qualification:
      "Integration support and field coverage vary. Custom collectors need ECS mappings and configured Security index patterns.",
    sources: [S.ingest],
    notes: n(
      "On-premises does not mean one kind of system or one kind of data.",
      "Map collection to the attack path. Our example needs directory events, Windows processes, Linux sessions, and outbound network context. Select the appropriate integration for each source, then verify the events and required fields actually arrive. An installed integration alone is not proof of visibility.",
      "Those events become more useful when they share a language.",
      45,
    ),
  },
  {
    id: "pipeline",
    chapter: "02 / See the whole attack",
    eyebrow: "NORMALIZE + ENRICH",
    headline: "Different sources.",
    emphasis: "Shared meaning.",
    lead: "Elastic Common Schema gives identity, host, process, and network fields a consistent shape, so evidence can be searched together.",
    visual: "pipeline",
    layout: "split",
    illustrative: true,
    takeaways: [
      t(
        "Normalize",
        "Use consistent field names",
        "Map source-specific identities and timestamps into dependable ECS fields.",
      ),
      t(
        "Enrich",
        "Add relevant context",
        "Include asset importance or threat intelligence where it helps a decision.",
      ),
      t(
        "Validate",
        "Check joins and time",
        "A shared field name still needs accurate values, parsing, and clock discipline.",
      ),
    ],
    densityExtra:
      "A collector may call the account AccountName, user, or principal. Normalization makes user.name searchable across the example while preserving useful original source context.",
    qualification:
      "Custom mappings and enrichments require configuration. ECS does not guarantee complete or accurate source data.",
    sources: [S.ecs, S.ingest],
    notes: n(
      "A common schema is an investigation advantage.",
      "We do not want the analyst to translate every vendor field during an incident. Normalize the identity, host, time, and event category. Validate that svc-backup means the same account across sources, and distinguish host IDs when names can collide.",
      "A shared language also lets us revisit history.",
      45,
    ),
  },
  {
    id: "history",
    chapter: "02 / See the whole attack",
    eyebrow: "SEARCHABLE HISTORY",
    headline: "New intelligence.",
    emphasis: "Existing evidence.",
    lead: "When the investigation changes, search earlier evidence for the first appearance, related hosts, and behavior that the original alert did not explain.",
    visual: "history",
    layout: "split",
    illustrative: true,
    takeaways: [
      t(
        "Look back",
        "Find the first appearance",
        "Ask whether svc-backup used the same workstation or destination before this incident.",
      ),
      t(
        "Revisit",
        "Test a new hypothesis",
        "Search retained evidence using newly identified fields or indicators.",
      ),
      t(
        "Retain",
        "Match history to purpose",
        "Choose lifecycle tiers and retention around investigation and access requirements.",
      ),
    ],
    densityExtra:
      "Searchable snapshots can support queries over retained read-only evidence. Storage design should reflect repository reliability, retrieval costs, performance needs, and recovery requirements.",
    qualification:
      "Searchable snapshots require Enterprise. Historical answers depend on retained telemetry and tier access; this is not an unlimited retention promise.",
    sources: [S.snapshots],
    notes: n(
      "The most useful question may be one we did not know to ask yesterday.",
      "After finding the destination, search earlier data for similar activity. After confirming unauthorized use, identify the earliest reliable evidence. Design retention with the access pattern in mind: older read-only data and active investigations have different performance needs.",
      "Now apply complementary ways to detect the chain.",
      45,
    ),
  },
  {
    id: "layers",
    chapter: "02 / See the whole attack",
    eyebrow: "DETECTION",
    headline: "One attack.",
    emphasis: "Multiple ways to see it.",
    lead: "Combine known patterns, behavioral deviations, sequence correlation, and endpoint protection. Each method catches a different kind of signal.",
    visual: "layers",
    layout: "split",
    illustrative: true,
    takeaways: [
      t(
        "Known behavior",
        "Rules explain the match",
        "Use query, threshold, indicator, and new-terms logic for explicit conditions.",
      ),
      t(
        "Deviation",
        "ML adds another lens",
        "Surface unusual behavior that is hard to express as a fixed query.",
      ),
      t(
        "Sequence",
        "Connect activity over time",
        "Use event correlation where a shared entity and ordered activity matter.",
      ),
    ],
    densityExtra:
      "Detection methods complement one another. A low-level signal can matter when combined with stronger evidence; a high score alone does not establish compromise.",
    qualification:
      "Rule prerequisites, data requirements, and subscriptions differ. Enable and tune methods against your collected data.",
    sources: [S.rules, S.endpoint],
    notes: n(
      "A layered approach gives us different reasons to investigate.",
      "Explicit rules are useful for identifiable behaviors. Anomaly detection can expose a departure from normal patterns. Correlation explains ordered activity, and endpoint protection can intervene on supported hosts. Treat their outputs as evidence inputs with distinct strengths and limitations.",
      "Start with detection logic the team can inspect.",
      45,
    ),
  },
  {
    id: "rules",
    chapter: "02 / See the whole attack",
    eyebrow: "TRANSPARENT DETECTION CONTENT",
    headline: "Inspect the logic.",
    emphasis: "Own the decision.",
    lead: "Public detection content lets your team review conditions, required telemetry, ATT&CK mappings, and investigation guidance before deploying a rule.",
    visual: "rules",
    layout: "split",
    illustrative: true,
    takeaways: [
      t(
        "Inspect",
        "Read the detection logic",
        "Understand why a behavior matches and what evidence the rule requires.",
      ),
      t(
        "Tune",
        "Account for your environment",
        "Test expected administration, create justified exceptions, and measure missed detections.",
      ),
      t(
        "Operate",
        "Track coverage and changes",
        "Review rule revisions and ATT&CK context alongside actual data coverage.",
      ),
    ],
    densityExtra:
      "The public elastic/detection-rules repository includes rule-development and validation tooling. Public visibility helps review; ATT&CK mappings do not prove complete technique coverage.",
    qualification:
      "Public detection repository content is licensed under Elastic License v2. The illustrative rule shown here is teaching content, not a shipped rule.",
    sources: [S.publicRules, S.ruleConcepts],
    notes: n(
      "The useful question is not how many rules exist. It is which behavior we can reliably detect.",
      "Review the conditions, source fields, schedule, exceptions, and investigation guidance. Public development gives the team a place to inspect and discuss detection content. Validate released rules against your telemetry; the repository can contain content that is not yet released.",
      "Known patterns are only one part of detection.",
      45,
    ),
  },
  {
    id: "anomaly",
    chapter: "02 / See the whole attack",
    eyebrow: "BEHAVIORAL MACHINE LEARNING",
    headline: "Known rules.",
    emphasis: "Unfamiliar behavior.",
    lead: "Behavioral anomaly detection adds context when a service account behaves differently from its observed patterns.",
    visual: "anomaly",
    layout: "split",
    illustrative: true,
    takeaways: [
      t(
        "Baseline",
        "Model observed behavior",
        "Use suitable anomaly jobs and consistent source data to establish context.",
      ),
      t(
        "Surface",
        "Investigate a deviation",
        "A rare access pattern can bring svc-backup into focus.",
      ),
      t(
        "Verify",
        "Anomaly is not guilt",
        "Check maintenance, role changes, and other legitimate explanations before escalating.",
      ),
    ],
    densityExtra:
      "The chart is synthetic. Our account appears outside its usual pattern; source events and change records decide whether that deviation is an attack.",
    qualification:
      "ML rules require configured anomaly jobs, suitable data, and the appropriate entitlement. A model score is not a probability of compromise.",
    sources: [S.ml],
    notes: n(
      "Anomaly detection asks what is unusual, not whether a user is guilty.",
      "A service identity accessing an unfamiliar system can be worth a look. But a new backup rollout can also change behavior. Use the anomaly as a reason to retrieve evidence and ask about the operational change, then combine it with process and network observations.",
      "The endpoint provides the execution evidence.",
      45,
    ),
  },
  {
    id: "endpoint",
    chapter: "02 / See the whole attack",
    eyebrow: "ELASTIC DEFEND",
    headline: "Protect the host.",
    emphasis: "Keep the context.",
    lead: "Native endpoint protection combines prevention, telemetry, investigation, and supported response actions within Elastic Security.",
    visual: "endpoint",
    layout: "split",
    illustrative: true,
    takeaways: [
      t(
        "Prevent",
        "Apply endpoint protection",
        "Use supported protections and policy settings to stop malicious behaviors.",
      ),
      t(
        "Observe",
        "Capture execution context",
        "Process, file, and network events help explain activity on the affected host.",
      ),
      t(
        "Respond",
        "Act on supported endpoints",
        "Isolation and other response actions require privileges, platform support, and suitable entitlement.",
      ),
    ],
    densityExtra:
      "WIN-FIN-07 records the process evidence in our incident. You can also ingest third-party endpoint evidence; availability and response capabilities depend on the integration.",
    qualification:
      "OS, policy, version, and subscription determine capabilities. No per-endpoint fee does not eliminate telemetry, infrastructure, or retention costs.",
    sources: [S.endpoint, S.ingest],
    notes: n(
      "Prevention and investigation need the same execution context.",
      "Elastic Defend offers native protection and endpoint telemetry. In this story, the Windows process tells us what followed authentication. Present supported response actions separately from broader directory or firewall integrations. Evaluate the operating systems and policies the customer actually uses.",
      "Combine host evidence with the rest of the estate.",
      45,
    ),
  },
  {
    id: "correlation",
    chapter: "02 / See the whole attack",
    eyebrow: "CROSS-SOURCE CORRELATION",
    headline: "Connect the events.",
    emphasis: "Expose the sequence.",
    lead: "Identity, execution, and network observations become more informative when connected by account, host, and time.",
    visual: "correlation",
    layout: "split",
    illustrative: true,
    takeaways: [
      t(
        "Identity",
        "Start with svc-backup",
        "Link observed account use across the directory and endpoint evidence.",
      ),
      t(
        "Sequence",
        "Follow the shared fields",
        "Connect the Windows process to the later Linux access.",
      ),
      t(
        "Evidence",
        "Keep the source events",
        "Preserve the individual observations that support or challenge the relationship.",
      ),
    ],
    densityExtra:
      "Event correlation rules can express ordered behavior using EQL. Cross-source joins need dependable fields; a shared account name alone may be ambiguous.",
    qualification:
      "Synthetic chain. Correlation is configured detection or analyst logic, not proof of causality.",
    sources: [S.rules, S.timeline],
    notes: n(
      "A relationship creates a better question; it does not automatically create a verdict.",
      "At 09:12 the account authenticates. At 09:17 the Windows host launches suspicious PowerShell. At 09:24 a Linux session begins from the Windows origin. Matching identity and time help build the chain, while source details distinguish coincidence from meaningful activity.",
      "Walk through how those signals become an investigation.",
      45,
    ),
  },
  {
    id: "detection-demo",
    chapter: "02 / See the whole attack",
    eyebrow: "ILLUSTRATIVE WALKTHROUGH",
    headline: "From a login",
    emphasis: "to an attack hypothesis.",
    lead: "Step through the same synthetic incident. Each observation adds context; the analyst decides what the evidence establishes.",
    visual: "detection-demo",
    layout: "wide",
    illustrative: true,
    takeaways: [
      t(
        "Observe",
        "Follow the sequence",
        "Directory, Windows, Linux, and network evidence tell different parts of the story.",
      ),
      t(
        "Correlate",
        "Test the relationships",
        "Use account, host, source address, and timestamps to connect relevant events.",
      ),
      t(
        "Qualify",
        "Keep uncertainty visible",
        "Archive creation and an outbound session raise concern; they do not establish successful theft.",
      ),
    ],
    densityExtra:
      "The walkthrough is a scripted explanation. Rule names, counts, and result states are synthetic; no production rule or backend is executed.",
    qualification:
      "Illustrative UI and data. The evidence supports suspected compromise and suspected transfer, with impact still to be verified.",
    sources: [S.ruleConcepts, S.respond],
    steps: [
      {
        label: "09:12 · Identity",
        detail:
          "svc-backup authenticates from an unfamiliar workstation. This is an observation, not a compromise verdict.",
      },
      {
        label: "09:17 · Execution",
        detail:
          "WIN-FIN-07 records encoded PowerShell outside the expected backup job. Review the process and owner context.",
      },
      {
        label: "09:24 · Movement",
        detail:
          "Authentication and process events link the Windows origin to a session on LNX-DB-03.",
      },
      {
        label: "09:31–09:36 · Impact question",
        detail:
          "An archive is staged, then an outbound connection appears. Successful data transfer remains unverified.",
      },
      {
        label: "Investigation ready",
        detail:
          "The related observations form a testable hypothesis. Preserve the source events and assign an analyst to verify it.",
      },
    ],
    notes: n(
      "Let the evidence change the hypothesis one step at a time.",
      "Advance through the builds. First show the valid-looking identity event, then execution, then movement. Finish with archive staging and the outbound connection. Do not call this confirmed exfiltration. The useful output is an investigation with specific entities, a time window, and evidence to examine.",
      "We also need to know which entities matter most.",
      60,
    ),
  },
  {
    id: "entities",
    chapter: "02 / See the whole attack",
    eyebrow: "ENTITY CONTEXT",
    headline: "An alert has severity.",
    emphasis: "An entity has history.",
    lead: "Host and account risk, asset importance, and related observations help the analyst choose where to focus.",
    visual: "entities",
    layout: "split",
    illustrative: true,
    takeaways: [
      t(
        "Who",
        "Review the account context",
        "Understand the expected role and observed risk of svc-backup.",
      ),
      t(
        "Where",
        "Consider asset importance",
        "LNX-DB-03 matters because of its business role, not only its latest alert.",
      ),
      t(
        "Why now",
        "Inspect contributing signals",
        "Review the evidence behind prioritization instead of treating a risk label as a verdict.",
      ),
    ],
    densityExtra:
      "Entity risk scoring combines configured inputs to prioritize hosts, users, and services. The example does not represent an actual calculated score.",
    qualification:
      "Requires the appropriate feature entitlement, entity coverage, and configuration. Risk is a prioritization aid, not a probability of compromise.",
    sources: [S.risk],
    notes: n(
      "A medium-severity alert on a critical system can deserve immediate attention.",
      "Add the business role of the Linux server and the privileges of the service account to the observed behavior. Explain the contributing alerts rather than presenting a mysterious score. Risk and criticality help order work; source evidence still establishes the incident.",
      "Without that context, the analyst is left with the queue.",
      45,
    ),
  },
  {
    id: "alerts",
    chapter: "03 / Understand what matters",
    eyebrow: "THE ANALYST BOTTLENECK",
    headline: "More alerts",
    emphasis: "are not more understanding.",
    lead: "The queue describes individual detections. The analyst needs to decide whether they form one incident, unrelated activity, or a false positive.",
    visual: "alerts",
    layout: "split",
    illustrative: true,
    takeaways: [
      t(
        "Group",
        "Find related work",
        "Account, host, time, and detection context help avoid investigating the same chain repeatedly.",
      ),
      t(
        "Prioritize",
        "Choose the next question",
        "Focus on the likely scope and business impact, not only the latest row.",
      ),
      t(
        "Verify",
        "Keep the evidence accessible",
        "A summary should lead back to the observations it describes.",
      ),
    ],
    densityExtra:
      "The alert grid is synthetic. More aggressive filtering can also hide relevant evidence; tune prioritization with attention to missed attacks as well as noise.",
    qualification:
      "Illustrative alert counts are not a product benchmark. Alert quality depends on rule tuning, telemetry, and collection health.",
    sources: [S.alerts],
    notes: n(
      "The alert queue is a starting point, not the unit of understanding.",
      "The fictional incident produces different signals across several sources. Repeatedly opening each alert can fragment the analyst’s attention. The task is to group related evidence while retaining the ability to challenge the grouping.",
      "Attack Discovery provides an attack hypothesis to review.",
      40,
    ),
  },
  {
    id: "discovery",
    chapter: "03 / Understand what matters",
    eyebrow: "ATTACK DISCOVERY",
    headline: "Related alerts.",
    emphasis: "A potential attack.",
    lead: "Attack Discovery uses an LLM to find relationships among selected alerts and present an attack narrative for analyst review.",
    visual: "discovery",
    layout: "hero",
    illustrative: true,
    takeaways: [
      t(
        "Scope",
        "Analyze selected alerts",
        "The filters and time range determine the alert evidence submitted for analysis.",
      ),
      t(
        "Explain",
        "Connect entities and activity",
        "A discovery describes a potential attack and its supporting alert relationships.",
      ),
      t(
        "Review",
        "Verify before escalation",
        "The analyst inspects source evidence and checks alternative explanations.",
      ),
    ],
    densityExtra:
      "Our generated-looking narrative proposes credential misuse followed by cross-host activity. It is an illustrative hypothesis, not a live model result or confirmed attack.",
    qualification:
      "Self-managed example requires Enterprise, appropriate privileges, and a suitable configured LLM. Model limits, alert selection, and connectivity affect results.",
    sources: [S.discovery],
    notes: n(
      "Pause on the word potential.",
      "Attack Discovery uses selected alerts to identify relationships and describe possible attacks. It is not omniscient: the time window, filters, alert content, and model affect the result. In this story it gives the analyst a focused hypothesis and involved entities to examine.",
      "A useful hypothesis shows both evidence and uncertainty.",
      50,
    ),
  },
  {
    id: "hypothesis",
    chapter: "03 / Understand what matters",
    eyebrow: "EVIDENCE-LED TRIAGE",
    headline: "A useful hypothesis",
    emphasis: "can be challenged.",
    lead: "Review what supports the narrative, what contradicts it, and what evidence is still missing before declaring scope or impact.",
    visual: "hypothesis",
    layout: "split",
    illustrative: true,
    takeaways: [
      t(
        "Observed",
        "Execution and movement",
        "Authentication and process events support unauthorized cross-host activity.",
      ),
      t(
        "Unverified",
        "Successful data transfer",
        "The outbound connection follows archive creation; the example does not establish transferred contents.",
      ),
      t(
        "Next question",
        "Ask the account owner",
        "Check the change record and expected service behavior before authorizing containment.",
      ),
    ],
    densityExtra:
      "At 09:44, source-event review and account-owner confirmation establish unauthorized activity in this example. Transfer amount, contents, and wider impact remain open questions.",
    qualification:
      "Synthetic analyst findings. AI narratives and suggested attribution require human verification; do not treat them as established facts.",
    sources: [S.triage],
    notes: n(
      "The strongest investigation is willing to disprove its first explanation.",
      "Ask whether the commands were expected, whether the identity links are reliable, and what the network data actually shows. The owner confirms this was not an approved job. That verifies unauthorized activity, while successful transfer remains unproven. Preserve that distinction in the case.",
      "Now organize the evidence in a shared investigation workspace.",
      50,
    ),
  },
  {
    id: "timeline",
    chapter: "03 / Understand what matters",
    eyebrow: "TIMELINE",
    headline: "Build the chronology.",
    emphasis: "Keep the evidence.",
    lead: "Timeline brings relevant alerts and raw events into an investigation workspace so the team can reconstruct the sequence.",
    visual: "timeline",
    layout: "wide",
    illustrative: true,
    takeaways: [
      t(
        "Collect",
        "Bring events together",
        "Search relevant sources for svc-backup and the involved hosts.",
      ),
      t(
        "Reconstruct",
        "Order the observations",
        "Distinguish authentication, execution, movement, and the later outbound session.",
      ),
      t(
        "Share",
        "Save the investigation",
        "Preserve the query, important events, and notes for the next analyst.",
      ),
    ],
    densityExtra:
      "Timeline can combine alerts and source events from multiple indices. Saved work and a documented hypothesis keep the handoff grounded in evidence.",
    qualification:
      "Illustrative workspace. Index access, mappings, available telemetry, and Timeline privileges determine what appears.",
    sources: [S.timeline],
    notes: n(
      "Chronology is how we test whether the story fits the evidence.",
      "Show the events in order and retain the difference between an alert and its source event. Query across the account and the involved hosts, then save the investigation. A colleague should be able to continue the work without rebuilding the same search from memory.",
      "For execution details, move inside one host.",
      50,
    ),
  },
  {
    id: "process",
    chapter: "03 / Understand what matters",
    eyebrow: "VISUAL EVENT ANALYZER",
    headline: "Follow the process.",
    emphasis: "Find the cause.",
    lead: "The Analyzer shows process relationships around an event, helping the analyst understand what launched it and what followed.",
    visual: "process",
    layout: "wide",
    illustrative: true,
    takeaways: [
      t(
        "Parentage",
        "Trace the execution chain",
        "Inspect parent and child processes on WIN-FIN-07.",
      ),
      t(
        "Context",
        "Open associated events",
        "Review relevant process details and related file, network, or alert observations.",
      ),
      t(
        "Scope",
        "Pivot beyond this host",
        "Use Timeline and other evidence to follow movement to LNX-DB-03.",
      ),
    ],
    densityExtra:
      "The teaching diagram is a single-host process chain. Cross-host movement is established through correlated identity and network evidence, not one native cross-host process tree.",
    qualification:
      "Illustrative Analyzer. Supported integrations and compatible process fields are required; unavailable telemetry cannot be reconstructed.",
    sources: [S.analyzer],
    notes: n(
      "Inside the Windows host, parentage explains the execution.",
      "Follow the process path on WIN-FIN-07. Ask which process launched PowerShell, which user ran it, and which associated events followed. This view is intentionally confined to one host. We use the wider investigation workspace to connect the Linux activity.",
      "Linux sessions give us a different forensic view.",
      50,
    ),
  },
  {
    id: "session",
    chapter: "03 / Understand what matters",
    eyebrow: "SESSION VIEW + OSQUERY",
    headline: "Reconstruct the session.",
    emphasis: "Check the live host.",
    lead: "Session View explains Linux execution history. Osquery can inspect current host state to test what still exists or is running.",
    visual: "session",
    layout: "wide",
    illustrative: true,
    takeaways: [
      t(
        "History",
        "Review the Linux session",
        "Examine the process sequence and identity context on LNX-DB-03.",
      ),
      t(
        "Live state",
        "Ask a precise host question",
        "Use an authorized Osquery query to inspect relevant processes, files, or connections.",
      ),
      t(
        "Time",
        "Keep the views distinct",
        "A live result describes current state; it does not replace historical evidence.",
      ),
    ],
    densityExtra:
      "The example shows archive creation after SSH activity. Terminal output is optional sensitive telemetry; collect it only with the appropriate policy and platform support.",
    qualification:
      "Session View needs Linux Elastic Defend session collection. Terminal output has kernel requirements. Osquery needs its integration, privileges, and reachable agents.",
    sources: [S.session, S.osquery],
    notes: n(
      "History tells us what happened; live interrogation tells us what remains.",
      "Review the Linux session, then ask a focused live question: is the suspicious process running, or does the staged archive still exist? A failed or offline query is not an empty result. Session collection must be enabled before the events occur; do not imply retroactive capture.",
      "The same evidence-first approach works alongside existing tools.",
      55,
    ),
  },
  {
    id: "interop",
    chapter: "04 / Extend analyst expertise",
    eyebrow: "WORK WITH YOUR ESTATE",
    headline: "Keep useful tools.",
    emphasis: "Connect their evidence.",
    lead: "Bring third-party telemetry into the investigation and use configured integrations where they fit your existing operating model.",
    visual: "interop",
    layout: "split",
    takeaways: [
      t(
        "Telemetry",
        "Ingest third-party signals",
        "Normalize supported endpoint, identity, network, and security-tool evidence.",
      ),
      t(
        "Operations",
        "Respect existing ownership",
        "Route cases and response requests through the team’s approved processes.",
      ),
      t(
        "Evaluation",
        "Prove value incrementally",
        "Start with a meaningful data set and an attack path before expanding.",
      ),
    ],
    densityExtra:
      "Interoperability has two separate questions: can useful evidence be ingested, and can an authorized action be executed through a supported or configured integration?",
    qualification:
      "Collection and response support differ by integration. Third-party licenses, API access, connectors, and privileges may be required.",
    sources: [S.ingest, S.respond],
    notes: n(
      "A useful evaluation can begin with the tools and evidence the customer already has.",
      "Separate ingestion from response. We may be able to collect a tool’s alerts without having its response API or permissions. Map the evidence flow and action ownership explicitly, then choose an incremental use case that improves the existing operation.",
      "Migration should follow the same standard of proof.",
      40,
      "Which existing tool or process must remain authoritative during your evaluation?",
    ),
  },
  {
    id: "migration",
    chapter: "04 / Extend analyst expertise",
    eyebrow: "MIGRATE WITH VALIDATION",
    headline: "Translate the content.",
    emphasis: "Validate the behavior.",
    lead: "Use assisted migration for supported SIEM assets, then test telemetry, detection semantics, and operational outcomes before retiring existing coverage.",
    visual: "migration",
    layout: "wide",
    illustrative: true,
    takeaways: [
      t(
        "Translate",
        "Inspect the proposed result",
        "Review supported rule and dashboard translations and unresolved dependencies.",
      ),
      t(
        "Validate",
        "Replay meaningful scenarios",
        "Compare expected detections, missed cases, timing, and false positives.",
      ),
      t(
        "Transition",
        "Move in measured stages",
        "Maintain existing coverage until the replacement behavior is demonstrated.",
      ),
    ],
    densityExtra:
      "Supported migration sources and asset types vary. Query translation alone cannot validate source-field semantics, data coverage, permissions, or detection timing.",
    qualification:
      "Automatic Migration requires Enterprise on Stack, ML enabled, privileges, and a working LLM. Supported source and asset coverage has limitations.",
    sources: [S.migrate],
    steps: [
      {
        label: "Inventory",
        detail:
          "Choose a supported source and identify assets, data requirements, owners, and expected detections.",
      },
      {
        label: "Translate",
        detail:
          "Review the proposed Elastic content. Resolve field mappings and unsupported or incomplete translations.",
      },
      {
        label: "Validate",
        detail:
          "Replay representative events and benign administration. Compare coverage and behavior against explicit acceptance criteria.",
      },
      {
        label: "Transition",
        detail:
          "Promote validated content in stages. Retain existing coverage until the operational owner accepts the replacement.",
      },
    ],
    notes: n(
      "Migration is a validation project, not a copy-and-paste event.",
      "Automatic Migration can assist with supported SIEM content. The test is whether the translated rule detects the intended behavior on your real mapped data. Include negative cases and late-arriving events, and preserve the current system until acceptance criteria pass. Never promise a universal conversion percentage.",
      "Then extend the analyst’s ability to work with that evidence.",
      55,
    ),
  },
  {
    id: "agent",
    chapter: "04 / Extend analyst expertise",
    eyebrow: "ELASTIC AI AGENT",
    headline: "Elastic AI Agent.",
    emphasis: "Grounded in evidence.",
    lead: "Elastic AI Agent uses Agent Builder tools to retrieve context, query Elasticsearch data, and help the analyst explore the next question.",
    visual: "agent",
    layout: "hero",
    illustrative: true,
    takeaways: [
      t(
        "Ask",
        "State the investigation question",
        "Identify the account, time window, and uncertainty you need to resolve.",
      ),
      t(
        "Retrieve",
        "Use tools against your data",
        "Inspect relevant data and query results rather than accepting unsupported prose.",
      ),
      t(
        "Review",
        "Keep analyst responsibility",
        "Validate the output and authorize any operational action separately.",
      ),
    ],
    densityExtra:
      "The agent is a tool-using conversational interface. Its usefulness depends on the available data, assigned tools, permissions, and model quality.",
    qualification:
      "Self-managed example requires Enterprise, supported Stack version, privileges, and a configured model. Agent Builder and AI Assistant have different controls.",
    sources: [S.builtInAgent, S.comparison],
    notes: n(
      "The goal is to make the next useful question easier to ask.",
      "Elastic AI Agent is powered by Agent Builder. It can help explore data and generate ES|QL through available tools. The analyst should inspect the result and the underlying evidence. This is not a promise of flawless answers or an automatic transfer of AI Assistant privacy features.",
      "Show the retrieval path behind the conversation.",
      50,
    ),
  },
  {
    id: "retrieval",
    chapter: "04 / Extend analyst expertise",
    eyebrow: "GROUNDED RETRIEVAL + ES|QL",
    headline: "A question becomes",
    emphasis: "an inspectable query.",
    lead: "Use retrieval tools and ES|QL to locate relevant events, inspect the query and results, and refine the investigation.",
    visual: "retrieval",
    layout: "split",
    illustrative: true,
    takeaways: [
      t(
        "Scope",
        "Select data and time",
        "Name the account, relevant indices, and investigation window.",
      ),
      t(
        "Retrieve",
        "Inspect the query and rows",
        "Tool results expose the observations available to support the answer.",
      ),
      t(
        "Refine",
        "Ask what is still missing",
        "A narrow result set may need a different source, time range, or field mapping.",
      ),
    ],
    densityExtra:
      "Agent Builder includes tools to generate and execute ES|QL. Custom parameterized tools can provide precise retrieval for recurring investigation questions.",
    qualification:
      "Illustrative query and result set. Tools, index privileges, mappings, model behavior, and version determine available retrieval.",
    sources: [
      S.tools,
      source(
        "Custom ES|QL tools",
        "https://www.elastic.co/docs/explore-analyze/ai-features/agent-builder/tools/custom-tools",
      ),
    ],
    notes: n(
      "The answer becomes more useful when its evidence path is visible.",
      "Start with a specific question about svc-backup and the incident window. Inspect the generated query before relying on its result. Verify the selected data, time filter, and field meaning. A technically valid query can still answer the wrong investigation question.",
      "Watch that process in a short investigation dialogue.",
      50,
    ),
  },
  {
    id: "ai-demo",
    chapter: "04 / Extend analyst expertise",
    eyebrow: "ILLUSTRATIVE AI INVESTIGATION",
    headline: "Ask. Retrieve. Verify.",
    emphasis: "Then decide.",
    lead: "The conversation follows an evidence loop: a scoped question, an inspectable query, source results, and a qualified answer.",
    visual: "ai-demo",
    layout: "wide",
    illustrative: true,
    takeaways: [
      t(
        "Question",
        "What did svc-backup do?",
        "Scope the search to the involved hosts and the synthetic incident window.",
      ),
      t(
        "Evidence",
        "Review the retrieved events",
        "Compare authentication, process, file, and network observations.",
      ),
      t(
        "Conclusion",
        "State what remains unknown",
        "Unauthorized activity is verified; successful transfer still needs evidence.",
      ),
    ],
    densityExtra:
      "The conversation is scripted and runs locally in this presentation. The user sees teaching outputs; no model, index, or endpoint is contacted.",
    qualification:
      "Illustrative AI Agent UI. These are not real tool calls or measured model results. Source evidence and human review remain necessary.",
    sources: [S.tools, S.builtInAgent],
    steps: [
      {
        label: "Ask a scoped question",
        detail:
          "What activity links svc-backup, WIN-FIN-07, and LNX-DB-03 during the incident window?",
      },
      {
        label: "Review the retrieval",
        detail:
          "Inspect the proposed ES|QL and the data scope. The shown query is a teaching example.",
      },
      {
        label: "Inspect the evidence",
        detail:
          "Source rows connect authentication, encoded PowerShell, SSH activity, archive creation, and an outbound connection.",
      },
      {
        label: "Qualify the answer",
        detail:
          "The evidence suggests a connected attack chain. It does not establish what data successfully left the environment.",
      },
      {
        label: "Human verification",
        detail:
          "The account owner confirms unauthorized activity at 09:44. The analyst records the evidence and requests a defined containment action.",
      },
    ],
    notes: n(
      "Follow the evidence loop, not the eloquence of the answer.",
      "Advance through the question, query, result rows, and qualified explanation. The scripted answer is intentionally careful about the outbound connection. The account owner verifies the unauthorized commands; the analyst then documents what is known and asks the response owner for a specific action.",
      "Where that reasoning runs is a deployment decision.",
      60,
    ),
  },
  {
    id: "trust",
    chapter: "04 / Extend analyst expertise",
    eyebrow: "MODEL CHOICE + TRUST",
    headline: "Choose the model.",
    emphasis: "Verify the boundary.",
    lead: "Self-managed Elasticsearch can work with a supported local model or an approved external provider. Review the actual data path for each AI feature.",
    visual: "trust",
    layout: "split",
    takeaways: [
      t(
        "Model",
        "Match capability to the task",
        "Choose dependable reasoning and tool calling, then test against security questions.",
      ),
      t(
        "Data path",
        "Inspect what is transmitted",
        "Review model endpoints, feature settings, fields, and provider policies.",
      ),
      t(
        "Controls",
        "Check the chosen experience",
        "Agent Builder and AI Assistant differ in privacy, knowledge, and audit capabilities.",
      ),
    ],
    densityExtra:
      "Locally hosted OpenAI-compatible models can be configured for Agent Builder. Local deployment is not a blanket claim that every AI feature or dependency operates without external connectivity.",
    qualification:
      "Enterprise on self-managed; feature-specific model and network requirements apply. Do not assume AI Assistant anonymization or audit controls transfer to Agent Builder.",
    sources: [S.models, S.comparison],
    notes: n(
      "A deployment diagram should make the model boundary visible.",
      "Choose an endpoint and a model that actually supports the required tool behavior. Review the payload and operational controls feature by feature. Agent Builder is a different experience from AI Assistant; knowledge-base, anonymization, and audit behavior cannot be assumed identical. Confirm the customer’s policy before connecting sensitive evidence.",
      "AI can assist reasoning while deterministic workflows handle defined steps.",
      55,
      "Must all model processing remain inside your network, or can an approved provider receive selected evidence?",
    ),
  },
  {
    id: "workflow",
    chapter: "05 / Act with control",
    eyebrow: "NATIVE ELASTIC WORKFLOWS",
    headline: "Turn the finding",
    emphasis: "into a repeatable process.",
    lead: "Elastic Workflows connects defined triggers, evidence retrieval, case updates, and configured actions into a versionable operational sequence.",
    visual: "workflow",
    layout: "split",
    illustrative: true,
    takeaways: [
      t(
        "Define",
        "Make the runbook explicit",
        "Specify inputs, evidence checks, actions, permissions, and expected outputs.",
      ),
      t(
        "Control",
        "Gate consequential actions",
        "Use an authorized manual run or a supported configured approval pattern.",
      ),
      t(
        "Verify",
        "Inspect each result",
        "Handle failures and confirm completion before reporting the response as successful.",
      ),
    ],
    densityExtra:
      "The teaching runbook gathers the incident context, prepares a case, requests authorization, performs defined actions, and records results. It does not let a model improvise response authority.",
    qualification:
      "Workflows GA in Stack 9.4+ with Enterprise and privileges. Individual steps can have different status; native waitForApproval is Preview 9.5+.",
    sources: [S.workflows, S.manual, S.approval],
    notes: n(
      "A repeatable runbook should be understandable before it executes.",
      "Elastic Workflows provides native automation with defined steps. Establish input scope, permissions, success checks, and a failure branch. For the GA baseline here, the incident owner approves before an authorized manual run. Native waitForApproval is separately labeled Preview 9.5+.",
      "Make that authorization visible in the response.",
      50,
    ),
  },
  {
    id: "response",
    chapter: "05 / Act with control",
    eyebrow: "APPROVED RESPONSE + CASES",
    headline: "Decide deliberately.",
    emphasis: "Confirm the result.",
    lead: "The analyst verifies the incident, the response owner approves containment, and the case records the action results and remaining questions.",
    visual: "response",
    layout: "wide",
    illustrative: true,
    takeaways: [
      t(
        "Authorize",
        "Name the action and owner",
        "Approve isolation of both affected hosts and the configured svc-backup directory action.",
      ),
      t(
        "Execute",
        "Use the right action path",
        "Endpoint isolation is native; disabling the directory account requires a configured integration.",
      ),
      t(
        "Record",
        "Verify outcomes in the case",
        "Check success or failure and retain the unresolved impact question.",
      ),
    ],
    densityExtra:
      "At 09:54 the scripted isolation and configured account action return success. This contains the observed chain; transfer impact and wider scope still require investigation.",
    qualification:
      "Synthetic response results. Endpoint actions need supported platforms and entitlement. GA pattern: approval before manual run; native approval step is Preview 9.5+.",
    sources: [S.respond, S.manual, S.approval],
    steps: [
      {
        label: "Evidence verified",
        detail:
          "09:44 · The analyst and account owner confirm unauthorized activity and document the supporting observations.",
      },
      {
        label: "Containment approved",
        detail:
          "09:52 · The incident owner approves isolation of WIN-FIN-07 and LNX-DB-03 plus the account action. Nothing has executed yet.",
      },
      {
        label: "Authorized run",
        detail:
          "The authorized responder starts the runbook: native isolation of both affected endpoints plus a separate directory-account integration.",
      },
      {
        label: "Results confirmed",
        detail:
          "09:54 · The synthetic actions return success. Record the result in SEC-042; successful data transfer remains unverified.",
      },
    ],
    notes: n(
      "An approval is for a specific action, not for an open-ended response.",
      "The owner accepts the business impact before the run begins. Isolate both WIN-FIN-07 and LNX-DB-03: disabling credentials alone would not end an existing Linux session. Endpoint isolation is native; the account-disable step is a configured directory integration. Review every result. A sent request is not successful containment.",
      "Control also includes where the platform is operated.",
      65,
    ),
  },
  {
    id: "deploy",
    chapter: "05 / Act with control",
    eyebrow: "DEPLOYMENT CHOICE",
    headline: "Operate where",
    emphasis: "your requirements lead.",
    lead: "Keep the principal example self-managed. Choose infrastructure, operational responsibility, and model connectivity to fit the environment.",
    visual: "deploy",
    layout: "split",
    takeaways: [
      t(
        "Self-managed",
        "Your infrastructure and operations",
        "Run the Stack on premises or private infrastructure with your chosen controls.",
      ),
      t(
        "Orchestrated",
        "ECE or Kubernetes with ECK",
        "Use supported orchestration where it fits your platform and operating model.",
      ),
      t(
        "Managed",
        "Hosted or Serverless options",
        "Evaluate managed services with their deployment-specific features and pricing.",
      ),
    ],
    densityExtra:
      "Deployment choice assigns responsibility for capacity, resilience, upgrades, certificates, integration dependencies, and model endpoints. Treat those as design decisions, not a logo selection.",
    qualification:
      "Features, subscriptions, networking, and operational responsibilities vary. EASE is a Serverless project type, not an on-premises installable capability.",
    sources: [S.deploy, S.models],
    notes: n(
      "The right deployment is the one the organization can operate and govern.",
      "For this audience, self-managed is the principal example. ECE and ECK provide orchestration choices; Hosted and Serverless are managed alternatives. Avoid asserting feature parity. Check the selected version, subscription, platform support, network dependencies, and model setup against the customer’s requirements.",
      "Then make the cost drivers as visible as the deployment choices.",
      45,
    ),
  },
  {
    id: "economics",
    chapter: "05 / Act with control",
    eyebrow: "RETENTION + OPERATING ECONOMICS",
    headline: "Design the coverage.",
    emphasis: "Understand the cost.",
    lead: "Compute, telemetry volume, storage, retention, and investigation access patterns shape the operating cost. Measure them against the coverage you need.",
    visual: "economics",
    layout: "split",
    takeaways: [
      t(
        "Coverage",
        "Collect evidence with purpose",
        "Retain enough context to investigate the attack paths and assets that matter.",
      ),
      t(
        "Lifecycle",
        "Match storage to access",
        "Use appropriate tiers and eligible searchable snapshots for older read-only evidence.",
      ),
      t(
        "Endpoint",
        "No per-endpoint license fee",
        "Appropriate Elastic entitlement includes native protection; telemetry and infrastructure still cost resources.",
      ),
    ],
    densityExtra:
      "For an on-premises estimate, include subscription, hardware or infrastructure, storage repositories, resiliency, operations, and any external model costs. Test retrieval performance with representative investigations.",
    qualification:
      "No universal savings claim. Searchable snapshots require Enterprise; retrieval costs and performance vary. Endpoint feature entitlement and telemetry costs remain relevant.",
    sources: [S.snapshots, S.endpoint],
    notes: n(
      "Better economics begins with an explicit workload and coverage requirement.",
      "No per-endpoint license fee is a meaningful distinction, but it does not make endpoint telemetry or the platform free. Estimate resources for the required data, retention, and investigation concurrency. Searchable snapshots can help with older read-only data; repository retrieval cost and performance still matter.",
      "Customer results show what is possible in their specific environments.",
      55,
    ),
  },
  {
    id: "proof",
    chapter: "06 / Prove and close",
    eyebrow: "PUBLIC CUSTOMER EVIDENCE",
    headline: "Customer outcomes.",
    emphasis: "Their evidence.",
    lead: "UOL and Proficio report improved security investigation outcomes. Use their results as examples, then measure your own operating baseline.",
    visual: "proof",
    layout: "split",
    takeaways: [
      t(
        "UOL",
        "80% faster incident resolution",
        "Customer-reported result from combining Elastic security and observability capabilities.",
      ),
      t(
        "Proficio",
        "34% less investigation time",
        "Customer attributes the reduction to AI Assistant summaries and remediation guidance.",
      ),
      t(
        "Your SOC",
        "Define your own success criteria",
        "Compare verified scope, analyst effort, response quality, and operating cost on representative cases.",
      ),
    ],
    densityExtra:
      "These results come from different customers and environments. Proficio’s cited result concerns AI Assistant; it is not a benchmark for this illustrative AI Agent experience.",
    qualification:
      "Customer-reported outcomes, not guarantees, comparative benchmarks, or a prediction for your deployment.",
    sources: [S.uol, S.proficio],
    notes: n(
      "Use proof precisely, with the customer and the context attached.",
      "UOL reports 80% faster incident resolution. Proficio reports a 34% reduction in investigation time with AI Assistant summaries and remediation guidance. Those are their outcomes, not universal promises or a measured result from this presentation. Agree a baseline and evaluate the customer’s own incidents.",
      "Return to the incident and the operating model it illustrates.",
      45,
    ),
  },
  {
    id: "operating",
    chapter: "06 / Prove and close",
    eyebrow: "THE INCIDENT, REVISITED",
    headline: "Contain the incident.",
    emphasis: "Keep learning.",
    lead: "The synthetic incident moves from disconnected observations to verified unauthorized activity and approved containment, while impact review stays open.",
    visual: "operating",
    layout: "split",
    illustrative: true,
    takeaways: [
      t(
        "Evidence",
        "A shared investigation context",
        "Directory, Windows, Linux, and network observations support one documented chain.",
      ),
      t(
        "Decision",
        "A qualified conclusion",
        "Unauthorized activity is verified; transfer contents and wider impact remain under review.",
      ),
      t(
        "Operation",
        "A repeatable improvement loop",
        "Confirm response results, review collection gaps, and tune the runbook and detections.",
      ),
    ],
    densityExtra:
      "SEC-042 retains the chronology, supporting events, account-owner confirmation, containment approval, and synthetic action results. Continue scope and impact investigation after containment.",
    qualification:
      "Fictional outcome and timestamps. This demonstrates a workflow, not a response-time benchmark or a closed-impact claim.",
    sources: [S.respond, S.ruleConcepts],
    notes: n(
      "Containment is a milestone, not the end of the investigation.",
      "At 09:54 the scripted actions succeed. We have a documented chain and approved containment, but the transfer question and wider scope remain open. The next operating step is to investigate those gaps, verify recovery, and improve collection and detection based on what the team learned.",
      "Close with the evaluation we can actually prove.",
      45,
    ),
  },
  {
    id: "closing",
    chapter: "06 / Prove and close",
    eyebrow: "THE NEXT STEP",
    headline: "One attack path.",
    emphasis: "A measurable evaluation.",
    lead: "Choose a meaningful on-premises scenario, connect the evidence, and test the decisions your SOC needs to make.",
    visual: "closing",
    layout: "hero",
    takeaways: [
      t(
        "See",
        "Can we establish the scope?",
        "Verify the source coverage, entity relationships, and searchable history.",
      ),
      t(
        "Understand",
        "Can we explain the decision?",
        "Inspect the hypothesis, evidence, alternative explanations, and analyst review.",
      ),
      t(
        "Act",
        "Can we execute with authority?",
        "Test an approved response and confirm its result in a non-production evaluation.",
      ),
    ],
    densityExtra:
      "Agree the data sources, deployment and entitlement, model boundary, response owner, representative scenarios, and acceptance criteria before the evaluation begins.",
    qualification:
      "Evaluation recommendations are a proposed operating approach. Confirm feature support and policy in the selected customer environment.",
    sources: [S.overview, S.deploy],
    notes: n(
      "The next step should be narrow enough to prove and important enough to matter.",
      "Select one attack path and the data needed to investigate it. Establish a baseline, choose the model boundary, and name the response owner. Evaluate true positives and legitimate administration. The outcome is confidence in your evidence, your decisions, and your control over the response.",
      "An attacker crosses boundaries. Your investigation should too.",
      45,
      "Choose the first scenario: service-account misuse, lateral movement, or suspicious data access.",
    ),
  },
];
