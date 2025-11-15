import httpServer from '@/lib/http.server';
import { ResponseApi } from '@/types/api.type';
import { PageHomeResponse } from '@/types/page.type';
import { DEFAULT_CATEGORY, DEFAULT_IMAGE } from '@/utils/const.util';

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

type SectionHomeCategoryRes = {
  title: string;
  categories: {
    id: number;
    name: string;
    thumbnail: string;
    href: string;
  }[];
};

const pageService = {
  getHomeStructure: async (): Promise<PageHomeResponse> => {
    const data =
      await httpServer.get<ResponseApi<PageHomeResponse>>('/api/page/home');
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
            thumbnail: DEFAULT_IMAGE,
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
            thumbnail: DEFAULT_IMAGE,
            href: '',
          })),
        listHref: '/hoa-tuoi-tot-nghiep',
      },
    ];
    return new Promise((resolve) => {
      resolve(data);
    });
  },
  getSectionCategory: (): Promise<SectionHomeCategoryRes> => {
    const data: SectionHomeCategoryRes = {
      title: 'Danh sách các thể loại hoa tươi',
      categories: Array(6)
        .fill(false)
        .map((_, i) => ({
          id: i,
          name: 'Hoa Tuoi',
          thumbnail: DEFAULT_CATEGORY,
          href: '/hoa-tuoi',
        })),
    };

    return new Promise((resolve) => {
      resolve(data);
    });
  },
};

export default pageService;
