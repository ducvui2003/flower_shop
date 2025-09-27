import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        hostname: 'qr.sepay.vn',
        protocol: 'https',
      },
      {
        protocol: 'https',
        hostname: 'www.flowercorner.vn',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
