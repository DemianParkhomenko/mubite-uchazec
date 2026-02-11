import { env } from "@/core/config";

export interface IApiClient {
  get<T>(endpoint: string): Promise<T>;
}

export class AlbumApiClient implements IApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string = env.BACKEND_URL) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Failed to fetch ${url}:`, error);
      throw new Error("Failed to load data. Please try again later.");
    }
  }
}
