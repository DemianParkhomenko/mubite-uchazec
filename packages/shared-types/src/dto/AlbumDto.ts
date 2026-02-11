export interface AlbumDto {
  readonly id: number;
  readonly userId: number;
  readonly title: string;
}

export interface PaginationMetaDto {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly hasMore: boolean;
}

export interface AlbumsResponseDto {
  readonly success: boolean;
  readonly data: AlbumDto[];
  readonly pagination: PaginationMetaDto;
  readonly total: number;
}

export interface AlbumResponseDto {
  readonly success: boolean;
  readonly data: AlbumDto;
}
