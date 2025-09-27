import http from '@/lib/http.client';
import { GetCartResType } from '@/types/cart.type';
import { GetActivePromotionsResType } from '@/types/promotion.type';
import { ResponseApi } from '@/types/api.type';

const promotionService = {
  getActivePromotions: async (): Promise<GetActivePromotionsResType> => {
    const response = await http.get<ResponseApi<GetActivePromotionsResType>>('/api/v1/promotions/active');
    return response.payload.data
  }
}

export default promotionService;