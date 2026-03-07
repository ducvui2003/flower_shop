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
  createdAt: true,
  updatedAt: true,
}).extend({
  href: z.string(),
  thumbnail: z
    .object({
      src: z.string(),
      alt: z.string().nullable(),
    })
    .optional(),
});

const ProductDetailGetResponseSchema = ProductModel.pick({
  id: true,
  name: true,
  price: true,
  priceSale: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  metadata: true,
}).extend({
  href: z.string(),
  images: z.array(
    z.object({
      src: z.string(),
      alt: z.string().nullable(),
    }),
  ),
});

const ProductEditingGetResponseSchema = ProductModel.pick({
  id: true,
  name: true,
  price: true,
  priceSale: true,
  description: true,
  slug: true,
  slugPlaceholder: true,
  createdAt: true,
  updatedAt: true,
  isDeleted: true,
  metadata: true,
}).extend({
  imageIds: z.array(z.number()).optional(),
  categoryIds: z.array(z.number()).optional(),
});

type ProductCreateResponseType = z.infer<typeof ProductCreateResponseSchema>;
type ProductDetailGetResponseType = z.infer<
  typeof ProductDetailGetResponseSchema
>;
type ProductGetResponseType = z.infer<typeof ProductGetResponseSchema>;
type ProductEditingGetResponseType = z.infer<
  typeof ProductEditingGetResponseSchema
>;

export {
  ProductCreateResponseSchema,
  ProductDetailGetResponseSchema,
  ProductGetResponseSchema,
  ProductEditingGetResponseSchema,
};
export type {
  ProductCreateResponseType,
  ProductDetailGetResponseType,
  ProductGetResponseType,
  ProductEditingGetResponseType,
};
