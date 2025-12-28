import { SupplierType } from '@/types/supplier.type';
import { z } from 'zod';
import { CategoryType } from './category.type';
import { Link, Source } from '@/types/common.type';
type ProductSearchParamsType = {
  price?: string[];
  category?: string[];
};

type ProductSearchParamsKeyType = keyof ProductSearchParamsType;

type ProductCardType = {
  id: number;
  name: string;
  basePrice: number;
  salePrice: number;
  link: Link;
  thumbnails?: Source[] | Source;
  view?: number;
  className?: string;
  numSell?: number;
  avgStar?: number;
};

type ProductResType = {
  id: number;
  name: string;
  description: string;
  thumbnail?: string;
  basePrice: number;
  salePrice?: number;
  avgStar: number;
  numSell: number;
};

type ProductDetailRespType = {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  salePrice?: number;
  views: number;
  category: {
    id: number;
    name: string;
  };
  supplier: {
    name: string;
  };
  thumbnail?: string;
  resources?: string[];
  option: {
    id: number;
    name: string;
    price: number;
    resource: string;
  }[];
  liked: boolean;
};

type ProductType = {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  supplierId: string;
  basePrice: number;
  salePrice: number;
  category: CategoryType;
  supplier: SupplierType;
};

const string = z.string().min(1, 'Name is required');

const CreateOptionBodySchema = z.object({
  name: string,
  price: z.coerce.number().min(1, 'Price must be >= 0'),
  resourceId: z.number().optional(),
  stock: z.coerce.number(),
});

const BaseResourceForm = z.object({
  id: z.number(),
  publicId: z.string(),
  url: z.string(),
});

const BaseOptionForm = z.object({
  id: z.number().nullable(),
  name: string,
  price: z.coerce.number().min(1, 'Price must be >= 0'),
  resource: BaseResourceForm.optional(),
  stock: z.coerce.number(),
});

const BaseProductFormSchema = z
  .object({
    name: string,
    description: z.string(),
    categoryId: z.coerce.number().min(1, 'Vui lòng chọn'),
    supplierId: z.coerce.number().min(1, 'Vui lòng chọn'),
    basePrice: z.coerce.number().min(1000, 'Price must be >= 1000'),
    salePrice: z.coerce.number().min(0, 'Price must be >= 0').optional(),
    thumbnail: BaseResourceForm.optional(),
    resources: z.array(BaseResourceForm).optional(),
    isDeleted: z.boolean(),
    options: z.array(BaseOptionForm).optional(),
  })
  .refine(
    (data) => {
      if (data.salePrice != null && data.salePrice > data.basePrice) {
        return false;
      }
      return true;
    },
    {
      message: 'Giá giảm cần phải nhỏ hơn giá cơ bản',
      path: ['salePrice'],
    },
  );

type BaseProductFormType = z.infer<typeof BaseProductFormSchema>;

const CreateProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  categoryId: z.number(),
  supplierId: z.number(),
  basePrice: z.number(),
  salePrice: z.number(),
  thumbnailId: z.number().optional(),
  resourceIds: z.array(z.number()).optional(),
  isDeleted: z.boolean(),
  options: z.array(CreateOptionBodySchema).optional(),
});

const UpdateProductBodySchema = z.object({
  name: string,
  description: z.string(),
  categoryId: z.number(),
  supplierId: z.number(),
  basePrice: z.number(),
  salePrice: z.number().optional(),
  thumbnailId: z.number().optional(),
  resourceIds: z.array(z.number()).optional(),
  isDeleted: z.boolean(),
  options: z.array(BaseOptionForm).optional(),
});

type CreateOptionBodyType = z.infer<typeof CreateOptionBodySchema>;
type CreateProductBodyType = z.infer<typeof CreateProductBodySchema>;
type UpdateProductBodyType = z.infer<typeof UpdateProductBodySchema>;
type ProductManagerResType = {
  id: number;
  name: string;
  createdAt: Date;
  basePrice: number;
  salePrice: number;
  category: number;
  supplier: number;
  thumbnail?: string;
  isDeleted: boolean;
};

type ResourceResSchema = {
  id: number;
  publicId: string;
  url: string;
};

type ProductDetailManagerResType = {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  salePrice: number;

  categoryId: number;
  supplierId: number;

  resource: ResourceResSchema[];

  options: {
    id: number;
    name: string;
    price: number;
    stock: number;
    resource: ResourceResSchema;
  }[];

  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

type CreateProductResType = {
  id: number;
  name: string;
  basePrice: number;
  salePrice: number;
  createdAt: Date;
  updatedAt: Date;
};

type SearchProductResType = {
  items: Pick<ProductResType, 'id' | 'name'>[];
};

export {
  BaseProductFormSchema,
  CreateOptionBodySchema,
  CreateProductBodySchema,
  UpdateProductBodySchema,
};
export type {
  BaseProductFormType,
  CreateOptionBodyType,
  CreateProductBodyType,
  CreateProductResType,
  ProductCardType,
  ProductDetailManagerResType,
  ProductDetailRespType,
  ProductManagerResType,
  ProductResType,
  ProductSearchParamsKeyType,
  ProductSearchParamsType,
  ProductType,
  SearchProductResType,
  UpdateProductBodyType,
};
