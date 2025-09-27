import { AppError, AppErrorBuilder } from '@/types/app-error';
import { AppErrorResponse } from '@/types/app-response';
import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

export const errors = {
  EMAIL_REGISTER: AppErrorBuilder.conflict('Email is exist'),
  NO_DEFINE: AppErrorBuilder.internal('No define'),
  UNAUTHORIZED: AppErrorBuilder.unauthorized('User not authorized'),
  TOKEN: AppErrorBuilder.conflict('Token Exception'),
};

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
