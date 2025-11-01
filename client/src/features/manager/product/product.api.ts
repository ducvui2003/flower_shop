import categoryService from '@/service/category.service';
import productManagerService from '@/service/manager/product-manager.service';
import supplierService from '@/service/supplier.service';
import { PageReq, Paging } from '@/types/api.type';
import { CategoryType } from '@/types/category.type';
import {
  CreateProductBodyType,
  CreateProductResType,
  ProductDetailManagerResType,
  ProductManagerResType,
  SearchParams,
  UpdateProductBodyType,
} from '@/types/product.type';
import { SupplierType } from '@/types/supplier.type';
import { createApi } from '@reduxjs/toolkit/query/react';

export const productManagerApi = createApi({
  reducerPath: 'productManagerApi',
  baseQuery: () => ({ data: {} }),
  tagTypes: ['ProductManager', 'ProductDetailManager'],
  endpoints: (builder) => ({
    getProductTable: builder.query<
      Paging<ProductManagerResType>,
      PageReq<SearchParams>
    >({
      async queryFn(paging) {
        try {
          const data = await productManagerService.getTable(paging);
          return { data: data };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      providesTags(result) {
        if (result) {
          const final = [
            ...result.items.map((item) => ({
              type: 'ProductManager' as const,
              id: item.id,
            })),
            {
              type: 'ProductManager' as const,
              id: 'LIST',
            },
          ];
          return final;
        }
        const final = [
          {
            type: 'ProductManager' as const,
            id: 'LIST',
          },
        ];
        return final;
      },
    }),

    getAllCategory: builder.query<CategoryType[], void>({
      async queryFn() {
        try {
          const data = await categoryService.findAll();
          return { data: data };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
    }),
    getAllSupplier: builder.query<SupplierType[], void>({
      async queryFn() {
        try {
          const data = await supplierService.findAll();
          return { data: data };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
    }),

    createProduct: builder.mutation<
      CreateProductResType,
      CreateProductBodyType
    >({
      async queryFn(arg) {
        try {
          const data = await productManagerService.create(arg);
          return { data: data };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: () => {
        return [{ type: 'ProductManager', id: 'LIST' }];
      },
    }),

    getDetailProduct: builder.query<ProductDetailManagerResType, number>({
      async queryFn(arg) {
        try {
          const data = await productManagerService.getById(arg);
          return { data: data };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      providesTags: (result, error, id) => {
        return [{ type: 'ProductDetailManager' as const, id }];
      },
    }),

    updateProduct: builder.mutation<
      CreateProductResType,
      {
        id: number;
        payload: UpdateProductBodyType;
      }
    >({
      async queryFn({ id, payload }) {
        try {
          const data = await productManagerService.update(id, payload);
          return { data: data };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: (_, __, { id }) => {
        console.log('Invalidating ProductManager cache for id:', id);
        return [
          { type: 'ProductManager', id: id },
          {
            type: 'ProductDetailManager',
            id: id,
          },
        ];
      },
    }),
  }),
});

export const {
  useGetProductTableQuery,
  useGetAllCategoryQuery,
  useGetAllSupplierQuery,
  useCreateProductMutation,
  useGetDetailProductQuery,
  useUpdateProductMutation,
} = productManagerApi;
