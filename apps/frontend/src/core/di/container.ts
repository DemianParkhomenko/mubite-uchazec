import { AlbumApiClient } from "@/modules/albums/infrastructure/api";
import { HttpAlbumRepository } from "@/modules/albums/infrastructure/repositories";
import { AlbumService } from "@/modules/albums/application/services";

export const createAlbumService = (): AlbumService => {
  const apiClient = new AlbumApiClient();
  const repository = new HttpAlbumRepository(apiClient);
  return new AlbumService(repository);
};
