import {
  CategoryModelType,
  MediaModelType,
  NavigatorModelType,
  PageContent,
  PageModelType,
} from '@/modules/page/page.model';
import { PageSectionUpdateRequestType } from '@/modules/page/page.request';
import prismaService from '@/shared/services/db.service';
import { PageSection } from '@prisma/client';

interface PageRepository {
  getPage: (id: number) => Promise<PageModelType>;
  getPageSection: (pageId: number) => Promise<Array<PageSection>>;
  updatePageSection: (
    data: PageSectionUpdateRequestType,
    pageId: number,
  ) => Promise<void>;
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
  updatePageSection: async (
    data: PageSectionUpdateRequestType,
    pageId: number,
  ) => {
    await prismaService.$transaction(async (tx) => {
      const newPageSections = data.new;
      if (newPageSections.length > 0)
        await tx.pageSection.createMany({
          data: newPageSections.map((i) => ({
            id: i.id,
            config: i.config as any,
            position: i.position,
            pageId: pageId,
            type: i.type as any,
          })),
        });
      const updatePageSections = data.update;
      if (updatePageSections.length > 0)
        await Promise.all(
          updatePageSections.map((i) =>
            tx.pageSection.update({
              where: {
                id: i.id,
              },
              data: {
                config: i.config as any,
                position: i.position,
                pageId: pageId,
                type: i.type as any,
              },
            }),
          ),
        );

      const deletePageSectionIds = data.delete;
      if (deletePageSectionIds.length > 0) {
        await tx.pageSection.deleteMany({
          where: {
            id: {
              in: deletePageSectionIds,
            },
          },
        });
      }
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
