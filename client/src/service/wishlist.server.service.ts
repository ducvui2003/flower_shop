import httpServer from '@/lib/http.server';
import { ResponseApi } from '@/types/api.type';
import { WishlistResType } from '@/types/wishlist.type';

const wishlistService = {
  findAll: async (): Promise<Array<WishlistResType>> => {
    const res =
      await httpServer.get<ResponseApi<Array<WishlistResType>>>(
        '/api/v1/wishlist',
      );
    return res.payload.data;
  },
};

export default wishlistService;
