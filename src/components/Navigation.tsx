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
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href={withLocale('')}
              className="text-xl font-bold text-blue-600 dark:text-blue-400"
            >
              {siteTitle}
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.key}
                href={withLocale(item.href)} 
                className={`px-3 py-2 text-sm font-medium ${
                  isActive(item.href)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {nav[item.key as keyof typeof nav]}
              </Link>
            ))}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={withLocale(item.href)}
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  isActive(item.href)
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                aria-current={isActive(item.href) ? 'page' : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                {nav[item.key as keyof typeof nav]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
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
    <nav className="mb-6" aria-label="Footer navigation">
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {navItems.map((item) => (
          <li key={item.key}>
            <Link
              href={withLocale(item.href)}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              {nav[item.key as keyof typeof nav]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
