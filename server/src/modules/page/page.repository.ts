import prismaService from '@/shared/services/db.service';
import { ID_HOME_PAGE } from '@/shared/config/database.config';
import {
  CategoryModelType,
  HomePageModelType,
  MediaModelType,
  PageContent,
} from '@/modules/page/page.model';

interface PageRepository {
  getPageHome: () => Promise<HomePageModelType>;
  updatePageContent: (id: number, content: PageContent) => Promise<void>;
  getMedias: (ids: Array<number>) => Promise<Array<MediaModelType>>;
  getCategories: (ids: Array<number>) => Promise<Array<CategoryModelType>>;
}

const pageRepository: PageRepository = {
  getPageHome: async () => {
    return await prismaService.page.findFirstOrThrow({
      select: {
        content: true,
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
      where: {
        slugRegistryId: ID_HOME_PAGE,
      },
    });
  },
  updatePageContent: async (id: number, content: PageContent) => {
    await prismaService.page.update({
      data: {
        content: content,
      },
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

  getCategories: async (ids) => {
    return await prismaService.category.findMany({
      select: {
        id: true,
        name: true,
        parentId: true,
        slugRegistry: {
          select: {
            id: true,
            slug: true,
          },
        },
        thumbnail: {
          select: {
            id: true,
            url: true,
            alt: true,
            metadata: true,
          },
        },
      },
      where: {
        id: {
          in: ids,
        },
      },
    });
  },
};

export default pageRepository;
