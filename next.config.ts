/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: import('webpack').Configuration) => {
    config.externals = [...(Array.isArray(config.externals) ? config.externals : []), { canvas: 'canvas' }];
    return config;
  },
}

module.exports = nextConfig