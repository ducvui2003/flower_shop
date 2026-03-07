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

categoryRouters
  .route('/category')
  .get(
    validateQueryMiddleware(CategorySearchGetQuerySchema),
    categoryController.getCategories,
  )
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

categoryRouters
  .route('/category/:id')
  .patch(
    validationBodyMiddleware(CategoryUpdateRequestSchema),
    categoryController.updateCategory,
  )
  .delete(categoryController.deleteCategory);

categoryRouters
  .route('/admin/category/:id')
  .get(categoryController.getCategoryEditing);

export default categoryRouters;
