import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const basePath = isGithubActions ? '/q-router' : '';
const assetPrefix = isGithubActions ? '/q-router/' : '/';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: assetPrefix,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
