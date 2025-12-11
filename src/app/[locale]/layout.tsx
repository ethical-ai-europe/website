import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import localFont from 'next/font/local';
import { locales, messagesByLocale } from '@/i18n';
import '../globals.css';

export const dynamic = 'force-static';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
