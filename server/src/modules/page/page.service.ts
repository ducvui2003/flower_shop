import {
  BannerPageSectionType,
  CategoryProductPageSectionType,
  CategorySliderPageSectionType,
  HomePageContentType,
  NavigatorAggregateType,
} from '@/modules/page/page.model';
import pageRepository from '@/modules/page/page.repository';
import {
  CategoryPageResponse,
  HomePageResponse,
  NavigateResponse,
  SectionBanner,
  SectionCategoryProduct,
  SectionCategorySlider,
} from '@/modules/page/page.response';
import productService from '@/modules/product/product.service';
import { ID_HOME_PAGE } from '@/shared/config/database.config';
import { createUrl } from '@/shared/utils/media.util';
import { AppResponse } from '@/types/app';
import { StatusCodes } from 'http-status-codes';

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
    const homePageData = await pageRepository.getPage(ID_HOME_PAGE);
    const pageSectionData = await pageRepository.getPageSection(ID_HOME_PAGE);
    // banner
    const mediaIds =
      (
        pageSectionData.find((i) => i.type === 'banner')
          ?.config as BannerPageSectionType
      ).mediaIds ?? [];
    const mediaModels = await pageRepository.getMedias(mediaIds);
    const banners: SectionBanner = {
      type: 'banner',
      title: '',
      content: mediaModels.map((item) => ({
        src: createUrl(item.key),
        alt: item.alt ?? '',
      })),
    };

    // category_slider
    const configCategorySlider = pageSectionData.find(
      (i) => i.type === 'category_slider',
    )?.config as CategorySliderPageSectionType;
    let categoriesData = await pageRepository.getCategories(
      configCategorySlider.categoryIds,
    );
    const sectionCategorySlider: SectionCategorySlider = {
      title: configCategorySlider.title,
      type: 'categorySlider',
      content: categoriesData.map((item) => {
        return {
          id: item.id,
          name: item.name,
          thumbnail: item.thumbnail
            ? {
                alt: item.thumbnail.alt,
                src: createUrl(item.thumbnail.key),
              }
            : undefined,
          link: item.slugRegistry.slug,
        };
      }),
    };

    categoriesData.map((item) => ({
      id: item.id,
      name: item.name,
      thumbnail: item.thumbnail
        ? {
            src: createUrl(item.thumbnail.key),
            alt: item.thumbnail.alt ?? undefined,
          }
        : undefined,
      link: item.slugRegistry.slug,
    }));

    // category_product_section
    const configCategoryProductSection = pageSectionData.find(
      (i) => i.type === 'category_product_section',
    )?.config as CategoryProductPageSectionType;
    const productIds = configCategoryProductSection.categories
      .map((i) => i.productIds)
      .flat();

    const products = await productService.getProductsById(productIds);
    categoriesData = await pageRepository.getCategories(
      configCategoryProductSection.categories.map((i) => i.id),
    );
    const categoryProducts: Array<SectionCategoryProduct> =
      configCategoryProductSection.categories.map((item) => ({
        title: item.title,
        type: 'categoryProduct',
        content: {
          items: products
            .filter((_) => item.productIds.includes(_.id))
            .map((i) => {
              return {
                id: i.id,
                title: i.name,
                price: i.price,
                priceSale: i.priceSale,
                thumbnail: i.thumbnail,
                link: i.href,
              };
            }),
          link:
            categoriesData.find((_) => _.id === item.id)?.slugRegistry.slug ??
            '',
        },
      }));

    const data: HomePageResponse = {
      title: homePageData.title,
      slug: homePageData.slug.slug,
      content: [banners, sectionCategorySlider, ...categoryProducts],
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
            priceSale: 8000,
            price: 10000,
            link: '/san-pham/bo-hoa-123',
          })),
      },
    };

    return Promise.resolve({
      code: StatusCodes.OK,
      data,
    });
  },

  getNavigateStructure: async (): Promise<AppResponse<NavigateResponse>> => {
    const navigatorData = await pageRepository.getNavigators();
    const topNavigators = navigatorData.filter(
      (i) => i.tableRef === 'category' && i.parent === null,
    );
    const categories = await pageRepository.getCategories(
      navigatorData.filter((i) => i.tableRef === 'category').map((i) => i.id),
    );

    const result: Array<NavigatorAggregateType> = topNavigators.map((i) => {
      return {
        title: i.label,
        link: categories.find((_) => _.id === i.id)?.slugRegistry.slug ?? '',
        child: navigatorData
          .filter((_) => _.parent === i.id)
          .map((_) => {
            return {
              title: _.label,
              link:
                categories.find((_) => _.id === i.id)?.slugRegistry.slug ?? '',
            };
          }),
      };
    });

    return Promise.resolve({
      code: StatusCodes.OK,
      data: result,
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
