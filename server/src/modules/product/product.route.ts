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
const productAdminRouters = Router();

productRouters
  .route('/product')
  .get(
    validateQueryMiddleware(ProductSearchGetQuerySchema),
    productController.getProducts,
  );

productAdminRouters
  .route('/product')
  .post(
    validationBodyMiddleware(ProductCreateRequestSchema),
    productController.createProduct,
  );

productRouters.route('/product/sitemap').get(productController.getSitemap);

productRouters
  .route('/product/:slug')
  .get(
    validateQueryMiddleware(ProductGetQuerySchema),
    productController.getProduct,
  );

productAdminRouters
  .route('/product/:id')
  .get(productController.getProductEditing)
  .patch(
    validationBodyMiddleware(ProductUpdateRequestSchema),
    productController.updateProduct,
  )
  .delete(productController.deleteProduct);

export { productAdminRouters };
export default productRouters;
