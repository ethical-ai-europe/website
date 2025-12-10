import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
const isProd = process.env.NODE_ENV === 'production';
const FALLBACK_BASE_PATH = process.env.DEFAULT_BASE_PATH || '/website';
const EXPECTED_REPO_SEGMENTS = 2;
const REPOSITORY_NAME_INDEX = 1;

function sanitizePathSegment(segment: string) {
  return segment.trim().replace(/[^A-Za-z0-9._-]/g, '-');
}

function getDefaultBasePath() {
  if (process.env.GITHUB_REPOSITORY) {
    const segments = process.env.GITHUB_REPOSITORY.split('/');
    const repositoryName = segments[REPOSITORY_NAME_INDEX]?.trim();
    if (segments.length === EXPECTED_REPO_SEGMENTS && repositoryName) {
      return `/${sanitizePathSegment(repositoryName)}`;
    }
  }
  if (process.env.npm_package_name) {
    const packageName = sanitizePathSegment(process.env.npm_package_name);
    if (packageName) return `/${packageName}`;
  }
  return FALLBACK_BASE_PATH;
}

const DEFAULT_BASE_PATH = getDefaultBasePath();

function getNormalizedBasePath(defaultBasePath: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || defaultBasePath;
  if (basePath === '/') {
    // Preserve a root deployment path.
    return '/';
  }
  // Remove any trailing slash to avoid double slashes in generated URLs.
  return basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
}

const normalizedBasePath = getNormalizedBasePath(DEFAULT_BASE_PATH);
const pathPrefix = isProd ? normalizedBasePath : undefined;

const nextConfig: NextConfig = {
  output: 'export',
  basePath: pathPrefix,
  assetPrefix: pathPrefix,
};

export default withNextIntl(nextConfig);
