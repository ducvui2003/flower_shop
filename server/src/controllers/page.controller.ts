import { CategoryPageRequest } from '@/dto/request/page.dto';
import pageService from '@/services/page.service';
import { NextFunction, Request, Response } from 'express';

const pageController = {
  getHomeStructure: async (_: Request, res: Response, next: NextFunction) => {
    try {
      const response = await pageService.getHomePageStructure();
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  },
  getCategoryStructure: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { name }: CategoryPageRequest = req.query;
      if (!name) throw Error();
      const response = await pageService.getCategoryPageStructure(name);
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  },

  getNavigateStructure: async (
    _: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await pageService.getNavigateStructure();
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  },
};

export default pageController;
