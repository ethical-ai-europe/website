import type { Metadata } from 'next';
import Link from 'next/link';
import { Instrument_Sans, Newsreader } from 'next/font/google';
import { BrandMark } from '@/components/Navigation';
import { SITE_NAME } from '@/lib/site';
import './globals.css';

const instrumentSans = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-instrument-sans',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-newsreader',
  weight: 'variable',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { absolute: `Page not found | ${SITE_NAME}` },
  robots: { index: false, follow: true },
};

const suggestions = [
  { label: 'Your AI rights', href: '/en/rights' },
  { label: 'AI Act timeline: what applies when', href: '/en/timeline' },
  { label: 'AI in daily life', href: '/en/daily-life' },
  { label: 'For organisations', href: '/en/for-organizations' },
];

// The root layout renders no <html>, so this page provides its own document.
export default function NotFound() {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} ${newsreader.variable} bg-paper text-ink antialiased`}>
        <main className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <Link href="/en" className="inline-flex items-center gap-3 text-ink">
            <BrandMark className="h-8 w-8 text-sage" />
            <span className="font-serif text-[1.35rem] leading-none tracking-tight">{SITE_NAME}</span>
          </Link>
          <p className="eyebrow mt-16">Error 404</p>
          <h1 className="display mt-4 text-5xl md:text-6xl text-ink">This page doesn&apos;t exist</h1>
          <p className="mt-6 text-lg text-muted max-w-xl">
            The link may be old, or the page may have moved. These pages are a good place to start:
          </p>
          <ul className="mt-10 border-t border-ink max-w-xl">
            {suggestions.map((s) => (
              <li key={s.href} className="border-b border-line">
                <Link
                  href={s.href}
                  className="group flex items-center justify-between gap-4 py-4 text-ink hover:text-accent transition-colors"
                >
                  {s.label}
                  <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10">
            <Link href="/en" className="text-link">
              ← Back to the homepage
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
