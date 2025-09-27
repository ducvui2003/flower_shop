"use client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import ProductComment from "@/app/product/detail/[id]/ProductComment";

type ProductDescriptionProps = {
  description: string,
  productId: number,
}

function ProductDescription({description, productId}: ProductDescriptionProps) {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Thông tin chi tiết</TabsTrigger>
        <TabsTrigger value="password">Đánh giá sản phẩm</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin chi tiết</CardTitle>
            <CardDescription>
              {description}
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardContent className="space-y-2">
            <ProductComment productId={productId}/>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default ProductDescription;