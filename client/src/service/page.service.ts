import { DEFAULT_IMAGE } from '@/utils/const.util';

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
            href: '',
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
};

export default pageService;
