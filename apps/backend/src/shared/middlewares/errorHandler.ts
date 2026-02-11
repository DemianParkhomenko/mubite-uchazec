import { Request, Response, NextFunction } from "express";
import { BaseError } from "../errors";
import { ILogger } from "@mubite/shared-config";
import { ErrorCode } from "@mubite/shared-types";

export const createErrorHandler = (logger: ILogger) => {
  return (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction,
  ): void => {
    logger.error("Error occurred", err, {
      path: req.path,
      method: req.method,
      ip: req.ip,
    });

    if (err instanceof BaseError && err.isOperational) {
      res.status(err.statusCode).json({
        success: false,
        error: err.toJSON(),
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: {
        code: ErrorCode.INTERNAL_ERROR,
        message: "Internal server error",
        timestamp: new Date().toISOString(),
      },
    });
  };
};
