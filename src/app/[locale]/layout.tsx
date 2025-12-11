import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import { locales, type Locale } from '@/i18n';
import enMessages from '../../../messages/en.json';
import '../globals.css';

export const dynamic = 'force-static';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const messagesByLocale = {
  en: enMessages,
} as const satisfies Record<Locale, typeof enMessages>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  const resolvedLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  const messages = messagesByLocale[resolvedLocale];

  // Ensure that the incoming `locale` is valid
  if (!messages) {
    notFound();
  }

  return (
    <html lang={resolvedLocale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={resolvedLocale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
