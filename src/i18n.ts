import { getRequestConfig } from 'next-intl/server';
import enMessages from '../messages/en.json';

// Can be imported from a shared config
export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];

const messagesByLocale = {
  en: enMessages,
} as const satisfies Record<Locale, typeof enMessages>;

export default getRequestConfig(({ locale }) => {
  const resolvedLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';

  return {
    locale: resolvedLocale,
    messages: messagesByLocale[resolvedLocale],
  };
});
