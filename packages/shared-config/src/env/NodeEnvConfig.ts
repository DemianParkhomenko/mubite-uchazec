import { IEnvConfig, Environment } from "./EnvConfig";

export class NodeEnvConfig implements IEnvConfig {
  private readonly env: NodeJS.ProcessEnv;

  constructor(env: NodeJS.ProcessEnv = process.env) {
    this.env = env;
  }

  get(key: string): string | undefined {
    return this.env[key];
  }

  getOrThrow(key: string): string {
    const value = this.env[key];
    if (value === undefined) {
      throw new Error(`Environment variable ${key} is required but not set`);
    }
    return value;
  }

  getOrDefault(key: string, defaultValue: string): string {
    return this.env[key] ?? defaultValue;
  }

  private getEnvironment(): Environment {
    const env = this.env.NODE_ENV?.toLowerCase();
    if (env === "production") return "production";
    if (env === "test") return "test";
    return "development";
  }

  isDevelopment(): boolean {
    return this.getEnvironment() === "development";
  }

  isProduction(): boolean {
    return this.getEnvironment() === "production";
  }

  isTest(): boolean {
    return this.getEnvironment() === "test";
  }
}
