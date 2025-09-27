import { Session } from '@/app/api/auth/session/type';
import { getSession } from '@/lib/auth.helper';
import authService from '@/service/auth.service';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
/**
 * Get current refresh token in cookie and handle refresh token
 * @returns
 * 200: refresh token success, return session in body
 * 404: can not find refresh token in cookie
 * 500: has error in process cast json value from cookie value
 */

const POST = async () => {
  try {
    const cookieStore = await cookies();

    const currentSession = getSession(cookieStore);

    if (currentSession) {
      const responseFromServer = await authService.renewToken(
        currentSession.refreshToken,
      );
      if (responseFromServer == null) throw Error();
      const { accessToken, refreshToken, expiresAt, ...props } =
        responseFromServer;

      const newSession: Session = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresAt: expiresAt,
        user: props,
      };

      return NextResponse.json(JSON.stringify(newSession), { status: 200 });
    } else {
      return NextResponse.json(null, { status: 404 });
    }
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }
};

export { POST };
