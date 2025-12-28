import { cache } from 'react';
import productService from '@/service/product.server.service';
import { notFound } from 'next/navigation';
import { DEFAULT_IMAGE_PRODUCT } from '@/utils/const.util';
import { headers } from 'next/headers';
import ProductDetail from '@/app/product/[slug]/ProductDetail';

type ProductPage = {
  params: Promise<{ slug: string }>;
};

const getProduct = cache(async (slug: string) => {
  try {
    const res = await productService.getProductBySlug(slug);
    return res;
  } catch (e) {
    notFound();
  }
});

export async function generateMetadata({ params }: ProductPage) {
  const { slug } = await params;

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
          url: product?.images[0].src ?? DEFAULT_IMAGE_PRODUCT,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPage) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <section>
      <ProductDetail product={product} />
    </section>
  );
}
