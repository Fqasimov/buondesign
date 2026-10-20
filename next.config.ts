import type { NextConfig } from 'next';

// PREVIEW=1 builds a copy that works from any sub-path (pages load assets via
// relative "../" URLs) for the hosted preview; see scripts/build-preview.mjs.
const preview = process.env.PREVIEW === '1';

const nextConfig: NextConfig = {
  // Static export: the whole site is prerendered HTML + assets, served from any CDN.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  ...(preview && { assetPrefix: '..', distDir: 'preview-dist' }),
};

export default nextConfig;
