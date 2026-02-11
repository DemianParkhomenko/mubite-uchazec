import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { AlbumApplicationService } from "../../application/services";
import { TYPES } from "@/core/di/types";
import { asyncHandler } from "@/shared/utils";
import { AlbumsResponseDto, AlbumResponseDto } from "@mubite/shared-types";

@injectable()
export class AlbumController {
  constructor(
    @inject(TYPES.AlbumApplicationService)
    private albumService: AlbumApplicationService,
  ) {}

  getAlbums = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const search = (req.query.search as string) || "";

      if (page < 1 || limit < 1 || limit > 100) {
        res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message:
              "Invalid pagination parameters. Page must be >= 1, limit must be between 1 and 100.",
            timestamp: new Date().toISOString(),
          },
        });
        return;
      }

      const result = await this.albumService.getAllAlbums({
        page,
        limit,
        search,
      });

      const response: AlbumsResponseDto = {
        success: true,
        data: result.data,
        pagination: result.pagination,
        total: result.pagination.total,
      };

      res.json(response);
    },
  );

  getAlbumById = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid album ID",
            timestamp: new Date().toISOString(),
          },
        });
        return;
      }

      const album = await this.albumService.getAlbumById(id);

      const response: AlbumResponseDto = {
        success: true,
        data: album,
      };

      res.json(response);
    },
  );
}
