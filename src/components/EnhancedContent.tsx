'use client';

import { useEffect, useRef } from 'react';

export interface EnhancedContentProps {
  html: string;
}

// Common emojis used in content headings
const EMOJI_PATTERN = /^(🔍|💡|⚖️|👤|✋|🏠|🌍|✊|⚠️|🚩|✓|🏭|💰|🗳️|👁️)/;

/**
 * EnhancedContent component that adds visual enhancements to markdown-rendered HTML
 * - Enhances emoji headings with gradient backgrounds
 * - Adds fade-in animations to sections
 * - Styles horizontal rules as gradient dividers
 * - Auto-detects and styles callout patterns (🚩, 💡, ✓)
 * - Generates IDs for headings to enable table of contents navigation
 */
export function EnhancedContent({ html }: EnhancedContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const content = contentRef.current;

    // Generate IDs for headings (for table of contents navigation)
    const h2Elements = content.querySelectorAll('h2');
    const h3Elements = content.querySelectorAll('h3');
    const allHeadings = [...h2Elements, ...h3Elements];
    
    const usedIds = new Set<string>();
    
    allHeadings.forEach((heading) => {
      const text = heading.textContent || '';
      
      // Generate a slug from the text
      const baseId = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      // Ensure uniqueness by adding a counter if needed
      let id = baseId;
      let counter = 1;
      while (usedIds.has(id)) {
        id = `${baseId}-${counter}`;
        counter++;
      }
      
      if (id && !heading.id) {
        heading.id = id;
        usedIds.add(id);
      }
    });

    // Enhance emoji headings (h2 with emoji at the start)
    h2Elements.forEach((h2, index) => {
      const text = h2.textContent || '';
      // Check if starts with emoji
      if (EMOJI_PATTERN.test(text)) {
        h2.classList.add('animate-fade-in');
        h2.style.animationDelay = `${index * 0.1}s`;
        h2.classList.add('bg-gradient-to-r', 'from-blue-50', 'to-transparent', 'dark:from-blue-900/20', 'dark:to-transparent', 'px-4', 'py-3', 'rounded-lg', '-mx-4');
      }
    });

    // Enhance horizontal rules as gradient dividers
    const hrElements = content.querySelectorAll('hr');
    hrElements.forEach((hr) => {
      hr.classList.add('border-0', 'h-1', 'bg-gradient-to-r', 'from-transparent', 'via-blue-400', 'to-transparent', 'my-12', 'rounded');
    });

    // Auto-detect and style callout patterns
    const paragraphs = content.querySelectorAll('p');
    paragraphs.forEach((p, index) => {
      const text = p.textContent || '';
      
      // Red flag warnings (🚩)
      if (text.startsWith('🚩')) {
        p.classList.add('callout-warning', 'animate-fade-in');
        p.style.animationDelay = `${index * 0.05}s`;
      }
      
      // Tips (💡)
      if (text.startsWith('💡')) {
        p.classList.add('callout-tip', 'animate-fade-in');
        p.style.animationDelay = `${index * 0.05}s`;
      }
    });

    // Enhance list items with checkmarks
    const listItems = content.querySelectorAll('li');
    listItems.forEach((li) => {
      const text = li.textContent || '';
      if (text.startsWith('✓') || text.startsWith('✔')) {
        li.classList.add('text-green-700', 'dark:text-green-400', 'font-medium');
      }
    });

    // Enhance links that look like navigation links (contain →)
    const links = content.querySelectorAll('a');
    links.forEach((link) => {
      const text = link.textContent || '';
      if (text.includes('→')) {
        link.classList.add('link-card');
      }
    });

  }, [html]);

  return (
    <div 
      ref={contentRef}
      className="enhanced-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default EnhancedContent;
