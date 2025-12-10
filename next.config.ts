import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
const isProd = process.env.NODE_ENV === 'production';
const repoBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || '/website').replace(/\/$/, '');

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? repoBasePath : undefined,
  assetPrefix: isProd ? `${repoBasePath}/` : undefined
};

export default withNextIntl(nextConfig);
