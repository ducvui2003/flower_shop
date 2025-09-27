import ServerProvider from '@/app/provider/ServerProvider';
import StoreProvider from '@/app/provider/StoreProvider';
import { Toaster } from '@/components/ui/sonner';

import React from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <main className="relative bg-white">
        <Toaster position="bottom-right" richColors />
        {children}
      </main>
    </StoreProvider>
  );
};

export default Providers;
