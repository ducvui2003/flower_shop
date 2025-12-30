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
  const fullUrl = `${protocol}://${host}/san-pham/${slug}`;
  console.log(product);
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.metadata.title,
      description: product.metadata.metaDescription,
      url: fullUrl,
      type: 'website',
      siteName: product.name,
      images: [
        {
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
      <ProductDetail
        id={product.id}
        name={product.name}
        images={product.images}
        description={product.description}
        price={product.price}
        priceSale={product.salePrice}
        avgRate={5}
        views={36}
      />
    </section>
  );
}
