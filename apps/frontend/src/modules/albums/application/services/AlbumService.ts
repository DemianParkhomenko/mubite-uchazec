import { Album, AlbumsResponseDto } from "@mubite/shared-types";
import {
  IAlbumRepository,
  AlbumQueryParams,
} from "../../infrastructure/repositories";

export class AlbumService {
  constructor(private repository: IAlbumRepository) {}

  async getAlbums(params?: AlbumQueryParams): Promise<AlbumsResponseDto> {
    return this.repository.getAlbums(params);
  }

  async getAlbumById(id: number): Promise<Album> {
    return this.repository.getAlbumById(id);
  }
}
