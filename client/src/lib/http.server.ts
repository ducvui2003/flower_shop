/* eslint-disable @typescript-eslint/no-explicit-any */
import getServerSession from '@/components/auth/getServerSession';
import envConfig from '@/config/env.config';
import { HTTP_STATUS_CODE } from '@/utils/const.util';
import { headers } from 'next/headers';

type CustomOptions = RequestInit & {
  baseUrl?: string | undefined;
};

export class HttpError extends Error {
  status: number;
  payload: {
    error: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload?: any }) {
    super('HTTP Error');
    this.status = status;
    this.payload = payload;
  }
}

type EntityErrorPayload = {
  error: string;
  message: { field: string; error: string }[];
};

export class EntityError extends HttpError {
  status: number = 422;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: number;
    payload: EntityErrorPayload;
  }) {
    super({ status: 422, payload });
    this.status = status;
    this.payload = payload;
  }
}
let accessToken: string | null = null;

export const getAccessToken = async (): Promise<string | null> => {
  if (!accessToken) {
    const session = await getServerSession();
    accessToken = session?.accessToken ?? null;
  }
  return accessToken ?? null;
};

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined,
  auth: boolean = true,
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;

  // FORWARDING HEADERS (The "Secret Sauce")
  // We grab the headers from the current incoming user request
  const nextHeaders = await headers();
  const cookie = nextHeaders.get('cookie') ?? '';
  const xForwardedFor = nextHeaders.get('x-forwarded-for') ?? '';

  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    cookie: cookie, // Forward session cookies
    'x-forwarded-for': xForwardedFor, // Forward real User IP
  };

  if (auth) {
    const session = await getServerSession();
    if (session?.accessToken) {
      baseHeaders['Authorization'] = `Bearer ${session.accessToken}`;
    }
  }

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.SERVER_INTERNAL
      : options?.baseUrl;

  const fullUrl = url.startsWith('/')
    ? `${baseUrl}${url} `
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });

  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    if (res.status === HTTP_STATUS_CODE.ENTITY_ERROR_STATUS_CODE) {
      const payloadCasting = data.payload as EntityErrorPayload;
      throw new EntityError({
        status: HTTP_STATUS_CODE.ENTITY_ERROR_STATUS_CODE,
        payload: {
          message: payloadCasting.message,
          error: payloadCasting.error,
        },
      });
    } else {
      throw new HttpError(data);
    }
  }

  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined,
    auth: boolean = true,
  ) {
    return request<Response>('GET', url, options, auth);
  },
  post<Response>(
    url: string,
    body: any,
    options?: CustomOptions | undefined,
    auth: boolean = true,
  ) {
    return request<Response>('POST', url, { ...options, body }, auth);
  },
  put<Response>(
    url: string,
    body: any,
    options?: CustomOptions | undefined,
    auth: boolean = true,
  ) {
    return request<Response>('PUT', url, { ...options, body }, auth);
  },
  delete<Response>(
    url: string,
    body: any,
    options?: CustomOptions | undefined,
    auth: boolean = true,
  ) {
    return request<Response>('DELETE', url, { ...options, body }, auth);
  },
};
const httpServer = http;
export default httpServer;
