import productRepository from '@/modules/product/product.repository';
import {
  ProductCreateRequestType,
  ProductSearchGetQueryType,
  ProductUpdateRequestType,
} from '@/modules/product/product.request';
import {
  ProductCreateResponseType,
  ProductDetailGetResponseType,
  ProductEditingGetResponseType,
  ProductGetResponseType,
} from '@/modules/product/product.response';
import { AppErrorBuilder } from '@/shared/errors/app-error';
import { isUniqueCode } from '@/shared/utils/error.util';
import {
  applyPlaceholders,
  cleanPatch,
  mapperItemsForPage,
} from '@/shared/utils/common.util';
import { AppResponse, Page } from '@/types/app';
import { StatusCodes } from 'http-status-codes';
import { ProductModelType } from '@/modules/product/product.model';
import { createUrl } from '@/shared/utils/media.util';

interface ProductService {
  createProduct: (
    body: ProductCreateRequestType,
  ) => Promise<AppResponse<ProductCreateResponseType>>;
  updateProduct: (
    id: number,
    body: ProductUpdateRequestType,
  ) => Promise<AppResponse>;
  searchProducts: (
    data: ProductSearchGetQueryType,
  ) => Promise<AppResponse<Page<ProductGetResponseType>>>;
  getProductsById: (
    ids: Array<number>,
  ) => Promise<Array<ProductGetResponseType>>;
  getProductById: (
    id: number,
  ) => Promise<AppResponse<ProductDetailGetResponseType>>;
  getProductEditingById: (
    id: number,
  ) => Promise<AppResponse<ProductEditingGetResponseType>>;
  getProductBySlug: (
    slug: string,
  ) => Promise<AppResponse<ProductDetailGetResponseType>>;
  deleteProductById: (id: number) => Promise<AppResponse<void>>;
}
const productService: ProductService = {
  createProduct: async (body: ProductCreateRequestType) => {
    try {
      const productEtt = await productRepository.createProduct(body);
      return {
        code: StatusCodes.OK,
        message: 'Create product',
        data: {
          name: productEtt.name,
          price: productEtt.price,
          priceSale: productEtt.priceSale,
          createdAt: productEtt.createdAt,
          href: applyPlaceholders(productEtt.slug.slug, {
            name: productEtt.slugPlaceholder,
          }),
        },
      };
    } catch (e) {
      if (isUniqueCode(e)) {
        throw AppErrorBuilder.conflict(
          `Product with slug ${body.slug.name} is exist`,
        );
      }
      throw AppErrorBuilder.internal();
    }
  },
  updateProduct: async (
    id: number,
    body: ProductUpdateRequestType,
  ): Promise<AppResponse> => {
    body = cleanPatch(body);
    await productRepository.updateProduct(id, body);
    return {
      code: StatusCodes.OK,
      message: 'Update product',
    };
  },
  searchProducts: async (
    data: ProductSearchGetQueryType,
  ): Promise<AppResponse<Page<ProductGetResponseType>>> => {
    const page = await productRepository.searchProducts(data);
    const thumbnails = await productRepository.getProductThumbnailsById(
      page.items.map((i) => i.id),
    );
    const newPage = mapperItemsForPage<
      ProductModelType,
      ProductGetResponseType
    >(page, (item) => {
      const thumbnail = thumbnails.find((i) => i.id === item.id);
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        priceSale: item.priceSale,
        description: item.description,
        href: applyPlaceholders(item.slug.slug, {
          name: item.slugPlaceholder,
        }),
        thumbnail: thumbnail && {
          src: createUrl(thumbnail.key),
          alt: thumbnail.alt,
        },
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    });
    return {
      code: StatusCodes.OK,
      message: 'Search products',
      data: newPage,
    };
  },
  getProductsById: async (
    ids: Array<number>,
  ): Promise<Array<ProductGetResponseType>> => {
    const product = await productRepository.getProductsById(ids);
    const thumbnails = await productRepository.getProductThumbnailsById(
      product.map((i) => i.id),
    );
    const result: Array<ProductGetResponseType> = product.map((item) => {
      const thumbnail = thumbnails.find((i) => i.id === item.id);
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        priceSale: item.priceSale,
        description: item.description,
        href: applyPlaceholders(item.slug.slug, {
          name: item.slugPlaceholder,
        }),
        thumbnail: thumbnail && {
          src: createUrl(thumbnail.key),
          alt: thumbnail.alt,
        },
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    });

    return result;
  },
  getProductById: async (
    id: number,
  ): Promise<AppResponse<ProductDetailGetResponseType>> => {
    try {
      const productEtt = await productRepository.getProductById(id);
      const mediaEtt = await productRepository.getProductMediaById(id);
      return {
        code: StatusCodes.OK,
        message: 'Get product by id',
        data: {
          id: productEtt.id,
          name: productEtt.name,
          price: productEtt.price,
          priceSale: productEtt.priceSale,
          description: productEtt.description,
          href: applyPlaceholders(productEtt.slug.slug, {
            name: productEtt.slugPlaceholder,
          }),
          images: mediaEtt.map((i) => ({
            src: createUrl(i.key),
            alt: i.alt,
          })),
          createdAt: productEtt.createdAt,
          updatedAt: productEtt.updatedAt,
          metadata: productEtt.metadata,
        },
      };
    } catch (e) {
      throw AppErrorBuilder.conflict('Not has product with id ' + id);
    }
  },
  getProductEditingById: async (
    id: number,
  ): Promise<AppResponse<ProductEditingGetResponseType>> => {
    try {
      const productEtt = await productRepository.getProductEditingById(id);
      return {
        code: StatusCodes.OK,
        message: 'Get product editing by id',
        data: {
          id: productEtt.id,
          name: productEtt.name,
          price: productEtt.price,
          priceSale: productEtt.priceSale,
          slug: productEtt.slug,
          description: productEtt.description,
          createdAt: productEtt.createdAt,
          isDeleted: productEtt.isDeleted,
          slugPlaceholder: productEtt.slugPlaceholder,
          updatedAt: productEtt.updatedAt,
          metadata: productEtt.metadata,
          categoryIds: productEtt.categories.map((item) => item.categoryId),
          imageIds: productEtt.productMedias.map((item) => item.mediaId),
        },
      };
    } catch (e) {
      throw AppErrorBuilder.conflict('Not has product with id ' + id);
    }
  },
  getProductBySlug: async (
    slug: string,
  ): Promise<AppResponse<ProductDetailGetResponseType>> => {
    try {
      const productEtt = await productRepository.getProductBySlug(slug);
      const mediaEtt = await productRepository.getProductMediaById(
        productEtt.id,
      );
      return {
        code: StatusCodes.OK,
        message: 'Get product by slug',
        data: {
          id: productEtt.id,
          name: productEtt.name,
          price: productEtt.price,
          priceSale: productEtt.priceSale,
          description: productEtt.description,
          href: applyPlaceholders(productEtt.slug.slug, {
            name: productEtt.slugPlaceholder,
          }),
          images: mediaEtt.map((i) => ({
            src: createUrl(i.key),
            alt: i.alt,
          })),
          createdAt: productEtt.createdAt,
          updatedAt: productEtt.updatedAt,
          metadata: productEtt.metadata,
        },
      };
    } catch (e) {
      throw AppErrorBuilder.conflict('Not has product with slug ' + slug);
    }
  },
  deleteProductById: async (id: number): Promise<AppResponse<void>> => {
    try {
      await productRepository.deleteProductById(id);
      return {
        code: StatusCodes.OK,
        message: 'Delete Product By Id',
      };
    } catch (_) {
      throw AppErrorBuilder.conflict('Not has product with id ' + id);
    }
  },
};
export default productService;
