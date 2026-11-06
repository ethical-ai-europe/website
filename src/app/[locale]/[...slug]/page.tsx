import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentExists, getContentBySlug, getContentSlugs } from '@/lib/markdown';
import Link from 'next/link';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { defaultLocale, format, locales, resolveLocale, messagesByLocale, type Locale } from '@/i18n';
import { chromeProps, hreflangAlternates } from '@/lib/localized-links';
import { Navigation, SiteFooter, EnhancedContent, TableOfContents } from '@/components';
import { LEGACY_REDIRECTS, OG_IMAGE, ORG_NAME, SITE_NAME, absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

type PageParams = Promise<{ locale: string; slug: string[] }>;

export function generateStaticParams() {
  const params: { locale: string; slug: string[] }[] = [];

  locales.forEach((locale) => {
    // Legacy flat URLs only ever existed in English.
    const legacy = locale === defaultLocale ? Object.keys(LEGACY_REDIRECTS) : [];
    const slugs = [...getContentSlugs(locale), ...legacy];
    slugs.forEach((slug) => {
      // Split nested slugs into array segments
      params.push({ locale, slug: slug.split('/') });
    });
  });

  return params;
}

function humanize(segment: string): string {
  const words = segment.replace(/-/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function sectionName(segment: string, locale: Locale): string {
  const sections: Record<string, string> = messagesByLocale[locale].page.sections;
  return sections[segment] ?? humanize(segment);
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolvedLocale = resolveLocale(locale);
  const slugPath = slug.join('/');
  const target = resolvedLocale === defaultLocale ? LEGACY_REDIRECTS[slugPath] : undefined;

  if (target) {
    return {
      robots: { index: false, follow: true },
      alternates: { canonical: `/${resolvedLocale}/${target}` },
    };
  }

  const content = await getContentBySlug(slugPath, resolvedLocale);
  if (!content) return {};

  const path = `/${resolvedLocale}/${slugPath}`;
  const { site } = messagesByLocale[resolvedLocale];
  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: path, languages: hreflangAlternates(`/${slugPath}`) },
    openGraph: {
      type: 'article',
      url: path,
      title: content.title,
      description: content.description,
      siteName: SITE_NAME,
      locale: site.ogLocale,
      images: [OG_IMAGE],
      ...(content.date ? { modifiedTime: new Date(content.date).toISOString() } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function ContentPage({
  params,
}: {
  params: PageParams;
}) {
  const { locale, slug } = await params;
  const resolvedLocale = resolveLocale(locale);
  setRequestLocale(resolvedLocale);
  const m = messagesByLocale[resolvedLocale];
  // Join the slug array back into a path string
  const slugPath = slug.join('/');

  const legacyTarget = resolvedLocale === defaultLocale ? LEGACY_REDIRECTS[slugPath] : undefined;
  if (legacyTarget) {
    // A static host can't send HTTP 301s, so render a meta-refresh page
    // (works without JavaScript) that points at the canonical URL.
    const target = `/${resolvedLocale}/${legacyTarget}`;
    const targetHref = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${target}`.replace(/^\/\//, '/');
    return (
      <main className="max-w-xl mx-auto p-8 text-center">
        <meta httpEquiv="refresh" content={`0; url=${targetHref}`} />
        <p>
          {m.page.moved} <Link href={target} className="text-link">{target}</Link>.
        </p>
      </main>
    );
  }

  const content = await getContentBySlug(slugPath, resolvedLocale);
  const chrome = chromeProps(resolvedLocale, `/${slugPath}`);

  if (!content) {
    notFound();
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const pageUrl = absoluteUrl(`/${resolvedLocale}/${slugPath}`);
  const breadcrumbItems = [
    { name: m.page.home, url: absoluteUrl(`/${resolvedLocale}`) },
    ...slug.map((segment, i) => ({
      name: i === slug.length - 1 ? content.title : sectionName(segment, resolvedLocale),
      url: absoluteUrl(`/${resolvedLocale}/${slug.slice(0, i + 1).join('/')}`),
    })),
  ];
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: content.title,
      description: content.description,
      inLanguage: resolvedLocale,
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      ...(content.date ? { dateModified: content.date } : {}),
      author: { '@type': 'Organization', name: ORG_NAME },
      publisher: { '@type': 'Organization', name: ORG_NAME },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    },
  ];

  const section = slug.length > 1 && contentExists(slug[0], resolvedLocale) ? { name: sectionName(slug[0], resolvedLocale), href: `/${resolvedLocale}/${slug[0]}` } : null;

  return (
    <div className="min-h-screen bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Navigation {...chrome.navigation} showActiveState={true} />

      {/* Page header */}
      <header className="border-b border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 md:pt-24 md:pb-20">
          <nav aria-label={m.page.breadcrumb} className="eyebrow flex flex-wrap gap-2">
            <Link href={`/${resolvedLocale}`} className="hover:text-accent">{m.page.home}</Link>
            {section && (
              <>
                <span aria-hidden="true">/</span>
                <Link href={section.href} className="hover:text-accent">{section.name}</Link>
              </>
            )}
          </nav>
          <h1 className="display mt-6 text-[2.5rem] sm:text-5xl md:text-[4.25rem] text-ink max-w-4xl">
            {content.title}
          </h1>
          {content.description && (
            <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">{content.description}</p>
          )}
          {content.date && (
            <p className="mt-6 text-sm text-muted">
              {m.page.lastUpdated}{' '}
              <time dateTime={content.date}>
                {new Date(content.date).toLocaleDateString(m.page.dateLocale, { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
            </p>
          )}
        </div>
      </header>

      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid gap-12 xl:grid-cols-[minmax(0,46rem)_16rem] xl:justify-between">
        <article className="min-w-0">
          {content.image && (
            <div className="relative mb-12 w-full aspect-[16/7] overflow-hidden rounded-lg">
              <Image
                src={
                  content.image.startsWith('/') && basePath && basePath !== '/'
                    ? `${basePath}${content.image}`
                    : content.image
                }
                alt={content.imageAlt || format(m.page.imageAlt, { title: content.title })}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}
          <div className="article">
            <EnhancedContent html={content.contentHtml} />
          </div>
          <div className="mt-20 pt-8 border-t border-ink flex flex-wrap gap-x-8 gap-y-4 justify-between">
            <Link href={section ? section.href : `/${resolvedLocale}`} className="text-link">
              {section ? format(m.page.backTo, { section: section.name }) : m.page.backHome}
            </Link>
            <Link href={`/${resolvedLocale}/take-action`} className="text-link">
              {m.page.whatYouCanDo}
            </Link>
          </div>
        </article>
        <aside className="hidden xl:block">
          <TableOfContents html={content.contentHtml} />
        </aside>
      </main>

      <SiteFooter {...chrome.footer} />
    </div>
  );
}
