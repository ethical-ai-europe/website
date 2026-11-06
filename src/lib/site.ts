/**
 * Site-wide constants used for SEO metadata, the sitemap and structured data.
 */

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH && process.env.NEXT_PUBLIC_BASE_PATH !== '/'
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : '';

/** Origin the site is served from. Override with NEXT_PUBLIC_SITE_ORIGIN for a custom domain. */
const origin = (
  process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://ethical-ai-europe.github.io'
).replace(/\/$/, '');

/** Absolute URL of the site root, including the base path (no trailing slash). */
export const SITE_URL = `${origin}${basePath}`;

export const SITE_NAME = 'Ethical AI in Europe';
export const SITE_DESCRIPTION =
  'A practical, plain-language guide to the EU AI Act: your rights when AI makes decisions about you, how AI affects daily life, and what organisations must do.';
export const ORG_NAME = 'European Center for Ethical and Human Centric AI';
export const ORG_GITHUB = 'https://github.com/ethical-ai-europe';

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Default social-share image (public/og-image.png). */
export const OG_IMAGE = {
  url: absoluteUrl('/og-image.png'),
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}: AI is changing Europe. You have rights.`,
};

/**
 * Old flat URLs that duplicated nested pages. They are kept as redirect pages
 * so existing links and search results land on the canonical URL.
 */
export const LEGACY_REDIRECTS: Record<string, string> = {
  'daily-life-education': 'daily-life/education',
  'daily-life-healthcare': 'daily-life/healthcare',
  'daily-life-hiring': 'daily-life/hiring',
  'daily-life-public-services': 'daily-life/public-services',
  'issues-democracy-society': 'issues/democracy-society',
  'issues-economic-impact': 'issues/economic-impact',
  'issues-labor-market': 'issues/labor-market',
  'issues-surveillance-privacy': 'issues/surveillance-privacy',
  'rights-algorithmic-decisions': 'rights/algorithmic-decisions',
  'rights-facial-recognition': 'rights/facial-recognition',
  'rights-right-to-explanation': 'rights/right-to-explanation',
  'rights-workplace-surveillance': 'rights/workplace-surveillance',
  'compliance-checklist': 'for-organizations/compliance-checklist',
  educators: 'for-organizations/educators',
  'public-sector': 'for-organizations/public-sector',
  'sme-guide': 'for-organizations/sme-guide',
};
