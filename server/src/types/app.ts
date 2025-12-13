import { Request } from 'express';

export type AppResponse<T = undefined> = {
  code: number;
  message?: string;
  data?: T;
  error?: any;
};

export type Page<T> = {
  items: Array<T>;
  isLast: boolean;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};
export type AppErrorResponse = Omit<AppResponse, 'data'>;
export type AppResponseWrapper = AppResponse & {
  isSuccess?: boolean;
  time: Date;
  url: string;
};
