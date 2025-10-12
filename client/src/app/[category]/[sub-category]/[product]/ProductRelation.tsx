import ProductCard from '@/components/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import productService from '@/service/product.server.service';

type ProductRelationProps = {
  categoryId: number;
};

const ProductRelation = async ({ categoryId }: ProductRelationProps) => {
  const response = await productService.getAllProducts({
    page: 1,
    size: 8,
    categoryId,
  });
  if (response.items.length == 0) return null;
  return (
    <Carousel>
      <CarouselContent>
        {response.items.map((item, index) => (
          <CarouselItem key={index} className="basis-1/4">
            <ProductCard key={index} {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProductRelation;
