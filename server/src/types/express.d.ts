import { Multer } from 'multer';

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;
      files?: Multer.File[] | { [fieldname: string]: Multer.File[] };
      locals: {
        query?: any;
      };
    }
  }
}

// Ensure this file is treated as a module
export {};
