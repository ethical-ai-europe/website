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
    label: 'Citizen/Parent',
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
    label: 'Journalist/Activist',
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
    <section className="py-12" aria-labelledby="persona-selector-heading">
      <h2
        id="persona-selector-heading"
        className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8"
      >
        I am a...
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {personas.map((persona) => (
          <Link
            key={persona.id}
            href={withLocale(persona.href)}
            className="group block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <div className="text-center">
              <span
                className="text-4xl mb-3 block"
                role="img"
                aria-hidden="true"
              >
                {persona.icon}
              </span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {persona.label}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {persona.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PersonaSelector;
