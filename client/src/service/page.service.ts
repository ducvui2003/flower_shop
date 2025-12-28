import httpServer from '@/lib/http.server';
import { ResponseApi } from '@/types/api.type';
import { HomePageResponse, NavigateResponse } from '@/types/page.type';
import { DEFAULT_IMAGE_PRODUCT } from '@/utils/const.util';

type SectionRes = {
  title: string;
  products: {
    id: number;
    name: string;
    basePrice: number;
    salePrice: number;
    href: string;
    thumbnail: string;
  }[];
  listHref: string;
};
const pageService = {
  getHomeStructure: async (): Promise<HomePageResponse> => {
    const data =
      await httpServer.get<ResponseApi<HomePageResponse>>('/api/page/home');
    return data.payload.data;
  },

  getSectionHome: async (): Promise<SectionRes[]> => {
    const data: SectionRes[] = [
      {
        title: 'Hoa tươi giảm giá 30%',
        products: Array(4)
          .fill(null)
          .map((_, i) => ({
            id: i,
            basePrice: 10000,
            salePrice: 8000,
            name: 'hello123',
            slug: '/123',
            thumbnail: DEFAULT_IMAGE_PRODUCT,
            href: '/hoa-tot-nghiep/tot-nghiep/hoa-hong',
          })),
        listHref: '/hoa-tuoi-giam-gia',
      },
      {
        title: 'HOA TẶNG TỐT NGHIỆP',
        products: Array(4)
          .fill(null)
          .map((_, i) => ({
            id: i,
            basePrice: 10000,
            salePrice: 8000,
            name: 'hello123',
            slug: '/123',
            thumbnail: DEFAULT_IMAGE_PRODUCT,
            href: '',
          })),
        listHref: '/hoa-tuoi-tot-nghiep',
      },
    ];
    return new Promise((resolve) => {
      resolve(data);
    });
  },

  getNavigateStructure: async (): Promise<NavigateResponse> => {
    const data =
      await httpServer.get<ResponseApi<NavigateResponse>>('/api/page/navigate');
    return data.payload.data;
  },
};

export default pageService;
