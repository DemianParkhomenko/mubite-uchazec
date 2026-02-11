import { Router } from "express";
import { container } from "@/core/di";
import { TYPES } from "@/core/di/types";
import { AlbumController } from "../controllers";

export const createAlbumRoutes = (): Router => {
  const router = Router();
  const controller = container.get<AlbumController>(TYPES.AlbumController);

  router.get("/", controller.getAlbums);

  router.get("/:id", controller.getAlbumById);

  return router;
};
