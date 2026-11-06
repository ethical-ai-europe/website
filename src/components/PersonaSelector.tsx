'use client';

import Link from 'next/link';

export interface Persona {
  id: string;
  icon: string;
  label: string;
  description: string;
  href: string;
}

export interface PersonaSelectorProps {
  personas?: Persona[];
  locale?: string;
}

const defaultPersonas: Persona[] = [
  {
    id: 'citizen',
    icon: '👨‍👩‍👧‍👦',
    label: 'Citizen or parent',
    description: 'Learn how AI affects your daily life and family',
    href: '/for-citizens',
  },
  {
    id: 'educator',
    icon: '👩‍🏫',
    label: 'Educator',
    description: 'Discover resources for teaching about AI ethics',
    href: '/for-educators',
  },
  {
    id: 'business',
    icon: '💼',
    label: 'Business Owner',
    description: 'Understand AI compliance for your organization',
    href: '/for-business',
  },
  {
    id: 'journalist',
    icon: '📰',
    label: 'Journalist or activist',
    description: 'Find research and advocacy resources',
    href: '/for-journalists',
  },
  {
    id: 'official',
    icon: '🏛️',
    label: 'Public Official',
    description: 'Access policy guidance and implementation tools',
    href: '/for-officials',
  },
];

export function PersonaSelector({
  personas = defaultPersonas,
  locale = 'en',
}: PersonaSelectorProps) {
  const withLocale = (path: string) => `/${locale}${path}`;

  return (
    <section aria-labelledby="persona-selector-heading">
      <ul className="border-t border-ink">
        {personas.map((persona, i) => (
          <li key={persona.id} className="border-b border-line">
            <Link
              href={withLocale(persona.href)}
              className="group grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[3.5rem_16rem_1fr_auto] items-baseline gap-x-4 py-6 focus:outline-none focus-visible:bg-surface"
            >
              <span className="font-serif text-xl text-sage tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-serif text-2xl text-ink group-hover:text-accent transition-colors">
                {persona.label}
              </span>
              <span className="col-start-2 md:col-start-3 row-start-2 md:row-start-1 mt-1 md:mt-0 text-muted">
                {persona.description}
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
