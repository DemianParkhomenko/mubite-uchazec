import { injectable, inject } from "inversify";
import { TYPES } from "@/core/di/types";
import { ILogger } from "@mubite/shared-config";
import { IHttpClient } from "../http/HttpClient";
import { PhotoDto } from "@mubite/shared-types";

@injectable()
export class JsonPlaceholderPhotoRepository {
  private photoCache: Map<number, PhotoDto> | null = null;
  private photoMapCache: Map<number, string> | null = null;
  private readonly baseUrl: string;

  constructor(
    @inject(TYPES.HttpClient) private httpClient: IHttpClient,
    @inject(TYPES.Config) config: { externalApiUrl: string },
    @inject(TYPES.Logger) private logger: ILogger,
  ) {
    this.baseUrl = config.externalApiUrl;
  }

  async getFirstPhotoForAlbum(albumId: number): Promise<PhotoDto | null> {
    const photos = await this.getAllPhotos();
    return photos.find((p) => p.albumId === albumId) || null;
  }

  async getAllPhotos(): Promise<PhotoDto[]> {
    if (this.photoCache) {
      this.logger.debug("Returning photos from cache", {
        count: this.photoCache.size,
      });
      return Array.from(this.photoCache.values());
    }

    this.logger.info("Fetching all photos from JSONPlaceholder");
    const url = `${this.baseUrl}/photos`;

    try {
      const photos = await this.httpClient.get<PhotoDto[]>(url);

      this.photoCache = new Map(photos.map((p) => [p.id, p]));

      this.logger.info(`Cached ${photos.length} photos`, {
        count: photos.length,
      });

      return photos;
    } catch (error) {
      this.logger.error(
        "Failed to fetch photos from JSONPlaceholder",
        error as Error,
      );
      throw error;
    }
  }

  async getAlbumPhotoMap(): Promise<Map<number, string>> {
    if (this.photoMapCache) {
      this.logger.debug("Returning album photo map from cache");
      return this.photoMapCache;
    }

    const photos = await this.getAllPhotos();
    const map = new Map<number, string>();

    photos.forEach((photo) => {
      if (!map.has(photo.albumId)) {
        map.set(photo.albumId, photo.thumbnailUrl);
      }
    });

    this.photoMapCache = map;

    this.logger.info("Created album photo map", {
      albumsWithPhotos: map.size,
    });

    return map;
  }

  clearCache(): void {
    this.photoCache = null;
    this.photoMapCache = null;
    this.logger.info("Photo cache cleared");
  }
}
