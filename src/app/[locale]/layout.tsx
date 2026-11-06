import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Instrument_Sans, Newsreader } from 'next/font/google';
import { locales, messagesByLocale, resolveLocale } from '@/i18n';
import { OG_IMAGE, SITE_NAME } from '@/lib/site';
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

type LayoutParams = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: LayoutParams }): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const { site } = messagesByLocale[locale];

  return {
    title: {
      absolute: `${SITE_NAME}: ${site.tagline}`,
      template: `%s | ${SITE_NAME}`,
    },
    description: site.metaDescription,
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: site.metaDescription,
      locale: site.ogLocale,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description: site.metaDescription,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: LayoutParams;
}) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
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
