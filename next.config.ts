import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
const isProd = process.env.NODE_ENV === 'production';
function getDefaultBasePath() {
  if (process.env.GITHUB_REPOSITORY) {
    const segments = process.env.GITHUB_REPOSITORY.split('/');
    if (segments.length === 2 && segments[1]) {
      return `/${segments[1]}`;
    }
  }
  return '/website';
}

const DEFAULT_BASE_PATH = getDefaultBasePath();

function getNormalizedBasePath() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || DEFAULT_BASE_PATH;
  if (basePath === '/') return '/';
  // Remove any trailing slash to avoid double slashes in generated URLs.
  return basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
}

const normalizedBasePath = getNormalizedBasePath();
const pathPrefix = isProd ? normalizedBasePath : undefined;

const nextConfig: NextConfig = {
  output: 'export',
  basePath: pathPrefix,
  assetPrefix: pathPrefix,
};

export default withNextIntl(nextConfig);
