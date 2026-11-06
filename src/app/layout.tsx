import type { Metadata } from 'next';
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  // Trailing slash so relative URLs resolve under the base path (e.g. /website/).
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: `${SITE_NAME}: Your guide to the EU AI Act`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'EU AI Act',
    'AI rights',
    'ethical AI',
    'human-centric AI',
    'AI regulation Europe',
    'algorithmic decisions',
    'AI compliance',
  ],
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: 'en',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

// This is just a root layout that doesn't render anything
// The actual layout is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
