import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
const isProd = process.env.NODE_ENV === 'production';
const DEFAULT_BASE_PATH = '/website';
// Defaults to the repository path when deploying to GitHub Pages.
// Remove any trailing slash to avoid double slashes in generated URLs.
const normalizedBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || DEFAULT_BASE_PATH).replace(/\/$/, '');
const productionPath = isProd ? normalizedBasePath : undefined;

const nextConfig: NextConfig = {
  output: 'export',
  basePath: productionPath,
  assetPrefix: productionPath,
};

export default withNextIntl(nextConfig);
