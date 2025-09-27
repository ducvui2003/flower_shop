import authRouters from '@/routes/auth.route';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRouters);

export default router;
