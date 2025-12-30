import http from '@/lib/http.client';
import httpServer from '@/lib/http.server';
import { ResponseApi } from '@/types/api.type';
import {
  CategoryPageResponse,
  HomePageResponse,
  NavigateResponse,
} from '@/types/page.type';

const pageService = {
  getHomeStructure: async (): Promise<HomePageResponse> => {
    const data =
      await httpServer.get<ResponseApi<HomePageResponse>>('/api/page/home');
    return data.payload.data;
  },

  getNavigateStructure: async (): Promise<NavigateResponse> => {
    const data =
      await httpServer.get<ResponseApi<NavigateResponse>>('/api/page/navigate');
    return data.payload.data;
  },
  getCategoryPage: async (
    slug: string,
  ): Promise<CategoryPageResponse | null> => {
    try {
      const data = await http.get<ResponseApi<CategoryPageResponse>>(
        `/api/page/category?name=${slug}`,
        {},
        false,
      );
      return data.payload.data;
    } catch (e) {
      return null;
    }
  },
};

export default pageService;
