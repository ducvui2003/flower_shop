import prismaService from '@/services/db.service';
import { PageContent } from '@/types/page';

interface PageRepository {
  updatePageContent: (id: number, content: PageContent) => Promise<void>;
}

const prismaPageRepository: PageRepository = {
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
};

export default prismaPageRepository;
