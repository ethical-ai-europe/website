# Contributing Guide

Thanks for helping improve Ethical AI in Europe! This project welcomes
contributions that add content, fix issues, and expand translations.

## Quick Start

1. Install dependencies:  
   ```bash
   npm install
   ```
2. Run the dev server:  
   ```bash
   npm run dev
   ```
3. Open <http://localhost:3000> to preview changes.

## Adding or Updating Content

- Place English content in `content/en/` (or the appropriate locale folder).
- Use Markdown with frontmatter:
  ```yaml
  ---
  title: "Page title"
  description: "Short summary"
  date: "YYYY-MM-DD"
  language: "en"
  ---
  ```
- Keep file names lowercase with hyphens (e.g., `ethical-guidelines.md`).
- Write clear, accessible copy and cite sources where appropriate.

## Adding Translations

1. Add the locale to `src/i18n.ts`.
2. Create `messages/<locale>.json` with UI strings.
3. Create `content/<locale>/` and add translated Markdown files that mirror the
   English structure and frontmatter.

## Pull Request Checklist

- Keep changes focused and include a brief summary of updates.
- Verify pages render locally before opening a PR.
- Ensure links and references are accurate.
- By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
