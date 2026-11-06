'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export interface NavigationProps {
  locale: string;
  siteTitle: string;
  nav: {
    rights: string;
    dailyLife: string;
    forOrganizations: string;
    issues: string;
    takeAction: string;
    euAiAct: string;
    menu: string;
    close: string;
  };
  showActiveState?: boolean;
}

const navItems = [
  { key: 'rights', href: '/rights' },
  { key: 'dailyLife', href: '/daily-life' },
  { key: 'forOrganizations', href: '/for-organizations' },
  { key: 'issues', href: '/issues' },
  { key: 'takeAction', href: '/take-action' },
  { key: 'euAiAct', href: '/about' },
] as const;

export function Navigation({ locale, siteTitle, nav, showActiveState = false }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const withLocale = (path: string) => `/${locale}${path}`;

  const isActive = (href: string) => {
    if (!showActiveState) return false;
    return pathname === withLocale(href) || pathname.startsWith(withLocale(href + '/'));
  };

  return (
    <>
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
    >
      Skip to content
    </a>
    <nav
      className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[76px] items-center gap-8">
          <Link href={withLocale('')} className="flex items-center gap-3 shrink-0 text-ink">
            <BrandMark className="h-8 w-8 text-sage" />
            <span className="font-serif text-[1.35rem] leading-none tracking-tight">{siteTitle}</span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={withLocale(item.href)}
                className={`text-[15px] font-medium transition-colors underline-offset-[6px] decoration-1 ${
                  isActive(item.href)
                    ? 'text-ink underline decoration-accent'
                    : 'text-ink/80 hover:text-ink hover:underline decoration-underline'
                }`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {nav[item.key as keyof typeof nav]}
              </Link>
            ))}
          </div>
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 -mr-2 text-ink hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">{mobileMenuOpen ? nav.close : nav.menu}</span>
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
            {navItems.map((item) => (
              <li key={item.key} className="border-b border-line last:border-0">
                <Link
                  href={withLocale(item.href)}
                  className={`block py-3 font-serif text-xl ${isActive(item.href) ? 'text-accent' : 'text-ink'}`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {nav[item.key as keyof typeof nav]}
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
  locale: string;
  nav: {
    rights: string;
    dailyLife: string;
    forOrganizations: string;
    issues: string;
    takeAction: string;
    euAiAct: string;
  };
}

export function FooterNavigation({ locale, nav }: FooterNavigationProps) {
  const withLocale = (path: string) => `/${locale}${path}`;

  return (
    <nav aria-label="Footer navigation">
      <ul className="flex flex-col gap-3">
        {navItems.map((item) => (
          <li key={item.key}>
            <Link
              href={withLocale(item.href)}
              className="text-on-dark-muted hover:text-on-dark transition-colors"
            >
              {nav[item.key as keyof typeof nav]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
