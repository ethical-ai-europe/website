import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getAllContentMetadata } from '@/lib/markdown';

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations('home');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {t('hero.title')}
              </h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
              >
                About the EU AI Act
              </Link>
              <Link 
                href="/principles" 
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
              >
                Ethical Principles
              </Link>
              <Link 
                href="/guidelines" 
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
              >
                Guidelines
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 mb-4 font-medium">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg"
            >
              {t('cta.learn')}
            </Link>
            <Link
              href="/guidelines"
              className="inline-flex items-center justify-center px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 md:text-lg"
            >
              {t('cta.guidelines')}
            </Link>
          </div>
        </div>

        {/* Key Topics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">⚖️</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              EU AI Act
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Understand Europe's comprehensive legal framework for artificial intelligence and its risk-based approach.
            </p>
            <Link href="/about" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">
              Learn more →
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Ethical Principles
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Explore the core principles of ethical AI development: transparency, fairness, accountability, and human oversight.
            </p>
            <Link href="/principles" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">
              Learn more →
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Practical Guidelines
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get actionable steps for developing AI systems that are both compliant and ethical from design to deployment.
            </p>
            <Link href="/guidelines" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">
              Learn more →
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-blue-600 dark:bg-blue-700 rounded-lg shadow-lg p-8 text-white mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Why It Matters</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">€35M</div>
              <div className="text-blue-100">Maximum fine for non-compliance</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2027</div>
              <div className="text-blue-100">Full implementation deadline</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">27+</div>
              <div className="text-blue-100">EU member states affected</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Build Ethical AI?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Whether you're a developer, business leader, or policymaker, understanding the EU AI Act and ethical AI principles is essential for the future of technology in Europe.
          </p>
          <Link
            href="/guidelines"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Get Started with Guidelines
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
            <p className="mb-2">
              © {new Date().getFullYear()} Ethical AI in Europe. Built with Next.js and next-intl.
            </p>
            <p>
              This is an educational resource about the EU AI Act and ethical AI development.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
