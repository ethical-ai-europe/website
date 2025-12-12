import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { resolveLocale, messagesByLocale } from '@/i18n';
import { Navigation, FooterNavigation, IssueCard, StoryCard } from '@/components';
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

        {/* Issue-Focused Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <IssueCard
            icon="⚖️"
            title="Know Your Rights"
            description="AI is making decisions about your job, health, and finances. Learn what protections you have."
            href={withLocale('/rights')}
          />
          <IssueCard
            icon="🏠"
            title="AI in Daily Life"
            description="From school to healthcare to hiring—understand how AI affects the systems you rely on."
            href={withLocale('/daily-life')}
          />
          <IssueCard
            icon="🌍"
            title="What&apos;s at Stake"
            description="Jobs, democracy, privacy—explore the societal questions AI is forcing us to confront."
            href={withLocale('/issues')}
          />
          <IssueCard
            icon="✊"
            title="Make Your Voice Heard"
            description="Exercise your rights, join the conversation, and help shape AI&apos;s future in Europe."
            href={withLocale('/take-action')}
          />
        </div>

        {/* Rights-Focused Highlights */}
        <div className="bg-blue-600 dark:bg-blue-700 rounded-lg shadow-lg p-8 text-white mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Your AI Rights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">✓</div>
              <div className="font-semibold">Right to know when AI affects you</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">✓</div>
              <div className="font-semibold">Right to explanation of AI decisions</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">✓</div>
              <div className="font-semibold">Right to human review</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">✓</div>
              <div className="font-semibold">World&apos;s strongest AI protections</div>
            </div>
          </div>
        </div>

        {/* What Brought You Here? Quick Links */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            What brought you here?
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={withLocale('/rights/workplace-surveillance')}
              className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              AI at my workplace
            </Link>
            <Link
              href={withLocale('/daily-life/education')}
              className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              My child&apos;s school uses AI
            </Link>
            <Link
              href={withLocale('/for-organizations/sme-guide')}
              className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              I&apos;m deploying AI in my business
            </Link>
            <Link
              href={withLocale('/rights')}
              className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              I want to understand my rights
            </Link>
          </div>
        </div>

        {/* Featured Story */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Featured Story
          </h2>
          <div className="max-w-2xl mx-auto">
            <StoryCard
              title="When the Algorithm Said No"
              excerpt="How one job seeker challenged an AI hiring decision—and won."
              category="Workplace"
              href={withLocale('/stories/algorithm-said-no')}
            />
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-3 italic">
              Coming soon
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Shape AI&apos;s Future?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Whether you want to understand your rights, protect your family, or join the movement for human-centered AI—your voice matters in shaping how AI works in Europe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={withLocale('/rights')}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Know Your Rights
            </Link>
            <Link
              href={withLocale('/take-action')}
              className="inline-flex items-center justify-center px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 dark:bg-gray-700 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-600"
            >
              Take Action
            </Link>
          </div>
        </div>
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
