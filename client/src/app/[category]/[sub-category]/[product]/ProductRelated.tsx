import ListView from '@/components/ListView';
import ProductCard from '@/components/ProductCard';
import productService from '@/service/product.server.service';
import { ProductCardType } from '@/types/product.type';
type ProductRelatedProps = {
  categoryId: number;
};

const ProductRelated = async ({ categoryId }: ProductRelatedProps) => {
  const response = await productService.getAllProducts({
    size: 4,
    page: 1,
    categoryId: categoryId,
  });
  if (response.items.length == 0) return null;
  return (
    <ListView<ProductCardType>
      display="flex"
      orientation="horizontal"
      data={response.items}
      className="product gap-5"
      render={(item, index) => <ProductCard key={index} {...item} />}
    />
  );
};

export default ProductRelated;
