---
title: "AI development guidelines"
description: "A practical, risk-based checklist for building and deploying AI systems"
date: "2025-12-25"
language: "en"
---

# AI development guidelines

This page provides a practical checklist for building and deploying AI systems with an emphasis on risk-based governance and operational quality. It is intended for product, engineering, security, data, and compliance stakeholders.

It is not legal advice. For exact obligations, refer to the applicable legal text and sector requirements.

## Step 1: Scope the use case

Write down:
- intended users and decisions supported/automated
- deployment context (where/for whom it runs)
- what could go wrong (plausible harms, misuse, and failure modes)

## Step 2: Determine whether special obligations may apply

If you operate in the EU (or target EU users), some use cases may trigger additional requirements (e.g., under the EU AI Act).

A simplified orientation:
- **Potentially high-risk contexts** often include critical infrastructure, education, employment, essential services (e.g., credit), and certain biometric or public-sector uses.
- **Transparency-focused cases** often include chatbots, synthetic media, and certain biometric categorization/emotion recognition uses.
- Many systems may have **no special AI-specific obligations** beyond general laws (privacy, consumer protection, security), depending on the use case.

When unsure, treat this as a risk-management exercise: document your assumptions and revisit after legal/compliance review.

## Step 3: Establish governance (minimum viable)

Define responsibilities and operating rules:
- owner for the system (product) and owner for technical controls (engineering)
- review gates (pre-launch, major model/data changes, incident-driven)
- incident response (who investigates, who can disable/roll back)
- documentation standard (where artifacts live; who maintains them)

## Development checklist

### Data management

- [ ] **Data inventory and purpose**
  - document sources, licenses, and intended use
  - specify what data is required vs. optional

- [ ] **Data quality and representativeness**
  - validate coverage for expected scenarios
  - check known gaps and document limitations

- [ ] **Privacy and access control**
  - data minimization and retention rules
  - role-based access and audit logging
  - consent/notice where required

- [ ] **Security**
  - encryption in transit/at rest where appropriate
  - secrets management and least privilege

### Model/system development

- [ ] **Documentation and versioning**
  - model/system description, intended use, out-of-scope use
  - version control for code, data, prompts, and configurations

- [ ] **Evaluation and testing**
  - baseline metrics and acceptance criteria
  - robustness checks (edge cases, drift, OOD)
  - abuse testing (prompt injection, misuse scenarios)

- [ ] **Fairness and performance across contexts**
  - evaluate across relevant user groups and environments
  - record findings and mitigations (data, model, process)

- [ ] **Explainability and user communication**
  - appropriate explanations for users/operators
  - clear disclosures where required

### Risk assessment

- [ ] Identify plausible risks (technical, security, privacy, misuse)
- [ ] Estimate likelihood/impact and define mitigations
- [ ] Define residual risk and what would trigger a re-evaluation

### Human oversight and controls

Choose the operating model and make it actionable:
- **review-before-action** (human approves each high-impact action)
- **monitor-and-intervene** (human supervises and can stop/roll back)
- **set-constraints-and-audit** (human sets objectives/limits and audits outcomes)

Define:
- override/rollback steps
- alerts and thresholds
- operator training

## Deployment checklist

### Pre-deployment
- [ ] run a release checklist (security, privacy, performance)
- [ ] verify documentation is up to date
- [ ] test in production-like conditions
- [ ] prepare rollback and incident comms

### Launch
- [ ] staged rollout if feasible
- [ ] monitor early signals (errors, drift, user feedback)

### Post-deployment
- [ ] continuous monitoring (quality, drift, abuse, incidents)
- [ ] periodic review/audit and documentation updates
- [ ] change management for model/data/policy updates

## Documentation to keep (practical set)

- system description + intended use/out-of-scope
- data sources and governance notes
- evaluation results and acceptance criteria
- risk assessment + mitigations
- monitoring/incident logs and postmortems

## References (starting points)

- EU AI Act (EUR-Lex): https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- NIST AI Risk Management Framework (AI RMF)
- ISO/IEC 42001 (AI management system)
- ISO/IEC 23894 (AI risk management)
- OECD AI Principles
- Participate in standard-setting bodies
- Connect with academic researchers

## Red Flags

Be alert to these warning signs:
- ❌ Lack of diversity in training data
- ❌ Unexplained model decisions in high-stakes contexts
- ❌ Difficulty reproducing results
- ❌ Resistance to transparency
- ❌ Inadequate human oversight
- ❌ Missing documentation
- ❌ Unclear accountability
- ❌ Ignoring user complaints or feedback

Remember: Building ethical and compliant AI is an ongoing process, not a destination. Stay curious, stay humble, and always prioritize the humans your technology serves.
