import { HomePageContentUpdateRequestType } from '@/dto/request/page.dto';
import pageService from '@/services/page.service';
import { NextFunction, Response, Request } from 'express';

const pageBuilderController = {
  updatePageContent: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const body: HomePageContentUpdateRequestType = req.body;
      const response = await pageService.updateHomePageContent(body);
      res.status(response.code);
    } catch (error) {
      next(error);
    }
  },
};

export default pageBuilderController;
