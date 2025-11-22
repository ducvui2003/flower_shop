import authRouters from '@/modules/auth/auth.route';
import pageRouters from '@/modules/page/page.route';
import { Router } from 'express';

const routers = Router();
routers.use(authRouters);
routers.use(pageRouters);
export default routers;
