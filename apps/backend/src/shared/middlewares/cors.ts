import cors from "cors";
import { env } from "../../core/config";

export const corsMiddleware = cors({
  origin: env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim()),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
