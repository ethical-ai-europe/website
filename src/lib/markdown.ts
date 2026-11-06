import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

export interface MarkdownContent {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  language: string;
  image?: string;
  imageAlt?: string;
  content: string;
  contentHtml: string;
}

export interface MarkdownMetadata {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  language: string;
  image?: string;
  imageAlt?: string;
}

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Markdown content links to site pages with root-relative URLs such as
 * `/en/rights`. The site is deployed under a base path (e.g. `/website` on
 * GitHub Pages), which Next.js only adds to <Link> components, not to raw HTML.
 * Prefix root-relative href/src attributes so in-content links resolve.
 */
export function withBasePath(html: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
  if (!basePath || basePath === '/') return html;
  return html.replace(
    /\b(href|src)="\/(?!\/)/g,
    (_match, attr: string) => `${attr}="${basePath}/`
  );
}

/**
 * Recursively get all markdown files in a directory
 */
function getMarkdownFilesRecursive(dir: string, baseDir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const slugs: string[] = [];
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Recursively search subdirectories
      slugs.push(...getMarkdownFilesRecursive(fullPath, baseDir));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // Get relative path from base directory and remove .md extension
      const relativePath = path.relative(baseDir, fullPath);
      // Convert to slug: handle index.md files and regular files
      let slug = relativePath.replace(/\.md$/, '');
      // Convert path separators to forward slashes for URL compatibility
      slug = slug.split(path.sep).join('/');
      // Handle index.md files: directory/index -> directory
      if (slug.endsWith('/index')) {
        slug = slug.replace(/\/index$/, '');
      } else if (slug === 'index') {
        // Skip root index.md (would conflict with homepage)
        continue;
      }
      slugs.push(slug);
    }
  }
  
  return slugs;
}

/**
 * Get all markdown files for a specific language
 */
export function getContentSlugs(locale: string): string[] {
  const localeDir = path.join(contentDirectory, locale);
  return getMarkdownFilesRecursive(localeDir, localeDir);
}

/**
 * Get markdown content by slug and locale
 * Supports nested paths like 'take-action/toolkit'
 */
export async function getContentBySlug(
  slug: string,
  locale: string
): Promise<MarkdownContent | null> {
  try {
    // Try slug.md first, then slug/index.md for directories
    let fullPath = path.join(contentDirectory, locale, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      // Try as directory with index.md
      fullPath = path.join(contentDirectory, locale, slug, 'index.md');
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse frontmatter and content
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm) // tables, task lists, strikethrough, autolinks
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = withBasePath(processedContent.toString());

    return {
      slug,
      title: data.title || '',
      description: data.description,
      date: data.date,
      language: data.language || locale,
      image: data.image,
      imageAlt: data.imageAlt,
      content,
      contentHtml,
    };
  } catch (error) {
    console.error(`Error loading content for slug: ${slug}, locale: ${locale}`, error);
    return null;
  }
}

/**
 * Get the file path for a slug - handles both file.md and directory/index.md patterns
 */
function getFilePath(slug: string, locale: string): string | null {
  // Try slug.md first
  let fullPath = path.join(contentDirectory, locale, `${slug}.md`);
  if (fs.existsSync(fullPath)) {
    return fullPath;
  }
  
  // Try slug/index.md for directories
  fullPath = path.join(contentDirectory, locale, slug, 'index.md');
  if (fs.existsSync(fullPath)) {
    return fullPath;
  }
  
  return null;
}

/**
 * Get all markdown content metadata for a locale
 */
export function getAllContentMetadata(locale: string): MarkdownMetadata[] {
  const slugs = getContentSlugs(locale);
  
  const metadata: MarkdownMetadata[] = [];
  
  for (const slug of slugs) {
    const fullPath = getFilePath(slug, locale);
    if (!fullPath) {
      continue;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    metadata.push({
      slug,
      title: data.title || '',
      description: data.description,
      date: data.date,
      language: data.language || locale,
      image: data.image,
      imageAlt: data.imageAlt,
    });
  }
  
  return metadata.sort((a, b) => {
    // Sort by date if available, otherwise by title
    if (a.date && b.date) {
      return a.date < b.date ? 1 : -1;
    }
    return a.title.localeCompare(b.title);
  });
}

/**
 * Check if content exists for a slug and locale
 */
export function contentExists(slug: string, locale: string): boolean {
  return getFilePath(slug, locale) !== null;
}
