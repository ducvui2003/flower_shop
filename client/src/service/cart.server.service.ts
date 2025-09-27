import httpServer from '@/lib/http.server';
import { ResponseApi } from '@/types/api.type';
import { GetCartResType } from '@/types/cart.type';

const cartService = {
  getCartSelected: async (): Promise<GetCartResType> => {
    const response = await httpServer.get<ResponseApi<GetCartResType>>(
      '/api/v1/carts/current/selected',
    );
    return response.payload.data;
  },
};
export default cartService;
