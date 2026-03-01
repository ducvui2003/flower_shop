import envConfig from '@/config/env.config';
import { PUBLIC_ROUTES } from '@/config/route.config';
import productService from '@/service/product.server.service';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await productService.getSitemap();

  const productUrls = products.map((product) => ({
    url: `${envConfig.DOMAIN}${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  const staticUrls: MetadataRoute.Sitemap = Object.values(PUBLIC_ROUTES).map(
    (s) => ({
      url: `${envConfig.DOMAIN}${s}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    }),
  );

  return [
    {
      url: `${envConfig.DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...staticUrls,
    ...productUrls,
  ]; // Combine both arrays
}
