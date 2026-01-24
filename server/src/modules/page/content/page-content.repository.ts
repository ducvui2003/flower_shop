import { PageWithContentType } from '@/modules/page/content/page-content.model';
import prismaService from '@/shared/services/db.service';

interface PageContentRepository {
  getPage: (id: number) => Promise<PageWithContentType>;
}
const pageContentRepository: PageContentRepository = {
  getPage: async (id: number): Promise<PageWithContentType> => {
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
        content: true,
        type: true,
        updatedAt: true,
        metadata: true,
        slug: {
          select: {
            id: true,
            slug: true,
          },
        },
      },
    });
  },
};
export default pageContentRepository;
