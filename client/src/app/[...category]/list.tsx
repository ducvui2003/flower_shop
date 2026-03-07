import PaginationProduct from '@/app/[...category]/pagination';
import Sort from '@/app/[...category]/sort';
import { SORT_MAPPING } from '@/app/[...category]/type-const';
import EmptyState from '@/components/EmptyState';
import ListView from '@/components/ListView';
import ProductCard from '@/components/product/ProductCard';
import productService from '@/service/product.server.service';
import { ProductType } from '@/types/product.type';

type ProductListProp = {
  filters: {
    sort: string;
    category: string[];
  };
};

export default async function ProductList({
  filters: { category, sort },
}: ProductListProp) {
  const products = await productService.getProducts({
    categoriesSlug: category,
    sort: sort === SORT_MAPPING.desc ? 'desc' : 'asc',
  });

  const { items, currentPage, totalItems, totalPages } = products;

  return (
    <>
      <div className="rounded-xl border-2 px-2 py-1">
        <Sort quantity={currentPage} sort={sort} />
      </div>
      <ListView<ProductType>
        display="grid"
        data={items}
        className="product pc:grid-cols-4 mt-4 grid-cols-2 gap-5"
        emptyComponent={null}
        render={(item, index) => (
          <ProductCard
            key={index}
            id={item.id}
            name={item.title}
            price={item.price}
            priceSale={item.priceSale}
            href={item.href}
          />
        )}
      />
      {totalItems !== 0 ? (
        <PaginationProduct page={currentPage} maxPage={totalPages} />
      ) : (
        <EmptyState />
      )}
    </>
  );
}
