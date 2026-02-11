export enum ErrorCode {
  NETWORK_ERROR = "NETWORK_ERROR",
  NOT_FOUND = "NOT_FOUND",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  EXTERNAL_API_ERROR = "EXTERNAL_API_ERROR",
}

export interface ApiError {
  readonly code: ErrorCode;
  readonly message: string;
  readonly details?: unknown;
  readonly timestamp?: string;
}

export interface ErrorResponseDto {
  readonly success: false;
  readonly error: ApiError;
}

export function isErrorResponse(obj: unknown): obj is ErrorResponseDto {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "success" in obj &&
    obj.success === false &&
    "error" in obj
  );
}
