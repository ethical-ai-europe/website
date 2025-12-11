import Link from 'next/link';

export interface IssueStats {
  label: string;
  value: string | number;
}

export interface IssueCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  stats?: IssueStats[];
}

export function IssueCard({
  title,
  description,
  icon,
  href,
  stats,
}: IssueCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
    >
      <article className="p-6">
        <div className="flex items-start gap-4">
          <span
            className="text-3xl flex-shrink-0"
            role="img"
            aria-hidden="true"
          >
            {icon}
          </span>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {description}
            </p>
            {stats && stats.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
          Learn more
          <svg
            className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
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
        </div>
      </article>
    </Link>
  );
}

export default IssueCard;
