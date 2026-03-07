import authRouters from '@/modules/auth/auth.route';
import categoryRouters from '@/modules/category/category.route';
import mediaRouters from '@/modules/media/media.route';
import pageRouters from '@/modules/page/page.route';
import productRouters from '@/modules/product/product.route';
import { Router } from 'express';

const routers = Router();
routers.use(authRouters);
routers.use(pageRouters);
routers.use(mediaRouters);
routers.use(productRouters);
routers.use(categoryRouters);

export default routers;
