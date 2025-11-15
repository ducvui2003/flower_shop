import pageController from '@/controllers/page.controller';
import { Router } from 'express';

const pageRouters = Router();

pageRouters.use('/home', pageController.getHomeStructure);
pageRouters.use('/category', pageController.getCategoryStructure);
pageRouters.use('/navigate', pageController.getNavigateStructure);

export default pageRouters;
