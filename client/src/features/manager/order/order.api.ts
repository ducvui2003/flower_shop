import { StatusOrderType } from '@/utils/const.util';
import orderManagerService from '@/service/manager/order-manager.service';
import { PageReq, Paging } from '@/types/api.type';
import {
  OrderDetailResType,
  OrderManagerResType,
  OrderManagerSearchParamsType,
} from '@/types/order.type';
import { createApi } from '@reduxjs/toolkit/query/react';
export const orderManagerApi = createApi({
  reducerPath: 'orderManagerApi', // name field of redux state
  baseQuery: () => ({ data: {} }),
  tagTypes: ['OrderManager', 'OrderManagerUpdate', ''],

  endpoints: (builder) => ({
    getOrderTable: builder.query<
      Paging<OrderManagerResType>,
      PageReq<OrderManagerSearchParamsType>
    >({
      async queryFn(paging) {
        try {
          const data = await orderManagerService.getTable(paging);
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
              type: 'OrderManager' as const,
              id: item.id,
            })),
            {
              type: 'OrderManager' as const,
              id: 'LIST',
            },
          ];
          return final;
        }
        const final = [
          {
            type: 'OrderManager' as const,
            id: 'LIST',
          },
        ];
        return final;
      },
    }),

    getOrderDetail: builder.query<OrderDetailResType, number>({
      async queryFn(arg) {
        try {
          const data = await orderManagerService.getDetail(arg);
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
      providesTags: (_, __, id) => [{ type: 'OrderManager', id }],
    }),

    getOrderStatusAllowChange: builder.query<StatusOrderType[], number>({
      async queryFn(id) {
        try {
          const result = await orderManagerService.getOrderStatus(id);
          return { data: result ?? [] };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      providesTags(result, error, id) {
        if (error) return [];
        return [{ type: 'OrderManager' as const, id }];
      },
    }),

    changeStatus: builder.mutation<
      void,
      {
        id: number;
        status: StatusOrderType;
      }
    >({
      async queryFn({ id, status }) {
        try {
          await orderManagerService.changeOrderStatus(id, status);
          return { data: undefined };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: (result, error, { id }) => {
        if (error) {
          return [{ type: '' }];
        }
        return [
          { type: 'OrderManager', id: 'LIST' }, // invalidate whole table list
          { type: 'OrderManagerUpdate', id }, // invalidate status allow change for the order
        ];
      },
    }),
  }),
});
export const {
  useGetOrderTableQuery,
  useGetOrderDetailQuery,
  useChangeStatusMutation,
  useGetOrderStatusAllowChangeQuery,
} = orderManagerApi;
