import Link from 'next/link';

export interface Persona {
  id: string;
  label: string;
  description: string;
  /** Fully resolved href, including the locale prefix. */
  href: string;
  /** Page is only available in English. */
  fallback?: boolean;
}

export interface PersonaSelectorProps {
  personas: Persona[];
  /** Appended to English-only personas, e.g. "(in English)". */
  inEnglish?: string;
}

export function PersonaSelector({ personas, inEnglish }: PersonaSelectorProps) {
  return (
    <section aria-labelledby="persona-selector-heading">
      <ul className="border-t border-ink">
        {personas.map((persona, i) => (
          <li key={persona.id} className="border-b border-line">
            <Link
              href={persona.href}
              hrefLang={persona.fallback ? 'en' : undefined}
              className="group grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[3.5rem_16rem_1fr_auto] items-baseline gap-x-4 py-6 focus:outline-none focus-visible:bg-surface"
            >
              <span className="font-serif text-xl text-sage tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-serif text-2xl text-ink group-hover:text-accent transition-colors">
                {persona.label}
              </span>
              <span className="col-start-2 md:col-start-3 row-start-2 md:row-start-1 mt-1 md:mt-0 text-muted">
                {persona.description}
                {persona.fallback && inEnglish ? ` ${inEnglish}` : ''}
              </span>
              <span
                aria-hidden="true"
                className="col-start-3 md:col-start-4 row-start-1 text-accent transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PersonaSelector;
