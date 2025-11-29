import { HomePageContentUpdateRequestType } from '@/modules/page/page.request';
import pageService from '@/modules/page/page.service';
import { NextFunction, Response, Request } from 'express';

const pageBuilderController = {
  updatePageContent: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    // try {
    //   const body: HomePageContentUpdateRequestType = req.body;
    //   const response = await pageService.updateHomePageContent(body);
    //   res.status(response.code);
    // } catch (error) {
    //   next(error);
    // }
  },
};

export default pageBuilderController;
