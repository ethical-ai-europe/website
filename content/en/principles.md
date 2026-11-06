---
title: "AI governance principles"
description: "Practical, human-first principles for building and using AI systems responsibly"
date: "2026-11-06"
language: "en"
---

# AI governance principles

This page summarises commonly used governance principles for AI systems. The goal is a practical checklist for teams building, deploying, buying or auditing AI, whether or not a specific law applies to the use case.

The starting point is simple: AI can serve people, not just profit. A system that saves money but treats people unfairly is not a success. The human factor is key, because people decide what a system is for, check its output and take responsibility for the result. Ethics, in this sense, is practical: it shows up in everyday choices about data, testing, oversight and how you answer when someone asks "why?".

These principles complement legal requirements such as the EU AI Act, GDPR and sector rules. Some of them are already legal duties: for example, every organisation using AI must take measures to support the AI literacy of its staff, and the AI Act's transparency rules have applied since 2 August 2026. See the [AI Act timeline](/en/timeline) for what applies when. This page is not legal advice.

## Core principles (practical)

### 1) Human oversight and appropriate use

**Define when human review is required and what “override” means in practice.**

- Specify decision boundaries (what the system may do vs. what needs approval)
- Provide escalation paths for uncertain or high-impact cases
- Ensure operators can intervene, pause, or roll back when needed
- Make accountability explicit (who owns outcomes)
- Train the people doing the oversight: human review only works if reviewers understand the system's limits and feel free to disagree with it

### 2) Robustness, safety, and security

**Design for predictable behaviour under real-world conditions.**

- Test against realistic inputs, edge cases, and distribution shift (when real-world data drifts away from what the system was trained on)
- Protect against common threats (prompt injection, data poisoning, abuse)
- Define reliability targets and monitor them (accuracy, latency, availability)
- Plan failure modes (safe defaults, graceful degradation: failing safely rather than suddenly)

### 3) Privacy and data governance

**Handle data in a way that is lawful, minimal, and auditable.**

- Use privacy-by-design; collect only what is needed for the stated purpose
- Document data sources, licenses, retention, and access controls
- Validate data quality and provenance; track changes over time
- Provide clear user information where required

### 4) Transparency and explainability

**Make the system’s capabilities, limits, and intended use understandable.**

- Document what the system is for (and what it is not for)
- Tell people when they are dealing with AI (for chatbots and deepfakes this is a legal duty under the AI Act since 2 August 2026)
- Maintain technical documentation for auditors and maintainers
- Enable traceability (inputs → outputs → versions → decisions)

### 5) Fairness and non-discrimination

**Check for disparate impact and reduce avoidable bias.**

- Evaluate performance across relevant user groups and contexts
- Use mitigations where disparities are found (data, model, or process)
- If you need sensitive data to detect and correct bias, the amended AI Act (Article 4a) allows this only under strict safeguards, including deletion afterwards
- Ensure accessibility is considered in UX and outputs
- Monitor for drift and emergent unfair outcomes after deployment

### 6) Societal and environmental considerations

**Assess broader impacts that may matter in your context.**

- Consider downstream use/misuse and stakeholder impact
- Track and reduce unnecessary compute and energy use where feasible
- Document trade-offs (performance vs. cost vs. footprint)

### 7) Accountability and redress

**Provide mechanisms to investigate and correct issues.**

- Define ownership: product, engineering, legal, compliance, and operations
- Create incident response playbooks (harm, security, policy violations)
- Offer channels for complaints and appeals, and make sure a real person answers them
- Keep logs and documentation sufficient for post-incident analysis

## How to implement (lifecycle)

### Assessment
- Define the use case and impact level
- Identify applicable laws, policies, and standards
- Document risks, assumptions, and intended users

### Build
- Translate principles into requirements (tests, controls, documentation)
- Establish evaluation and monitoring metrics
- Implement security and access controls

### Deploy
- Validate against acceptance criteria
- Roll out with monitoring and rollback plans
- Provide user guidance and operator training (this also supports your AI literacy duty)

### Operate
- Monitor performance and incidents
- Re-evaluate after significant changes (data/model/policy)
- Periodically audit and update documentation

## Further frameworks

- OECD AI Principles
- UNESCO Recommendation on the Ethics of AI
- NIST AI Risk Management Framework (AI RMF)
- ISO/IEC AI management and risk standards (where applicable)

More links are collected on the [resources page](/en/resources).

## Questions to use in reviews

1) What is the system’s intended use, and what is out of scope?
2) What harms are plausible, and what controls reduce them?
3) How do we detect and respond to failures or abuse?
4) What data is used, and is it appropriate and lawful for the purpose?
5) What level of transparency is required for users, auditors, and operators?
6) Who is accountable, and what is the escalation/redress path?
7) Who are the people affected, and would they consider the outcome fair if they could see how it was reached?

## Sources

- [AI Act, Regulation (EU) 2024/1689 (EUR-Lex)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
- [Digital Omnibus on AI, Regulation (EU) 2026/1744 (EUR-Lex)](https://eur-lex.europa.eu/eli/reg/2026/1744/oj)
- [European Commission: AI Act policy page](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
