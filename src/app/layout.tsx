import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ethical AI in Europe',
  description: 'Understanding ethical and lawful AI use under the EU AI Act',
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
