import http from '@/lib/http.client';
import { ResponseApi } from '@/types/api.type';
import {
  AddCartItemReqType,
  ChangeQuantityCartItemReqType,
  GetCartResType,
} from '@/types/cart.type';

const cartService = {
  getCart: async (): Promise<GetCartResType> => {
    const response = await http.get<ResponseApi<GetCartResType>>(
      '/api/v1/carts/current',
    );
    return response.payload.data;
  },
  addCartItem: async (body: AddCartItemReqType) =>
    await http.post<void>('/api/v1/carts/current/items', body),
  changeQuantityCartItem: async (
    cartItemId: string,
    body: ChangeQuantityCartItemReqType,
  ) => await http.put<void>(`/api/v1/carts/current/items/${cartItemId}`, body),
  toggleCartItem: async (cartItemId: string | 'all') =>
    await http.put<void>(
      `/api/v1/carts/current/toggle/items/${cartItemId}`,
      null,
    ),
  deleteCartItem: async (cartItemId: string) =>
    await http.delete<void>(`/api/v1/carts/current/items/${cartItemId}`, null),
};

export default cartService;
