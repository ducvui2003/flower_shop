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
      await httpServer.get<ResponseApi<HomePageResponse>>('/page/home');
    return data.payload.data;
  },
  getNavigateStructure: async (): Promise<NavigateResponse> => {
    const data =
      await httpServer.get<ResponseApi<NavigateResponse>>('/page/navigate');
    return data.payload.data;
  },
  getCategoryPage: async (
    slug: string,
  ): Promise<CategoryPageResponse | null> => {
    try {
      const data = await http.get<ResponseApi<CategoryPageResponse>>(
        `/page/category?name=${slug}`,
        {},
        false,
      );
      return data.payload.data;
    } catch (_) {
      return null;
    }
  },
  getPageCommonStructure: async (page: 'about' | 'policy') => {
    try {
      const data = await httpServer.get<
        ResponseApi<{
          title: string;
          slug: string;
          content: string;
          metadata: {
            title: string;
            metaDescription: string;
          } | null;
        }>
      >(`/page/${page}`, {}, false);
      return data.payload.data;
    } catch (_) {
      return null;
    }
  },
};

export default pageService;
