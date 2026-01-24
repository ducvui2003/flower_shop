import { PageWithContentType } from '@/modules/page/content/page-content.model';
import pageContentRepository from '@/modules/page/content/page-content.repository';
import { PageContentResponse } from '@/modules/page/content/page-content.response';
import { ID_ABOUT_PAGE, ID_HOME_PAGE } from '@/shared/config/database.config';
import { AppResponse } from '@/types/app';
import { StatusCodes } from 'http-status-codes';

interface PageContentService {
  getPageWithContent: (
    page: 'about' | '',
  ) => Promise<AppResponse<PageContentResponse>>;
}

const pageContentService: PageContentService = {
  getPageWithContent: async (page) => {
    const contentData = await pageContentRepository.getPage(ID_ABOUT_PAGE);
    const data: PageContentResponse = {
      title: contentData.title,
      slug: contentData.slug.slug,
      content: contentData.content,
      metadata: contentData.metadata,
    };
    return Promise.resolve({
      code: StatusCodes.OK,
      message: 'Page with content fetched successfully',
      data,
    });
  },
};
export default pageContentService;
