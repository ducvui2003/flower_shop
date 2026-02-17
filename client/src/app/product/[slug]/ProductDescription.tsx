import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TEXT from '@/utils/text.util';
import edjsHTML from 'editorjs-html';
import parse from 'html-react-parser';

type ProductDescriptionProps = {
  description: string;
  productId: number;
};

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  const edjsParser = edjsHTML();
  const html = edjsParser.parse(JSON.parse(description));

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
        <div className="rounded-md border-2 p-3 text-justify">
          {parse(html)}
        </div>
      </TabsContent>
    </Tabs>
  );
}
