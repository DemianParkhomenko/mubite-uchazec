export interface IEnvConfig {
  get(key: string): string | undefined;
  getOrThrow(key: string): string;
  getOrDefault(key: string, defaultValue: string): string;
  isDevelopment(): boolean;
  isProduction(): boolean;
  isTest(): boolean;
}

export type Environment = "development" | "production" | "test";
