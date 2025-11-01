import { createApi } from '@reduxjs/toolkit/query/react';
import { GetActivePromotionsResType } from '@/types/promotion.type';
import promotionService from '@/service/promotion.service';

export const promotionApi = createApi({
  reducerPath: 'promotionApi',
  tagTypes: ['ActivePromotion', 'Promotion'],
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getActivePromotions: builder.query<GetActivePromotionsResType, void>({
      async queryFn() {
        try {
          const data = await promotionService.getActivePromotions();
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
      providesTags: ['ActivePromotion'],
    }),
  }),
});

export const { useGetActivePromotionsQuery } = promotionApi;
