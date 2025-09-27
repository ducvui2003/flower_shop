import middleWareAuth from '@/middlewares/auth.middleware';
import middlewarePayment from '@/middlewares/payment.middleware';
import middlewarePreventAfterAuth from '@/middlewares/preventAfterAuth.middleware';
import middlewareRefreshToken from '@/middlewares/refreshToken.middleware';

const middlewares = [
  middlewarePreventAfterAuth,
  middlewareRefreshToken,
  middlewarePayment,
  middleWareAuth.authMiddlewareWithRoutesNeedAuth,
  middleWareAuth.authMiddlewareWithUser,
  middleWareAuth.authMiddlewareWithSeller,
  middleWareAuth.authMiddlewareWithAdmin,
];

export default middlewares;
