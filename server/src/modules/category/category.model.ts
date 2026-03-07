import { MediaModel } from '@/shared/models/media.model';
import { SlugRegistry } from '@/shared/models/slug.model';
import z from 'zod';

const CategoryModel = z.object({
  id: z.number(),
  name: z.string().nonempty(),
  slugRegistry: SlugRegistry,
  slugPlaceholder: z.string(),
  thumbnail: MediaModel.nullable(),
  thumbnailId: z.number().nullable(),
});

const CategoryWithoutThumbnailModel = z.object({
  id: z.number(),
  name: z.string().nonempty(),
  slugRegistry: SlugRegistry,
  slugPlaceholder: z.string(),
  thumbnailId: z.number().nullable(),
});

const CategoryWithProductCountModel = z.object({
  id: z.number(),
  name: z.string().nonempty(),
  slugRegistry: SlugRegistry,
  slugPlaceholder: z.string(),
  thumbnail: MediaModel.nullable(),
  thumbnailId: z.number().nullable(),
  productCount: z.number().default(0),
});

const ProductCategoryModel = z.object({
  productId: z.number(),
  categoryId: z.number(),
  createdAt: z.date(),
});

type CategoryModelType = z.infer<typeof CategoryModel>;
type CategoryWithoutThumbnailModelType = z.infer<
  typeof CategoryWithoutThumbnailModel
>;
type CategoryWithProductCountModelType = z.infer<
  typeof CategoryWithProductCountModel
>;
type ProductCategoryModelType = z.infer<typeof ProductCategoryModel>;

export {
  CategoryModel,
  CategoryWithoutThumbnailModel,
  CategoryWithProductCountModel,
  ProductCategoryModel,
};

export type {
  CategoryModelType,
  CategoryWithoutThumbnailModelType,
  CategoryWithProductCountModelType,
  ProductCategoryModelType,
};
