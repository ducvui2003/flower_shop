import Filter from '@/app/[category]/[sub-category]/filter';
import {
  SEARCH_MAPPING,
  SearchParamsValueType,
} from '@/app/[category]/[sub-category]/type-const';
import Sort from '@/app/[category]/[sub-category]/sort';
import StackFilter from '@/app/[category]/[sub-category]/stack-filter';

import PaginationProduct from '@/app/product/pagination';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import EmptyState from '@/components/EmptyState';
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
  const products = await productService.getProducts({});
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
  const filter = await productService.getFilterData();
  return (
    <React.Fragment>
      <Header />
      <section className="container">
        <section className="px:mx-0 pc:grid-cols-4 pc:relative pc:gap-x-4 mx-2 mt-4 grid grid-cols-1 gap-y-4">
          <div className="pc:sticky pc:top-5 pc:block flex h-fit justify-end self-start">
            <Filter
              structure={filter}
              category={searchParams[SEARCH_MAPPING.category]}
              price={searchParams[SEARCH_MAPPING.price]}
            />
          </div>

          <div className="col-span-3 flex flex-1 flex-col">
            <StackFilter
              structure={filter}
              category={searchParams[SEARCH_MAPPING.category]}
              price={searchParams[SEARCH_MAPPING.price]}
            />
            <Sort quantity={0} sort={searchParams[SEARCH_MAPPING.sort]?.[0]} />
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
            {products.items.length === 0 && <EmptyState />}
            {products.items.length !== 0 && (
              <PaginationProduct
                currentPage={products.paging.page}
                totalPages={products.paging.total}
              />
            )}
          </div>
        </section>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default CategoryPage;
