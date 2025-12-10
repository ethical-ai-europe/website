import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
const isProd = process.env.NODE_ENV === 'production';
// Default to the repository name for GitHub Pages deployments.
const DEFAULT_BASE_PATH = process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
  : '/website';

function getNormalizedBasePath() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || DEFAULT_BASE_PATH;
  // Remove any trailing slash to avoid double slashes in generated URLs.
  return basePath.replace(/\/$/, '');
}

const normalizedBasePath = getNormalizedBasePath();
const pathPrefix = isProd ? normalizedBasePath : undefined;

const nextConfig: NextConfig = {
  output: 'export',
  basePath: pathPrefix,
  assetPrefix: pathPrefix,
};

export default withNextIntl(nextConfig);
