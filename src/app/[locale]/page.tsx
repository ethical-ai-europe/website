import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { resolveLocale, messagesByLocale } from '@/i18n';
import { Navigation, FooterNavigation, NewsletterSignup, ActionCTA } from '@/components';
import { PersonaSelector } from '@/components/PersonaSelector';

export const dynamic = 'force-static';

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const resolvedLocale = resolveLocale(params.locale);
  const t = useTranslations('home');
  const { nav, site } = messagesByLocale[resolvedLocale];
  const withLocale = (path: string) => `/${resolvedLocale}${path}`;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <Navigation 
        locale={resolvedLocale} 
        siteTitle={site.title} 
        nav={nav}
      />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 mb-8 font-medium max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={withLocale('/rights')}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg"
            >
              {t('cta.rights')}
            </Link>
            <Link
              href={withLocale('/take-action')}
              className="inline-flex items-center justify-center px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 md:text-lg"
            >
              {t('cta.action')}
            </Link>
          </div>
        </div>

        {/* Persona Selector */}
        <PersonaSelector locale={resolvedLocale} />

        {/* Key Topics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">⚖️</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              EU AI Act
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Understand Europe&apos;s comprehensive legal framework for artificial intelligence and its risk-based approach.
            </p>
            <Link href={withLocale('/about')} className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">
              Learn more →
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Ethical Principles
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Explore the core principles of ethical AI development: transparency, fairness, accountability, and human oversight.
            </p>
            <Link href={withLocale('/principles')} className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">
              Learn more →
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Practical Guidelines
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get actionable steps for developing AI systems that are both compliant and ethical from design to deployment.
            </p>
            <Link href={withLocale('/guidelines')} className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">
              Learn more →
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-blue-600 dark:bg-blue-700 rounded-lg shadow-lg p-8 text-white mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Why It Matters</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">€35M</div>
              <div className="text-blue-100">Maximum fine for non-compliance</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2027</div>
              <div className="text-blue-100">Full implementation deadline</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">27+</div>
              <div className="text-blue-100">EU member states affected</div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup Section */}
        <section className="mb-16" aria-labelledby="newsletter-section-heading">
          <h2 id="newsletter-section-heading" className="sr-only">Newsletter Signup</h2>
          <NewsletterSignup 
            variant="card"
            headline="Stay Informed, Stay Protected"
            description="Get weekly updates on AI rights, new tools, and ways to take action. Join a growing community of Europeans already subscribed."
          />
        </section>

        {/* Movement CTA Section */}
        <section className="mb-16">
          <ActionCTA
            variant="primary"
            headline="AI&apos;s Future Isn&apos;t Written Yet"
            description="Across Europe, people like you are standing up for human-centered AI. Join us."
            buttons={[
              { label: 'Join the Movement', href: withLocale('/take-action'), variant: 'primary' },
              { label: 'Read Our Story', href: withLocale('/about'), variant: 'secondary' }
            ]}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Footer Navigation */}
          <FooterNavigation locale={resolvedLocale} nav={nav} />
          <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
            <p className="mb-2">
              © {new Date().getFullYear()} Ethical AI in Europe. Built with Next.js and next-intl.
            </p>
            <p>
              This is an educational resource about the EU AI Act and ethical AI development.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
