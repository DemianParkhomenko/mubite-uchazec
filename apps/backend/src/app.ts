import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import {
  corsMiddleware,
  createLoggerMiddleware,
  createErrorHandler,
} from "./shared/middlewares";
import { ConsoleLogger, LogLevel } from "@mubite/shared-config";
import { env } from "./core/config";
import { healthCheck } from "./core/health";
import { createAlbumRoutes } from "./modules/albums/presentation/routes";

export const createApp = (): Express => {
  const app = express();

  const logger = new ConsoleLogger(env.LOG_LEVEL as LogLevel);

  app.use(helmet());

  app.use(corsMiddleware);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(createLoggerMiddleware(logger));

  app.get("/health", healthCheck);

  app.use("/api/albums", createAlbumRoutes());

  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: `Route ${req.method} ${req.path} not found`,
        timestamp: new Date().toISOString(),
      },
    });
  });

  app.use(createErrorHandler(logger));

  return app;
};
