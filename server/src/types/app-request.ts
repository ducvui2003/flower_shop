import { Request } from 'express';

export interface AppRequest<T = any> extends Request {
  body: T;
}
