import ListView from '@/components/ListView';
import ProductCard from '@/components/product/ProductCard';
import productService from '@/service/product.server.service';
import { ProductCardType } from '@/types/product.type';
type ProductRelatedProps = {
  categoryId?: number[];
  category?: string[];
};

const ProductRelated = async ({
  categoryId,
  category,
}: ProductRelatedProps) => {
  const response = await productService.getProducts({
    categoryId: categoryId,
    category: category,
  });
  if (response.items.length == 0) return null;
  return (
    <>
      <h2 className="pb-3 text-2xl">Sản phẩm liên quan</h2>
      <ListView<ProductCardType>
        display="flex"
        orientation="horizontal"
        data={response.items.splice(4, 4)}
        className="product gap-5"
        render={(item, index) => (
          <ProductCard className="flex-1" key={index} {...item} />
        )}
      />
    </>
  );
};

export default ProductRelated;
