import { ProductModel } from '@/modules/product/product.model';
import z from 'zod';

const ProductCreateResponseSchema = ProductModel.pick({
  name: true,
  price: true,
  priceSale: true,
  createdAt: true,
}).extend({
  href: z.string(),
  images: z.array(z.string()).optional(),
});

const ProductGetResponseSchema = ProductModel.pick({
  id: true,
  name: true,
  price: true,
  priceSale: true,
  description: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  href: z.string(),
});

const ProductDetailGetResponseSchema = ProductModel.pick({
  id: true,
  name: true,
  price: true,
  priceSale: true,
  description: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  href: z.string(),
});
type ProductCreateResponseType = z.infer<typeof ProductCreateResponseSchema>;
type ProductDetailGetResponseType = z.infer<
  typeof ProductDetailGetResponseSchema
>;
type ProductGetResponseType = z.infer<typeof ProductGetResponseSchema>;

export {
  ProductCreateResponseSchema,
  ProductDetailGetResponseSchema,
  ProductGetResponseSchema,
};
export type {
  ProductCreateResponseType,
  ProductDetailGetResponseType,
  ProductGetResponseType,
};
