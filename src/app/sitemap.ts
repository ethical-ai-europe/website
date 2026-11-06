import type { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import { hreflangAlternates } from '@/lib/localized-links';
import { getAllContentMetadata } from '@/lib/markdown';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

/** hreflang alternates as absolute URLs, for <xhtml:link> entries in the sitemap. */
function languageAlternates(path: string) {
  return Object.fromEntries(
    Object.entries(hreflangAlternates(path)).map(([lang, href]) => [lang, absoluteUrl(href)])
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => {
    const pages = getAllContentMetadata(locale).map((page) => ({
      url: absoluteUrl(`/${locale}/${page.slug}`),
      lastModified: page.date ? new Date(page.date) : undefined,
      changeFrequency: 'monthly' as const,
      // Section landing pages rank above deep pages.
      priority: page.slug.includes('/') ? 0.6 : 0.8,
      alternates: { languages: languageAlternates(`/${page.slug}`) },
    }));

    return [
      {
        url: absoluteUrl(`/${locale}`),
        changeFrequency: 'weekly' as const,
        priority: 1,
        alternates: { languages: languageAlternates('') },
      },
      ...pages,
    ];
  });
}
