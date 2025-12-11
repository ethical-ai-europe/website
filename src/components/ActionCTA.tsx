import Link from 'next/link';

export interface CTAButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

export interface ActionCTAProps {
  variant?: 'primary' | 'secondary' | 'banner';
  headline: string;
  description: string;
  buttons: CTAButton[];
}

export function ActionCTA({
  variant = 'primary',
  headline,
  description,
  buttons,
}: ActionCTAProps) {
  const containerClasses = {
    primary:
      'bg-blue-600 dark:bg-blue-700 text-white rounded-lg shadow-lg p-8 md:p-12',
    secondary:
      'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-8 border border-gray-200 dark:border-gray-700',
    banner:
      'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white py-12 px-8',
  };

  const headlineClasses = {
    primary: 'text-3xl md:text-4xl font-bold mb-4',
    secondary: 'text-2xl md:text-3xl font-bold mb-4',
    banner: 'text-3xl md:text-5xl font-bold mb-6',
  };

  const descriptionClasses = {
    primary: 'text-lg text-blue-100 mb-6 max-w-2xl mx-auto',
    secondary: 'text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto',
    banner: 'text-xl text-blue-100 mb-8 max-w-3xl mx-auto',
  };

  const getButtonClasses = (buttonVariant: 'primary' | 'secondary' = 'primary') => {
    if (variant === 'secondary') {
      return buttonVariant === 'primary'
        ? 'inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        : 'inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:bg-gray-700 dark:border-blue-400 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
    }
    // primary and banner variants
    return buttonVariant === 'primary'
      ? 'inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600'
      : 'inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white border-2 border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600';
  };

  return (
    <section
      className={containerClasses[variant]}
      aria-labelledby="action-cta-heading"
    >
      <div className="text-center">
        <h2 id="action-cta-heading" className={headlineClasses[variant]}>
          {headline}
        </h2>
        <p className={descriptionClasses[variant]}>{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {buttons.map((button, index) => (
            <Link
              key={index}
              href={button.href}
              className={getButtonClasses(button.variant)}
            >
              {button.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ActionCTA;
