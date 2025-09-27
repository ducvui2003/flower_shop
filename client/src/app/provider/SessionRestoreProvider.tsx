import useSession from '@/components/auth/useSession';
import { setAuthState } from '@/features/auth/auth.slice';
import { useAppDispatch } from '@/hooks/use-store';
import { setAccessToken } from '@/lib/http.client';
import { ReactNode, useEffect, useState } from 'react';

type SessionRestoreProviderProps = {
  children?: ReactNode;
  accessToken?: string;
};

const SessionRestoreProvider = ({
  accessToken,
  children,
}: SessionRestoreProviderProps) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
    }
    setIsReady(true);
  }, [accessToken]);
  if (!isReady) return null;
  return <>{children}</>;
};

export default SessionRestoreProvider;
