import authRouters from '@/routes/auth.route';
import pageRouters from '@/routes/page.route';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRouters);
router.use('/page', pageRouters);

export default router;
