import envConfig from '@/config/env.config';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${envConfig.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
