import { ProductModelType } from '@/modules/product/product.model';
import {
  ProductCreateRequestType,
  ProductSearchGetQueryType,
} from '@/modules/product/product.request';
import { SLUG_REGISTER_PRODUCT_SINGLE_PAGE } from '@/shared/config/database.config';
import prismaService from '@/shared/services/db.service';
import { Page } from '@/types/app';

interface ProductRepository {
  createProduct: (data: ProductCreateRequestType) => Promise<ProductModelType>;
  searchProducts: (
    data: ProductSearchGetQueryType,
  ) => Promise<Page<ProductModelType>>;
  getProductById: (id: number) => Promise<ProductModelType>;
  getProductBySlug: (name: string) => Promise<ProductModelType>;
  deleteProductById: (id: number) => Promise<void>;
}
const productRepository: ProductRepository = {
  createProduct: async (data: ProductCreateRequestType) => {
    const result = prismaService.$transaction(async (ctx) => {
      const product = await ctx.product.create({
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          priceSale: data.priceSale,
          slugRegistryId: SLUG_REGISTER_PRODUCT_SINGLE_PAGE,
          slugPlaceholder: data.slug.name,
        },
        include: {
          slug: true,
        },
      });
      if (data.thumbnailIds) {
        ctx.productMedia.createMany({
          data: data.thumbnailIds.map((mediaId) => ({
            productId: product.id,
            mediaId: mediaId,
          })),
        });
      }
      return product;
    });
    return result;
  },
  getProductBySlug: async (name: string): Promise<ProductModelType> => {
    return await prismaService.product.findFirstOrThrow({
      where: {
        slugPlaceholder: name,
      },
      include: {
        slug: true,
      },
    });
  },
  searchProducts: async (
    data: ProductSearchGetQueryType,
  ): Promise<Page<ProductModelType>> => {
    const categoryFilter = data.categories.length
      ? {
          some: {
            category: {
              name: { in: data.categories },
            },
          },
        }
      : undefined;
    const [items, totalItems] = await prismaService.$transaction([
      prismaService.product.findMany({
        where: {
          name: data.name,
          categories: categoryFilter,
        },
        take: data.limit,
        skip: (data.page - 1) * data.limit,
        include: {
          slug: true,
        },
      }),
      prismaService.product.count({
        where: {
          name: data.name,
          categories: categoryFilter,
        },
      }),
    ]);

    return {
      items,
      totalItems,
      totalPages: Math.ceil(totalItems / data.limit),
      currentPage: data.page,
      isLast: data.page === Math.ceil(totalItems / data.limit),
    };
  },
  getProductById: async (id: number): Promise<ProductModelType> => {
    return await prismaService.product.findFirstOrThrow({
      where: {
        id: id,
      },
      include: {
        slug: true,
      },
    });
  },
  deleteProductById: async (id: number): Promise<void> => {
    await prismaService.product.delete({
      where: {
        id: id,
      },
    });
  },
};
export default productRepository;
