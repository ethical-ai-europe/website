import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { Instrument_Sans, Newsreader } from 'next/font/google';
import { locales, messagesByLocale } from '@/i18n';
import '../globals.css';

export const dynamic = 'force-static';

const instrumentSans = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-instrument-sans',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-newsreader',
  weight: 'variable',
  style: ['normal', 'italic'],
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children }: { children: ReactNode }) {
  // Default to 'en' since this is a static export with a single locale
  const locale = 'en';
  const messages = messagesByLocale[locale];

  return (
    <html lang={locale}>
      <body className={`${instrumentSans.variable} ${newsreader.variable} bg-paper text-ink antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
