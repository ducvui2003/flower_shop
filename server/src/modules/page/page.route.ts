import pageBuilderController from '@/modules/page/page-builder.controller';
import pageController from '@/modules/page/page.controller';
import { HomePageContentUpdateRequestSchema } from '@/modules/page/page.request';
import validationBodyMiddleware from '@/shared/middlewares/validate.middleware';
import routers from '@/shared/router';
import { Router } from 'express';

const pageRouters = Router();

pageRouters
  .route('/home')
  .get(pageController.getHomeStructure)
  .put(
    validationBodyMiddleware(HomePageContentUpdateRequestSchema),
    pageBuilderController.updatePageContent,
  );
pageRouters.use('/category', pageController.getCategoryStructure);
pageRouters.use('/navigate', pageController.getNavigateStructure);

routers.use('/page', pageRouters);
