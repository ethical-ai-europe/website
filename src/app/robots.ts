import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

// Note: crawlers only read robots.txt at the domain root. While the site is
// served from a GitHub Pages project path (/website), this file is informative;
// it becomes effective once the site moves to its own domain.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
