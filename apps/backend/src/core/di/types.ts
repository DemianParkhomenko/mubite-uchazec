export const TYPES = {
  Logger: Symbol.for("Logger"),
  Config: Symbol.for("Config"),

  HttpClient: Symbol.for("HttpClient"),

  AlbumRepository: Symbol.for("AlbumRepository"),
  AlbumApplicationService: Symbol.for("AlbumApplicationService"),
  GetAlbumsUseCase: Symbol.for("GetAlbumsUseCase"),
  GetAlbumByIdUseCase: Symbol.for("GetAlbumByIdUseCase"),
  AlbumController: Symbol.for("AlbumController"),
};
