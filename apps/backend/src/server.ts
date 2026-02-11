import { createApp } from "./app";
import { env } from "./core/config";
import { ConsoleLogger, LogLevel } from "@mubite/shared-config";

const logger = new ConsoleLogger(env.LOG_LEVEL as LogLevel);

const startServer = async (): Promise<void> => {
  try {
    const app = createApp();

    const server = app.listen(env.PORT, env.HOST, () => {
      logger.info(`🚀 Server started`, {
        port: env.PORT,
        host: env.HOST,
        env: env.NODE_ENV,
        timestamp: new Date().toISOString(),
      });
    });

    const shutdown = (signal: string) => {
      logger.info(`${signal} received, shutting down gracefully`);
      server.close(() => {
        logger.info("Server closed");
        process.exit(0);
      });

      setTimeout(() => {
        logger.error("Forced shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    logger.error("Failed to start server", error as Error);
    process.exit(1);
  }
};

startServer();
