import envConfig from '@/shared/config/env.config';
import cors from 'cors';
const corsMiddleware = () => {
  return cors({
    origin: envConfig.ALLOW_ORIGINS,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
};
export default corsMiddleware;
