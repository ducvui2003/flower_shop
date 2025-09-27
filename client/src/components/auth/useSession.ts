'use client';

import { Session } from '@/app/api/auth/session/type';
import { setAuthState, setStatus } from '@/features/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import { getCurrentUnix, isSessionExpired } from '@/lib/auth.helper';
import { useEffect } from 'react';

let refreshPromise: Promise<void> | null = null;
/**
 * Get session by call to next server
 * Check in Store before call to next server
 * @returns session
 */

const useSession = () => {
  const { accessToken, user, expiresAt, status } = useAppSelector(
    (state) => state.authSlice,
  );

  const dispatch = useAppDispatch();

  const fetchSession = async () => {
    if (refreshPromise) {
      await refreshPromise; // wait for the shared promise
      return;
    }

    dispatch(setStatus('loading'));

    const doFetch = async () => {
      const response = await fetch('/api/auth/session', {
        method: 'GET',
      });
      // session exist => refresh token not expired
      if (response.ok) {
        const currentSession: Session = await response.json();
        if (!isSessionExpired(currentSession)) {
          // access token not expired
          dispatch(
            setAuthState({
              accessToken: currentSession.accessToken,
              expiresAt: currentSession.expiresAt,
              status: 'authenticated',
              user: currentSession.user,
            }),
          );
        } else {
          // access token expired => refresh new token
          const responseFromRefresh = await fetch('/api/auth/refresh', {
            method: 'POST',
          });

          if (responseFromRefresh.status !== 200) {
            // refresh token failed
            // logout in server to clear session
            await fetch('/api/auth/logout', {
              method: 'DELETE',
            });
            dispatch(
              setAuthState({
                accessToken: null,
                expiresAt: null,
                status: 'un-authenticated',
                user: null,
              }),
            );
          } else {
            // refresh token success
            // save session
            const bodyFromRefresh: Session = await responseFromRefresh.json();
            await fetch('/api/auth/session', {
              method: 'POST',
              body: JSON.stringify(bodyFromRefresh),
            });
            dispatch(
              setAuthState({
                accessToken: bodyFromRefresh.accessToken,
                expiresAt: bodyFromRefresh.expiresAt,
                status: 'authenticated',
                user: bodyFromRefresh.user,
              }),
            );
          }
        }
      } else {
        // session not exist => refresh token expired
        dispatch(
          setAuthState({
            accessToken: null,
            expiresAt: null,
            status: 'un-authenticated',
            user: null,
          }),
        );
      }
    };

    // Run the shared promise and reset after done
    refreshPromise = doFetch()
      .catch((err) => {
        console.error('Session refresh failed:', err);
      })
      .finally(() => {
        refreshPromise = null;
      });

    await refreshPromise;
  };

  useEffect(() => {
    const isTokenValid =
      status === 'authenticated' && expiresAt && expiresAt > getCurrentUnix();
    if (isTokenValid) return;
    fetchSession();
  }, []);

  return { accessToken, user, status };
};

export default useSession;
