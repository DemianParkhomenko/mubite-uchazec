import { Album as IAlbum } from "@mubite/shared-types";

export type Album = IAlbum;

export class AlbumFactory {
  static create(id: number, userId: number, title: string): Album {
    if (id <= 0) {
      throw new Error("Album ID must be positive");
    }
    if (userId <= 0) {
      throw new Error("User ID must be positive");
    }
    if (!title || title.trim().length === 0) {
      throw new Error("Album title cannot be empty");
    }

    return {
      id,
      userId,
      title: title.trim(),
    };
  }
}
