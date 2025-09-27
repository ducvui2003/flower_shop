import { Session } from '@/app/api/auth/session/type';
import { NextRequest, NextResponse, NextFetchEvent } from 'next/server';

export type Middleware = (
  req: NextRequest,
  event: NextFetchEvent,
  session: Session | null,
) => NextResponse | Promise<NextResponse | undefined>;
