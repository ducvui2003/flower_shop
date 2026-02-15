import { CategoryModel } from '@/modules/category/category.model';
import z from 'zod';

const CategoryCreateResponseSchema = CategoryModel.pick({
  name: true,
}).extend({
  href: z.string(),
});

const CategoryGetResponseSchema = CategoryModel.pick({
  id: true,
  name: true,
}).extend({
  href: z.string(),
  thumbnail: z
    .object({
      src: z.string(),
      alt: z.string().nullable(),
    })
    .optional(),
  productCount: z.number().optional(),
});

const CategoryDetailGetResponseSchema = CategoryModel.pick({
  id: true,
  name: true,
}).extend({
  href: z.string(),
  thumbnail: z
    .object({
      id: z.number(),
      src: z.string(),
      alt: z.string().nullable(),
    })
    .nullable(),
  productCount: z.number().optional(),
});

const CategoryEditingGetResponseSchema = CategoryModel.pick({
  id: true,
  name: true,
  slugRegistry: true,
  slugPlaceholder: true,
  thumbnailId: true,
});

type CategoryCreateResponseType = z.infer<typeof CategoryCreateResponseSchema>;
type CategoryDetailGetResponseType = z.infer<
  typeof CategoryDetailGetResponseSchema
>;
type CategoryGetResponseType = z.infer<typeof CategoryGetResponseSchema>;
type CategoryEditingGetResponseType = z.infer<
  typeof CategoryEditingGetResponseSchema
>;

export {
  CategoryCreateResponseSchema,
  CategoryDetailGetResponseSchema,
  CategoryGetResponseSchema,
  CategoryEditingGetResponseSchema,
};

export type {
  CategoryCreateResponseType,
  CategoryDetailGetResponseType,
  CategoryGetResponseType,
  CategoryEditingGetResponseType,
};
