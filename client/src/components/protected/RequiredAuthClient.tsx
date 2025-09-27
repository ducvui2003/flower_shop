'use client';
import useSession from '@/components/auth/useSession';
import { Role } from '@/types/auth.type';
import React, { useMemo } from 'react';

type Mode = 'hide' | 'disable' | 'blur-sm' | 'none';

// Prevent unauthenticated users from accessing this component
// Works in client component
// Component will restrict access if user is not authenticated or doesn't have the required rol

type RequiredAuthClient = {
  children?: React.ReactNode;
  mode?: Mode;
  role?: Role[];
};

const RequiredAuthClient = ({
  children,
  mode = 'none',
  role,
}: RequiredAuthClient) => {
  const { status, user } = useSession();

  const shouldRestrict = useMemo(() => {
    if (status !== 'authenticated') return true;
    if (!user) return true;
    if (role?.length && !role.includes(user.role)) return true;
    return false;
  }, [status, role, user]);

  if (shouldRestrict) {
    switch (mode) {
      case 'hide':
        return null; // Completely remove element
      case 'disable':
        return <div className="pointer-events-none opacity-50">{children}</div>; // Disable element
      case 'blur-sm':
        return <div className="blur-xs filter">{children}</div>; // Blur effect
      case 'none':
        return <>{children}</>;
    }
  }

  return <>{children}</>;
};
export default RequiredAuthClient;
