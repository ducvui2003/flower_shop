import PaginationProduct from '@/app/[category]/[sub-category]/pagination';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import ListView from '@/components/ListView';
import ProductCard from '@/components/product/ProductCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import productService from '@/service/product.server.service';
import { ProductCardType } from '@/types/product.type';
import React from 'react';

type CategoryPageType = {
  params: Promise<{ category: string }>;
};

const CategoryPage = async ({ params }: CategoryPageType) => {
  const { category } = await params;
  const page = await productService.getCategoryPage(category);
  const products = await productService.getProducts({});
  return (
    <React.Fragment>
      <Header />
      <section className="container-p container">
        <div className="mt-2 mb-8 flex justify-center">
          <h2 className="before:bg-primary relative text-4xl before:absolute before:-right-1 before:-bottom-1 before:-left-1 before:h-[2px]">
            {page.title}
          </h2>
        </div>
        <ScrollArea className="min-h-[50vh]">
          <ListView<ProductCardType>
            display="grid"
            data={products.items}
            className="product pc:grid-cols-4 grid-cols-2 gap-5"
            emptyComponent={null}
            render={(item, index) => (
              <ProductCard key={index} {...item} href={item.href} />
            )}
          />
        </ScrollArea>
        <div className="mt-5 flex justify-center">
          {products.items.length !== 0 && (
            <PaginationProduct
              currentPage={products.paging.page}
              totalPages={products.paging.total}
            />
          )}
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default CategoryPage;
