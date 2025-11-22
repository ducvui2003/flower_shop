import { AppError, AppErrorBuilder } from '@/shared/errors/app-error';
import { AppErrorResponse } from '@/types/app-response';
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
