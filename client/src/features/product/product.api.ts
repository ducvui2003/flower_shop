import { createApi } from '@reduxjs/toolkit/query/react';
import { ProductResType, SearchProductResType } from '@/types/product.type';
import { toQueryString } from '@/lib/utils';
import { PageReq, ResponseApi, ResponseApiPaging } from '@/types/api.type';
import httpClient from '@/lib/http.client';
import {
  GetReviewsOfProductResType,
  FilterReviewQueryType,
} from '@/types/review.type';
import productService from '@/service/product.service';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    searchProduct: builder.query<SearchProductResType, String>({
      async queryFn(name: string) {
        try {
          const params = toQueryString({ name: name });
          const response = await httpClient.get<
            ResponseApiPaging<ProductResType>
          >(`api/v1/products/search?${params}`, undefined, false);
          return { data: response.payload.data };
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
    getNewProducts: builder.query<ProductResType[], void>({
      async queryFn() {
        try {
          const response = await httpClient.get<ResponseApi<ProductResType[]>>(
            `api/v1/products/new`,
            undefined,
            false,
          );
          return { data: response.payload.data };
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
    getMostViewProducts: builder.query<ProductResType[], void>({
      async queryFn() {
        try {
          const response = await httpClient.get<ResponseApi<ProductResType[]>>(
            `api/v1/products/most-view`,
            undefined,
            false,
          );
          return { data: response.payload.data };
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

    getReviewsOfProduct: builder.query<
      GetReviewsOfProductResType,
      {
        productId: number;
        query: PageReq<FilterReviewQueryType>;
      }
    >({
      async queryFn({ productId, query }) {
        try {
          const data = await productService.getReviewsOfProduct(
            productId,
            query,
          );
          return { data };
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
  }),
});
export const {
  useSearchProductQuery,
  useLazySearchProductQuery,
  useGetNewProductsQuery,
  useGetMostViewProductsQuery,
  useGetReviewsOfProductQuery,
} = productApi;
