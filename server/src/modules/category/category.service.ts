import categoryRepository from '@/modules/category/category.repository';
import {
  CategoryCreateRequestType,
  CategorySearchGetQueryType,
  CategoryUpdateRequestType,
} from '@/modules/category/category.request';
import {
  CategoryCreateResponseType,
  CategoryDetailGetResponseType,
  CategoryEditingGetResponseType,
  CategoryGetResponseType,
} from '@/modules/category/category.response';
import { AppErrorBuilder } from '@/shared/errors/app-error';
import { isUniqueCode } from '@/shared/utils/error.util';
import {
  applyPlaceholders,
  cleanPatch,
  mapperItemsForPage,
} from '@/shared/utils/common.util';
import { AppResponse, Page } from '@/types/app';
import { StatusCodes } from 'http-status-codes';
import {
  CategoryModelType,
  CategoryWithoutThumbnailModelType,
} from '@/modules/category/category.model';
import { createUrl } from '@/shared/utils/media.util';

interface CategoryService {
  createCategory: (
    body: CategoryCreateRequestType,
  ) => Promise<AppResponse<CategoryCreateResponseType>>;
  updateCategory: (
    id: number,
    body: CategoryUpdateRequestType,
  ) => Promise<AppResponse>;
  searchCategories: (
    data: CategorySearchGetQueryType,
  ) => Promise<AppResponse<Page<CategoryGetResponseType>>>;
  getCategoriesById: (
    ids: Array<number>,
  ) => Promise<Array<CategoryGetResponseType>>;
  getCategoryById: (
    id: number,
  ) => Promise<AppResponse<CategoryDetailGetResponseType>>;
  getCategoryEditingById: (
    id: number,
  ) => Promise<AppResponse<CategoryEditingGetResponseType>>;
  getCategoryBySlug: (
    slug: string,
  ) => Promise<AppResponse<CategoryDetailGetResponseType>>;
  deleteCategoryById: (id: number) => Promise<AppResponse<void>>;
}

const categoryService: CategoryService = {
  createCategory: async (body: CategoryCreateRequestType) => {
    try {
      const categoryEtt = await categoryRepository.createCategory(body);
      return {
        code: StatusCodes.OK,
        message: 'Create category',
        data: {
          name: categoryEtt.name,
          href: applyPlaceholders(categoryEtt.slugRegistry.slug, {
            name: categoryEtt.slugPlaceholder,
          }),
        },
      };
    } catch (e) {
      if (isUniqueCode(e)) {
        throw AppErrorBuilder.conflict(
          `Category with slug ${body.slug.name} already exists`,
        );
      }
      throw AppErrorBuilder.internal();
    }
  },

  updateCategory: async (
    id: number,
    body: CategoryUpdateRequestType,
  ): Promise<AppResponse> => {
    body = cleanPatch(body);
    await categoryRepository.updateCategory(id, body);
    return {
      code: StatusCodes.OK,
      message: 'Update category',
    };
  },

  searchCategories: async (
    data: CategorySearchGetQueryType,
  ): Promise<AppResponse<Page<CategoryGetResponseType>>> => {
    const page = await categoryRepository.searchCategories(data);
    const thumbnails = await categoryRepository.getCategoryThumbnailsById(
      page.items.map((i) => i.id),
    );
    const productCounts = await categoryRepository.getCategoriesProductCount(
      page.items.map((i) => i.id),
    );

    const newPage = mapperItemsForPage<
      CategoryWithoutThumbnailModelType,
      CategoryGetResponseType
    >(page, (item) => {
      const thumbnail = thumbnails.find((t) => t.id === item.thumbnailId);
      return {
        id: item.id,
        name: item.name,
        href: applyPlaceholders(item.slugRegistry.slug, {
          name: item.slugPlaceholder,
        }),
        thumbnail: thumbnail
          ? {
              src: createUrl(thumbnail.key),
              alt: thumbnail.alt,
            }
          : undefined,
        productCount: productCounts.get(item.id) ?? 0,
      };
    });

    return {
      code: StatusCodes.OK,
      message: 'Search categories',
      data: newPage,
    };
  },

  getCategoriesById: async (ids: Array<number>) => {
    const categories = await categoryRepository.getCategoriesById(ids);
    const productCounts =
      await categoryRepository.getCategoriesProductCount(ids);

    return categories.map((item) => ({
      id: item.id,
      name: item.name,
      href: applyPlaceholders(item.slugRegistry.slug, {
        name: item.slugPlaceholder,
      }),
      thumbnail: item.thumbnail
        ? {
            src: createUrl(item.thumbnail.key),
            alt: item.thumbnail.alt,
          }
        : undefined,
      productCount: productCounts.get(item.id) ?? 0,
    }));
  },

  getCategoryById: async (
    id: number,
  ): Promise<AppResponse<CategoryDetailGetResponseType>> => {
    const category = await categoryRepository.getCategoryById(id);
    const productCount = await categoryRepository.getCategoryProductCount(id);

    return {
      code: StatusCodes.OK,
      message: 'Get category',
      data: {
        id: category.id,
        name: category.name,
        href: applyPlaceholders(category.slugRegistry.slug, {
          name: category.slugPlaceholder,
        }),
        thumbnail: category.thumbnail
          ? {
              id: category.thumbnail.id,
              src: createUrl(category.thumbnail.key),
              alt: category.thumbnail.alt,
            }
          : null,
        productCount,
      },
    };
  },

  getCategoryEditingById: async (
    id: number,
  ): Promise<AppResponse<CategoryEditingGetResponseType>> => {
    const category = await categoryRepository.getCategoryEditingById(id);

    return {
      code: StatusCodes.OK,
      message: 'Get category for editing',
      data: {
        id: category.id,
        name: category.name,
        slugRegistry: category.slugRegistry,
        slugPlaceholder: category.slugPlaceholder,
        thumbnailId: category.thumbnailId,
      },
    };
  },

  getCategoryBySlug: async (
    slug: string,
  ): Promise<AppResponse<CategoryDetailGetResponseType>> => {
    const category = await categoryRepository.getCategoryBySlug(slug);
    const productCount = await categoryRepository.getCategoryProductCount(
      category.id,
    );

    return {
      code: StatusCodes.OK,
      message: 'Get category',
      data: {
        id: category.id,
        name: category.name,
        href: applyPlaceholders(category.slugRegistry.slug, {
          name: category.slugPlaceholder,
        }),
        thumbnail: category.thumbnail
          ? {
              id: category.thumbnail.id,
              src: createUrl(category.thumbnail.key),
              alt: category.thumbnail.alt,
            }
          : null,
        productCount,
      },
    };
  },

  deleteCategoryById: async (id: number): Promise<AppResponse<void>> => {
    await categoryRepository.deleteCategoryById(id);
    return {
      code: StatusCodes.OK,
      message: 'Delete category',
    };
  },
};

export default categoryService;
