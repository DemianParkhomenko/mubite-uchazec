import { ErrorCode } from "@mubite/shared-types";
import { BaseError } from "./BaseError";

export class ValidationError extends BaseError {
  readonly statusCode = 400;
  readonly code = ErrorCode.VALIDATION_ERROR;
  readonly details?: unknown;

  constructor(message: string, details?: unknown) {
    super(message);
    this.details = details;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      details: this.details,
    };
  }
}
