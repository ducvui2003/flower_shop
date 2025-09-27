import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { Role } from '@/types/auth.type';
import { Middleware } from '@/types/middleware.type';
import { LOGIN_PAGE } from '@/utils/const.util';
import { matchPath } from '@/lib/utils';

// const routesNeedAuth: string[] = ['/user/info'];

// export const authMiddleware = (allowedRole?: Role) => {
//   return withAuth(function middleware(
//     req: NextRequestWithAuth,
//     event: NextFetchEvent,
//   ) {
//     if (!req.nextauth?.token) {
//       if (!allowedRole)
//         return NextResponse.redirect(new URL('/login', req.url));
//       const role: Role = req.nextauth.token?.role as Role;
//       if (allowedRole || role || role !== allowedRole)
//         return NextResponse.redirect(new URL('/403', req.url));
//     }
//     return null;
//   });
// };
const authMiddleware = (
  routes: string[] = [],
  allowedRole?: Role,
): Middleware => {
  return async (req: NextRequest, _, session) => {
    const path = req.nextUrl.pathname;
    if (matchPath(path, routes)) {
      if (!session) {
        if (!allowedRole)
          return NextResponse.redirect(new URL(LOGIN_PAGE, req.url));
        const role: Role = allowedRole as Role;
        if (allowedRole || role || role !== allowedRole)
          return NextResponse.redirect(new URL('/403', req.url));
      }
    }

    return NextResponse.next();
  };
};

const routesForUser: string[] = ['/user/*splat', '/order', '/payment', '/cart'];
const authMiddlewareWithUser = authMiddleware(routesForUser, 'USER');

const routesForSeller: string[] = ['/seller/*splat'];

const authMiddlewareWithSeller = authMiddleware(routesForSeller, 'SELLER');

const routesForAdmin: string[] = ['/admin/*splat'];
const authMiddlewareWithAdmin = authMiddleware(routesForAdmin, 'ADMIN');

const routesNeedAuth: string[] = routesForUser
  .concat(routesForSeller)
  .concat(routesForAdmin);
const authMiddlewareWithRoutesNeedAuth = authMiddleware(routesNeedAuth);

const middleWareAuth = {
  authMiddlewareWithUser,
  authMiddlewareWithSeller,
  authMiddlewareWithAdmin,
  authMiddlewareWithRoutesNeedAuth,
};

export default middleWareAuth;
