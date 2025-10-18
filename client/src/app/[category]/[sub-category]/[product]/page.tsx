import { cache } from 'react';
import productService from '@/service/product.server.service';
import { notFound } from 'next/navigation';
import { DEFAULT_IMAGE } from '@/utils/const.util';
import { headers } from 'next/headers';
import ProductDetail from '@/app/[category]/[sub-category]/[product]/ProductDetail';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Script from 'next/script';

type ProductPage = {
  params: Promise<{ product: string }>;
};

// cache
const getProduct = cache(async (slug: string) => {
  try {
    const res = await productService.getProductBySlug(slug);
    return res;
  } catch (e) {
    notFound();
  }
});

export async function generateMetadata({ params }: ProductPage) {
  const { product: slug } = await params;
  const product = await getProduct(slug);

  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const fullUrl = `${protocol}://${host}/product/detail/${slug}`;

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: fullUrl,
      type: 'website',
      siteName: product.name,
      images: [
        {
          url: product?.images[0].url ?? DEFAULT_IMAGE,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPage) {
  const { product: slug } = await params;
  const product = await getProduct(slug);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images[0].url,
    description: product.description,
  };
  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </>
  );
}
