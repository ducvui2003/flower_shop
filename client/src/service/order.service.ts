import http from '@/lib/http.client';
import { toQueryString } from '@/lib/utils';
import {
  PageReq,
  Paging,
  ResponseApi,
  ResponseApiPaging,
} from '@/types/api.type';
import {
  CreateOrderReqType,
  CreateOrderResType,
  OrderDetailResType,
  OrderResType,
  OrderSearchParamsType,
} from '@/types/order.type';
import { GetReviewOfOrderItemResType } from '@/types/review.type';

const orderService = {
  createOrder: async (req: CreateOrderReqType) => {
    const response = await http.post<ResponseApi<CreateOrderResType>>(
      '/api/v1/orders',
      req,
    );
    return response.payload.data;
  },
  getOrders: async (
    req: PageReq<OrderSearchParamsType>,
  ): Promise<Paging<OrderResType>> => {
    const query = toQueryString(req);
    const response = await http.get<ResponseApiPaging<OrderResType>>(
      `/api/v1/orders?${query}`,
    );
    return response.payload.data;
  },
  getOrderById: async (id: number): Promise<OrderDetailResType> => {
    const response = await http.get<ResponseApi<OrderDetailResType>>(
      `/api/v1/orders/${id}`,
    );
    return response.payload.data;
  },

  cancelOrder: async (id: number): Promise<void> => {
    const response = await http.put<ResponseApi<void>>(
      `/api/v1/orders/${id}`,
    );
    return response.payload.data;
  },

  getReviewOfOrderItem: async (orderItemId: number): Promise<GetReviewOfOrderItemResType> => {
    const response = await http.get<ResponseApi<GetReviewOfOrderItemResType>>(
      `/api/v1/order-items/${orderItemId}/reviews`,
    )
    return response.payload.data;
  }
};

export default orderService;
