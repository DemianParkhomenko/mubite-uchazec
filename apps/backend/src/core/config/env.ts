import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { z } from "zod";
import { LogLevel } from "@mubite/shared-config";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z
    .string()
    .transform(Number)
    .pipe(z.number().positive())
    .default("4000"),
  HOST: z.string().default("0.0.0.0"),
  EXTERNAL_API_URL: z.string().url(),
  EXTERNAL_API_TIMEOUT: z
    .string()
    .transform(Number)
    .pipe(z.number().positive())
    .default("5000"),
  LOG_LEVEL: z.nativeEnum(LogLevel).default(LogLevel.INFO),
  ALLOWED_ORIGINS: z.string().default("http://localhost:3000"),
});

export type Env = z.infer<typeof envSchema>;

export const loadEnv = (): Env => {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    console.error(parsed.error.format());
    throw new Error("Invalid environment configuration");
  }

  return parsed.data;
};

export const env = loadEnv();
