# Conversation Prep: Elastic Security Customer Presentation

**With:** A prospective CISO or SOC leader, with security architecture and SOC operations colleagues where possible.

**About:** Evaluating Elastic Security for a primarily on-premises environment while preserving the customer's control and existing investment.

**Your goal:** Agree a focused, evidence-based pilot with a named owner, an approved scope, a baseline, success criteria, and a decision meeting.

**Their likely goal:** Establish credible security value, understand operational and cost implications, retain authority over data and response, and avoid an unnecessary migration.

**Preparation date:** October 13, 2026. Confirm feature availability, entitlement, supported models, and deployment requirements against the customer's proposed version before making a commitment.

## Before You Start

**Mindset:** Treat the meeting as a joint evaluation. The customer knows constraints that the presentation cannot reveal; make those constraints part of the pilot rather than treating objections as something to overcome.

**Timing:** Reserve 45 minutes when possible: 25–30 minutes for the core presentation and the remaining time for questions and a concrete next step. Include someone who can explain data boundaries and someone who owns the investigation workflow. If the available time is shorter, agree which part of the investigation matters most before starting.

**Avoid:** Presenting the fictional incident as a customer result; promising a deployment, model, price, or response action before checking its requirements. Do not infer permission to move production data or execute a security action from interest in the presentation.

**Keep visible:** The presentation is an illustrative, static demonstration. Its hosts, users, alerts, queries, and results are fictional. There is no live Elastic connection, LLM call, or containment action.

## The Opening

### Option 1 — Direct

“By the end of this conversation, I would like us to identify one investigation we could evaluate together, the evidence needed to judge it, and who would own the decision. I will use a fictional on-premises incident to show the approach, then we can test whether it addresses a problem your SOC actually has.”

### Option 2 — Context first

“You already have people, processes, and tools protecting the environment. I would like to understand where investigations still lose time or context, and show how Elastic Security might help. We can then decide whether a narrow pilot is justified while keeping your data and response controls explicit.”

### Option 3 — Question led

“When an investigation crosses identity, endpoint, and network evidence today, where does your team have the hardest time reaching a defensible conclusion? Let us use that point as the lens for this presentation.”

## Key Points to Make

1. **Follow the attack across evidence sources.** “The attacker can cross identity and host boundaries. The evaluation should test whether the analyst can connect that evidence clearly, including evidence from tools you already use.”

2. **Expose the reasoning.** “Detection rules, behavioral signals, entity context, and the investigation trail should help the analyst explain why something matters. We should inspect the underlying evidence, rather than accept a summary on its own.”

3. **Give AI a bounded job.** “An AI-generated attack hypothesis can help organize selected alerts, but the analyst still needs to verify it. In the pilot, we should measure the usefulness of the explanation and check whether its cited evidence supports each conclusion.”

4. **Keep response authority explicit.** “An analyst can approve a workflow before a manual run; permissions and the exact action remain part of the design. A directory account change is a configured integration action; it is not a native endpoint command. An approval step built into a workflow has its own availability requirements.”

5. **Measure operational value and cost together.** “We should compare investigation quality and elapsed analyst effort against your baseline, alongside compute, storage, retention, model, and operating costs. Public customer results are useful context; your pilot needs its own evidence.”

## Likely Pushback and Exact Responses

### 1. “We already have a SIEM and EDR. Why would we replace them?”

**Respond with:**

“Your existing investment is part of the starting point. We can choose one investigation that spans your current tools, identify the evidence Elastic would need, and compare the workflow against today's baseline. If there is no meaningful improvement, that is a useful result. Any broader migration should follow validated coverage and an agreed transition plan.”

**Then ask:**

“Which investigation currently requires the most manual handoffs or switching between tools?”

### 2. “AI is unreliable. I cannot let a model make security decisions.”

**Respond with:**

“The model can be wrong. Attack Discovery produces potential attack hypotheses from selected alerts; analysts need to verify the evidence. I propose we evaluate whether the output is supported, useful, and clear about uncertainty, with response authority kept behind an explicit approval gate. We can compare the investigation with and without AI assistance so the result is visible.”

**Then ask:**

“What evidence would your analysts need to accept or reject an AI-generated hypothesis?”

### 3. “We are on-premises. Our security data cannot leave our boundary.”

**Respond with:**

“Let us make that boundary a written requirement. Self-managed is the principal deployment example here. Depending on the feature and supported configuration, the AI example can use a supported local OpenAI-compatible model with suitable reasoning and tool calling, or an approved external LLM. We need to confirm the exact model, connectivity, entitlement, and data path before a pilot. I will not promise identical capabilities across deployments or that every AI path keeps all data local.”

**Then ask:**

“Which data classes and destinations are permitted, and who approves the architecture?”

### 4. “This sounds like another expensive platform with growing retention costs.”

**Respond with:**

“We should build the cost model from your telemetry and retention requirements. Within the appropriate entitlement, Elastic Defend has no per-endpoint license charge, but ingesting and retaining its telemetry still consumes resources and incurs cost. Compute, storage, lifecycle choices, searchable snapshots where supported, model usage, and operating effort all belong in the evaluation. I would only recommend a broader rollout after we have measured both the investigation value and those costs.”

**Then ask:**

“Which retention requirements are mandatory, and what cost and analyst-effort baseline should the pilot use?”

### 5. “Who is accountable if automation disables the wrong account or isolates a critical server?”

**Respond with:**

“The action owner and approval policy need to be explicit before an action is enabled. The illustration shows an analyst approving a manual workflow run; it does not execute containment. Native endpoint actions depend on the action, privileges, entitlement, platform, and operating system. Directory disabling and network blocking use configured integrations. Workflows is GA in Stack 9.4 with Enterprise entitlement. The built-in waitForApproval step is Preview in 9.5 and later; it should not be assumed in the GA example. We can begin with proposed actions and a case record, then evaluate approved execution only within a scope you authorize.”

**Then ask:**

“Who can approve each response action, and which systems must remain outside the initial action scope?”

## If the Conversation Becomes Defensive

**Exact response:**

“I can see why a platform discussion could sound like criticism of the team's existing work. Your team has made decisions under real constraints, and I want to understand those constraints. Let us take one concrete investigation and assess whether this approach makes that work easier to verify.”

Allow time for the customer to explain the concern. Reflect it back in their terms before returning to the demonstration.

## If They Shut Down or Decline to Engage

**Exact response:**

“We do not need to force a pilot. If this is not a priority, I can leave a concise record of the use case and the conditions that would make an evaluation worthwhile. If useful, we can revisit it when there is an owner and a clear problem to test.”

Respect the answer. Do not treat a request for information as agreement to a pilot or a follow-up meeting.

## Your Non-Negotiables

- **Must have:** “Before we start a pilot, we need an agreed investigation, a named customer owner, an approved data boundary, a measurable baseline, and success criteria. Any real response action needs its own authorized scope and approval policy.”

- **Ideal outcome:** “We agree a small pilot covering identity and Windows/Linux evidence, confirm the deployment and model configuration, document cost assumptions, and book a decision meeting where both teams review the results.”

- **Walk-away point:** “If the required data handling or action authority cannot be approved, or the proposed capability is unsupported for your deployment, I would stop that part of the evaluation. We can narrow the scope or pause until the constraint is resolved.”

These are evaluation boundaries, not pressure tactics. A well-supported decision to defer or decline is an acceptable outcome.

## How to Close

### Option 1 — Agreement reached

“We have a candidate investigation and a reason to test it. Let us record the owner, data sources, approved boundary, baseline, success criteria, cost assumptions, and decision date. We can then confirm the supported configuration and propose a bounded pilot scope for your review.”

### Option 2 — Questions remain

“The open questions are the deployment requirements, data path, and evaluation criteria. Let us assign an owner to each and agree when to review the answers. We can decide about a pilot once those answers are concrete.”

### Option 3 — No fit or no priority

“Thank you for being clear about the constraints. A pilot does not have enough justification today. I will capture what would need to change for it to become useful, and we can leave the decision there.”

## Verification Aids

Use these to check specific statements; the presentation contains its full scene references:

- [Attack Discovery documentation](https://www.elastic.co/docs/solutions/security/ai/attack-discovery) for alert selection, LLM requirements, and the investigation workflow.
- [Elastic AI Agent and AI Assistant comparison](https://www.elastic.co/docs/explore-analyze/ai-features/ai-chat-experiences/ai-agent-or-ai-assistant/) for feature distinctions. Do not transfer AI Assistant Knowledge Base, anonymization, or audit controls to Agent Builder.
- [Manual workflow triggers](https://www.elastic.co/docs/explore-analyze/workflows/triggers/manual-triggers) and the [Preview approval step](https://www.elastic.co/docs/explore-analyze/workflows/steps/wait-for-approval) for the distinction between an approved manual run and an approval step built into a workflow.
- [UOL customer story](https://www.elastic.co/customers/uol) and [Proficio customer story](https://www.elastic.co/customers/proficio) for customer-reported outcomes. They are examples, not promises about this customer's results.

EASE is a serverless project type and must not be presented as an installable on-premises capability. Keep any announced or preview feature separate from the supported core evaluation.

## Practice Invitation

“Would you like to role-play this conversation so you can practice? I will play the CISO or SOC leader and push back realistically on your existing SIEM, AI reliability, data control, economics, and response authority. We can pause after each exchange to refine the answer.”
