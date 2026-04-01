/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [{ key: 'Cross-Origin-Embedder-Policy', value: 'unsafe-none' }],
      },
    ];
  },
};
module.exports = nextConfig;
