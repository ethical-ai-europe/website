'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export interface NavigationLink {
  key: string;
  label: string;
  href: string;
  /** Page is not translated; the link goes to the English page. */
  fallback?: boolean;
}

export interface LanguageOption {
  locale: string;
  label: string;
  href: string;
  current: boolean;
}

export interface NavigationProps {
  locale: string;
  siteTitle: string;
  links: NavigationLink[];
  languages: LanguageOption[];
  labels: {
    menu: string;
    close: string;
    mainLabel: string;
    skipToContent: string;
    languageLabel: string;
    inEnglishShort: string;
    inEnglishTitle: string;
  };
  showActiveState?: boolean;
}

export function Navigation({ locale, siteTitle, links, languages, labels, showActiveState = false }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!showActiveState) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  const fallbackMarker = (link: NavigationLink) =>
    link.fallback ? (
      <span className="ml-1 align-super text-[10px] font-semibold text-muted" title={labels.inEnglishTitle}>
        {labels.inEnglishShort}
      </span>
    ) : null;

  const languageSwitcher = (
    <ul className="flex items-center gap-1 text-sm font-medium" aria-label={labels.languageLabel}>
      {languages.map((lang) => (
        <li key={lang.locale}>
          {lang.current ? (
            <span aria-current="true" className="rounded px-2 py-1 bg-ink text-paper" lang={lang.locale}>
              {lang.locale.toUpperCase()}
            </span>
          ) : (
            <Link
              href={lang.href}
              hrefLang={lang.locale}
              lang={lang.locale}
              title={lang.label}
              className="rounded px-2 py-1 text-ink/80 hover:text-ink hover:bg-surface"
            >
              <span aria-hidden="true">{lang.locale.toUpperCase()}</span>
              <span className="sr-only">{lang.label}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
    >
      {labels.skipToContent}
    </a>
    <nav
      className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85"
      aria-label={labels.mainLabel}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[76px] items-center gap-6">
          <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0 text-ink">
            <BrandMark className="h-8 w-8 text-sage" />
            <span className="font-serif text-[1.35rem] leading-none tracking-tight">{siteTitle}</span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                hrefLang={item.fallback ? 'en' : undefined}
                className={`text-[15px] font-medium transition-colors underline-offset-[6px] decoration-1 ${
                  isActive(item.href)
                    ? 'text-ink underline decoration-accent'
                    : 'text-ink/80 hover:text-ink hover:underline decoration-underline'
                }`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
                {fallbackMarker(item)}
              </Link>
            ))}
            <div className="border-l border-line pl-4">{languageSwitcher}</div>
          </div>
          {/* Mobile: language switcher + menu button */}
          <div className="lg:hidden flex items-center gap-3">
            {languageSwitcher}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 -mr-2 text-ink hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">{mobileMenuOpen ? labels.close : labels.menu}</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 8.25h16.5m-16.5 7.5h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-line bg-paper" id="mobile-menu">
          <ul className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            {links.map((item) => (
              <li key={item.key} className="border-b border-line last:border-0">
                <Link
                  href={item.href}
                  hrefLang={item.fallback ? 'en' : undefined}
                  className={`block py-3 font-serif text-xl ${isActive(item.href) ? 'text-accent' : 'text-ink'}`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                  {fallbackMarker(item)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
    </>
  );
}

/** Ring of twelve points: a line-art nod to the European flag. */
export function BrandMark({ className = '' }: { className?: string }) {
  const points = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    return { x: 16 + Math.cos(a) * 11, y: 16 + Math.sin(a) * 11 };
  });
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x.toFixed(2)} cy={p.y.toFixed(2)} r="1.6" fill="currentColor" />
      ))}
      <circle cx="16" cy="16" r="3" fill="var(--accent)" />
    </svg>
  );
}

export interface FooterNavigationProps {
  links: NavigationLink[];
  label: string;
  /** Appended to links that go to an English-only page, e.g. "(in English)". */
  inEnglish: string;
}

export function FooterNavigation({ links, label, inEnglish }: FooterNavigationProps) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-col gap-3">
        {links.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              hrefLang={item.fallback ? 'en' : undefined}
              className="text-on-dark-muted hover:text-on-dark transition-colors"
            >
              {item.label}
              {item.fallback && <span className="text-sm"> {inEnglish}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
