import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      code: 'INVALID_TOKEN',
      message: 'Invalid or expired token',
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      details: (err as any).errors,
    });
  }

  // Default error response
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred',
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(StatusCodes.NOT_FOUND, 'NOT_FOUND', 'Resource not found'));
};

export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
