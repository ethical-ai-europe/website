import Link from 'next/link';
import { BrandMark, FooterNavigation, type FooterNavigationProps } from './Navigation';

export interface SiteFooterProps extends FooterNavigationProps {
  siteTitle: string;
}

export function SiteFooter({ locale, nav, siteTitle }: SiteFooterProps) {
  return (
    <footer className="bg-dark text-on-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href={`/${locale}`} className="inline-flex items-center gap-3">
              <BrandMark className="h-8 w-8 text-sage-light" />
              <span className="font-serif text-2xl">{siteTitle}</span>
            </Link>
            <p className="mt-5 max-w-sm text-on-dark-muted">
              AI is changing Europe. You have rights. A plain-language guide to using AI ethically, and to demanding better.
            </p>
            <p className="mt-4 text-sm text-on-dark-muted">
              Initiated by Stefano Vincenti,{' '}
              <a href="https://aitrainer.dk" className="underline decoration-white/30 underline-offset-4 hover:text-on-dark">
                aitrainer.dk
              </a>
            </p>
          </div>
          <div>
            <p className="eyebrow !text-sage-light mb-5">Explore</p>
            <FooterNavigation locale={locale} nav={nav} />
          </div>
          <div>
            <p className="eyebrow !text-sage-light mb-5">About</p>
            <ul className="flex flex-col gap-3 text-on-dark-muted">
              <li>
                <Link href={`/${locale}/about`} className="hover:text-on-dark transition-colors">
                  The EU AI Act
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/principles`} className="hover:text-on-dark transition-colors">
                  Our principles
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/resources`} className="hover:text-on-dark transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/ethical-ai-europe"
                  className="hover:text-on-dark transition-colors"
                  rel="noopener"
                >
                  Contribute on GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-6 border-t border-white/15 flex flex-col sm:flex-row gap-2 justify-between text-sm text-on-dark-muted">
          <p>© {new Date().getFullYear()} European Center for Ethical and Human Centric AI</p>
          <p>Educational resource. Not legal advice.</p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
