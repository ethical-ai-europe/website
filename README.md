# Ethical AI in Europe

**AI can serve people, not just profit.** This project exists to make that visible.

🌐 **Read the site:** <https://ethical-ai-europe.github.io/website/>

---

## Why this project exists

Most of what we hear about AI is about speed, cost savings and revenue. Those things matter. But AI is also deciding who gets a job interview, which patient is seen first, how a child's homework is graded and whether a benefit claim is approved. When the only question is *"does it make money?"*, people get left out.

We believe AI should be **human first**:

- **People stay in charge.** A human should be able to understand, question and override an AI decision that affects someone's life.
- **Nobody needs to be an engineer to have a say.** If AI is used on you, you deserve a plain explanation of what it does and what your rights are.
- **Ethics is practical, not abstract.** Responsible AI comes from concrete habits: clear instructions, guardrails, human checks and honest documentation.
- **The human factor is the key factor.** Technology changes quickly; trust, judgement and care are what make it work for everyone.

Europe has given us a tool to insist on this: the **EU AI Act**. This site explains it in plain language, for citizens, parents, teachers, workers, journalists, public officials and business owners. It also shows what you can actually do with it.

> This is an educational resource, not legal advice.

---

## For non-technical readers

You don't need to know anything about code or GitHub to use or support this project.

### What you'll find on the site

| If you are… | Start here |
| --- | --- |
| Worried about AI at work, in school or at the doctor | [AI in daily life](https://ethical-ai-europe.github.io/website/en/daily-life) |
| Wondering what you're entitled to | [Your AI rights](https://ethical-ai-europe.github.io/website/en/rights) |
| Running a business or team that uses AI | [For organizations](https://ethical-ai-europe.github.io/website/en/for-organizations) |
| A teacher, journalist or public official | [Start where you are](https://ethical-ai-europe.github.io/website/en) (homepage) |
| Ready to do something about it | [Practical steps](https://ethical-ai-europe.github.io/website/en/take-action) |

### How you can help, without writing code

Every one of these is a simple web form. You only need a free GitHub account.

1. **Share a story.** Has AI affected a decision about you, your family or your work, for better or worse? Real stories help people recognise what's happening. [Share your story →](https://github.com/ethical-ai-europe/website/issues/new?template=share-a-story.yml)
2. **Point out something unclear or wrong.** If a page confused you, that's useful to us. [Suggest an improvement →](https://github.com/ethical-ai-europe/website/issues/new?template=suggest-improvement.yml)
3. **Help translate.** The site is in English today. If you can read it in Danish, German, French, Italian, Spanish or another EU language, [offer to translate →](https://github.com/ethical-ai-europe/website/issues/new?template=suggest-improvement.yml&title=Translation%3A+)
4. **Spread the word.** Share a page that helped you with a colleague, a parent group or your union. That's how awareness grows.

You can share anonymously. Please leave out names and personal details, both your own and other people's.

### A few words you'll see

- **EU AI Act:** the European law that sets rules for AI based on how risky its use is.
- **High-risk AI:** AI used in areas like hiring, education, healthcare, credit or public services, where mistakes can seriously affect people's lives.
- **Human oversight:** a real person who can check, correct or stop what an AI system does.
- **Transparency:** being told when AI is used and getting a meaningful explanation of how it reached a result.

---

## For contributors and developers

The site is a static [Next.js](https://nextjs.org) app deployed to GitHub Pages. All content lives in plain Markdown files, so editing text is as easy as editing a document.

### Run it locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Before opening a pull request:

```bash
npm run lint && npm run typecheck && npm run build
```

### Add or edit a page

Pages live in `content/en/`. Create a Markdown file with a short header:

```markdown
---
title: "Your page title"
description: "One sentence that explains the page"
date: "2026-11-06"
language: "en"
---

Your content here. Link to other pages with paths like [your rights](/en/rights).
```

The file `content/en/rights/my-topic.md` becomes `/en/rights/my-topic`. New pages are added to the sitemap automatically.

**Writing guidelines:** write for a curious 15-year-old. Use short sentences, explain any term the first time you use it, cite sources for legal claims, and always end with what the reader can *do*.

### Add a language

1. Add the locale to `src/i18n.ts`.
2. Create `messages/<locale>.json` with the interface text.
3. Add translated Markdown to `content/<locale>/`, mirroring the English folder structure.

### Project structure

```
content/en/        Markdown pages (rights, daily-life, issues, for-organizations, take-action, stories)
messages/en.json   Interface text (navigation, homepage)
src/app/           Pages, sitemap, robots, metadata
src/components/    Navigation, footer, cards, table of contents
src/lib/           Markdown loading, site config, legacy redirects
public/            Images, share image, search-engine verification files
```

**Stack:** Next.js 16 (static export) · TypeScript · Tailwind CSS 4 · next-intl · remark.

Every push to `main` builds and deploys to GitHub Pages automatically. See also [CONTRIBUTING.md](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Who's behind this

**European Center for Ethical and Human Centric AI.** Initiated by Stefano Vincenti ([aitrainer.dk](https://aitrainer.dk)), who trains organisations to use AI with people first. An open initiative from Denmark, working for a Europe where AI is used responsibly and people stay at the centre.

Licensed under [MIT](LICENSE).
