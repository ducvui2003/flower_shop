import dashboardService from '@/service/manager/dashboard-manager.service';
import {
  RevenueByTimeAndCategoryRequestType,
  RevenueByTimeAndCategoryResponseType,
  RevenueByTimeRequestType,
  RevenueByTimeResponseType,
} from '@/types/dashboard.type';
import { createApi } from '@reduxjs/toolkit/query/react';
export const dashboardApi = createApi({
  reducerPath: 'dashboardApi', // name field of redux state
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getRevenueByTimeAndCategory: builder.query<
      RevenueByTimeAndCategoryResponseType,
      RevenueByTimeAndCategoryRequestType
    >({
      async queryFn(arg) {
        try {
          const data = await dashboardService.getRevenueByTimeAndCategory(arg);
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
    getRevenueByTime: builder.query<
      RevenueByTimeResponseType,
      RevenueByTimeRequestType
    >({
      async queryFn(arg) {
        try {
          const data = await dashboardService.getRevenueByTime(arg);
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
  }),
});
export const { useGetRevenueByTimeAndCategoryQuery, useGetRevenueByTimeQuery } =
  dashboardApi;
