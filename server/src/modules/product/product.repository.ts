import {
  ProductModelType,
  ProductWithMediaIdModelType,
} from '@/modules/product/product.model';
import {
  ProductCreateRequestType,
  ProductSearchGetQueryType,
  ProductUpdateRequestType,
} from '@/modules/product/product.request';
import { SLUG_REGISTER_PRODUCT_SINGLE_PAGE } from '@/shared/config/database.config';
import { AppErrorBuilder } from '@/shared/errors/app-error';
import { MediaModelType } from '@/shared/models/media.model';
import prismaService from '@/shared/services/db.service';
import {
  isForeignKeyNotFound,
  isRecordNotExist,
  isUniqueCode,
} from '@/shared/utils/error.util';
import { Page } from '@/types/app';
import { StatusCodes } from 'http-status-codes';

interface ProductRepository {
  createProduct: (data: ProductCreateRequestType) => Promise<ProductModelType>;
  updateProduct: (id: number, data: ProductUpdateRequestType) => Promise<void>;
  searchProducts: (
    data: ProductSearchGetQueryType,
  ) => Promise<Page<ProductModelType>>;
  getProductsById: (id: Array<number>) => Promise<Array<ProductModelType>>;
  getProductById: (id: number) => Promise<ProductModelType>;
  getProductThumbnailsById: (
    ids: Array<number>,
  ) => Promise<Array<MediaModelType>>;
  getProductMediaById: (id: number) => Promise<Array<MediaModelType>>;
  getProductEditingById: (id: number) => Promise<ProductWithMediaIdModelType>;
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
      if (data.images) {
        try {
          ctx.productMedia.createMany({
            data: data.images.map((mediaId) => ({
              productId: product.id,
              mediaId: mediaId,
            })),
          });
        } catch (e) {
          if (isForeignKeyNotFound(e)) {
            throw new AppErrorBuilder()
              .withError(StatusCodes.CONFLICT)
              .withMessage('Thumbnail entity not exist in database')
              .build();
          }
          throw e;
        }
      }
      return product;
    });
    return result;
  },
  updateProduct: async (
    id: number,
    data: ProductUpdateRequestType,
  ): Promise<void> => {
    await prismaService.$transaction(async (tx) => {
      const { slug, images: thumbnailIds, ...dataProduct } = data;
      try {
        await tx.product.update({
          where: { id: id },
          data: {
            ...dataProduct,
            ...(slug ? { slugPlaceholder: slug.name } : {}),
          },
        });
      } catch (e) {
        if (isRecordNotExist(e)) {
          throw new AppErrorBuilder()
            .withError(StatusCodes.NOT_FOUND)
            .withMessage(`Product with id ${id} not exist in database`)
            .build();
        }
        if (isUniqueCode(e)) {
          throw new AppErrorBuilder()
            .withStatusCode(StatusCodes.CONFLICT)
            .withError(e)
            .withMessage(
              `Slug ${slug?.name} is owned by another product entity`,
            )
            .build();
        }
        throw e;
      }
      if (thumbnailIds) {
        try {
          await tx.productMedia.deleteMany({
            where: {
              productId: id,
            },
          });
          await tx.productMedia.createMany({
            data: thumbnailIds.map((mediaId) => ({
              productId: id,
              mediaId: mediaId,
            })),
          });
        } catch (e) {
          if (isForeignKeyNotFound(e)) {
            throw new AppErrorBuilder()
              .withStatusCode(StatusCodes.CONFLICT)
              .withError(e)
              .withMessage('Thumbnail entity not exist in database')
              .build();
          }
          throw e;
        }
      }
    });
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
  getProductThumbnailsById: async (
    ids: Array<number>,
  ): Promise<Array<MediaModelType>> => {
    const data = await prismaService.productMedia.findMany({
      where: {
        productId: {
          in: ids,
        },
        isThumbnail: true,
      },
      select: {
        media: true,
      },
    });

    return data.map((i) => i.media);
  },
  getProductMediaById: async (id: number): Promise<Array<MediaModelType>> => {
    const data = await prismaService.productMedia.findMany({
      where: {
        productId: id,
      },
      select: {
        media: true,
      },
    });

    return data.map((i) => i.media);
  },
  searchProducts: async (
    data: ProductSearchGetQueryType,
  ): Promise<Page<ProductModelType>> => {
    const categoryFilter = data.categories.length
      ? {
          some: {
            category: {
              id: {
                in: data.categories,
              },
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
  getProductsById: async (
    ids: Array<number>,
  ): Promise<Array<ProductModelType>> => {
    return prismaService.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },

      include: {
        slug: true,
      },
    });
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

  getProductEditingById: async (
    id: number,
  ): Promise<ProductWithMediaIdModelType> => {
    return await prismaService.product.findFirstOrThrow({
      where: {
        id: id,
      },
      include: {
        slug: true,
        categories: {
          select: {
            categoryId: true,
          },
        },
        productMedias: {
          select: {
            mediaId: true,
          },
        },
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
