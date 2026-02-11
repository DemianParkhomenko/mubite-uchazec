import { Suspense } from 'react';
import { AlbumGallery } from '@/modules/albums/presentation/components/AlbumGallery';
import { AlbumError } from '@/modules/albums/presentation/components/AlbumError';
import { Loading } from '@/shared/components/Loading';
import { createAlbumService } from '@/core/di';

export const dynamic = 'force-dynamic';

async function AlbumGalleryWrapper() {
  try {
    const albumService = createAlbumService();
    const response = await albumService.getAlbums({ page: 1, limit: 20 });

    return (
      <AlbumGallery
        initialAlbums={response.data}
        initialHasMore={response.pagination.hasMore}
      />
    );
  } catch (error) {
    return <AlbumError error={error as Error} />;
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <Suspense fallback={<Loading />}>
          <AlbumGalleryWrapper />
        </Suspense>
      </main>

      <footer className="border-t border-album-border bg-album-card/30">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-foreground/40">
            <p>MUBITE Testing Challenge</p>
            <p>Built with Next.js 16 &middot; Express &middot; Clean Architecture</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
