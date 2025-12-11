'use client';

import { useState, FormEvent } from 'react';

export interface NewsletterSignupProps {
  variant?: 'inline' | 'card' | 'footer';
  headline?: string;
  description?: string;
}

type FormState = 'default' | 'loading' | 'success' | 'error';

export function NewsletterSignup({
  variant = 'card',
  headline = 'Stay Informed',
  description = 'Get the latest updates on AI ethics and EU regulations delivered to your inbox.',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [formState, setFormState] = useState<FormState>('default');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !consent) {
      setFormState('error');
      setErrorMessage('Please provide your email and consent to subscribe.');
      return;
    }

    setFormState('loading');

    // TODO: Integrate with real newsletter service (e.g., Mailchimp, ConvertKit, etc.)
    // For now, we simulate a successful submission
    console.log('Newsletter signup:', { email, consent });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setFormState('success');
    setEmail('');
    setConsent(false);
  };

  const containerClasses = {
    inline: 'py-4',
    card: 'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8',
    footer: 'py-6',
  };

  const inputClasses =
    'w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';

  const buttonClasses = {
    default:
      'w-full sm:w-auto px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors',
    loading:
      'w-full sm:w-auto px-6 py-2 text-white bg-blue-400 rounded-md font-medium cursor-not-allowed',
    success:
      'w-full sm:w-auto px-6 py-2 text-white bg-green-600 rounded-md font-medium cursor-default',
    error:
      'w-full sm:w-auto px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors',
  };

  if (formState === 'success') {
    return (
      <div className={containerClasses[variant]}>
        <div className="text-center py-4">
          <span className="text-4xl mb-3 block" role="img" aria-label="Success">
            ✅
          </span>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Thank you for subscribing!
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            We&apos;ll send you updates about AI ethics and EU regulations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses[variant]}>
      {variant !== 'inline' && (
        <>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {headline}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        </>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={variant === 'inline' ? 'flex flex-col sm:flex-row gap-3' : ''}>
          <div className={variant === 'inline' ? 'flex-1' : ''}>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="newsletter-email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={inputClasses}
              required
              aria-describedby={formState === 'error' ? 'newsletter-error' : undefined}
            />
          </div>
          {variant === 'inline' && (
            <button
              type="submit"
              disabled={formState === 'loading'}
              className={buttonClasses[formState]}
            >
              {formState === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          )}
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="newsletter-consent"
            name="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            required
          />
          <label
            htmlFor="newsletter-consent"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            I agree to receive email updates and accept the{' '}
            <a
              href="/privacy"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              privacy policy
            </a>
            . You can unsubscribe at any time. We comply with GDPR regulations.
          </label>
        </div>

        {formState === 'error' && (
          <p
            id="newsletter-error"
            className="text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errorMessage}
          </p>
        )}

        {variant !== 'inline' && (
          <button
            type="submit"
            disabled={formState === 'loading'}
            className={buttonClasses[formState]}
          >
            {formState === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        )}
      </form>
    </div>
  );
}

export default NewsletterSignup;
