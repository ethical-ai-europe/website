---
title: "AI Compliance Checklist"
description: "Practical, phased checklist for the EU AI Act: inventory, classify, document, govern. Updated for the 2026 deadline changes."
date: "2026-11-06"
language: "en"
---

# AI Compliance Checklist

**Use this checklist to track your organisation's AI compliance status.** Whether you're just getting started or doing a periodic review, it helps you find gaps and set priorities.

Some items apply to every organisation today (no prohibited uses, AI literacy, transparency). The detailed high-risk items apply from **2 December 2027** for most high-risk uses, and from **2 August 2028** for AI built into regulated products. **The deadline moved, the direction didn't:** use the time to prepare. For minimal-risk AI (most common AI tools), treat the high-risk sections as a best-practice guide rather than a strict requirement.

*This checklist is not legal advice. It is a practical aid; check your specific situation with a qualified professional.*

**Two terms used throughout:** a **provider** builds an AI system or places it on the market under its own name; a **deployer** uses an AI system in its own work. Most organisations are deployers, and many items below are marked accordingly.

---

## 1. AI Inventory

*Do you know what AI you're using?*

### Complete an AI Inventory

- [ ] **Listed all AI systems in use** across the organisation (including AI features inside software you already use)
- [ ] **Identified the purpose** of each AI system
- [ ] **Documented data inputs** (what data does it process?)
- [ ] **Documented outputs** (what decisions or recommendations does it produce?)
- [ ] **Identified vendors/providers** for each AI system
- [ ] **Recorded deployment dates** (when did you start using each system?)
- [ ] **Recorded your role** (provider or deployer) for each system
- [ ] **Assigned responsibility** (who manages each AI system?)

### Inventory Template

| System Name | Purpose | Data Inputs | Outputs | Vendor | Deployed | Your Role | Owner | Risk Level |
|-------------|---------|-------------|---------|--------|----------|-----------|-------|------------|
| *Example* | *HR screening* | *CVs, applications* | *Candidate rankings* | *Vendor X* | *Jan 2024* | *Deployer* | *HR Mgr* | *High (from Dec 2027)* |

**Why this matters:** You can't manage AI you don't know about. Incomplete inventories are a common compliance gap.

[More guidance on AI inventory →](/en/for-organizations/sme-guide)

---

## 2. Risk Classification

*Do you know your risk levels?*

### Classify Each AI System

- [ ] **Assessed each system's risk level** according to EU AI Act categories
- [ ] **Identified any prohibited uses** (social scoring, manipulation, emotion recognition at work or in education, certain biometrics) and stopped them
- [ ] **Checked for AI that can create intimate images of real people without consent** (banned from 2 December 2026)
- [ ] **Flagged likely high-risk systems** for preparation before December 2027
- [ ] **Identified systems with transparency obligations** (chatbots, deepfakes, emotion recognition, biometric categorisation, generative AI)
- [ ] **Documented classification rationale** for each system
- [ ] **Checked the Commission's draft guidelines** on high-risk classification (May 2026; final version still pending) and planned to re-check when they are final

### Risk Categories Reference

| Risk Level | Description | Examples | Key Obligations | Applies From |
|------------|-------------|----------|-----------------|--------------|
| **Prohibited** | Banned entirely | Social scoring, manipulation, emotion recognition at work/school; non-consensual intimate deepfakes | Do not use | Feb 2025 (new ban: 2 Dec 2026) |
| **High Risk** | Significant impact on rights/safety | Employment AI, credit scoring, education, law enforcement | Full requirements | 2 Dec 2027 (Annex III); 2 Aug 2028 (products) |
| **Transparency** | Disclosure obligations | Chatbots, emotion recognition, deepfakes, generative AI | Tell people, label and mark content | 2 Aug 2026 |
| **Minimal Risk** | No specific obligations | Spam filters, recommendations, games | Best practices, AI literacy | AI literacy since Feb 2025 |

### High-Risk Area Checklist (Annex III)

Is your AI used in any of these areas?

- [ ] **Biometrics** (remote identification, categorisation, emotion recognition where not banned)
- [ ] **Critical infrastructure** (transport, water, energy, digital)
- [ ] **Education and training** (access, assessment, evaluation, test monitoring)
- [ ] **Employment** (recruiting, hiring, performance, termination)
- [ ] **Essential public and private services** (credit scoring, benefits, emergency services)
- [ ] **Law enforcement** (risk assessment, evidence evaluation)
- [ ] **Migration, asylum and border control**
- [ ] **Justice and democratic processes**

**If yes to any:** Treat the system as likely high-risk and work through Section 3 before 2 December 2027.

- [ ] **If you are a provider and conclude a system in these areas is *not* high-risk** (an exception under Article 6(3)), you have documented why and plan to **register it in the EU database anyway**, with less information than a high-risk system.

[More on risk classification →](/en/for-organizations)

---

## 3. High-Risk AI Compliance

*For systems classified as high-risk. Required from 2 December 2027 (Annex III) or 2 August 2028 (regulated products). Start now: these take time.*

### Risk Management System (mainly providers)

- [ ] **Established a risk management system** (documented, updated throughout the lifecycle)
- [ ] **Identified and analysed known and foreseeable risks**
- [ ] **Estimated risks based on data and design**
- [ ] **Evaluated risks from intended use and misuse**
- [ ] **Adopted risk management measures**
- [ ] **Tested the system for risk mitigation effectiveness**
- [ ] **Documented residual risk** (what risk remains?)
- [ ] **Communicated residual risk to deployers**

### Quality Management (providers)

- [ ] **Set up a quality management system** for AI development and maintenance
- [ ] **Reviewed EN 18286**, the first harmonised standard (an official European technical standard; following it is a recognised way to show you meet the rules), covering quality management systems for AI Act purposes. Standards on risk management, data, logging, accuracy and cybersecurity are still in progress, so track them.

### Data Governance

- [ ] **Documented data collection methods**
- [ ] **Ensured training data is relevant and representative**
- [ ] **Examined data for biases** and documented findings
- [ ] **If you process sensitive data (e.g. ethnicity, health) to detect and correct bias**, you rely on the new Article 4a basis only where strictly necessary, with strict safeguards, and delete the data afterwards
- [ ] **Identified and addressed data gaps**
- [ ] **Established data quality metrics**
- [ ] **Documented data retention and deletion policies**
- [ ] **Ensured GDPR compliance** for personal data (the GDPR applies in full today)

### Technical Documentation (providers; deployers should request it)

- [ ] **Created or obtained technical documentation** including:
  - [ ] General system description and purpose
  - [ ] System architecture and design
  - [ ] Development process description
  - [ ] Training, validation and testing details
  - [ ] Performance metrics and testing results
  - [ ] Risk management documentation
  - [ ] Lifecycle management processes
  - [ ] Standards applied

### Human Oversight

- [ ] **Designed (or chose) a system that allows effective human oversight**
- [ ] **Defined human oversight procedures**
- [ ] **Identified who is responsible for oversight**
- [ ] **Provided tools for operators to understand AI outputs**
- [ ] **Enabled operators to override or reverse AI decisions**
- [ ] **Trained operators on system capabilities and limitations**
- [ ] **Created escalation procedures** for problematic outputs
- [ ] **Documented override procedures and tracked usage**

### Accuracy, Robustness and Security

- [ ] **Tested for accuracy** appropriate to the intended purpose
- [ ] **Tested for robustness** against errors and inconsistencies
- [ ] **Conducted cybersecurity testing**
- [ ] **Documented known limitations**
- [ ] **Established ongoing monitoring procedures**
- [ ] **Created incident response procedures**

### Deployer Duties (Article 26)

*If you use (rather than build) a high-risk system, from 2 December 2027:*

- [ ] **Use the system as the provider instructs** (follow the instructions for use)
- [ ] **Assign trained, competent people to oversee it**, with the authority to intervene
- [ ] **Make sure input data you control is relevant** for the system's purpose
- [ ] **Monitor the system and report serious problems** to the provider and the authorities
- [ ] **Keep the system's automatically generated logs for at least six months**
- [ ] **Inform workers' representatives and affected staff** before using high-risk AI at work
- [ ] **Tell people when a high-risk system is used to make decisions about them**

### Fundamental Rights Impact Assessment (certain deployers)

- [ ] **Checked whether you must carry out a fundamental rights impact assessment (FRIA)** before using a high-risk system. This applies to public bodies, private organisations providing public services, and any organisation using AI to assess people's creditworthiness or to price life or health insurance. It does not apply to critical-infrastructure systems.
- [ ] **Planned to use the AI Office's template questionnaire** for the FRIA, which the AI Office is to provide

### Registration (EU Database)

- [ ] **Determined if registration is required**
  - High-risk AI systems generally require registration
  - Annex III systems a provider judges not high-risk under Article 6(3) still need registering (with less information)
  - Public sector deployers have their own registration obligations
- [ ] **Prepared registration information**
- [ ] **Established a process for updating registration** as the system changes

[More on high-risk requirements →](/en/guidelines)

---

## 4. Transparency

*Are you being open about AI use? Most of this has applied since 2 August 2026.*

### User Notification (Article 50)

- [ ] **People are told when they interact with AI** (chatbots, voice assistants), unless it is obvious
- [ ] **Deepfakes (realistic AI-generated or manipulated images, audio or video) are clearly labelled**
- [ ] **AI-generated text published to inform the public on matters of public interest is labelled**, unless a human has reviewed it and takes editorial responsibility
- [ ] **People exposed to emotion recognition or biometric categorisation are informed** (and you've confirmed the use isn't banned, e.g. at work or in education)
- [ ] **If you provide generative AI:** output is marked in a machine-readable way (systems on the market before 2 August 2026 must comply by **2 December 2026**)
- [ ] **Checked the Commission's Article 50 guidelines** (July 2026) and the code of practice on marking and labelling AI-generated content

### Explainability

- [ ] **Affected persons can request explanations** of AI-assisted decisions (GDPR today, for solely automated decisions with legal or similarly significant effects; AI Act Article 86 for high-risk decisions from 2 December 2027)
- [ ] **Explanations are given in accessible language**
- [ ] **Decision factors are documented and explainable**
- [ ] **Staff trained to explain AI outputs**

### Documentation Accessibility

- [ ] **System descriptions available** in plain language
- [ ] **User instructions provided and accessible**
- [ ] **Privacy notices updated** to reflect AI use
- [ ] **Website and customer communications updated** as needed

### Public Sector Additional Requirements

- [ ] **Register entries prepared** for high-risk systems (public authorities)
- [ ] **Citizen-facing materials explain AI use**
- [ ] **Appeals and redress processes documented and communicated**

[More on transparency obligations →](/en/rights/ai-transparency)

---

## 5. Governance

*Who's responsible, and are they prepared?*

### Accountability

- [ ] **Responsible person or team identified** for AI governance
- [ ] **Roles and responsibilities documented**
- [ ] **Reporting lines established** for AI issues
- [ ] **Board/leadership oversight defined** where appropriate

### AI Literacy and Training (applies now to all organisations)

Since July 2026 the AI literacy rule (Article 4) requires organisations to *take measures to support* AI literacy among their staff. You don't have to guarantee a specific level for each person, but it's wise to be able to show what you did.

- [ ] **Staff using AI systems are trained** on proper use
- [ ] **Training covers system limitations and risks**
- [ ] **Training covers when to override or escalate**
- [ ] **Training is matched to role** (a recruiter using a screening tool needs more than someone drafting emails)
- [ ] **Training records maintained**
- [ ] **Refresher training scheduled** as tools change

### Incident Response

- [ ] **Incident reporting process defined**
- [ ] **Staff know how to report AI problems**
- [ ] **Response procedures documented**
- [ ] **Serious incident reporting procedures** prepared for high-risk systems
- [ ] **Communication templates prepared** for stakeholder notification

### Regular Review

- [ ] **Periodic review scheduled** (at least annually)
- [ ] **Review process documented**
- [ ] **Previous issues tracked and followed up**
- [ ] **Compliance status reported to leadership**

### Vendor Management

- [ ] **Asked vendors how their AI is classified** and what their AI Act roadmap is to December 2027
- [ ] **Contract terms reviewed** for AI Act, GDPR and liability requirements
- [ ] **Vendor documentation obtained and filed**
- [ ] **Vendor performance monitored**
- [ ] **Exit strategy exists** for each AI vendor

### Related Laws to Track

- [ ] **Product Liability Directive:** the new rules covering software, including AI, apply to products placed on the market from **9 December 2026**. Review liability terms if you make or sell products with AI.
- [ ] **Platform Work Directive:** if you run a digital labour platform, national rules on algorithmic management (transparency, human review of automated decisions) are due by **2 December 2026**. Many countries are late, so check yours.

[More on governance →](/en/guidelines)

---

## Timeline Reference

### What's Required When?

| Date | Requirement | Applies To |
|------|-------------|------------|
| **2 February 2025** | Prohibited practices banned; AI literacy | All organisations using AI |
| **2 August 2025** | General-purpose AI model rules | GPAI model providers |
| **27 July 2026** | New AI literacy wording (Art. 4); bias-detection data rule (Art. 4a) | All organisations / providers and deployers |
| **2 August 2026** | Transparency obligations (Art. 50); enforcement by authorities | Chatbot, deepfake, emotion recognition and generative AI users/providers |
| **2 December 2026** | New ban on non-consensual intimate deepfakes; machine-readable marking deadline for existing generative AI | All / generative AI providers |
| **2 August 2027** | AI regulatory sandbox in every Member State | National authorities (SMEs get priority access) |
| **2 December 2027** | High-risk requirements for Annex III systems | Providers and deployers of high-risk AI |
| **2 August 2028** | High-risk requirements for AI in regulated products (Annex I) | Product manufacturers and their AI suppliers |
| **2 August 2030** | Existing high-risk systems used by public authorities | Public authorities |

Full overview: [EU AI Act timeline](/en/timeline).

### Priority Actions by Phase

**Now**
- Complete your AI inventory and record your role (provider or deployer)
- Confirm no prohibited practices are in use; stop any you find
- Put AI literacy measures in place: basic training for everyone, deeper training for people using AI in decisions
- Check transparency: chatbot disclosure, deepfake and public-interest text labelling, informing people about emotion recognition or biometric categorisation
- Adopt human-first habits now: a named human reviews important AI-assisted decisions

**By 2 December 2026**
- Check that no tool you use or offer can generate intimate images of real people without consent
- If you provide generative AI that was on the market before 2 August 2026: machine-readable marking in place
- Review supplier contracts and product liability exposure (Product Liability Directive applies from 9 December 2026)
- Digital labour platforms: check national rules implementing the Platform Work Directive

**Before 2 December 2027**
- Finalise risk classification for Annex III systems (re-check against the final high-risk guidelines once adopted)
- Complete Section 3 for every high-risk system: risk management, data governance, documentation, human oversight, accuracy and security
- Prepare fundamental rights impact assessments where required, using the AI Office template
- Prepare EU database registration, including Article 6(3) "not high-risk" systems
- Get compliance documentation and instructions for use from vendors
- SMEs: consider applying for a national regulatory sandbox (all Member States must have one by 2 August 2027)

**By 2 August 2028**
- Manufacturers of regulated products with AI (medical devices, toys, lifts, vehicles and similar): high-risk requirements complete, aligned with existing product conformity processes
- Ongoing monitoring, incident reporting and annual reviews for all high-risk systems

**Public authorities:** high-risk systems already in use must comply by **2 August 2030** at the latest. New systems follow the dates above.

---

## Quick Reference: Who Needs What?

| Organisation Type | Likely Requirements |
|-------------------|---------------------|
| **SME using common AI tools** | AI literacy measures, no prohibited uses |
| **SME with customer-facing AI** | Plus transparency disclosures and labelling (now) |
| **Organisation using HR/credit AI** | High-risk deployer duties from 2 Dec 2027; prepare now |
| **Educational institution** | High-risk for admissions/assessment AI from 2 Dec 2027; emotion recognition ban now |
| **Public sector body** | High-risk duties, FRIA, registration, redress; existing systems by 2 Aug 2030 |
| **AI developer (provider)** | Provider obligations, marking of generative output, conformity assessment (a check, by the provider or an independent body, that the system meets the rules) for high-risk |

---

## Penalties at a Glance

Maximum fines under the AI Act (Article 99). For each, the higher of the two amounts applies, except for SMEs (including start-ups), where the **lower** amount applies. Small mid-caps also get the lower amount, except for fines for prohibited practices.

| Violation | Maximum Fine |
|-----------|--------------|
| Prohibited AI practices | €35 million or 7% of worldwide annual turnover |
| Most other obligations, including transparency | €15 million or 3% |
| Incorrect or misleading information to authorities | €7.5 million or 1% |

Enforcement powers have been live since 2 August 2026, although many Member States were slow to appoint their authorities.

---

## Tracking Your Progress

### Compliance Status Summary

| Section | Status | Last Reviewed | Next Review |
|---------|--------|---------------|-------------|
| 1. AI Inventory | ☐ Not started ☐ In progress ☐ Complete | | |
| 2. Risk Classification | ☐ Not started ☐ In progress ☐ Complete | | |
| 3. High-Risk Compliance | ☐ N/A ☐ Not started ☐ In progress ☐ Complete | | |
| 4. Transparency | ☐ Not started ☐ In progress ☐ Complete | | |
| 5. Governance | ☐ Not started ☐ In progress ☐ Complete | | |

---

## Resources and Help

### Official Resources
- **[EU AI Act text](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)**: the official legal text
- **[Digital Omnibus on AI](https://eur-lex.europa.eu/eli/reg/2026/1744/oj)**: the 2026 amending regulation
- **[AI Act Service Desk](https://ai-act-service-desk.ec.europa.eu/)**: the Commission's single information platform
- **National AI authorities**: check your country's designated authority (in Denmark: Digitaliseringsstyrelsen)

All Commission guidelines are non-binding; the Court of Justice of the EU gives the authoritative interpretation.

### This Site
- [For Organisations (Overview) →](/en/for-organizations)
- [SME Guide →](/en/for-organizations/sme-guide)
- [Educators Guide →](/en/for-organizations/educators)
- [Public Sector Guide →](/en/for-organizations/public-sector)
- [AI Development Guidelines →](/en/guidelines)
- [AI Ethics Principles →](/en/principles)

### When to Get Help
Consider professional assistance if:
- You have high-risk AI systems
- You're unsure about classification
- You operate in multiple jurisdictions
- You've identified potential prohibited uses
- You're developing AI products

---

*This checklist is for guidance only and is not legal advice. For specific legal requirements in your situation, consult qualified legal or compliance professionals.*

## Sources

- [Regulation (EU) 2024/1689 (AI Act), EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
- [Regulation (EU) 2026/1744 (Digital Omnibus on AI), EUR-Lex](https://eur-lex.europa.eu/eli/reg/2026/1744/oj)
- [European Commission: Transparency obligations under Article 50 (FAQ)](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act)
- [European Commission: Draft guidelines on classifying high-risk AI systems](https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems)
- [Council of the EU: AI Act timeline](https://www.consilium.europa.eu/en/policies/artificial-intelligence-act/timeline-artificial-intelligence/)
