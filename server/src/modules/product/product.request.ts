import { ProductModel } from '@/modules/product/product.model';
import z from 'zod';

const ProductCreateRequestSchema = ProductModel.pick({
  name: true,
  description: true,
  price: true,
  priceSale: true,
}).extend({
  slug: z.object({
    name: z.string(),
  }),
  thumbnailIds: z.array(z.number()).optional(),
});

const ProductUpdateRequestSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  priceSale: z.number().optional(),
  slug: z
    .object({
      name: z.string(),
    })
    .optional(),
  thumbnailIds: z.array(z.number()).optional(),
});

const ProductGetParamsSchema = z.object({
  slug: z.string(),
});

const ProductSearchGetQuerySchema = z.object({
  name: z.string().trim().toLowerCase().optional(),
  categories: z.preprocess((v) => {
    if (v === undefined) return []; // no category → empty array
    if (Array.isArray(v)) return v; // already an array
    return [v]; // single value → wrap in array
  }, z.array(z.string())),
  minPrice: z.preprocess(
    (v) => (v ? Number(v) : undefined),
    z.number().optional(),
  ),
  maxPrice: z.preprocess(
    (v) => (v ? Number(v) : undefined),
    z.number().optional(),
  ),
  sort: z.enum(['price_asc', 'price_desc']).default('price_asc'),

  page: z.preprocess(
    (v) => (v === undefined ? undefined : Number(v)),
    z.number().int().min(1).default(1),
  ),
  limit: z.preprocess(
    (v) => (v === undefined ? undefined : Number(v)),
    z.number().int().min(1).max(50).default(5),
  ),
});

const ProductGetQuerySchema = z.object({
  type: z.enum(['name', 'id']),
});
type ProductGetParamsType = z.infer<typeof ProductGetParamsSchema>;
type ProductGetQueryType = z.infer<typeof ProductGetQuerySchema>;
type ProductSearchGetQueryType = z.infer<typeof ProductSearchGetQuerySchema>;
type ProductCreateRequestType = z.infer<typeof ProductCreateRequestSchema>;
type ProductUpdateRequestType = z.infer<typeof ProductUpdateRequestSchema>;
export {
  ProductCreateRequestSchema,
  ProductGetQuerySchema,
  ProductGetParamsSchema,
  ProductSearchGetQuerySchema,
  ProductUpdateRequestSchema,
};

export type {
  ProductCreateRequestType,
  ProductGetQueryType,
  ProductGetParamsType,
  ProductSearchGetQueryType,
  ProductUpdateRequestType,
};
