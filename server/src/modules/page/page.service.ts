import { ID_HOME_PAGE } from '@/shared/config/database.config';
import {
  HomePageResponse,
  CategoryPageResponse,
  NavigateResponse,
  SectionCategory,
} from '@/modules/page/page.response';
import pageRepository from '@/modules/page/page.repository';
import { AppResponse } from '@/types/app';
import { HomePageContentType } from '@/modules/page/page.model';
import { StatusCodes } from 'http-status-codes';
import { createUrl } from '@/shared/utils/media.util';

interface PageService {
  getHomePageStructure: () => Promise<AppResponse<HomePageResponse>>;
  getCategoryPageStructure: (
    slug: string,
  ) => Promise<AppResponse<CategoryPageResponse>>;
  getNavigateStructure: () => Promise<AppResponse<NavigateResponse>>;

  updateHomePageContent: (
    body: HomePageContentType,
  ) => Promise<AppResponse<void>>;
}

const pageService: PageService = {
  getHomePageStructure: async () => {
    const { content, title, slug } = await pageRepository.getPageHome();
    const mediaIds = content.banners.map((id) => id);
    const mediaModels = await pageRepository.getMedias(mediaIds);
    const banners = mediaModels.map((item) => ({
      href: createUrl(item.key),
      alt: item.alt ?? '',
    }));
    const categoriesData = await pageRepository.getCategories(
      content.categories.ids,
    );
    const itemsCategories = categoriesData.map((item) => ({
      id: item.id,
      name: item.name,
      thumbnail: item.thumbnail
        ? {
            href: createUrl(item.thumbnail.key),
            alt: item.thumbnail.alt ?? undefined,
          }
        : undefined,
      link: item.slugRegistry.slug,
    }));
    const data: HomePageResponse = {
      title: title,
      slug: slug.slug,
      content: {
        banners,
        sections: [
          {
            title: content.sliders.title,
            type: 'slider',
            content: {
              items: itemsCategories,
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

  getNavigateStructure: async (): Promise<AppResponse<NavigateResponse>> => {
    const homeData = await pageRepository.getPageHome();
    const data: NavigateResponse = homeData.content.navigator.map(
      (item) => item,
    );

    return Promise.resolve({
      code: StatusCodes.OK,
      data,
    });
  },

  updateHomePageContent: async (
    content: HomePageContentType,
  ): Promise<AppResponse<void>> => {
    await pageRepository.updatePageContent(ID_HOME_PAGE, content);
    return Promise.resolve({
      code: StatusCodes.ACCEPTED,
    });
  },
};

export default pageService;
