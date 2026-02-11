import { Container } from "inversify";
import { TYPES } from "./types";
import { ILogger, ConsoleLogger, LogLevel } from "@mubite/shared-config";
import { env } from "../config";

import { IHttpClient } from "../../modules/albums/infrastructure/http/HttpClient";
import { AxiosHttpClient } from "../../modules/albums/infrastructure/http/AxiosHttpClient";
import { IAlbumRepository } from "../../modules/albums/domain/repositories";
import { JsonPlaceholderAlbumRepository } from "../../modules/albums/infrastructure/repositories";
import {
  GetAlbumsUseCase,
  GetAlbumByIdUseCase,
} from "../../modules/albums/application/useCases";
import { AlbumApplicationService } from "../../modules/albums/application/services";
import { AlbumController } from "../../modules/albums/presentation/controllers";

export const createContainer = (): Container => {
  const container = new Container({
    defaultScope: "Singleton",
    autoBindInjectable: true,
  });

  container
    .bind<ILogger>(TYPES.Logger)
    .toDynamicValue(() => {
      return new ConsoleLogger(env.LOG_LEVEL as LogLevel);
    })
    .inSingletonScope();

  container.bind(TYPES.Config).toConstantValue({
    externalApiUrl: env.EXTERNAL_API_URL,
    externalApiTimeout: env.EXTERNAL_API_TIMEOUT,
  });

  container
    .bind<IHttpClient>(TYPES.HttpClient)
    .to(AxiosHttpClient)
    .inSingletonScope();
  container
    .bind<IAlbumRepository>(TYPES.AlbumRepository)
    .to(JsonPlaceholderAlbumRepository)
    .inSingletonScope();

  container
    .bind<GetAlbumsUseCase>(TYPES.GetAlbumsUseCase)
    .to(GetAlbumsUseCase)
    .inSingletonScope();
  container
    .bind<GetAlbumByIdUseCase>(TYPES.GetAlbumByIdUseCase)
    .to(GetAlbumByIdUseCase)
    .inSingletonScope();
  container
    .bind<AlbumApplicationService>(TYPES.AlbumApplicationService)
    .to(AlbumApplicationService)
    .inSingletonScope();

  container
    .bind<AlbumController>(TYPES.AlbumController)
    .to(AlbumController)
    .inSingletonScope();

  return container;
};

export const container = createContainer();
