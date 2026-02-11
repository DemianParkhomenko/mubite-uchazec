import { injectable, inject } from "inversify";
import {
  IAlbumRepository,
  AlbumQueryParams,
  PaginatedResult,
} from "../../domain/repositories";
import { Album } from "../../domain/entities";
import { IHttpClient } from "../http";
import { AlbumMapper } from "../mappers";
import { TYPES } from "@/core/di/types";
import { AlbumDto } from "@mubite/shared-types";
import { ILogger } from "@mubite/shared-config";

@injectable()
export class JsonPlaceholderAlbumRepository implements IAlbumRepository {
  private readonly baseUrl: string;

  constructor(
    @inject(TYPES.HttpClient) private httpClient: IHttpClient,
    @inject(TYPES.Config) config: { externalApiUrl: string },
    @inject(TYPES.Logger) private logger: ILogger,
  ) {
    this.baseUrl = config.externalApiUrl;
    this.logger.debug("JsonPlaceholderAlbumRepository initialized", {
      baseUrl: this.baseUrl,
    });
  }

  async findAll(
    params: AlbumQueryParams = {},
  ): Promise<PaginatedResult<Album>> {
    const { page = 1, limit = 20, search = "" } = params;

    this.logger.info("Fetching albums from JSONPlaceholder", {
      page,
      limit,
      search,
    });

    try {
      const url = `${this.baseUrl}/albums`;
      const allAlbumDtos = await this.httpClient.get<AlbumDto[]>(url);

      this.logger.info(
        `Fetched ${allAlbumDtos.length} albums from JSONPlaceholder`,
      );

      let filteredDtos = allAlbumDtos;
      if (search) {
        const searchLower = search.toLowerCase();
        filteredDtos = allAlbumDtos.filter((dto) =>
          dto.title.toLowerCase().includes(searchLower),
        );
        this.logger.debug(
          `Filtered to ${filteredDtos.length} albums matching search`,
          {
            search,
          },
        );
      }

      const total = filteredDtos.length;
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedDtos = filteredDtos.slice(start, end);

      const albums = paginatedDtos.map((dto) => AlbumMapper.toDomain(dto));

      const hasMore = end < total;

      this.logger.info("Albums fetched and paginated", {
        returned: albums.length,
        page,
        total,
        hasMore,
      });

      return {
        data: albums,
        pagination: {
          page,
          limit,
          total,
          hasMore,
        },
      };
    } catch (error) {
      this.logger.error("Failed to fetch albums", error as Error);
      throw error;
    }
  }

  async findById(id: number): Promise<Album | null> {
    this.logger.info(`Fetching album ${id} from JSONPlaceholder`);

    try {
      const url = `${this.baseUrl}/albums/${id}`;
      const dto = await this.httpClient.get<AlbumDto>(url);

      this.logger.info(`Fetched album ${id} from JSONPlaceholder`);

      return AlbumMapper.toDomain(dto);
    } catch (error) {
      const err = error as any;
      if (err.statusCode === 404 || err.details?.status === 404) {
        this.logger.info(`Album ${id} not found in JSONPlaceholder`);
        return null;
      }

      this.logger.error(`Failed to fetch album ${id}`, error as Error);
      throw error;
    }
  }
}
