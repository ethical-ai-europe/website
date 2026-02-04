---
title: "AI governance principles"
description: "Practical principles for building and deploying AI systems responsibly"
date: "2025-12-25"
language: "en"
---

# AI governance principles

This page summarizes commonly used governance principles for AI systems. The goal is to provide a practical checklist for teams building, deploying, procuring, or auditing AI—across both regulated and non-regulated use cases.

These principles complement legal requirements (e.g., the EU AI Act, GDPR, sector rules). They are not a substitute for legal advice.

## Core principles (practical)

### 1) Human oversight and appropriate use

**Define when human review is required and what “override” means in practice.**

- Specify decision boundaries (what the system may do vs. what needs approval)
- Provide escalation paths for uncertain or high-impact cases
- Ensure operators can intervene, pause, or roll back when needed
- Make accountability explicit (who owns outcomes)

### 2) Robustness, safety, and security

**Design for predictable behavior under real-world conditions.**

- Test against realistic inputs, edge cases, and distribution shift
- Protect against common threats (prompt injection, data poisoning, abuse)
- Define reliability targets and monitor them (accuracy, latency, availability)
- Plan failure modes (safe defaults, graceful degradation)

### 3) Privacy and data governance

**Handle data in a way that is lawful, minimal, and auditable.**

- Use privacy-by-design; collect only what is needed for the stated purpose
- Document data sources, licenses, retention, and access controls
- Validate data quality and provenance; track changes over time
- Provide clear user information where required

### 4) Transparency and explainability

**Make the system’s capabilities, limits, and intended use understandable.**

- Document what the system is for (and what it is not for)
- Provide user-facing disclosures where appropriate
- Maintain technical documentation for auditors and maintainers
- Enable traceability (inputs → outputs → versions → decisions)

### 5) Fairness and non-discrimination

**Check for disparate impact and reduce avoidable bias.**

- Evaluate performance across relevant user groups and contexts
- Use mitigations where disparities are found (data, model, or process)
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
- Offer channels for complaints/appeals where appropriate
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
- Provide user guidance and operator training

### Operate
- Monitor performance and incidents
- Re-evaluate after significant changes (data/model/policy)
- Periodically audit and update documentation

## References (starting points)

- OECD AI Principles
- UNESCO Recommendation on the Ethics of AI
- NIST AI Risk Management Framework (AI RMF)
- ISO/IEC AI management and risk standards (where applicable)

## Questions to use in reviews

1) What is the system’s intended use, and what is out of scope?
2) What harms are plausible, and what controls reduce them?
3) How do we detect and respond to failures or abuse?
4) What data is used, and is it appropriate and lawful for the purpose?
5) What level of transparency is required for users, auditors, and operators?
6) Who is accountable, and what is the escalation/redress path?
