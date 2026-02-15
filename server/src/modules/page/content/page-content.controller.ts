import { PageContentUpdateRequestType } from '@/modules/page/content/page-content.request';
import pageContentService from '@/modules/page/content/page-content.service';
import { NextFunction, Request, Response } from 'express';

const pageContentController = {
  getHomePageSections: async (
    _: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await pageContentService.getPageSections('home');
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  },
  getAboutPageStructure: async (
    _: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await pageContentService.getPageWithContent('about');
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  },
  updateAboutPageStructure: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const body: PageContentUpdateRequestType = req.body;
    try {
      const response = await pageContentService.updatePageWithContent(
        'about',
        body,
      );
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  },
  getPolicyPageStructure: async (
    _: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await pageContentService.getPageWithContent('policy');
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  },
  updatePolicyPageStructure: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const body: PageContentUpdateRequestType = req.body;
    try {
      const response = await pageContentService.updatePageWithContent(
        'policy',
        body,
      );
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  },
};
export default pageContentController;
