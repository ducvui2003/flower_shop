import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Link from '@/components/Link';
import ListView from '@/components/ListView';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import productService from '@/service/product.server.service';
import { ProductCardType } from '@/types/product.type';
import TEXT from '@/utils/text.util';
import React from 'react';

type CategoryPageType = {
  params: Promise<{ category: string }>;
};

const CategoryPage = async ({ params }: CategoryPageType) => {
  const { category } = await params;
  const data = await productService.getCategoryPage(category);

  return (
    <React.Fragment>
      <Header />
      <section className="container">
        <div className="mt-2 mb-8 flex justify-center">
          <h2 className="before:bg-primary relative text-4xl before:absolute before:-right-1 before:-bottom-1 before:-left-1 before:h-[2px]">
            {data.title}
          </h2>
        </div>
        <ScrollArea className="min-h-[50vh]">
          <ListView<ProductCardType>
            display="grid"
            data={data.products}
            className="product pc:grid-cols-4 grid-cols-2 gap-5"
            emptyComponent={null}
            render={(item, index) => (
              <ProductCard key={index} {...item} href="" />
            )}
          />
        </ScrollArea>
        <div className="mt-5 flex justify-center">
          <Link href={data.moreHref}>
            <Button>{TEXT.PRODUCT_LIST.MORE}</Button>
          </Link>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default CategoryPage;
