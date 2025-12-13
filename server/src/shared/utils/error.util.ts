import { AppError, AppErrorBuilder } from '@/shared/errors/app-error';
import { AppErrorResponse } from '@/types/app';
import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

export const errorsApi: Record<string, AppErrorResponse> = {
  UNAUTHORIZED: {
    code: StatusCodes.UNAUTHORIZED,
    message: 'Unauthorized',
  },
};

export const isUniqueCode = (
  err: any,
): err is Prisma.PrismaClientKnownRequestError => {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    err.code === 'P2002'
  );
};
export const isForeignKeyNotFound = (
  err: any,
): err is Prisma.PrismaClientKnownRequestError => {
  return (
    err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2003'
  );
};
export const isRecordNotExist = (
  err: any,
): err is Prisma.PrismaClientKnownRequestError => {
  return (
    err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025'
  );
};
