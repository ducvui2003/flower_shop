import ProductList from '@/app/[category]/[sub-category]/list';
import { SORT_MAPPING } from '@/app/[category]/[sub-category]/type-const';
import { Separator } from '@/components/ui/separator';
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
  );
};

export default CategoryPage;
