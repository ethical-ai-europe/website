import Link from 'next/link';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { format, messagesByLocale, resolveLocale } from '@/i18n';
import { Navigation, SiteFooter, IssueCard, StoryCard } from '@/components';
import { ArrowUpRight } from '@/components/IssueCard';
import { PersonaSelector } from '@/components/PersonaSelector';
import { chromeProps, hreflangAlternates, localizedLink } from '@/lib/localized-links';
import { OG_IMAGE, ORG_GITHUB, ORG_NAME, SITE_NAME, absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

type PageParams = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const { site } = messagesByLocale[locale];
  return {
    alternates: { canonical: `/${locale}`, languages: hreflangAlternates('') },
    // openGraph is replaced (not merged) per segment, so restate the defaults.
    openGraph: {
      type: 'website',
      url: `/${locale}`,
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: site.metaDescription,
      locale: site.ogLocale,
      images: [OG_IMAGE],
    },
  };
}

const PERSONAS = [
  { id: 'citizen', path: '/for-citizens' },
  { id: 'educator', path: '/for-educators' },
  { id: 'business', path: '/for-business' },
  { id: 'journalist', path: '/for-journalists' },
  { id: 'official', path: '/for-officials' },
] as const;

const QUICK_LINKS = [
  { key: 'workplace', path: '/rights/workplace-surveillance' },
  { key: 'school', path: '/daily-life/education' },
  { key: 'business', path: '/for-organizations/sme-guide' },
  { key: 'rights', path: '/rights' },
] as const;

const TOPICS = [
  { key: 'rights', path: '/rights' },
  { key: 'dailyLife', path: '/daily-life' },
  { key: 'issues', path: '/issues' },
  { key: 'takeAction', path: '/take-action' },
] as const;

export default async function HomePage({ params }: { params: PageParams }) {
  const resolvedLocale = resolveLocale((await params).locale);
  setRequestLocale(resolvedLocale);
  const m = messagesByLocale[resolvedLocale];
  const home = m.home;
  const inEnglish = m.languages.inEnglish;
  const link = (path: string) => localizedLink(path, resolvedLocale);
  const chrome = chromeProps(resolvedLocale, '');

  const homeJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: ORG_NAME,
      alternateName: SITE_NAME,
      url: absoluteUrl(`/${resolvedLocale}`),
      sameAs: [ORG_GITHUB],
      founder: { '@type': 'Person', name: 'Stefano Vincenti', url: 'https://aitrainer.dk' },
      areaServed: 'EU',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      description: m.site.metaDescription,
      url: absoluteUrl(`/${resolvedLocale}`),
      inLanguage: resolvedLocale,
      publisher: { '@type': 'Organization', name: ORG_NAME },
    },
  ];

  const personas = PERSONAS.map((p) => ({
    id: p.id,
    label: m.personas[p.id].label,
    description: m.personas[p.id].description,
    ...link(p.path),
  }));

  const quickLinks = QUICK_LINKS.map((q) => ({ label: home.quickLinks[q.key], ...link(q.path) }));
  const story = link('/stories/algorithm-said-no');

  return (
    <div className="min-h-screen bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd).replace(/</g, '\\u003c') }}
      />
      <Navigation {...chrome.navigation} />

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <HeroLines className="pointer-events-none absolute -right-24 top-10 hidden md:block h-[560px] w-[560px] text-sage-light" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-32">
            <p className="eyebrow">{home.eyebrow}</p>
            <h1 className="display mt-6 text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] text-ink max-w-4xl">
              {home.hero.title}
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              {home.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <Link
                href={link('/rights').href}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-7 py-3.5 text-[15px] font-medium text-paper hover:bg-accent transition-colors"
              >
                {home.cta.rights} <span aria-hidden="true">→</span>
              </Link>
              <Link href={link('/take-action').href} className="text-link inline-flex items-center gap-2 text-[15px]">
                {home.cta.action} <ArrowUpRight />
              </Link>
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-32">
          <h2 className="display text-4xl md:text-6xl text-ink">{home.topics.heading}</h2>
          <div className="mt-14 grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
            {TOPICS.map((topic, i) => {
              const target = link(topic.path);
              const card = home.topics[topic.key];
              return (
                <IssueCard
                  key={topic.key}
                  index={i + 1}
                  title={card.title}
                  description={card.description}
                  outcome={card.outcome}
                  href={target.href}
                  readMoreLabel={m.cards.readMore}
                  readMoreAriaLabel={format(m.cards.readMoreAria, { title: card.title })}
                  fallbackNote={target.fallback ? inEnglish : undefined}
                />
              );
            })}
          </div>
        </section>

        {/* Safeguards band */}
        <section className="bg-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28 grid gap-12 md:grid-cols-[1fr_1.35fr]">
            <div>
              <h2 className="display text-4xl md:text-6xl text-ink">{home.safeguards.heading}</h2>
              <p className="mt-6 text-muted max-w-sm">{home.safeguards.intro}</p>
              <Link href={link('/about').href} className="text-link mt-8 inline-flex items-center gap-2">
                {home.safeguards.link} <ArrowUpRight />
              </Link>
            </div>
            <ol className="border-t border-ink">
              {home.safeguards.items.map((item, i) => (
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
              {home.personas.heading}
            </h2>
            <p className="text-muted max-w-md">{home.personas.intro}</p>
          </div>
          <PersonaSelector personas={personas} inEnglish={inEnglish} />
        </section>

        {/* Mission */}
        <section className="bg-sage text-on-dark">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28 grid gap-12 md:grid-cols-[1.35fr_1fr] md:items-end">
            <div>
              <p className="eyebrow !text-sage-light">{home.mission.eyebrow}</p>
              <h2 className="display mt-6 text-4xl md:text-6xl">
                {home.mission.heading}
              </h2>
            </div>
            <div className="text-on-dark-muted space-y-5 text-lg">
              <p>{home.mission.body1}</p>
              <p className="text-on-dark">{home.mission.body2}</p>
            </div>
          </div>
        </section>

        {/* Featured story + quick links */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid gap-16 md:grid-cols-[1.35fr_1fr]">
          <div>
            <p className="eyebrow mb-6">{home.story.eyebrow}</p>
            <StoryCard
              title={home.story.title}
              excerpt={home.story.excerpt}
              category={home.story.category}
              href={story.href}
              readStoryLabel={m.cards.readStory}
              anonymousLabel={m.cards.anonymous}
              fallbackNote={story.fallback ? inEnglish : undefined}
            />
          </div>
          <div>
            <p className="eyebrow mb-6">{home.quickLinks.eyebrow}</p>
            <ul className="border-t border-ink">
              {quickLinks.map((link) => (
                <li key={link.href} className="border-b border-line">
                  <Link
                    href={link.href}
                    hrefLang={link.fallback ? 'en' : undefined}
                    className="group flex items-center justify-between gap-4 py-4 text-ink hover:text-accent transition-colors"
                  >
                    <span>
                      {link.label}
                      {link.fallback && <span className="text-sm text-muted"> {inEnglish}</span>}
                    </span>
                    <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter {...chrome.footer} />
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
