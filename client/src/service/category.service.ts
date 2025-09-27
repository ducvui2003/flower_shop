import http from '@/lib/http.client';
import { ResponseApi } from '@/types/api.type';
import { CategoryType } from '@/types/category.type';

const categoryService = {
  findAll: async (): Promise<CategoryType[]> => {
    const res = await http.get<ResponseApi<CategoryType[]>>(
      `/api/v1/category`,
      undefined,
      false,
    );
    return res.payload.data;
  },
};

export default categoryService;
