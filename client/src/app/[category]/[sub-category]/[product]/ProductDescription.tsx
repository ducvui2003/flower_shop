import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TEXT from '@/utils/text.util';

type ProductDescriptionProps = {
  description: string;
  productId: number;
};

function ProductDescription({
  description,
  productId,
}: ProductDescriptionProps) {
  return (
    <Tabs defaultValue="desc" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="desc" className="hover:cursor-pointer">
          {TEXT.PRODUCT_DETAIL.DESCRIPTION}
        </TabsTrigger>
        <TabsTrigger value="review" className="hover:cursor-pointer">
          {TEXT.PRODUCT_DETAIL.REVIEW}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="desc">
        <p
          className="rounded-md border-2 p-3 text-justify"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </TabsContent>
    </Tabs>
  );
}

export default ProductDescription;
