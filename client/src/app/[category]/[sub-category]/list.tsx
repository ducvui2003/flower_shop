import Sort from '@/app/[category]/[sub-category]/sort';
import ListView from '@/components/ListView';
import ProductCard from '@/components/product/ProductCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import productService from '@/service/product.server.service';
import { ProductCardType } from '@/types/product.type';
import PaginationProduct from './pagination';

type ProductListProp = {
  filters: {
    sort: string;
    category: string[];
  };
};

export default async function ProductList({
  filters: { category, sort },
}: ProductListProp) {
  const products = await productService.getProducts({ category: category });

  const {
    paging: { page, total },
  } = products;

  return (
    <>
      <div className="rounded-xl border-2 px-2 py-1">
        <Sort quantity={page} sort={sort} />
      </div>
      <ScrollArea className="mt-5 min-h-[50vh]">
        <ListView<ProductCardType>
          display="grid"
          data={products.items}
          className="product pc:grid-cols-4 grid-cols-2 gap-5"
          emptyComponent={null}
          render={(item, index) => <ProductCard key={index} {...item} />}
        />
        {products.items.length !== 0 && (
          <PaginationProduct page={products.paging.page} maxPage={total} />
        )}
      </ScrollArea>
    </>
  );
}
