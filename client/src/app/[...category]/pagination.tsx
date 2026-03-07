'use client';
import ListView from '@/components/ListView';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import productService from '@/service/product.service';
import { ProductType } from '@/types/product.type';
import TEXT from '@/utils/text.util';
import { useState } from 'react';
type PagingProductProps = {
  page: number;
  maxPage: number;
};

type KeySearching = 'limit' | 'page';

const PaginationProduct = ({
  page: initialPage,
  maxPage,
}: PagingProductProps) => {
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(page < maxPage);
  const [loading, setLoading] = useState(false);
  const [extraProducts, setExtraProducts] = useState<ProductType[]>([]);

  const loadMore = async () => {
    setLoading(true);
    const data = await productService.getProducts({});
    setExtraProducts((prev) => [...prev, ...data.items]);
    setPage(page + 1);
    setHasMore(data.totalPages > page);
    setLoading(false);
  };

  return (
    <>
      <ListView<ProductType>
        display="grid"
        data={extraProducts}
        className="pc:grid-cols-4 mt-5 grid-cols-2 gap-5"
        emptyComponent={null}
        render={(item, index) => (
          <ProductCard
            key={index}
            name={item.title}
            id={item.id}
            href={item.href}
            price={item.price}
            priceSale={item.priceSale}
          />
        )}
      />
      {hasMore && (
        <div className="mt-4 text-center">
          <Button onClick={loadMore}>{TEXT.PRODUCT_LIST.MORE}</Button>
        </div>
      )}
    </>
  );
};

export default PaginationProduct;
