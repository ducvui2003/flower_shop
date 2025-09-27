import { AUTH_SESSION_COOKIE } from '@/app/api/auth/session/const';
import { getSession } from '@/lib/auth.helper';
import authService from '@/service/auth.service';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Handle logout with server
 * Clear cookie in Nextjs Server
 * @returns
 */

const DELETE = async () => {
  const cookieStore = await cookies();
  const cookieValue = getSession(cookieStore);
  cookieStore.delete(AUTH_SESSION_COOKIE);
  if (cookieValue)
    authService.logout(cookieValue?.accessToken, cookieValue?.refreshToken);

  return NextResponse.json(null, {
    status: 200,
  });
};
export { DELETE };
