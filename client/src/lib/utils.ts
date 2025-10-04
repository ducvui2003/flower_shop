import { EntityError } from '@/lib/http.client';
import { clsx, type ClassValue } from 'clsx';
import { UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import { match } from 'path-to-regexp';
import { vi } from 'date-fns/locale';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function handleErrorApi({
  error,
  setError,
  duration = 5000,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) {
  if (error instanceof EntityError && setError) {
    const errors = error.payload.message as {
      field: string;
      error: string;
    }[];

    errors.forEach(({ field, error }) => {
      setError(field, {
        type: 'server',
        message: error,
      });
    });
  } else {
    toast.error('Lỗi', {
      description: error?.payload?.error ?? 'Lỗi không xác định',
      duration: duration,
    });
  }
}

const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path;
};

const uuid = (): string => {
  return uuidv4();
};

const nanoId = (length: number) => {
  return nanoid(length);
};

const VietNamDong = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

const currency = (currency: number): string => {
  if (isNaN(currency)) return '';
  return VietNamDong.format(currency);
};

const appendIfExist = (params: URLSearchParams, key: string, value: string) => {
  let alreadyExists = false;

  params.getAll(key).forEach((v) => {
    if (v === value) alreadyExists = true;
  });

  if (!alreadyExists) {
    params.append(key, value);
  }
};

type AnyObject = { [key: string]: any };

const toQueryString = (obj: AnyObject) => {
  return Object.entries(obj)
    .flatMap(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        return []; // skip empty values
      }
      if (Array.isArray(value)) {
        // generate multiple key=value pairs for array items
        return value.map(
          (v) => `${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`,
        );
      }
      // normal single value
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .join('&');
};

const formatDate = (
  date: Date,
  pattern: 'SHORT' | 'LONG' | string = 'SHORT',
) => {
  const patterns: Record<'SHORT' | 'LONG', string> = {
    SHORT: 'dd/MM/yyyy',
    LONG: 'HH:mm dd/MM/yyyy',
  };

  const resolvedPattern =
    pattern === 'SHORT' || pattern === 'LONG' ? patterns[pattern] : pattern;

  return format(date, resolvedPattern, { locale: vi });
};

const matchPath = (path: string, routePatterns: string[]): boolean => {
  return routePatterns.some((pattern) =>
    match(pattern, { decode: decodeURIComponent })(path),
  );
};

function setKey<T extends object, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K],
) {
  return {
    ...obj,
    [key]: value,
  };
}

const filterFalsy = (array: any[]) => {
  return array.filter((item) => Boolean(item));
};

export {
  matchPath,
  handleErrorApi,
  cn,
  toQueryString,
  formatDate,
  appendIfExist,
  currency,
  nanoId,
  normalizePath,
  uuid,
  setKey,
  filterFalsy,
};
