---
title: "AI development guidelines"
description: "A practical, risk-based checklist for building and deploying AI systems"
date: "2026-11-06"
language: "en"
---

# AI development guidelines

This page provides a practical checklist for building and deploying AI systems with an emphasis on risk-based governance and operational quality. It is intended for product, engineering, security, data, and compliance stakeholders.

The aim is AI that works well for the people it affects, not only for the organisation that runs it. Most of the steps below are about people: who is accountable, who reviews, who gets trained and who can complain.

It is not legal advice. For exact obligations, refer to the applicable legal text and sector requirements. Dates in this page reflect the EU AI Act as amended in 2026 (last checked 6 November 2026).

## Step 1: Scope the use case

Write down:
- intended users and decisions supported/automated
- deployment context (where/for whom it runs)
- what could go wrong (plausible harms, misuse, and failure modes)

## Step 2: Determine whether special obligations may apply

If you operate in the EU (or target EU users), some use cases trigger additional requirements under the EU AI Act. A simplified orientation, with what applies when:

- **Banned practices** (in force since 2 February 2025): check that your use case is not one of them, for example emotion recognition of employees or job candidates. A new ban on AI that creates non-consensual intimate images applies from 2 December 2026.
- **Transparency cases** (in force since 2 August 2026): chatbots must disclose they are AI; deepfakes and certain AI-generated public-interest text must be labelled; users of emotion recognition or biometric categorisation must inform people.
- **High-risk contexts** include biometrics, critical infrastructure, education, employment, essential services (e.g. credit scoring and benefits), law enforcement, migration and justice. These rules apply from 2 December 2027 (Annex III) and from 2 August 2028 for AI in regulated products such as medical devices. Draft Commission guidelines on classification were published in May 2026; the final version is not yet adopted.
- **AI literacy** applies to every organisation using AI, whatever the risk: take measures to support your staff's understanding of the AI they use.
- Many systems have **no other AI-specific obligations** beyond general laws (GDPR, consumer protection, security). GDPR rules on automated decisions apply today.

If you are the provider of a system in a high-risk area and conclude it is not high-risk (Article 6(3)), the amended Act still requires you to register it (with less information). See the [AI Act timeline](/en/timeline) and the [compliance checklist](/en/for-organizations/compliance-checklist).

When unsure, treat this as a risk-management exercise: document your assumptions and revisit after legal/compliance review.

## Step 3: Establish basic governance (the minimum you need to start)

Define responsibilities and operating rules:
- owner for the system (product) and owner for technical controls (engineering)
- review gates (pre-launch, major model/data changes, incident-driven)
- incident response (who investigates, who can disable/roll back)
- documentation standard (where artifacts live; who maintains them)
- AI literacy: who needs training, on what, and how you keep it current

## Development checklist

### Data management

- [ ] **Data inventory and purpose**
  - document sources, licenses, and intended use
  - specify what data is required vs. optional

- [ ] **Data quality and representativeness**
  - validate coverage for expected scenarios
  - check known gaps and document limitations

- [ ] **Privacy and access control**
  - data minimisation and retention rules
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
  - robustness checks (edge cases, drift, inputs unlike the training data (out-of-distribution))
  - abuse testing (prompt injection, misuse scenarios)

- [ ] **Fairness and performance across contexts**
  - evaluate across relevant user groups and environments
  - record findings and mitigations (data, model, process)
  - if you process sensitive data to detect bias, follow the strict safeguards in Article 4a of the amended AI Act

- [ ] **Explainability and user communication**
  - appropriate explanations for users/operators
  - clear disclosures where required (e.g. tell users they are talking to an AI)
  - mark AI-generated content in a machine-readable way if you provide generative AI

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
- operator training, including the system's known limits

Oversight is only real if the reviewer has time, information and authority to say no to the system.

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

## Further frameworks and standards

- NIST AI Risk Management Framework (AI RMF)
- ISO/IEC 42001 (AI management system)
- ISO/IEC 23894 (AI risk management)
- OECD AI Principles
- EU harmonised standards under the AI Act: the first one, EN 18286 on quality management systems, was cited in the Official Journal in October 2026; standards on risk management, data, logging, accuracy and cybersecurity are still in progress
- Participate in standard-setting bodies and connect with academic researchers

More links are on the [resources page](/en/resources).

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

Remember: building ethical and compliant AI is an ongoing process, not a destination. Stay curious, stay humble, and always prioritise the humans your technology serves.

## Sources

- [AI Act, Regulation (EU) 2024/1689 (EUR-Lex)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
- [Digital Omnibus on AI, Regulation (EU) 2026/1744 (EUR-Lex)](https://eur-lex.europa.eu/eli/reg/2026/1744/oj)
- [Commission: transparency obligations under Article 50 (FAQ)](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act)
- [Commission: draft guidelines on classifying high-risk AI systems](https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems)
- [AI Act Service Desk](https://ai-act-service-desk.ec.europa.eu/)
