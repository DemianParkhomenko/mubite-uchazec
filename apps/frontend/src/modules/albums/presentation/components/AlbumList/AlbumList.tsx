'use client';

import { Album } from '@mubite/shared-types';
import { AlbumCard } from '../AlbumCard';

interface AlbumListProps {
  albums: Album[];
  searchQuery?: string;
}

export function AlbumList({ albums, searchQuery = '' }: AlbumListProps) {
  if (albums.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} searchQuery={searchQuery} />
      ))}
    </div>
  );
}
