import {
  CategoryModelType,
  CategoryWithoutThumbnailModelType,
} from '@/modules/category/category.model';
import {
  CategoryCreateRequestType,
  CategorySearchGetQueryType,
  CategoryUpdateRequestType,
} from '@/modules/category/category.request';
import { SLUG_REGISTER_CATEGORY_PAGE } from '@/shared/config/database.config';
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

interface CategoryRepository {
  createCategory: (
    data: CategoryCreateRequestType,
  ) => Promise<CategoryModelType>;
  updateCategory: (
    id: number,
    data: CategoryUpdateRequestType,
  ) => Promise<void>;
  searchCategories: (
    data: CategorySearchGetQueryType,
  ) => Promise<Page<CategoryWithoutThumbnailModelType>>;
  getCategoriesById: (id: Array<number>) => Promise<Array<CategoryModelType>>;
  getCategoryById: (id: number) => Promise<CategoryModelType>;
  getCategoryThumbnailById: (id: number) => Promise<MediaModelType | null>;
  getCategoryThumbnailsById: (
    ids: Array<number>,
  ) => Promise<Array<MediaModelType>>;
  getCategoryEditingById: (id: number) => Promise<CategoryModelType>;
  getCategoryBySlug: (name: string) => Promise<CategoryModelType>;
  deleteCategoryById: (id: number) => Promise<void>;
  getCategoryProductCount: (id: number) => Promise<number>;
  getCategoriesProductCount: (
    ids: Array<number>,
  ) => Promise<Map<number, number>>;
}

const categoryRepository: CategoryRepository = {
  createCategory: async (data: CategoryCreateRequestType) => {
    try {
      const category = await prismaService.category.create({
        data: {
          name: data.name,
          slugRegistryId: SLUG_REGISTER_CATEGORY_PAGE,
          slugPlaceholder: data.slug.name,
          thumbnailId: data.thumbnailId ?? null,
        },
        include: {
          slugRegistry: true,
          thumbnail: true,
        },
      });
      return category as any;
    } catch (e) {
      if (isUniqueCode(e)) {
        throw new AppErrorBuilder()
          .withError(StatusCodes.CONFLICT)
          .withMessage(
            `Category with slug ${data.slug.name} already exists in database`,
          )
          .build();
      }
      if (isForeignKeyNotFound(e)) {
        throw new AppErrorBuilder()
          .withError(StatusCodes.CONFLICT)
          .withMessage('Thumbnail entity not exist in database')
          .build();
      }
      throw e;
    }
  },

  updateCategory: async (
    id: number,
    data: CategoryUpdateRequestType,
  ): Promise<void> => {
    await prismaService.$transaction(async (tx) => {
      const { slug, thumbnailId, ...dataCategory } = data;
      try {
        await tx.category.update({
          where: { id: id },
          data: {
            ...dataCategory,
            ...(slug ? { slugPlaceholder: slug.name } : {}),
            ...(thumbnailId !== undefined ? { thumbnailId } : {}),
          },
        });
      } catch (e) {
        if (isRecordNotExist(e)) {
          throw new AppErrorBuilder()
            .withError(StatusCodes.NOT_FOUND)
            .withMessage(`Category with id ${id} not exist in database`)
            .build();
        }
        if (isUniqueCode(e)) {
          throw new AppErrorBuilder()
            .withError(StatusCodes.CONFLICT)
            .withMessage(
              `Category with slug ${slug?.name} already exists in database`,
            )
            .build();
        }
        if (isForeignKeyNotFound(e)) {
          throw new AppErrorBuilder()
            .withError(StatusCodes.CONFLICT)
            .withMessage('Thumbnail entity not exist in database')
            .build();
        }
        throw e;
      }
    });
  },

  searchCategories: async (
    data: CategorySearchGetQueryType,
  ): Promise<Page<CategoryWithoutThumbnailModelType>> => {
    const { name, page, limit } = data;
    const offset = (page - 1) * limit;

    const where: Prisma.CategoryWhereInput = {
      ...(name && {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      }),
    };

    const [items, total] = await Promise.all([
      prismaService.category.findMany({
        where,
        include: {
          slugRegistry: true,
        },
        skip: offset,
        take: limit,
      }),
      prismaService.category.count({ where }),
    ]);

    return {
      items: items as any,
      isLast: page >= Math.ceil(total / limit),
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  },

  getCategoriesById: async (ids: Array<number>) => {
    const categories = await prismaService.category.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        slugRegistry: true,
        thumbnail: true,
      },
    });
    return categories as any;
  },

  getCategoryById: async (id: number) => {
    try {
      const category = await prismaService.category.findFirstOrThrow({
        where: {
          id: id,
        },
        include: {
          slugRegistry: true,
          thumbnail: true,
        },
      });
      return category as any;
    } catch (e) {
      if (isRecordNotExist(e)) {
        throw new AppErrorBuilder()
          .withError(StatusCodes.NOT_FOUND)
          .withMessage(`Category with id ${id} not exist in database`)
          .build();
      }
      throw e;
    }
  },

  getCategoryThumbnailById: async (id: number) => {
    const category = await prismaService.category.findUnique({
      where: {
        id: id,
      },
      include: {
        thumbnail: true,
      },
    });
    return category?.thumbnail ?? null;
  },

  getCategoryThumbnailsById: async (ids: Array<number>) => {
    const categories = await prismaService.category.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        thumbnail: true,
      },
    });
    return categories
      .map((c) => c.thumbnail)
      .filter((t): t is any => t !== null);
  },

  getCategoryEditingById: async (id: number) => {
    try {
      const category = await prismaService.category.findFirstOrThrow({
        where: {
          id: id,
        },
        include: {
          slugRegistry: true,
          thumbnail: true,
        },
      });
      return category as any;
    } catch (e) {
      if (isRecordNotExist(e)) {
        throw new AppErrorBuilder()
          .withError(StatusCodes.NOT_FOUND)
          .withMessage(`Category with id ${id} not exist in database`)
          .build();
      }
      throw e;
    }
  },

  getCategoryBySlug: async (slug: string) => {
    try {
      const category = await prismaService.category.findFirstOrThrow({
        where: {
          slugPlaceholder: slug,
        },
        include: {
          slugRegistry: true,
          thumbnail: true,
        },
      });
      return category as any;
    } catch (e) {
      if (isRecordNotExist(e)) {
        throw new AppErrorBuilder()
          .withError(StatusCodes.NOT_FOUND)
          .withMessage(`Category with slug ${slug} not exist in database`)
          .build();
      }
      throw e;
    }
  },

  deleteCategoryById: async (id: number) => {
    try {
      await prismaService.category.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      if (isRecordNotExist(e)) {
        throw new AppErrorBuilder()
          .withError(StatusCodes.NOT_FOUND)
          .withMessage(`Category with id ${id} not exist in database`)
          .build();
      }
      throw e;
    }
  },

  getCategoryProductCount: async (id: number) => {
    const count = await prismaService.productCategory.count({
      where: {
        categoryId: id,
      },
    });
    return count;
  },

  getCategoriesProductCount: async (ids: Array<number>) => {
    const counts = await prismaService.productCategory.groupBy({
      by: ['categoryId'],
      where: {
        categoryId: {
          in: ids,
        },
      },
      _count: {
        productId: true,
      },
    });

    const countMap = new Map<number, number>();
    counts.forEach((item) => {
      countMap.set(item.categoryId, item._count.productId);
    });
    return countMap;
  },
};

export default categoryRepository;
