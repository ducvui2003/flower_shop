import {
  ProductModelType,
  ProductWithMediaIdModelType,
  ProductWithoutDescriptionModelType,
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
import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

interface ProductRepository {
  createProduct: (data: ProductCreateRequestType) => Promise<ProductModelType>;
  updateProduct: (id: number, data: ProductUpdateRequestType) => Promise<void>;
  searchProducts: (
    data: ProductSearchGetQueryType,
  ) => Promise<Page<ProductWithoutDescriptionModelType>>;
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
      await ctx.productCategory.createMany({
        data: data.categories.map((i) => ({
          categoryId: i,
          productId: product.id,
        })),
      });
      if (data.images) {
        try {
          await ctx.productMedia.createMany({
            data: data.images.map((mediaId) => ({
              productId: product.id,
              mediaId: mediaId,
              isThumbnail: mediaId === data.thumbnail ? true : false,
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
    productId: number,
    data: ProductUpdateRequestType,
  ): Promise<void> => {
    await prismaService.$transaction(async (tx) => {
      const {
        slug,
        images,
        categories: categoryIds,
        thumbnailId,
        ...dataProduct
      } = data;
      try {
        await tx.product.update({
          where: { id: productId },
          data: {
            ...dataProduct,
            ...(slug ? { slugPlaceholder: slug.name } : {}),
          },
        });
      } catch (e) {
        if (isRecordNotExist(e)) {
          throw new AppErrorBuilder()
            .withError(StatusCodes.NOT_FOUND)
            .withMessage(`Product with id ${productId} not exist in database`)
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
      if (images) {
        try {
          await tx.productMedia.deleteMany({
            where: {
              productId: productId,
            },
          });
          await tx.productMedia.createMany({
            data: images.map((mediaId) => ({
              productId: productId,
              mediaId: mediaId,
              isThumbnail: mediaId === data.thumbnailId ? true : false,
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
      } else {
        if (thumbnailId) {
          try {
            const { count } = await tx.productMedia.updateMany({
              where: {
                productId: productId,
                mediaId: thumbnailId,
              },
              data: {
                isThumbnail: true,
              },
            });
            if (count === 0) {
              throw new AppErrorBuilder()
                .withStatusCode(StatusCodes.NOT_FOUND)
                .withMessage(
                  `Thumbnail media with id ${thumbnailId} is not attached to product ${productId}`,
                )
                .build();
            }
            await tx.productMedia.updateMany({
              where: {
                productId: productId,
                mediaId: {
                  not: thumbnailId,
                },
              },
              data: {
                isThumbnail: false,
              },
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
      }
      if (categoryIds && categoryIds.length > 0) {
        try {
          await tx.productCategory.deleteMany({
            where: {
              productId: productId,
            },
          });
          await Promise.all(
            categoryIds.map((categoryId) =>
              tx.productCategory.createMany({
                data: {
                  productId: productId,
                  categoryId: categoryId,
                },
              }),
            ),
          );
        } catch (e) {
          if (isForeignKeyNotFound(e)) {
            throw new AppErrorBuilder()
              .withStatusCode(StatusCodes.CONFLICT)
              .withError(e)
              .withMessage('Category Product entity is not found')
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
  ): Promise<Page<ProductWithoutDescriptionModelType>> => {
    const categoryOr: Prisma.ProductWhereInput[] = [];

    if (data.categories.length > 0) {
      categoryOr.push({
        categories: {
          some: {
            categoryId: { in: data.categories },
          },
        },
      });
    }

    if (data.categoriesSlug.length > 0) {
      categoryOr.push({
        categories: {
          some: {
            category: {
              slugPlaceholder: { in: data.categoriesSlug },
            },
          },
        },
      });
    }

    const where: Prisma.ProductWhereInput = {
      ...(data.name && { name: data.name }),
      ...(categoryOr.length > 0 && { OR: categoryOr }),
    };

    const [items, totalItems] = await prismaService.$transaction([
      prismaService.product.findMany({
        where,
        take: data.limit,
        skip: (data.page - 1) * data.limit,
        include: {
          slug: true,
        },
        omit: {
          description: true,
        },
      }),
      prismaService.product.count({
        where,
      }),
    ]);

    return {
      items,
      totalItems,
      totalPages: Math.ceil(totalItems / data.limit),
      currentPage: items.length !== 0 ? data.page : 0,
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
            isThumbnail: true,
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
