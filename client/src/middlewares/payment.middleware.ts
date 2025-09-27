import { PAYMENT_COOKIE } from '@/utils/const.util';
import { Middleware } from '@/types/middleware.type';
import { NextRequest, NextResponse } from 'next/server';

const middlewarePayment: Middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  if (pathname === '/payment') {
    const cookie = req.cookies.get(PAYMENT_COOKIE);

    if (!cookie || cookie.value !== 'true') {
      return NextResponse.redirect(new URL('/404', req.url));
    }

    // Clear the cookie to ensure one-time access
    const response = NextResponse.next();
    response.cookies.set(PAYMENT_COOKIE, '', { maxAge: 0 });
    return response;
  }
};

export default middlewarePayment;
