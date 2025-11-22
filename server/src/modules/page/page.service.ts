import { ID_HOME_PAGE } from '@/shared/config/database.config';
import {
  HomePageResponse,
  CategoryPageResponse,
  NavigateResponse,
} from '@/modules/page/page.response';
import prismaPageRepository from '@/modules/page/page.repository';
import { AppResponse } from '@/types/app-response';
import { HomePageContent } from '@/modules/page/page';
import { StatusCodes } from 'http-status-codes';

interface PageService {
  getHomePageStructure: () => Promise<AppResponse<HomePageResponse>>;
  getCategoryPageStructure: (
    slug: string,
  ) => Promise<AppResponse<CategoryPageResponse>>;
  getNavigateStructure: () => Promise<AppResponse<NavigateResponse>>;

  updateHomePageContent: (body: HomePageContent) => Promise<AppResponse<void>>;
}

const pageService: PageService = {
  getHomePageStructure: async () => {
    const data: HomePageResponse = {
      title: 'Hoa Tươi Nhật Nam',
      slug: '/',
      content: {
        banners: [
          {
            href: 'https://res.cloudinary.com/djav4pzzw/image/upload/v1763169698/slider-02_rdd2tf.jpg',
            alt: 'hoa tuoi nhat nam',
          },
          {
            href: 'https://res.cloudinary.com/djav4pzzw/image/upload/v1763169697/slider-01_va8bfg.jpg',
            alt: 'hoa tuoi nhat nam',
          },
          {
            href: 'https://res.cloudinary.com/djav4pzzw/image/upload/v1763169696/slider-03_glag06.jpg',
            alt: 'hoa tuoi nhat nam',
          },
        ],
        sections: [
          {
            title: 'Danh sách các thể loại hoa tươi',
            type: 'slider',
            content: {
              items: [
                {
                  id: 1,
                  name: 'Hoa',
                  thumbnail: {
                    href: 'https://res.cloudinary.com/djav4pzzw/image/upload/v1763174654/category_pvduzs.jpg',
                    alt: 'hoa-sinh-nhat',
                  },
                  link: '/hoa-sinh nhat',
                },
              ],
            },
          },
          {
            title: 'Hoa sinh nhat',
            type: 'category-product',
            content: {
              items: Array(5)
                .fill(null)
                .map((_, i) => ({
                  id: i,
                  title: 'Sunny',
                  slug: '/123',
                  salePrice: 8000,
                  price: 10000,
                  link: '/san-pham/bo-hoa-123',
                })),
              link: '/sinh-nhat',
            },
          },
        ],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return Promise.resolve({
      code: StatusCodes.OK,
      data,
    });
  },

  getCategoryPageStructure: async (
    slug: string,
  ): Promise<AppResponse<CategoryPageResponse>> => {
    const data: CategoryPageResponse = {
      title: 'Hoa sinh nhật',
      slug: '/sinh-nhat',
      content: {
        items: Array(5)
          .fill(null)
          .map((_, i) => ({
            id: i,
            title: 'Sunny',
            slug: '/123',
            salePrice: 8000,
            price: 10000,
            link: '/san-pham/bo-hoa-123',
          })),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return Promise.resolve({
      code: StatusCodes.OK,
      data,
    });
  },

  getNavigateStructure: (): Promise<AppResponse<NavigateResponse>> => {
    const data: NavigateResponse = [
      {
        title: 'Chủ đề',
        link: '/chu-de',
        child: [
          {
            title: 'Hoa Sinh Nhật',
            link: '/chu-de/sinh-nhat',
          },
          {
            title: 'Hoa Khai Trương',
            link: '/chu-de/khai-truong',
          },
          {
            title: 'Hoa Chúc Mừng',
            link: '/chu-de/chuc-mung',
          },
        ],
      },
      {
        title: 'Đối tượng',
        link: '/doi-tuong',
      },
      {
        title: 'Kiểu dáng',
        link: '/kieu-dang',
      },
      {
        title: 'Hoa tươi',
        link: '/hoa-tuoi',
      },
      {
        title: 'Màu sắc',
        link: '/mau-sac',
      },
    ];

    return Promise.resolve({
      code: StatusCodes.OK,
      data,
    });
  },

  updateHomePageContent: async (
    content: HomePageContent,
  ): Promise<AppResponse<void>> => {
    await prismaPageRepository.updatePageContent(ID_HOME_PAGE, content);
    return Promise.resolve({
      code: StatusCodes.ACCEPTED,
    });
  },
};

export default pageService;
