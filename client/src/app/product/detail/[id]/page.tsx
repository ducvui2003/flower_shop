import { cache } from 'react';
import ProductDetail from './ProductDetail';
import productService from '@/service/product.server.service';
import { notFound } from 'next/navigation';
import { DEFAULT_IMAGE, TITLE } from '@/utils/const.util';
import { headers } from 'next/headers';

type ProductPage = {
  params: Promise<{ id: string }>;
};

// cache
const getProduct = cache(async (id: string) => {
  try {
    const res = await productService.getProductById(parseInt(id));
    return res;
  } catch (e) {
    notFound();
  }
});

export async function generateMetadata({ params }: ProductPage) {
  const { id } = await params;
  const product = await getProduct(id);

  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const fullUrl = `${protocol}://${host}/product/detail/${id}`;

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: fullUrl,
      type: 'website',
      siteName: TITLE,
      images: [
        {
          url: product?.thumbnail ?? DEFAULT_IMAGE,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPage) {
  const { id } = await params;
  const product = await getProduct(id);
  return <ProductDetail product={product} />;
}
