import http from '@/lib/http.client';
import { ResponseApi } from '@/types/api.type';
import { GetActivePromotionsResType } from '@/types/promotion.type';

const promotionService = {
  getActivePromotions: async (): Promise<GetActivePromotionsResType> => {
    const response = await http.get<ResponseApi<GetActivePromotionsResType>>(
      '/api/v1/promotions/active',
    );
    return response.payload.data;
  },
};

export default promotionService;
