// utils/requestContext.ts
import { AsyncLocalStorage } from 'async_hooks';

interface RequestContextData {
  user: {
    id: number;
    username: string;
    email: string;
  };
  token: string;
}

const asyncLocalStorage = new AsyncLocalStorage<RequestContextData>();

export function runWithContext(data: RequestContextData, callback: () => void) {
  asyncLocalStorage.run(data, callback);
}

export function getContext(): RequestContextData | undefined {
  return asyncLocalStorage.getStore();
}

export function getUser<T = RequestContextData['user']>(): T | null {
  return (asyncLocalStorage.getStore()?.user as T) ?? null;
}

export function getToken(): string | null {
  return asyncLocalStorage.getStore()?.token ?? null;
}
