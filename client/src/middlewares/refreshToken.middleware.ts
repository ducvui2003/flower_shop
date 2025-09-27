import { AUTH_SESSION_COOKIE } from '@/app/api/auth/session/const';
import { Session } from '@/app/api/auth/session/type';
import { setSession } from '@/lib/auth.helper';
import { matchPath } from '@/lib/utils';
import authService from '@/service/auth.service';
import { Middleware } from '@/types/middleware.type';
import { NextRequest, NextResponse } from 'next/server';

const routers: string[] = ['/login', '/register', '/forgot-password'];

const middlewareRefreshToken: Middleware = async (
  req: NextRequest,
  _,
  session,
) => {
  const path = req.nextUrl.pathname;
  if (matchPath(path, routers)) {
    const cookies = req.cookies.get(AUTH_SESSION_COOKIE)?.value;
    if (!cookies) return undefined;
    const currentSession: Session = JSON.parse(cookies);

    // access token expired => refresh token
    const responseFromServer = await authService.renewToken(
      currentSession.refreshToken,
    );
    // refresh token failed => delete token in cookie
    if (!responseFromServer) {
      req.cookies.delete(AUTH_SESSION_COOKIE);
      return undefined;
    }
    // refresh token success => save token in cookie
    const { accessToken, refreshToken, expiresAt, ...props } =
      responseFromServer;
    const newSession: Session = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresAt: expiresAt,
      user: {
        id: props.id,
        email: props.email,
        name: props.name,
        role: props.role,
        avatar: props.avatar,
      },
    };
    const response = NextResponse.next();
    setSession(newSession, response);
    return response;
  }

  return undefined;
};
export default middlewareRefreshToken;
