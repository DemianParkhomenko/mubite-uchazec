import { AlbumDto } from "@mubite/shared-types";
import { Album, AlbumFactory } from "../../domain/entities";

export class AlbumMapper {
  static toDomain(dto: AlbumDto): Album {
    return AlbumFactory.create(dto.id, dto.userId, dto.title);
  }

  static toDto(entity: Album): AlbumDto {
    return {
      id: entity.id,
      userId: entity.userId,
      title: entity.title,
    };
  }

  static toDomainList(dtos: AlbumDto[]): Album[] {
    return dtos.map((dto) => AlbumMapper.toDomain(dto));
  }
}
