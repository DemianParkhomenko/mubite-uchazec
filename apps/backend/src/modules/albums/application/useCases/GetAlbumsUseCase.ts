import { injectable, inject } from "inversify";
import { IAlbumRepository, PaginatedResult } from "../../domain/repositories";
import { Album } from "../../domain/entities";
import { TYPES } from "@/core/di/types";
import { ILogger } from "@mubite/shared-config";

export interface GetAlbumsInput {
  page?: number;
  limit?: number;
  search?: string;
}

@injectable()
export class GetAlbumsUseCase {
  constructor(
    @inject(TYPES.AlbumRepository) private albumRepository: IAlbumRepository,
    @inject(TYPES.Logger) private logger: ILogger,
  ) {}

  async execute(input: GetAlbumsInput = {}): Promise<PaginatedResult<Album>> {
    this.logger.info("Executing GetAlbumsUseCase", {
      page: input.page,
      limit: input.limit,
      search: input.search,
    });

    try {
      const result = await this.albumRepository.findAll(input);

      this.logger.info("GetAlbumsUseCase completed", {
        page: result.pagination.page,
        returned: result.data.length,
        total: result.pagination.total,
      });

      return result;
    } catch (error) {
      this.logger.error("GetAlbumsUseCase failed", error as Error);
      throw error;
    }
  }
}
