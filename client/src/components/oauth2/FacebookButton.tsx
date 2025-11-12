'use client';
import signInFacebook from '@/components/auth/signInFacebook';
import ClientIcon from '@/components/ClientIcon';
import React from 'react';

const FacebookButton = () => {
  return (
    <ClientIcon
      icon="logos:facebook"
      className="hover:opacity- 40 hover:cursor-pointer hover:text-gray-300"
      size={40}
      onClick={() =>
        signInFacebook({
          redirectUrl: '/home',
        })
      }
    />
  );
};

export default FacebookButton;
