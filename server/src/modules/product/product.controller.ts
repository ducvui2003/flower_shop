import {
  ProductCreateRequestType,
  ProductGetQueryType,
  ProductSearchGetQueryType,
  ProductUpdateRequestType,
} from '@/modules/product/product.request';
import productService from '@/modules/product/product.service';
import { NextFunction, Request, Response } from 'express';

const productController = {
  getProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query: ProductSearchGetQueryType = req.locals.query;
      const response = await productService.searchProducts(query);
      res.status(response.code).json(response);
    } catch (e) {
      next(e);
    }
  },
  getProduct: async (
    req: Request<
      {
        slug: string;
      },
      object,
      object,
      ProductGetQueryType
    >,
    res: Response,
    next: NextFunction,
  ) => {
    const slug = req.params.slug;
    const type = (req.locals.query as ProductGetQueryType).type;
    try {
      let response;
      if (type === 'id') {
        response = await productService.getProductById(parseInt(slug));
        res.status(response.code).json(response);
      }
      if (type === 'name') {
        response = await productService.getProductBySlug(slug);
        res.status(response.code).json(response);
      }
    } catch (e) {
      next(e);
    }
  },
  getProductEditing: async (
    req: Request<
      {
        id: string;
      },
      object,
      object,
      ProductGetQueryType
    >,
    res: Response,
    next: NextFunction,
  ) => {
    const id = req.params.id;
    try {
      const response = await productService.getProductEditingById(parseInt(id));
      res.status(response.code).json(response);
    } catch (e) {
      next(e);
    }
  },
  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: ProductCreateRequestType = req.body;
      const response = await productService.createProduct(body);
      res.status(response.code).json(response);
    } catch (e) {
      next(e);
    }
  },
  updateProduct: async (
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
      const body: ProductUpdateRequestType = req.body;
      const response = await productService.updateProduct(parseInt(id), body);
      res.status(response.code).json(response);
    } catch (e) {
      next(e);
    }
  },
  deleteProduct: async (
    req: Request<
      {
        id: string;
      },
      object,
      object,
      ProductGetQueryType
    >,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.params.id;
      const response = await productService.deleteProductById(parseInt(id));
      res.status(response.code).json(response);
    } catch (e) {
      next(e);
    }
  },
};

export default productController;
