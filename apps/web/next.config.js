/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.svgrepo.com',
      },
    ],
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
