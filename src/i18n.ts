import { getRequestConfig } from 'next-intl/server';
import enMessages from '../messages/en.json';
import daMessages from '../messages/da.json';

export const locales = ['en', 'da'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export type Messages = typeof enMessages;

// Every locale must provide the full English message shape.
export const messagesByLocale = {
  en: enMessages,
  da: daMessages,
} as const satisfies Record<Locale, Messages>;

export function isLocale(locale: string | undefined): locale is Locale {
  return locales.includes(locale as Locale);
}

export function resolveLocale(locale: string | undefined): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}

/** Replace `{name}` placeholders in a message string. */
export function format(message: string, values: Record<string, string>): string {
  return message.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const resolvedLocale = resolveLocale(await requestLocale);

  return {
    locale: resolvedLocale,
    messages: messagesByLocale[resolvedLocale],
  };
});
