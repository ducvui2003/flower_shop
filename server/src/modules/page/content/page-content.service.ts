import pageContentRepository from '@/modules/page/content/page-content.repository';
import { PageContentUpdateRequestType } from '@/modules/page/content/page-content.request';
import { PageContentResponse } from '@/modules/page/content/page-content.response';
import { PageSectionModelType } from '@/modules/page/page.model';
import pageRepository from '@/modules/page/page.repository';
import {
  ID_ABOUT_PAGE,
  ID_HOME_PAGE,
  ID_POLICY_PAGE,
} from '@/shared/config/database.config';
import { AppErrorBuilder } from '@/shared/errors/app-error';
import { AppResponse } from '@/types/app';
import { StatusCodes } from 'http-status-codes';

interface PageContentService {
  getPageWithContent: (
    page: 'about' | 'policy',
  ) => Promise<AppResponse<PageContentResponse>>;
  updatePageWithContent: (
    page: 'about' | 'policy',
    content: PageContentUpdateRequestType,
  ) => Promise<AppResponse<void>>;
  getPageSections: (
    page: 'home',
  ) => Promise<AppResponse<Array<PageSectionModelType>>>;
}

const pageContentService: PageContentService = {
  getPageWithContent: async (page) => {
    let pageId = 0;
    if (page === 'policy') pageId = ID_POLICY_PAGE;
    if (page === 'about') pageId = ID_ABOUT_PAGE;
    if (pageId === 0) {
      throw AppErrorBuilder.badRequest(`Page ${page} is not supported`);
    }
    const contentData = await pageContentRepository.getPage(pageId);
    const data: PageContentResponse = {
      title: contentData.title,
      slug: contentData.slug.slug,
      content: contentData.content,
      metadata: contentData.metadata,
    };
    return {
      code: StatusCodes.OK,
      message: 'Page with content fetched successfully',
      data,
    };
  },
  updatePageWithContent: async (page, content) => {
    let pageId = 0;
    if (page === 'policy') pageId = ID_POLICY_PAGE;
    if (page === 'about') pageId = ID_ABOUT_PAGE;
    if (pageId === 0) {
      throw AppErrorBuilder.badRequest(`Page ${page} is not supported`);
    }
    await pageContentRepository.updatePage(pageId, content);
    return {
      code: StatusCodes.OK,
      message: `Page ${page} content updated successfully`,
    };
  },
  getPageSections: async (page) => {
    let pageId = 0;
    if (page === 'home') pageId = ID_HOME_PAGE;
    if (pageId === 0) {
      throw AppErrorBuilder.badRequest(`Page ${page} is not supported`);
    }
    const data = await pageRepository.getPageSection(pageId);
    return {
      code: StatusCodes.OK,
      message: `Page ${page} content updated successfully`,
      data: data.map((section) => ({
        ...section,
        config: section.config as any,
      })),
    };
  },
};
export default pageContentService;
