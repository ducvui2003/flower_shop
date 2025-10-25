import PaginationProduct from '@/app/[category]/[sub-category]/pagination';
import Sort from '@/app/[category]/[sub-category]/sort';
import {
  SEARCH_MAPPING,
  SearchParamsValueType,
} from '@/app/[category]/[sub-category]/type-const';

import ClientIcon from '@/components/ClientIcon';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Link from '@/components/Link';
import ListView from '@/components/ListView';
import ProductCard from '@/components/product/ProductCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import productService from '@/service/product.server.service';
import { ProductCardType } from '@/types/product.type';
import { normalizeParam } from '@/utils/http.util';
import React from 'react';

type CategoryPageType = {
  params: Promise<{ category: string; 'sub-category': string }>;
  searchParams: Promise<Record<SearchParamsValueType, string[]>>;
};

const CategoryPage = async ({
  params,
  searchParams: searchParamsAsync,
}: CategoryPageType) => {
  const { category, 'sub-category': subCategory } = await params;
  const searchParams = await searchParamsAsync;
  searchParams[SEARCH_MAPPING.category] = normalizeParam(
    searchParams[SEARCH_MAPPING.category],
  );
  searchParams[SEARCH_MAPPING.category].push(category);
  searchParams[SEARCH_MAPPING.price] = normalizeParam(
    searchParams[SEARCH_MAPPING.price],
  );
  searchParams[SEARCH_MAPPING.sort] = normalizeParam(
    searchParams[SEARCH_MAPPING.sort],
  );
  const page = await productService.getSubCategoryPage(category, subCategory);
  const products = await productService.getProducts({});

  return (
    <React.Fragment>
      <Header />
      <section className="container">
        <div className="pc:mx-0 relative mx-2 mt-2 mb-8 flex items-center justify-center">
          <Link
            href={page.parent.href}
            className="text-md bg-primary absolute bottom-0 left-0 flex items-center gap-2 rounded-lg p-2 text-white hover:opacity-65"
          >
            <ClientIcon icon={'mingcute:left-fill'} size={15} />
            <span className="pc:inline hidden"> {page.parent.name}</span>
          </Link>
          <h2 className="before:bg-primary relative text-4xl before:absolute before:-right-1 before:-bottom-1 before:-left-1 before:h-[2px]">
            {page.title}
          </h2>
        </div>
        <section className="pc:mx-0 pc:relative pc:gap-x-4 mx-2 mt-4 gap-y-4">
          <div className="col-span-3 flex flex-1 flex-col">
            <div className="my-2 rounded-xl border-2 px-2">
              <Sort
                quantity={0}
                sort={searchParams[SEARCH_MAPPING.sort]?.[0]}
              />
            </div>
            <ScrollArea className="min-h-[50vh]">
              <ListView<ProductCardType>
                display="grid"
                data={products.items}
                className="product pc:grid-cols-4 grid-cols-2 gap-5"
                emptyComponent={null}
                render={(item, index) => (
                  <ProductCard key={index} {...item} href="" />
                )}
              />
            </ScrollArea>
          </div>
          {products.items.length !== 0 && (
            <PaginationProduct
              currentPage={products.paging.page}
              totalPages={products.paging.total}
            />
          )}
        </section>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default CategoryPage;
