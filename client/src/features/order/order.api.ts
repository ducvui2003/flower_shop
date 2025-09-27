import orderService from '@/service/order.service';
import { PageReq, Paging } from '@/types/api.type';
import {
  OrderDetailResType,
  OrderResType,
  OrderSearchParamsType,
} from '@/types/order.type';
import { createApi } from '@reduxjs/toolkit/query/react';
import { GetReviewOfOrderItemResType } from '@/types/review.type';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  tagTypes: ['Order', 'OrderItem'],
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getOrderTable: builder.query<
      Paging<OrderResType>,
      PageReq<OrderSearchParamsType>
    >({
      async queryFn(req) {
        try {
          const data = await orderService.getOrders(req);
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
      providesTags(result) {
        if (result) {
          const final = [
            ...result.items.map((item) => ({
              type: 'Order' as const,
              id: item.id,
            })),
            {
              type: 'Order' as const,
              id: 'LIST',
            },
          ];
          return final;
        }
        const final = [
          {
            type: 'Order' as const,
            id: 'LIST',
          },
        ];
        return final;
      },
    }),
    getOrderDetail: builder.query<OrderDetailResType, number>({
      async queryFn(orderId) {
        try {
          const data = await orderService.getOrderById(orderId);
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
    cancelOrder: builder.mutation<void, number>({
      async queryFn(orderId) {
        try {
          await orderService.cancelOrder(orderId);
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
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),

    getReviewOfOrderItem: builder.query<GetReviewOfOrderItemResType, number>({
      async queryFn(orderItemId) {
        try {
          const data = await orderService.getReviewOfOrderItem(orderItemId);
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
      providesTags: (result, error, orderItemId) => [{ type: 'OrderItem', id: orderItemId }],
    }),
  }),
});

export const {
  useGetOrderTableQuery,
  useGetOrderDetailQuery,
  useGetReviewOfOrderItemQuery,
  useCancelOrderMutation
} = orderApi;
