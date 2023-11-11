/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.arkhamdb.com',
      },
    ],
  },
};

module.exports = nextConfig;
