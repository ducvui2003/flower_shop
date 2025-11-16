import pageBuilderController from '@/controllers/page-builder.controller';
import pageController from '@/controllers/page.controller';
import { HomePageContentUpdateRequestSchema } from '@/dto/request/page.dto';
import validationBodyMiddleware from '@/middlewares/validate.middleware';
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
export default pageRouters;
