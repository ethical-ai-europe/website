import Link from 'next/link';
import { BrandMark, FooterNavigation, type NavigationLink } from './Navigation';

export interface SiteFooterProps {
  locale: string;
  siteTitle: string;
  links: NavigationLink[];
  aboutLinks: NavigationLink[];
  labels: {
    tagline: string;
    explore: string;
    about: string;
    github: string;
    organization: string;
    disclaimer: string;
    navLabel: string;
    inEnglish: string;
  };
}

export function SiteFooter({ locale, siteTitle, links, aboutLinks, labels }: SiteFooterProps) {
  return (
    <footer className="bg-dark text-on-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href={`/${locale}`} className="inline-flex items-center gap-3">
              <BrandMark className="h-8 w-8 text-sage-light" />
              <span className="font-serif text-2xl">{siteTitle}</span>
            </Link>
            <p className="mt-5 max-w-sm text-on-dark-muted">{labels.tagline}</p>
          </div>
          <div>
            <p className="eyebrow !text-sage-light mb-5">{labels.explore}</p>
            <FooterNavigation links={links} label={labels.navLabel} inEnglish={labels.inEnglish} />
          </div>
          <div>
            <p className="eyebrow !text-sage-light mb-5">{labels.about}</p>
            <ul className="flex flex-col gap-3 text-on-dark-muted">
              {aboutLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    hrefLang={link.fallback ? 'en' : undefined}
                    className="hover:text-on-dark transition-colors"
                  >
                    {link.label}
                    {link.fallback && <span className="text-sm"> {labels.inEnglish}</span>}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com/ethical-ai-europe"
                  className="hover:text-on-dark transition-colors"
                  rel="noopener"
                >
                  {labels.github}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-6 border-t border-white/15 flex flex-col sm:flex-row gap-2 justify-between text-sm text-on-dark-muted">
          <p>© {new Date().getFullYear()} {labels.organization}</p>
          <p>{labels.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
