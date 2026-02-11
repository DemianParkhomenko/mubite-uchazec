import { Album } from "../entities";

export interface AlbumQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface IAlbumRepository {
  findAll(params?: AlbumQueryParams): Promise<PaginatedResult<Album>>;

  findById(id: number): Promise<Album | null>;
}
