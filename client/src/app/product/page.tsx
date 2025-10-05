import FilterSlice from '@/app/product/filter-slice';
import PaginationProduct from '@/app/product/pagination';
import ListView from '@/components/ListView';
import ProductCard from '@/components/ProductCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import productService from '@/service/product.server.service';
import { PageReq } from '@/types/api.type';
import { ProductCardType, ProductSearchParamsType } from '@/types/product.type';
export const dynamic = 'force-dynamic';
export async function generateMetadata() {
  return {
    title: 'Danh sách sản phẩm',
  };
}

type ProductPageProps = {
  searchParams: Promise<Partial<PageReq<ProductSearchParamsType>>>;
};

const ProductPage = async ({ searchParams }: ProductPageProps) => {
  const searchParamsAsync = await searchParams;
  const currentPage = Number(searchParamsAsync?.page) || 1;
  const currentSize = Number(searchParamsAsync?.size) || 8;

  const response = await productService.getAllProducts({
    ...searchParamsAsync,
    page: currentPage,
    size: currentSize,
  });
  const data: ProductCardType[] = response.items.map((item) => ({
    ...item,
    star: item.avgStar || 0,
  }));

  const { limit, page, totalItems = 0, totalPages } = response.pagination;

  return (
    <div className="mt-10 flex gap-4">
      <div className="filter-left basis-[300px]">
        <h3 className="bg-primary px-5 py-2.5 text-center text-2xl">
          Lọc sản phẩm
        </h3>
        <FilterSlice />
      </div>
      <div className="flex-1">
        <div className="filter-header my-3 flex items-center justify-between">
          {totalItems > 0 && (
            <span className="text-xl font-bold">
              Có {totalItems} sản phẩm phù hợp
            </span>
          )}
        </div>
        <ScrollArea className="h-3/4">
          <ListView<ProductCardType>
            display="grid"
            data={data}
            className="product grid-cols-4 gap-5"
            emptyComponent={null}
            render={(item, index) => <ProductCard key={index} {...item} />}
          />
          {data && data.length === 0 && (
            <div className="text-center text-xl text-gray-500">
              Không có sản phẩm nào phù hợp với bộ lọc của bạn.
            </div>
          )}
        </ScrollArea>
        {data && data.length > 0 && (
          <PaginationProduct
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default ProductPage;
