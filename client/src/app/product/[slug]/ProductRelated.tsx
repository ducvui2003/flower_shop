import ProductCard from '@/components/product/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import productService from '@/service/product.server.service';

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
      <Carousel className="relative overflow-x-hidden">
        <CarouselContent>
          {response.items.splice(4, 4).map((item, index) => {
            return (
              <CarouselItem key={index} className="pc:basis-1/4 basis-1/2">
                <ProductCard {...item} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hover:bg-primary absolute top-1/2 left-4 -translate-y-1/2 hover:text-white" />
        <CarouselNext className="hover:bg-primary absolute top-1/2 right-4 -translate-y-1/2 hover:text-white" />
      </Carousel>
    </>
  );
};

export default ProductRelated;
