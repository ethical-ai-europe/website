# Ethical AI in Europe

A multilingual awareness website about ethical and lawful AI use under the EU AI Act. Built with Next.js 15, TypeScript, and next-intl.

## 🎯 About

This project provides educational resources about:
- The EU AI Act and its requirements
- Ethical AI principles
- Practical guidelines for AI development
- Compliance and implementation strategies

🌐 Live site: <https://ethical-ai.eu>

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown files with gray-matter
- **Internationalization**: next-intl
- **Markdown Processing**: remark and rehype

## 📁 Project Structure

```
website/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Locale-based routing
│   │   │   ├── layout.tsx     # Locale layout with i18n
│   │   │   ├── page.tsx       # Homepage
│   │   │   └── [slug]/        # Dynamic content pages
│   │   │       └── page.tsx
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Root redirect
│   │   └── globals.css
│   ├── lib/
│   │   └── markdown.ts        # Markdown utilities
│   ├── i18n.ts                # i18n configuration
│   └── middleware.ts          # Locale detection
├── content/
│   └── en/                    # English content
│       ├── about.md
│       ├── principles.md
│       └── guidelines.md
├── messages/
│   └── en.json                # UI translations
└── public/
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Adding Content

### Create a New Page

1. Add a markdown file to `content/en/` (or other locale):

```markdown
---
title: "Your Page Title"
description: "Brief description"
date: "2024-12-10"
language: "en"
---

# Your Page Title

Your content here...
```

2. The page will be automatically available at `/[locale]/[filename]`

### Add a New Language

1. Add the locale to `src/i18n.ts`:
```typescript
export const locales = ['en', 'de'] as const;
```

2. Create translation file in `messages/[locale].json`
3. Create content directory `content/[locale]/`
4. Add markdown content in the new language

## 🌐 Internationalization

This site uses next-intl for internationalization:

- **Automatic locale detection** from URL
- **Locale-based routing**: `/en/about`, `/de/about`
- **Fallback to English** as default locale
- **Message translations** in `messages/` directory
- **Content translations** in `content/` directory

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

Built with ❤️ for ethical AI development in Europe


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
