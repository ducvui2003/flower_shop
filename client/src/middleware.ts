import { Session } from '@/app/api/auth/session/type';
import middlewares from '@/middlewares';
import { Middleware } from '@/types/middleware.type';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const middlewareChain = async (
  req: NextRequest,
  event: NextFetchEvent,
  handlers: Middleware[],
  session: Session | null,
) => {
  for (const handle of handlers) {
    const res = await handle(req, event, session);
    if (res && (res.redirected || !res.ok)) {
      return res;
    }
  }
  return undefined;
};

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent,
) {
  const res = await middlewareChain(req, event, middlewares, null);
  if (res) return res;
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
