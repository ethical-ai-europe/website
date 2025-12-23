'use client';

import { useEffect, useState } from 'react';

export interface TableOfContentsProps {
  html: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * TableOfContents component that provides navigation for long pages
 * - Fixed position sidebar on xl screens (right side)
 * - Parses headings from content HTML
 * - Highlights active section on scroll
 * - Only shows if page has 3+ headings
 */
export function TableOfContents({ html }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<Heading[]>([]);

  // Parse headings from HTML on the client side only (DOMParser not available during SSR)
  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3');
    
    const parsedHeadings: Heading[] = [];
    headingElements.forEach((heading, index) => {
      const text = heading.textContent || '';
      // Create an ID from the text (simple slugify)
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      // Add ID to heading if not present
      if (!heading.id) {
        heading.id = id || `heading-${index}`;
      }
      
      parsedHeadings.push({
        id: heading.id,
        text,
        level: parseInt(heading.tagName.substring(1)),
      });
    });
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(parsedHeadings);
  }, [html]);

  useEffect(() => {
    if (headings.length === 0) return;

    // Set up intersection observer to highlight active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    );

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  // Only show if there are 3+ headings
  if (headings.length < 3) {
    return null;
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="hidden xl:block fixed right-8 top-32 w-64 max-h-[calc(100vh-10rem)] overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
          On This Page
        </h2>
        <ul className="space-y-2 text-sm">
          {headings.map(({ id, text, level }) => (
            <li key={id} style={{ paddingLeft: level === 3 ? '1rem' : '0' }}>
              <button
                onClick={() => handleClick(id)}
                className={`text-left w-full py-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  activeId === id
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default TableOfContents;
