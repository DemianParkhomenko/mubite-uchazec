import { ErrorCode } from "@mubite/shared-types";
import { BaseError } from "./BaseError";

export class ExternalApiError extends BaseError {
  readonly statusCode = 502;
  readonly code = ErrorCode.EXTERNAL_API_ERROR;
  readonly details?: unknown;

  constructor(service: string, message: string, details?: unknown) {
    super(`${service}: ${message}`);
    this.details = details;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      details: this.details,
    };
  }
}
