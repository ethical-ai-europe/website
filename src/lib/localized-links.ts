/**
 * Server-only helpers for linking between locales. Not every page is
 * translated, so links from a translated locale fall back to the English page
 * (flagged so the UI can say so) instead of pointing at a page that 404s.
 */
import { defaultLocale, locales, messagesByLocale, type Locale } from '@/i18n';
import { contentExists } from './markdown';

export interface LocalizedLink {
  href: string;
  /** True when the page is not available in the requested locale and links to English instead. */
  fallback: boolean;
}

/** `path` is a site path without locale, e.g. '' (home), '/rights' or '/rights/ai-transparency'. */
export function pageExists(path: string, locale: Locale): boolean {
  const slug = path.replace(/^\/+|\/+$/g, '');
  return slug === '' || contentExists(slug, locale);
}

export function localizedLink(path: string, locale: Locale): LocalizedLink {
  if (locale === defaultLocale || pageExists(path, locale)) {
    return { href: `/${locale}${path}`, fallback: false };
  }
  return { href: `/${defaultLocale}${path}`, fallback: true };
}

export interface LanguageLink {
  locale: Locale;
  label: string;
  href: string;
  current: boolean;
}

/**
 * Links to the same page in each locale, for the language switcher. When the
 * page has no translation, the link goes to that locale's home page.
 */
export function languageLinks(path: string, current: Locale): LanguageLink[] {
  return locales.map((locale) => ({
    locale,
    label: messagesByLocale[locale].languages[locale],
    href: pageExists(path, locale) ? `/${locale}${path}` : `/${locale}`,
    current: locale === current,
  }));
}

/** hreflang alternates for `metadata.alternates.languages`; only lists locales the page exists in. */
export function hreflangAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    if (pageExists(path, locale)) languages[locale] = `/${locale}${path}`;
  }
  if (languages[defaultLocale]) languages['x-default'] = languages[defaultLocale];
  return languages;
}

export const NAV_ITEMS = [
  { key: 'rights', path: '/rights' },
  { key: 'dailyLife', path: '/daily-life' },
  { key: 'forOrganizations', path: '/for-organizations' },
  { key: 'issues', path: '/issues' },
  { key: 'takeAction', path: '/take-action' },
  { key: 'euAiAct', path: '/about' },
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]['key'];

export interface NavLink extends LocalizedLink {
  key: NavKey;
  label: string;
}

export function navLinks(locale: Locale): NavLink[] {
  const { nav } = messagesByLocale[locale];
  return NAV_ITEMS.map((item) => ({
    key: item.key,
    label: nav[item.key],
    ...localizedLink(item.path, locale),
  }));
}

/** Props shared by every page's <Navigation /> and <SiteFooter />. `path` is the current page without locale. */
export function chromeProps(locale: Locale, path: string) {
  const m = messagesByLocale[locale];
  const links = navLinks(locale);
  const footerAboutPaths = [
    { key: 'euAiAct', label: m.footer.euAiAct, path: '/about' },
    { key: 'principles', label: m.footer.principles, path: '/principles' },
    { key: 'resources', label: m.footer.resources, path: '/resources' },
  ];
  return {
    navigation: {
      locale,
      siteTitle: m.site.title,
      links,
      languages: languageLinks(path, locale),
      labels: {
        menu: m.nav.menu,
        close: m.nav.close,
        mainLabel: m.nav.mainLabel,
        skipToContent: m.nav.skipToContent,
        languageLabel: m.languages.label,
        inEnglishShort: m.languages.inEnglishShort,
        inEnglishTitle: m.languages.inEnglishTitle,
      },
    },
    footer: {
      locale,
      siteTitle: m.site.title,
      links,
      aboutLinks: footerAboutPaths.map((item) => ({
        key: item.key,
        label: item.label,
        ...localizedLink(item.path, locale),
      })),
      labels: { ...m.footer, navLabel: m.nav.footerLabel, inEnglish: m.languages.inEnglish },
    },
  };
}
