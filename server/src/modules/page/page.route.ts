import pageBuilderController from '@/modules/page/page-builder.controller';
import pageController from '@/modules/page/page.controller';
import { HomePageContentUpdateRequestSchema } from '@/modules/page/page.request';
import validationBodyMiddleware from '@/shared/middlewares/validate.middleware';
import { Router } from 'express';

const pageRouters = Router();

pageRouters
  .route('/page/home')
  .get(pageController.getHomeStructure)
  .put(
    validationBodyMiddleware(HomePageContentUpdateRequestSchema),
    pageBuilderController.updatePageContent,
  );
pageRouters.use('/page/category', pageController.getCategoryStructure);
pageRouters.use('/page/navigate', pageController.getNavigateStructure);

export default pageRouters;
