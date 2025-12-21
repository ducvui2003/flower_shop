import productController from '@/modules/product/product.controller';
import {
  ProductCreateRequestSchema,
  ProductGetQuerySchema,
  ProductSearchGetQuerySchema,
  ProductUpdateRequestSchema,
} from '@/modules/product/product.request';
import validationBodyMiddleware, {
  validateQueryMiddleware,
} from '@/shared/middlewares/validate.middleware';
import { Router } from 'express';

const productRouters = Router();

productRouters
  .route('/product')
  .get(
    validateQueryMiddleware(ProductSearchGetQuerySchema),
    productController.getProducts,
  )
  .post(
    validationBodyMiddleware(ProductCreateRequestSchema),
    productController.createProduct,
  );

productRouters
  .route('/product/:slug')
  .get(
    validateQueryMiddleware(ProductGetQuerySchema),
    productController.getProduct,
  );

productRouters
  .route('/product/:id')
  .patch(
    validationBodyMiddleware(ProductUpdateRequestSchema),
    productController.updateProduct,
  )
  .delete(productController.deleteProduct);

productRouters
  .route('/admin/product/:id')
  .get(productController.getProductEditing);

export default productRouters;
