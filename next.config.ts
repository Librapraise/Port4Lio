import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals = [...(Array.isArray(config.externals) ? config.externals : []), { canvas: 'canvas' }];
    return config;
  },
  // Silence Turbopack warning when using webpack config
  // @ts-ignore
  turbopack: {}
}

export default nextConfig;