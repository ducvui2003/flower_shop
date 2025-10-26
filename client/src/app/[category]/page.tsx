import ProductList from '@/app/[category]/[sub-category]/list';
import { SORT_MAPPING } from '@/app/[category]/[sub-category]/type-const';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import productService from '@/service/product.server.service';
import { notFound } from 'next/navigation';
import React from 'react';

type CategoryPageType = {
  params: Promise<{ category: string }>;
};

const CategoryPage = async ({ params }: CategoryPageType) => {
  const { category } = await params;
  const page = await productService.getCategoryPage(category);
  if (!page) notFound();
  return (
    <React.Fragment>
      <Header />
      <section className="container-p container">
        <div className="mt-2 mb-8 flex justify-center">
          <h2 className="before:bg-primary relative text-4xl before:absolute before:-right-1 before:-bottom-1 before:-left-1 before:h-[2px]">
            {page.title}
          </h2>
        </div>
        <ProductList
          filters={{
            category: [category],
            sort: SORT_MAPPING.asc,
          }}
        />
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default CategoryPage;
