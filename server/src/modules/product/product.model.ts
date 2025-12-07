import { MetadataModel } from '@/shared/models/common.model';
import { MediaModel } from '@/shared/models/media.model';
import { SlugRegistry } from '@/shared/models/slug.model';
import z from 'zod';

const ProductModel = MetadataModel.extend({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  priceSale: z.number(),
  slug: SlugRegistry,
  slugPlaceholder: z.string(),
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
export { ProductModel, ProductCategoryModel, ProductMediaModel };
export type {
  ProductModelType,
  ProductCategoryModelType,
  ProductMediaModelType,
};
