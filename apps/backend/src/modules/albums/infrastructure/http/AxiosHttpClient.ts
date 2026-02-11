import axios, { AxiosInstance, AxiosError } from "axios";
import { injectable, inject } from "inversify";
import { IHttpClient, RequestConfig } from "./HttpClient";
import { ILogger } from "@mubite/shared-config";
import { TYPES } from "@/core/di/types";
import { ExternalApiError } from "@/shared/errors";

@injectable()
export class AxiosHttpClient implements IHttpClient {
  private readonly client: AxiosInstance;

  constructor(
    @inject(TYPES.Logger) private logger: ILogger,
    @inject(TYPES.Config) private config: { externalApiTimeout: number },
  ) {
    this.client = axios.create({
      timeout: config.externalApiTimeout,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.client.interceptors.request.use(
      (config) => {
        this.logger.debug(`HTTP ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        this.logger.error("HTTP request error", error);
        return Promise.reject(error);
      },
    );

    this.client.interceptors.response.use(
      (response) => {
        this.logger.debug(`HTTP ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        if (axios.isAxiosError(error)) {
          this.handleAxiosError(error);
        }
        return Promise.reject(error);
      },
    );
  }

  private handleAxiosError(error: AxiosError): void {
    const status = error.response?.status;
    const url = error.config?.url;

    this.logger.error(`HTTP error ${status} ${url}`, error);

    if (error.code === "ECONNABORTED") {
      throw new ExternalApiError("JSONPlaceholder", "Request timeout", {
        url,
        timeout: this.config.externalApiTimeout,
      });
    }

    if (!error.response) {
      throw new ExternalApiError(
        "JSONPlaceholder",
        "Network error - no response received",
        {
          url,
        },
      );
    }

    throw new ExternalApiError("JSONPlaceholder", `HTTP ${status}`, {
      url,
      status,
      data: error.response.data,
    });
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    try {
      const response = await this.client.get<T>(url, {
        headers: config?.headers,
        timeout: config?.timeout,
        params: config?.params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data, {
        headers: config?.headers,
        timeout: config?.timeout,
        params: config?.params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
