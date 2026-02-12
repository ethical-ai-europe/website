import { notFound } from 'next/navigation';
import { getContentBySlug, getContentSlugs } from '@/lib/markdown';
import Link from 'next/link';
import Image from 'next/image';
import { locales, resolveLocale, messagesByLocale } from '@/i18n';
import { Navigation, FooterNavigation, EnhancedContent, TableOfContents } from '@/components';

export const dynamic = 'force-static';

export function generateStaticParams() {
  const params: { locale: string; slug: string[] }[] = [];
  
  locales.forEach((locale) => {
    const slugs = getContentSlugs(locale);
    slugs.forEach((slug) => {
      // Split nested slugs into array segments
      params.push({ locale, slug: slug.split('/') });
    });
  });
  
  return params;
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  const resolvedLocale = resolveLocale(locale);
  // Join the slug array back into a path string
  const slugPath = slug.join('/');
  const content = await getContentBySlug(slugPath, resolvedLocale);
  const { nav, site } = messagesByLocale[resolvedLocale];

  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <Navigation 
        locale={resolvedLocale} 
        siteTitle={site.title} 
        nav={nav}
        showActiveState={true}
      />

      {/* Hero Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {content.title}
          </h1>
          {content.description && (
            <p className="text-xl text-blue-100">
              {content.description}
            </p>
          )}
          {content.date && (
            <p className="text-sm text-blue-200 mt-4">
              Last updated: {new Date(content.date).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Table of Contents for longer pages */}
        <TableOfContents html={content.contentHtml} />
        
        {/* Content Card */}
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 md:p-12 -mt-8 mb-16">
          {/* Optional page image (from markdown frontmatter) */}
          {content.image && (
            <div className="mb-10">
              <div className="relative w-full aspect-[16/6] overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={content.image}
                  alt={content.imageAlt || `${content.title} illustration`}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div 
            className="prose dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700
              prose-h3:mt-9 prose-h3:mb-3
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-8 prose-p:mb-7
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-ul:my-7 prose-ul:space-y-4 prose-ul:text-gray-700 dark:prose-ul:text-gray-300
              prose-ol:my-7 prose-ol:space-y-3 prose-ol:text-gray-700 dark:prose-ol:text-gray-300
              prose-li:text-gray-700 dark:prose-li:text-gray-300
              prose-code:text-blue-600 dark:prose-code:text-blue-400
              prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
              prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-blockquote:rounded-r-lg prose-blockquote:py-1
              prose-sm sm:prose-base lg:prose-lg"
          >
            <EnhancedContent html={content.contentHtml} />
          </div>
        </article>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Footer Navigation */}
          <FooterNavigation locale={resolvedLocale} nav={nav} />
          <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
            <Link href={`/${resolvedLocale}`} className="text-blue-600 dark:text-blue-400 hover:underline">
              Return to Homepage
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
