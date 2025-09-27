export type AppResponse<T = any> = {
  code: number;
  message?: string;
  data?: T;
  error?: any;
};
export type AppErrorResponse = Omit<AppResponse, 'data'>;
export type AppResponseWrapper = AppResponse & {
  isSuccess?: boolean;
  time: Date;
  url: string;
};
