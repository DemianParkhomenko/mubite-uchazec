import { Album, AlbumsResponseDto } from "@mubite/shared-types";

export interface AlbumQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IAlbumRepository {
  getAlbums(params?: AlbumQueryParams): Promise<AlbumsResponseDto>;

  getAlbumById(id: number): Promise<Album>;
}
