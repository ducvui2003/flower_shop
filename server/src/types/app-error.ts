import { AppErrorResponse, AppResponse } from '@/types/app-response';
import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  public statusCode: number;
  public metadata: AppErrorResponse;

  constructor(statusCode: number, metadata: AppErrorResponse) {
    super(metadata.message);
    this.statusCode = statusCode;
    this.metadata = metadata;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class AppErrorBuilder {
  private statusCode: number = 500;
  private message: string = 'Internal Server Error';
  private error?: unknown;

  withStatusCode(statusCode: number): this {
    this.statusCode = statusCode;
    return this;
  }

  withMessage(message: string): this {
    this.message = message;
    return this;
  }

  withError(error: unknown): this {
    this.error = error;
    return this;
  }

  build(): AppError {
    const metadata: AppErrorResponse = {
      code: this.statusCode,
      message: this.message,
      error: this.error,
    };

    return new AppError(this.statusCode, metadata);
  }

  static badRequest(message: string, error?: unknown): AppError {
    return new AppErrorBuilder()
      .withStatusCode(400)
      .withMessage(message)
      .withError(error)
      .build();
  }

  static unauthorized(message = 'Unauthorized'): AppError {
    return new AppErrorBuilder()
      .withStatusCode(401)
      .withMessage(message)
      .build();
  }

  static internal(
    message = 'Internal Server Error',
    error?: unknown,
  ): AppError {
    return new AppErrorBuilder()
      .withStatusCode(500)
      .withMessage(message)
      .withError(error)
      .build();
  }
  static conflict(message = 'Conflict', error?: unknown): AppError {
    return new AppErrorBuilder()
      .withStatusCode(StatusCodes.CONFLICT)
      .withMessage(message)
      .withError(error)
      .build();
  }
}
