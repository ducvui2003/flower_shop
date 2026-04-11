import authRouters from '@/modules/auth/auth.route';
import categoryRouters, {
  categoryAdminRouters,
} from '@/modules/category/category.route';
import mediaRouters, { mediaAdminRouters } from '@/modules/media/media.route';
import pageRouters, { pageAdminRouters } from '@/modules/page/page.route';
import productRouters, {
  productAdminRouters,
} from '@/modules/product/product.route';
import authMiddleware from '@/shared/middlewares/auth.middleware';
import { Router } from 'express';

const routers = Router();
routers.use(authRouters);
routers.use('/admin', authMiddleware());
routers.use('/admin', pageAdminRouters);
routers.use('/admin', mediaAdminRouters);
routers.use('/admin', productAdminRouters);
routers.use('/admin', categoryAdminRouters);
routers.use(pageRouters);
routers.use(mediaRouters);
routers.use(productRouters);
routers.use(categoryRouters);

export default routers;
