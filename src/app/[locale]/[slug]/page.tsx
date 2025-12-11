import { notFound } from 'next/navigation';
import { getContentBySlug, getContentSlugs } from '@/lib/markdown';
import Link from 'next/link';
import { locales, resolveLocale, messagesByLocale } from '@/i18n';

export const dynamic = 'force-static';

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  
  locales.forEach((locale) => {
    const slugs = getContentSlugs(locale);
    slugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });
  
  return params;
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const resolvedLocale = resolveLocale(locale);
  const content = await getContentBySlug(slug, resolvedLocale);
  const messages = messagesByLocale[resolvedLocale];
  const nav = messages.nav;
  const site = messages.site;
  const withLocale = (path: string) => `/${resolvedLocale}${path}`;

  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                href={withLocale('')}
                className="text-xl font-bold text-blue-600 dark:text-blue-400"
              >
                {site.title}
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link 
                href={withLocale('/about')} 
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
              >
                {nav.about}
              </Link>
              <Link 
                href={withLocale('/principles')} 
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
              >
                {nav.principles}
              </Link>
              <Link 
                href={withLocale('/guidelines')} 
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
              >
                {nav.guidelines}
              </Link>
              <Link 
                href={withLocale('/resources')} 
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
              >
                {nav.resources}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {content.title}
          </h1>
          {content.description && (
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {content.description}
            </p>
          )}
          {content.date && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Last updated: {new Date(content.date).toLocaleDateString()}
            </p>
          )}
        </header>

        <div 
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-p:text-gray-700 dark:prose-p:text-gray-300
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-ul:text-gray-700 dark:prose-ul:text-gray-300
            prose-ol:text-gray-700 dark:prose-ol:text-gray-300
            prose-li:text-gray-700 dark:prose-li:text-gray-300
            prose-code:text-blue-600 dark:prose-code:text-blue-400
            prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
            prose-blockquote:border-blue-500 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300"
          dangerouslySetInnerHTML={{ __html: content.contentHtml }}
        />
      </article>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
