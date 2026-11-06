import Link from 'next/link';
import { ArrowUpRight } from './IssueCard';

export interface StoryCardProps {
  title: string;
  excerpt: string;
  category: string;
  country?: string;
  href: string;
  isAnonymous?: boolean;
}

export function StoryCard({ title, excerpt, category, country, href, isAnonymous = false }: StoryCardProps) {
  const tags = [category, country, isAnonymous ? 'Anonymous' : undefined].filter(Boolean);
  return (
    <article className="border-t border-ink pt-6">
      <p className="eyebrow">{tags.join(' · ')}</p>
      <h3 className="mt-4 font-serif text-3xl md:text-4xl leading-tight text-ink">
        <Link href={href} className="hover:text-accent transition-colors">
          {title}
        </Link>
      </h3>
      <p className="mt-4 text-lg text-muted max-w-2xl">{excerpt}</p>
      <Link href={href} className="text-link mt-6 inline-flex items-center gap-2">
        Read the story <ArrowUpRight />
      </Link>
    </article>
  );
}

export default StoryCard;
