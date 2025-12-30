import {
  CategoryModelType,
  MediaModelType,
  NavigatorModelType,
  PageContent,
  PageModelType,
} from '@/modules/page/page.model';
import prismaService from '@/shared/services/db.service';
import { PageSection } from '@prisma/client';

interface PageRepository {
  getPage: (id: number) => Promise<PageModelType>;
  getPageSection: (pageId: number) => Promise<Array<PageSection>>;
  updatePageContent: (id: number, content: PageContent) => Promise<void>;
  getMedias: (ids: Array<number>) => Promise<Array<MediaModelType>>;
  getCategories: (ids: Array<number>) => Promise<Array<CategoryModelType>>;
  getCategoryBySlug: (slug: string) => Promise<CategoryModelType | null>;
  getNavigators: () => Promise<Array<NavigatorModelType>>;
}

const pageRepository: PageRepository = {
  getPage: async (id: number): Promise<PageModelType> => {
    return prismaService.page.findFirstOrThrow({
      where: {
        id: id,
      },
      select: {
        createdAt: true,
        id: true,
        isDeleted: true,
        slugRegistryId: true,
        title: true,
        type: true,
        updatedAt: true,
        slug: {
          select: {
            id: true,
            slug: true,
          },
        },
      },
    });
  },
  getPageSection: async (pageId: number): Promise<Array<PageSection>> => {
    return await prismaService.pageSection.findMany({
      where: {
        pageId: pageId,
      },
    });
  },
  updatePageContent: async (id: number, content: PageContent) => {
    await prismaService.page.update({
      data: {},
      where: {
        id: id,
      },
    });
  },
  getMedias: (ids) => {
    return prismaService.media.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  },
  getNavigators: async (): Promise<Array<NavigatorModelType>> => {
    const navigators = await prismaService.navigator.findMany();
    return navigators;
  },
  getCategories: async (ids) => {
    return await prismaService.category.findMany({
      select: {
        id: true,
        name: true,
        slugRegistry: {
          select: {
            id: true,
            slug: true,
          },
        },
        thumbnail: {
          select: {
            id: true,
            key: true,
            alt: true,
            metadata: true,
          },
        },
        slugPlaceholder: true,
      },
      where: {
        id: {
          in: ids,
        },
      },
    });
  },
  getCategoryBySlug: async (slug: string) => {
    return await prismaService.category.findFirst({
      select: {
        id: true,
        name: true,
        slugRegistry: {
          select: {
            id: true,
            slug: true,
          },
        },
        thumbnail: {
          select: {
            id: true,
            key: true,
            alt: true,
            metadata: true,
          },
        },
        slugPlaceholder: true,
      },
      where: {
        slugPlaceholder: slug,
      },
    });
  },
};

export default pageRepository;
