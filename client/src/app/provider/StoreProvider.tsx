'use client';
import { AppStore, makeStore } from '@/lib/store';
import { useRef } from 'react';
import { Provider } from 'react-redux';

let store: AppStore;

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    store = storeRef.current;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
export { store };
