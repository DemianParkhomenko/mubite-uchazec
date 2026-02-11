import { injectable, inject } from "inversify";
import { IAlbumRepository } from "../../domain/repositories";
import { Album } from "../../domain/entities";
import { TYPES } from "@/core/di/types";
import { ILogger } from "@mubite/shared-config";
import { NotFoundError } from "@/shared/errors";

@injectable()
export class GetAlbumByIdUseCase {
  constructor(
    @inject(TYPES.AlbumRepository) private albumRepository: IAlbumRepository,
    @inject(TYPES.Logger) private logger: ILogger,
  ) {}

  async execute(id: number): Promise<Album> {
    this.logger.info(`Executing GetAlbumByIdUseCase`, { id });

    if (id <= 0) {
      throw new NotFoundError("Album", id);
    }

    try {
      const album = await this.albumRepository.findById(id);

      if (!album) {
        throw new NotFoundError("Album", id);
      }

      this.logger.info(`GetAlbumByIdUseCase completed`, { id });

      return album;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      this.logger.error(`GetAlbumByIdUseCase failed`, error as Error, { id });
      throw error;
    }
  }
}
