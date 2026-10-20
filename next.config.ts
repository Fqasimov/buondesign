import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export: the whole site is prerendered HTML + assets, served from any CDN.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
