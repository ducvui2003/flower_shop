import { NextFunction, Response, Request } from 'express';
import pageService from '@/modules/page/page.service';
import { PageSectionUpdateRequestType } from '@/modules/page/page.request';

const pageBuilderController = {
  updatePageContent: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const body: PageSectionUpdateRequestType = req.body;
      const response = await pageService.updatePageSections(body);
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  },
};

export default pageBuilderController;
