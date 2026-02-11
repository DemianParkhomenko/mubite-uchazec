import { ErrorCode } from "@mubite/shared-types";

export abstract class BaseError extends Error {
  abstract readonly statusCode: number;
  abstract readonly code: ErrorCode;
  readonly isOperational: boolean;

  constructor(message: string, isOperational = true) {
    super(message);
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      timestamp: new Date().toISOString(),
    };
  }
}
