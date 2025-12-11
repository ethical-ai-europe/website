import { getRequestConfig } from 'next-intl/server';
import enMessages from '../messages/en.json';

// Can be imported from a shared config
export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];

// Currently only English translations are bundled; extend this map when adding locales.
export const messagesByLocale = {
  en: enMessages,
} as const satisfies Record<Locale, typeof enMessages>;

export function resolveLocale(locale: string): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : 'en';
}

export default getRequestConfig(({ locale }) => {
  const resolvedLocale = resolveLocale(locale);

  return {
    locale: resolvedLocale,
    messages: messagesByLocale[resolvedLocale],
  };
});
