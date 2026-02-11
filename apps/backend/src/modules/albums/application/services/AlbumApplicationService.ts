import { injectable, inject } from "inversify";
import {
  GetAlbumsUseCase,
  GetAlbumByIdUseCase,
  GetAlbumsInput,
} from "../useCases";
import { Album } from "../../domain/entities";
import { PaginatedResult } from "../../domain/repositories";
import { TYPES } from "@/core/di/types";

@injectable()
export class AlbumApplicationService {
  constructor(
    @inject(TYPES.GetAlbumsUseCase) private getAlbumsUseCase: GetAlbumsUseCase,
    @inject(TYPES.GetAlbumByIdUseCase)
    private getAlbumByIdUseCase: GetAlbumByIdUseCase,
  ) {}

  async getAllAlbums(
    input: GetAlbumsInput = {},
  ): Promise<PaginatedResult<Album>> {
    return this.getAlbumsUseCase.execute(input);
  }

  async getAlbumById(id: number): Promise<Album> {
    return this.getAlbumByIdUseCase.execute(id);
  }
}
