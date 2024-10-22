/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.svgrepo.com',
      },
      {
        protocol: 'https',
        hostname: 'images.rukita.co',
      },
    ],
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
