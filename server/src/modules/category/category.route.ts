import categoryController from '@/modules/category/category.controller';
import {
  CategoryCreateRequestSchema,
  CategoryGetQuerySchema,
  CategorySearchGetQuerySchema,
  CategoryUpdateRequestSchema,
} from '@/modules/category/category.request';
import validationBodyMiddleware, {
  validateQueryMiddleware,
} from '@/shared/middlewares/validate.middleware';
import { Router } from 'express';

const categoryRouters = Router();
const categoryAdminRouters = Router();

categoryRouters
  .route('/category')
  .get(
    validateQueryMiddleware(CategorySearchGetQuerySchema),
    categoryController.getCategories,
  );

categoryAdminRouters
  .route('/category')
  .post(
    validationBodyMiddleware(CategoryCreateRequestSchema),
    categoryController.createCategory,
  );

categoryRouters
  .route('/category/:slug')
  .get(
    validateQueryMiddleware(CategoryGetQuerySchema),
    categoryController.getCategory,
  );

categoryAdminRouters
  .route('/category/:id')
  .get(categoryController.getCategoryEditing)
  .patch(
    validationBodyMiddleware(CategoryUpdateRequestSchema),
    categoryController.updateCategory,
  )
  .delete(categoryController.deleteCategory);

export { categoryAdminRouters };
export default categoryRouters;
