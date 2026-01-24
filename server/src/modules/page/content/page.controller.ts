import pageContentService from '@/modules/page/content/page-content.service';
import { NextFunction, Request, Response } from 'express';

const pageContentController = {
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
};
export default pageContentController;
