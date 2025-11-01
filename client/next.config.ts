import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/thong-tin/ve-chung-toi',
        destination: '/info/about',
      },
      {
        source: '/thong-tin/gioi-thieu',
        destination: '/info/about',
      },
      {
        source: '/thong-tin/lien-he',
        destination: '/info/contact',
      },
      {
        source: '/thong-tin/chinh-sach',
        destination: '/info/policy',
      },
      {
        source: '/trang-chu',
        destination: '/',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/info/:path*',
        destination: '/thong-tin/:path*',
        permanent: true,
      },
    ];
  },
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
        hostname: 'flowercorner.b-cdn.net',
        protocol: 'https',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
