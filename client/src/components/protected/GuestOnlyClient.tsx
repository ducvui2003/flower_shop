'use client';
import useSession from '@/components/auth/useSession';
import React from 'react';

type GuestOnlyProps = {
  children?: React.ReactNode;
};

// Prevent user authenticated use component for guest
// Work in clint component
// Component will hide if user authenticated
const GuestOnlyClient = ({ children }: GuestOnlyProps) => {
  const { status } = useSession();

  if (status !== 'un-authenticated') {
    return null;
  }

  return children;
};

export default GuestOnlyClient;
