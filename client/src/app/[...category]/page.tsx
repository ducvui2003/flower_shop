import ProductList from '@/app/[...category]/list';
import {
  PageParamsValueType,
  SEARCH_MAPPING,
  SearchParamsValueType,
  SORT_MAPPING,
} from '@/app/[...category]/type-const';

import ClientIcon from '@/components/ClientIcon';
import Link from '@/components/Link';
import productService from '@/service/product.server.service';
import { normalizeParam, normalizeSingleParam } from '@/utils/http.util';
import { notFound } from 'next/navigation';

type SearchParams = Promise<
  Record<SearchParamsValueType, string[]> & Record<PageParamsValueType, string>
>;

type CategoryPageType = {
  params: Promise<{ category: string[] }>;
  searchParams: SearchParams;
};

const CategoryPage = async ({
  params,
  searchParams: searchParamsAsync,
}: CategoryPageType) => {
  const { category } = await params;

  const segments = category ?? [];
  if (segments.length === 0) notFound();

  const secondLastCategory =
    segments.length > 2 && segments[segments.length - 1];
  const lastCategory = segments[segments.length - 1];

  const searchParams = await searchParamsAsync;
  searchParams[SEARCH_MAPPING.category] = normalizeParam(
    searchParams[SEARCH_MAPPING.category],
  );
  searchParams[SEARCH_MAPPING.category].push(lastCategory);
  searchParams[SEARCH_MAPPING.price] = normalizeParam(
    searchParams[SEARCH_MAPPING.price],
  );
  const sort = normalizeSingleParam(
    searchParams[SEARCH_MAPPING.sort],
    SORT_MAPPING.asc,
  );

  const data = await productService.getCategoryPage(lastCategory);

  if (!data) notFound();

  return (
    <section className="container">
      <div className="pc:mx-0 relative mx-2 my-8 flex items-center justify-center">
        {secondLastCategory && (
          <Link
            href={`/${secondLastCategory}`}
            className="text-md bg-primary absolute bottom-0 left-0 flex items-center gap-2 rounded-lg p-2 text-white hover:opacity-65"
          >
            <ClientIcon icon={'mingcute:left-fill'} size={15} />
            <span className="pc:inline hidden"> {data.title}</span>
          </Link>
        )}

        <h2 className="before:bg-primary relative text-4xl before:absolute before:-right-1 before:-bottom-1 before:-left-1 before:h-[2px]">
          {data.title}
        </h2>
      </div>
      <section className="pc:mx-0 pc:relative pc:gap-x-4 mx-2 mt-4 gap-y-4">
        <ProductList
          filters={{
            category: searchParams[SEARCH_MAPPING.category],
            sort: sort,
          }}
        />
      </section>
    </section>
  );
};

export default CategoryPage;
