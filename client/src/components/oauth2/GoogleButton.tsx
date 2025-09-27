'use client';
import signInGoogle from '@/components/auth/signInGoogle';
import ClientIcon from '@/components/ClientIcon';
import React from 'react';

const GoogleButton = () => {
  return (
    <ClientIcon
      icon="flat-color-icons:google"
      className="hover:opacity- 40 hover:cursor-pointer hover:text-gray-300"
      size={40}
      onClick={() => signInGoogle({ redirectUrl: '/home' })}
    />
  );
};

export default GoogleButton;
