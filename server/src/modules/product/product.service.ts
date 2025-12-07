import productRepository from '@/modules/product/product.repository';
import {
  ProductCreateRequestType,
  ProductSearchGetQueryType,
} from '@/modules/product/product.request';
import {
  ProductCreateResponseType,
  ProductDetailGetResponseType,
  ProductGetResponseType,
} from '@/modules/product/product.response';
import { AppErrorBuilder } from '@/shared/errors/app-error';
import { isUniqueCode } from '@/shared/utils/error.util';
import {
  applyPlaceholders,
  mapperItemsForPage,
} from '@/shared/utils/common.util';
import { AppResponse, Page } from '@/types/app';
import { StatusCodes } from 'http-status-codes';
import { ProductModelType } from '@/modules/product/product.model';

interface ProductService {
  createProduct: (
    body: ProductCreateRequestType,
  ) => Promise<AppResponse<ProductCreateResponseType>>;
  searchProduct: (
    data: ProductSearchGetQueryType,
  ) => Promise<AppResponse<Page<ProductGetResponseType>>>;
  getProductById: (
    id: number,
  ) => Promise<AppResponse<ProductDetailGetResponseType>>;
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
  searchProduct: async (
    data: ProductSearchGetQueryType,
  ): Promise<AppResponse<Page<ProductGetResponseType>>> => {
    const page = await productRepository.searchProducts(data);
    const newPage = mapperItemsForPage<
      ProductModelType,
      ProductGetResponseType
    >(page, (item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      priceSale: item.priceSale,
      description: item.description,
      href: applyPlaceholders(item.slug.slug, {
        name: item.slugPlaceholder,
      }),
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
    return {
      code: StatusCodes.OK,
      message: 'Search products',
      data: newPage,
    };
  },
  getProductById: async (
    id: number,
  ): Promise<AppResponse<ProductDetailGetResponseType>> => {
    try {
      const productEtt = await productRepository.getProductById(id);
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
          createdAt: productEtt.createdAt,
          updatedAt: productEtt.updatedAt,
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
          createdAt: productEtt.createdAt,
          updatedAt: productEtt.updatedAt,
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
