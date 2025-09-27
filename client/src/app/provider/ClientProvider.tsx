'use client';
import { Session } from '@/app/api/auth/session/type';
import { LOCAL_STORAGE } from '@/utils/const.util';
import { setAuthState } from '@/features/auth/auth.slice';
import { useAppDispatch } from '@/hooks/use-store';
import { ReactNode, useEffect, useState } from 'react';
import { setAccessToken } from '@/lib/http.client';
import { toast } from 'sonner';

type ClientProviderProps = {
  session?: Session;
  children?: ReactNode;
};

const ClientProvider = ({ session, children }: ClientProviderProps) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session) {
      setAccessToken(session.accessToken);
      dispatch(
        setAuthState({
          accessToken: session.accessToken,
          expiresAt: session.expiresAt,
          status: 'authenticated',
          user: session.user,
        }),
      );
    }
    setIsReady(true);
  }, [session]);

  useEffect(() => {
    const message = localStorage.getItem(LOCAL_STORAGE.LOGOUT);
    if (message) {
      toast.success('Đăng xuất thành công', {
        duration: 2000,
      });
      localStorage.removeItem(LOCAL_STORAGE.LOGOUT);
    }
  }, []);

  if (!isReady) return null;
  return <>{children}</>;
};

export default ClientProvider;
