import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface MarkdownContent {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  language: string;
  content: string;
  contentHtml: string;
}

export interface MarkdownMetadata {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  language: string;
}

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Get all markdown files for a specific language
 */
export function getContentSlugs(locale: string): string[] {
  const localeDir = path.join(contentDirectory, locale);
  
  if (!fs.existsSync(localeDir)) {
    return [];
  }
  
  return fs.readdirSync(localeDir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
}

/**
 * Get markdown content by slug and locale
 */
export async function getContentBySlug(
  slug: string,
  locale: string
): Promise<MarkdownContent | null> {
  try {
    const fullPath = path.join(contentDirectory, locale, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse frontmatter and content
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title || '',
      description: data.description,
      date: data.date,
      language: data.language || locale,
      content,
      contentHtml,
    };
  } catch (error) {
    console.error(`Error loading content for slug: ${slug}, locale: ${locale}`, error);
    return null;
  }
}

/**
 * Get all markdown content metadata for a locale
 */
export function getAllContentMetadata(locale: string): MarkdownMetadata[] {
  const slugs = getContentSlugs(locale);
  
  return slugs.map(slug => {
    const fullPath = path.join(contentDirectory, locale, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      description: data.description,
      date: data.date,
      language: data.language || locale,
    };
  }).sort((a, b) => {
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
  const fullPath = path.join(contentDirectory, locale, `${slug}.md`);
  return fs.existsSync(fullPath);
}
