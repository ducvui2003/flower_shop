import { MetadataModel } from '@/shared/models/common.model';
import { MediaModel } from '@/shared/models/media.model';
import { SlugRegistry } from '@/shared/models/slug.model';
import z from 'zod';

const ProductMetadataModel = z
  .object({
    title: z.string(),
    metaDescription: z.string(),
  })
  .nullable();

const ProductModel = MetadataModel.extend({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  priceSale: z.number(),
  slug: SlugRegistry,
  slugPlaceholder: z.string(),
  metadata: ProductMetadataModel,
});

const CategoryModel = z.object({
  id: z.number(),
  name: z.string(),
  parentId: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable(),
});

const ProductCategoryModel = z.object({
  productId: z.string(),
  categoryId: z.string(),
  product: ProductModel,
  category: CategoryModel,
});

const ProductMediaModel = z.object({
  productId: z.number(),
  mediaId: z.number(),
  product: ProductModel,
  media: MediaModel,
});

type ProductCategoryModelType = z.infer<typeof ProductCategoryModel>;
type ProductModelType = z.infer<typeof ProductModel>;
type ProductMediaModelType = z.infer<typeof ProductMediaModel>;
type ProductMetadataModelType = z.infer<typeof ProductMetadataModel>;
export {
  ProductModel,
  ProductCategoryModel,
  ProductMediaModel,
  ProductMetadataModel,
};
export type {
  ProductModelType,
  ProductCategoryModelType,
  ProductMediaModelType,
  ProductMetadataModelType,
};
