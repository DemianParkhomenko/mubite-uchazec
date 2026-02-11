import {
  Album,
  AlbumsResponseDto,
  AlbumResponseDto,
} from "@mubite/shared-types";
import { IAlbumRepository, AlbumQueryParams } from "./IAlbumRepository";
import { IApiClient } from "../api";

export class HttpAlbumRepository implements IAlbumRepository {
  constructor(private apiClient: IApiClient) {}

  async getAlbums(params: AlbumQueryParams = {}): Promise<AlbumsResponseDto> {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append("page", String(params.page));
      if (params.limit) queryParams.append("limit", String(params.limit));
      if (params.search) queryParams.append("search", params.search);

      const queryString = queryParams.toString();
      const endpoint = queryString
        ? `/api/albums?${queryString}`
        : "/api/albums";

      const response = await this.apiClient.get<AlbumsResponseDto>(endpoint);

      if (!response.success || !response.data) {
        throw new Error("Invalid response from server");
      }

      return response;
    } catch (error) {
      console.error("Failed to fetch albums:", error);
      throw new Error("Failed to load albums. Please try again later.");
    }
  }

  async getAlbumById(id: number): Promise<Album> {
    try {
      const response = await this.apiClient.get<AlbumResponseDto>(
        `/api/albums/${id}`,
      );

      if (!response.success || !response.data) {
        throw new Error("Invalid response from server");
      }

      return response.data;
    } catch (error) {
      console.error(`Failed to fetch album ${id}:`, error);
      throw new Error("Failed to load album. Please try again later.");
    }
  }
}
