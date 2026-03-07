import {
  CategoryCreateRequestType,
  CategoryGetQueryType,
  CategorySearchGetQueryType,
  CategoryUpdateRequestType,
} from '@/modules/category/category.request';
import categoryService from '@/modules/category/category.service';
import logger from '@/shared/utils/logger.util';
import { NextFunction, Request, Response } from 'express';

const categoryController = {
  getCategories: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query: CategorySearchGetQueryType = req.locals.query;
      logger.info(query);
      const response = await categoryService.searchCategories(query);
      res.status(response.code).json(response);
    } catch (e) {
      next(e);
    }
  },

  getCategory: async (
    req: Request<
      {
        slug: string;
      },
      object,
      object,
      CategoryGetQueryType
    >,
    res: Response,
    next: NextFunction,
  ) => {
    const slug = req.params.slug;
    const type = (req.locals.query as CategoryGetQueryType).type;
    try {
      let response;
      if (type === 'id') {
        response = await categoryService.getCategoryById(parseInt(slug));
        res.status(response.code).json(response);
      }
      if (type === 'name') {
        response = await categoryService.getCategoryBySlug(slug);
        res.status(response.code).json(response);
      }
    } catch (e) {
      next(e);
    }
  },

  getCategoryEditing: async (
    req: Request<
      {
        id: string;
      },
      object,
      object,
      CategoryGetQueryType
    >,
    res: Response,
    next: NextFunction,
  ) => {
    const id = req.params.id;
    try {
      const response = await categoryService.getCategoryEditingById(
        parseInt(id),
      );
      res.status(response.code).json(response);
    } catch (e) {
      next(e);
    }
  },

  createCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: CategoryCreateRequestType = req.body;
      const response = await categoryService.createCategory(body);
      res.status(response.code).json(response);
    } catch (e) {
      next(e);
    }
  },

  updateCategory: async (
    req: Request<
      {
        id: string;
      },
      object,
      object,
      object
    >,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.params.id;
      const body: CategoryUpdateRequestType = req.body;
      const response = await categoryService.updateCategory(parseInt(id), body);
      res.status(response.code).json(response);
    } catch (e) {
      next(e);
    }
  },

  deleteCategory: async (
    req: Request<
      {
        id: string;
      },
      object,
      object,
      object
    >,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.params.id;
      const response = await categoryService.deleteCategoryById(parseInt(id));
      res.status(response.code).json(response);
    } catch (e) {
      next(e);
    }
  },
};

export default categoryController;
