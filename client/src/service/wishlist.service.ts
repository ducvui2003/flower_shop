import http from '@/lib/http.client';
import { ResponseApi } from '@/types/api.type';
import { CreateWishlistReqType, WishlistResType } from '@/types/wishlist.type';

const wishlistService = {
  findAll: async (): Promise<Array<WishlistResType> | null> => {
    const res =
      await http.get<ResponseApi<Array<WishlistResType>>>('/api/v1/wishlist');
    return res.payload.data;
  },

  create: async (req: CreateWishlistReqType): Promise<WishlistResType> => {
    const res = await http.post<WishlistResType>('/api/v1/wishlist', req);
    return res.payload;
  },

  delete: async (productId: number): Promise<void> => {
    await http.delete<void>(`/api/v1/wishlist/${productId}`, undefined);
  },

  checkProductInWishlist: async (productId: number) => {
    return http.get(`/api/v1/wishlist/check/${productId}`);
  },
};
export default wishlistService;
