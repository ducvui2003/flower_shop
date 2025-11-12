import ProductList from '@/app/[category]/[sub-category]/list';
import {
  PageParamsValueType,
  SEARCH_MAPPING,
  SearchParamsValueType,
  SORT_MAPPING,
} from '@/app/[category]/[sub-category]/type-const';

import ClientIcon from '@/components/ClientIcon';
import Link from '@/components/Link';
import productService from '@/service/product.server.service';
import { normalizeParam, normalizeSingleParam } from '@/utils/http.util';

type SearchParams = Promise<
  Record<SearchParamsValueType, string[]> & Record<PageParamsValueType, string>
>;

type CategoryPageType = {
  params: Promise<{ category: string; 'sub-category': string }>;
  searchParams: SearchParams;
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
  const sort = normalizeSingleParam(
    searchParams[SEARCH_MAPPING.sort],
    SORT_MAPPING.asc,
  );

  const data = await productService.getSubCategoryPage(category, subCategory);

  return (
    <section className="container">
      <div className="pc:mx-0 relative mx-2 my-8 flex items-center justify-center">
        <Link
          href={data.parent.href}
          className="text-md bg-primary absolute bottom-0 left-0 flex items-center gap-2 rounded-lg p-2 text-white hover:opacity-65"
        >
          <ClientIcon icon={'mingcute:left-fill'} size={15} />
          <span className="pc:inline hidden"> {data.parent.name}</span>
        </Link>
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
