import { ErrorCode } from "@mubite/shared-types";
import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  readonly statusCode = 404;
  readonly code = ErrorCode.NOT_FOUND;

  constructor(resource: string, id?: string | number) {
    const message = id
      ? `${resource} with id ${id} not found`
      : `${resource} not found`;
    super(message);
  }
}
