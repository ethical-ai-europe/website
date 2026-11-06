import Link from 'next/link';

export interface IssueStats {
  label: string;
  value: string | number;
}

export interface IssueCardProps {
  title: string;
  description: string;
  /** Short outcome line shown in ink below the description. */
  outcome?: string;
  /** Kept for backwards compatibility; not rendered in the editorial layout. */
  icon?: string;
  href: string;
  /** Position in a numbered grid (1-based). */
  index?: number;
  stats?: IssueStats[];
  /** Visible "Read more" link text. */
  readMoreLabel?: string;
  /** Accessible name for the "Read more" link. */
  readMoreAriaLabel?: string;
  /** Page is only available in English; shown after the outcome line. */
  fallbackNote?: string;
}

export function IssueCard({
  title,
  description,
  outcome,
  href,
  index,
  stats,
  readMoreLabel = 'Read more',
  readMoreAriaLabel,
  fallbackNote,
}: IssueCardProps) {
  return (
    <article className="flex flex-col border-t border-ink pt-6">
      {index !== undefined && (
        <span className="text-sm font-semibold text-sage tabular-nums">
          {String(index).padStart(2, '0')}
        </span>
      )}
      <h3 className="mt-4 font-serif text-[1.75rem] leading-tight text-ink">
        <Link href={href} className="hover:text-accent transition-colors">
          {title}
        </Link>
      </h3>
      <p className="mt-4 text-muted">{description}</p>
      {outcome && <p className="mt-4 font-semibold text-ink">{outcome}</p>}
      {fallbackNote && <p className="mt-2 text-sm text-muted">{fallbackNote}</p>}
      {stats && stats.length > 0 && (
        <dl className="mt-5 flex flex-wrap gap-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-xs text-muted">{stat.label}</dt>
              <dd className="font-serif text-2xl text-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <Link href={href} className="text-link mt-6 self-start inline-flex items-center gap-2" aria-label={readMoreAriaLabel ?? `${readMoreLabel}: ${title}`}>
        {readMoreLabel} <ArrowUpRight />
      </Link>
    </article>
  );
}

export function ArrowUpRight({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 11L11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default IssueCard;
