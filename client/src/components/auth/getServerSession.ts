import { Session } from '@/app/api/auth/session/type';
import { getSession, isSessionExpired } from '@/lib/auth.helper';

import { cookies } from 'next/headers';

const getServerSession = async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  const currentSession = getSession(cookieStore);

  // Session not exist
  if (!currentSession) return null;
  // access token not expired

  if (!isSessionExpired(currentSession)) return currentSession;

  return null;
};

export default getServerSession;
