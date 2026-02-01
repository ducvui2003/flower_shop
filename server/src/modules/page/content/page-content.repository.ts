import { PageWithContentType } from '@/modules/page/content/page-content.model';
import { PageContentUpdateRequestType } from '@/modules/page/content/page-content.request';
import { AppErrorBuilder } from '@/shared/errors/app-error';
import prismaService from '@/shared/services/db.service';
import { isRecordNotExist } from '@/shared/utils/error.util';
import { StatusCodes } from 'http-status-codes';

interface PageContentRepository {
  getPage: (id: number) => Promise<PageWithContentType>;
  updatePage: (id: number, data: PageContentUpdateRequestType) => Promise<void>;
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
  updatePage: async (
    id: number,
    data: PageContentUpdateRequestType,
  ): Promise<void> => {
    await prismaService.$transaction(async (tx) => {
      try {
        await tx.page.update({
          where: { id: id },
          data: {
            ...data,
          },
        });
      } catch (e) {
        if (isRecordNotExist(e)) {
          throw new AppErrorBuilder()
            .withError(StatusCodes.NOT_FOUND)
            .withMessage(`Page with id ${id} not exist in database`)
            .build();
        }
        throw e;
      }
    });
  },
};
export default pageContentRepository;
