import { StatusOrderType } from '@/utils/const.util';
import http from '@/lib/http.client';
import { toQueryString } from '@/lib/utils';
import {
  PageReq,
  Paging,
  ResponseApi,
  ResponseApiPaging,
} from '@/types/api.type';
import {
  OrderDetailResType,
  OrderManagerResType,
  OrderManagerSearchParamsType,
} from '@/types/order.type';

const orderManagerService = {
  getTable: async (
    req: PageReq<OrderManagerSearchParamsType>,
  ): Promise<Paging<OrderManagerResType>> => {
    const params = toQueryString(req);
    const res = await http.get<ResponseApiPaging<OrderManagerResType>>(
      `api/v1/manager/orders/search?${params}`,
      undefined,
    );
    return res.payload.data;
  },

  getDetail: async (id: number): Promise<OrderDetailResType> => {
    const res = await http.get<ResponseApi<OrderDetailResType>>(
      `api/v1/manager/orders/${id}`,
    );
    return res.payload.data;
  },

  getOrderStatus: async (id: number): Promise<StatusOrderType[]> => {
    const res = await http.get<ResponseApi<StatusOrderType[]>>(
      `api/v1/manager/orders/status/${id}`,
    );
    return res.payload.data;
  },

  changeOrderStatus: async (
    id: number,
    status: StatusOrderType,
  ): Promise<string[]> => {
    const res = await http.put<ResponseApi<string[]>>(
      `api/v1/manager/orders/status/${id}`,
      {
        status: status,
      },
    );
    return res.payload.data;
  },
};
export default orderManagerService;
