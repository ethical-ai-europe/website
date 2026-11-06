import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { resolveLocale, messagesByLocale } from '@/i18n';
import { Navigation, SiteFooter, IssueCard, StoryCard } from '@/components';
import { ArrowUpRight } from '@/components/IssueCard';
import { PersonaSelector } from '@/components/PersonaSelector';
import type { Metadata } from 'next';
import { OG_IMAGE, ORG_GITHUB, ORG_NAME, SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  alternates: { canonical: '/en' },
  // openGraph is replaced (not merged) per segment, so restate the defaults.
  openGraph: {
    type: 'website',
    url: '/en',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: 'en',
    images: [OG_IMAGE],
  },
};

const homeJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORG_NAME,
    alternateName: SITE_NAME,
    url: absoluteUrl('/en'),
    sameAs: [ORG_GITHUB],
    areaServed: 'EU',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: absoluteUrl('/en'),
    inLanguage: 'en',
    publisher: { '@type': 'Organization', name: ORG_NAME },
  },
];

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const resolvedLocale = resolveLocale(params.locale);
  const t = useTranslations('home');
  const { nav, site } = messagesByLocale[resolvedLocale];
  const withLocale = (path: string) => `/${resolvedLocale}${path}`;
  
  const safeguards = [
    'Notice and transparency when AI is used in defined cases.',
    'Information about an AI system’s purpose and limitations.',
    'Human oversight for high-impact uses.',
    'Risk management and documentation by those who deploy AI.',
  ];

  const quickLinks = [
    { label: 'AI at my workplace', href: '/rights/workplace-surveillance' },
    { label: 'My child’s school uses AI', href: '/daily-life/education' },
    { label: 'I’m deploying AI in my business', href: '/for-organizations/sme-guide' },
    { label: 'I want to understand my rights', href: '/rights' },
  ];

  return (
    <div className="min-h-screen bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd).replace(/</g, '\\u003c') }}
      />
      <Navigation locale={resolvedLocale} siteTitle={site.title} nav={nav} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <HeroLines className="pointer-events-none absolute -right-24 top-10 hidden md:block h-[560px] w-[560px] text-sage-light" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-32">
            <p className="eyebrow">EU AI Act · Plain-language guide</p>
            <h1 className="display mt-6 text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] text-ink max-w-4xl">
              {t('hero.title')}
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <Link
                href={withLocale('/rights')}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-7 py-3.5 text-[15px] font-medium text-paper hover:bg-accent transition-colors"
              >
                {t('cta.rights')} <span aria-hidden="true">→</span>
              </Link>
              <Link href={withLocale('/take-action')} className="text-link inline-flex items-center gap-2 text-[15px]">
                {t('cta.action')} <ArrowUpRight />
              </Link>
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-32">
          <h2 className="display text-4xl md:text-6xl text-ink">Where AI meets your life</h2>
          <div className="mt-14 grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
            <IssueCard
              index={1}
              title="Rights and safeguards"
              description="What transparency, access and review options may apply when AI is used in high-impact contexts."
              outcome="Know what you can ask for."
              href={withLocale('/rights')}
            />
            <IssueCard
              index={2}
              title="AI in daily life"
              description="How AI affects education, healthcare, hiring and the public services you rely on."
              outcome="See where AI is already at work."
              href={withLocale('/daily-life')}
            />
            <IssueCard
              index={3}
              title="Impacts and trade-offs"
              description="How AI changes outcomes for privacy, work and democracy, and which mitigations exist."
              outcome="Understand what is at stake."
              href={withLocale('/issues')}
            />
            <IssueCard
              index={4}
              title="What you can do"
              description="Questions to ask, documentation to request and how to escalate a concern."
              outcome="Turn concern into action."
              href={withLocale('/take-action')}
            />
          </div>
        </section>

        {/* Safeguards band */}
        <section className="bg-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28 grid gap-12 md:grid-cols-[1fr_1.35fr]">
            <div>
              <h2 className="display text-4xl md:text-6xl text-ink">What the law asks for</h2>
              <p className="mt-6 text-muted max-w-sm">
                The EU AI Act sets duties for those who build and deploy AI. These are the safeguards that matter most to
                the people affected.
              </p>
              <Link href={withLocale('/about')} className="text-link mt-8 inline-flex items-center gap-2">
                About the EU AI Act <ArrowUpRight />
              </Link>
            </div>
            <ol className="border-t border-ink">
              {safeguards.map((item, i) => (
                <li key={item} className="grid grid-cols-[3.5rem_1fr] items-baseline py-6 border-b border-[#d6cfc2]">
                  <span className="font-serif text-2xl text-sage tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-serif text-xl md:text-[1.4rem] leading-snug text-ink">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Personas */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid gap-6 md:grid-cols-[1fr_1.35fr] md:items-end mb-12">
            <h2 id="persona-selector-heading" className="display text-4xl md:text-6xl text-ink">
              Start where you are
            </h2>
            <p className="text-muted max-w-md">
              Pick the role that fits you best. Each guide explains what applies to you and what to do next.
            </p>
          </div>
          <PersonaSelector locale={resolvedLocale} />
        </section>

        {/* Mission */}
        <section className="bg-sage text-on-dark">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28 grid gap-12 md:grid-cols-[1.35fr_1fr] md:items-end">
            <div>
              <p className="eyebrow !text-sage-light">Why this exists</p>
              <h2 className="display mt-6 text-4xl md:text-6xl">
                AI can serve people, not just profit.
              </h2>
            </div>
            <div className="text-on-dark-muted space-y-5 text-lg">
              <p>
                AI already helps decide who gets an interview, which patient is seen first and whether a claim is approved.
                When the only question is whether it pays, people get left out.
              </p>
              <p className="text-on-dark">
                We believe in AI that is human first: people stay in charge, decisions can be explained, and you don&apos;t
                need to be an engineer to have a say.
              </p>
            </div>
          </div>
        </section>

        {/* Featured story + quick links */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid gap-16 md:grid-cols-[1.35fr_1fr]">
          <div>
            <p className="eyebrow mb-6">Featured story</p>
            <StoryCard
              title="When the algorithm said no"
              excerpt="How one job seeker challenged an AI hiring decision, and won."
              category="Workplace"
              href={withLocale('/stories/algorithm-said-no')}
            />
          </div>
          <div>
            <p className="eyebrow mb-6">What brought you here?</p>
            <ul className="border-t border-ink">
              {quickLinks.map((link) => (
                <li key={link.href} className="border-b border-line">
                  <Link
                    href={withLocale(link.href)}
                    className="group flex items-center justify-between gap-4 py-4 text-ink hover:text-accent transition-colors"
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter locale={resolvedLocale} nav={nav} siteTitle={site.title} />
    </div>
  );
}

/** Decorative concentric arcs, drawn in thin sage lines. */
function HeroLines({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 560" className={className} fill="none" aria-hidden="true">
      {[260, 220, 180, 140, 100].map((r) => (
        <circle key={r} cx="300" cy="300" r={r} stroke="currentColor" strokeWidth="9" opacity="0.55" />
      ))}
    </svg>
  );
}
