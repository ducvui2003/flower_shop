import { CategoryModel } from '@/modules/category/category.model';
import z from 'zod';

const CategoryCreateRequestSchema = CategoryModel.pick({
  name: true,
}).extend({
  slug: z.object({
    name: z.string(),
  }),
  thumbnailId: z.number().int().optional(),
});

const CategoryUpdateRequestSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z
    .object({
      name: z.string(),
    })
    .optional(),
  thumbnailId: z.number().int().nullable().optional(),
});

const CategoryGetParamsSchema = z.object({
  slug: z.string(),
});

const CategorySearchGetQuerySchema = z.object({
  name: z.string().trim().toLowerCase().optional(),
  page: z.preprocess(
    (v) => (v === undefined ? undefined : Number(v)),
    z.number().int().min(1).default(1),
  ),
  limit: z.preprocess(
    (v) => (v === undefined ? undefined : Number(v)),
    z.number().int().min(1).max(50).default(10),
  ),
});

const CategoryGetQuerySchema = z.object({
  type: z.enum(['name', 'id']),
});

type CategoryGetParamsType = z.infer<typeof CategoryGetParamsSchema>;
type CategoryGetQueryType = z.infer<typeof CategoryGetQuerySchema>;
type CategorySearchGetQueryType = z.infer<typeof CategorySearchGetQuerySchema>;
type CategoryCreateRequestType = z.infer<typeof CategoryCreateRequestSchema>;
type CategoryUpdateRequestType = z.infer<typeof CategoryUpdateRequestSchema>;

export {
  CategoryCreateRequestSchema,
  CategoryUpdateRequestSchema,
  CategoryGetParamsSchema,
  CategorySearchGetQuerySchema,
  CategoryGetQuerySchema,
};

export type {
  CategoryGetParamsType,
  CategoryGetQueryType,
  CategorySearchGetQueryType,
  CategoryCreateRequestType,
  CategoryUpdateRequestType,
};
