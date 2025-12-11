import Link from 'next/link';

export interface StoryCardProps {
  title: string;
  excerpt: string;
  category: string;
  country?: string;
  href: string;
  isAnonymous?: boolean;
}

export function StoryCard({
  title,
  excerpt,
  category,
  country,
  href,
  isAnonymous = false,
}: StoryCardProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            {category}
          </span>
          {country && (
            <span className="inline-block px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full">
              {country}
            </span>
          )}
          {isAnonymous && (
            <span className="inline-block px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 rounded-full">
              Anonymous
            </span>
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {excerpt}
        </p>
        <Link
          href={href}
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium focus:outline-none focus:underline"
        >
          Read more
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default StoryCard;
