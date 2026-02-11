'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Album } from '@mubite/shared-types';
import { AlbumList } from '../AlbumList';
import { Loading } from '@/shared/components/Loading';
import { useInfiniteScroll } from '../../hooks';
import { createAlbumService } from '@/core/di';

interface AlbumGalleryProps {
  initialAlbums: Album[];
  initialHasMore: boolean;
}

export function AlbumGallery({ initialAlbums, initialHasMore }: AlbumGalleryProps) {
  const [albums, setAlbums] = useState<Album[]>(initialAlbums);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const isLoadingRef = useRef(false);
  const pageRef = useRef(1);
  const debouncedSearchRef = useRef('');
  const hasMountedRef = useRef(false);

  useEffect(() => { isLoadingRef.current = isLoading; }, [isLoading]);
  useEffect(() => { pageRef.current = page; }, [page]);
  useEffect(() => { debouncedSearchRef.current = debouncedSearch; }, [debouncedSearch]);

  const albumService = useMemo(() => createAlbumService(), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const loadAlbums = useCallback(
    async (pageNum: number, searchQuery: string, reset: boolean = false) => {
      if (isLoadingRef.current) return;

      isLoadingRef.current = true;
      setIsLoading(true);
      try {
        const response = await albumService.getAlbums({
          page: pageNum,
          limit: 20,
          search: searchQuery,
        });

        setAlbums((prev) => (reset ? response.data : [...prev, ...response.data]));
        setHasMore(response.pagination.hasMore);
        setPage(pageNum);
      } catch (error) {
        console.error('Failed to load albums:', error);
      } finally {
        isLoadingRef.current = false;
        setIsLoading(false);
      }
    },
    [albumService]
  );

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    setPage(1);
    pageRef.current = 1;
    setAlbums([]);
    setHasMore(true);
    loadAlbums(1, debouncedSearch, true);
  }, [debouncedSearch, loadAlbums]);

  const loadMore = useCallback(() => {
    if (!isLoadingRef.current) {
      loadAlbums(pageRef.current + 1, debouncedSearchRef.current);
    }
  }, [loadAlbums]);

  const sentinelRef = useInfiniteScroll(loadMore, hasMore, isLoading);

  return (
    <>
      {/* Sticky header with logo + search */}
      <header className="border-b border-album-border bg-album-card/70 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <h1 className="text-xl font-extrabold tracking-tight shrink-0">
              <span className="text-primary-400">Album</span>
              <span className="text-foreground/90">Gallery</span>
            </h1>

            {/* Search */}
            <div className="relative flex-1 max-w-xl">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/35 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search albums..."
                className="w-full h-10 pl-9 pr-9 rounded-lg border border-album-border bg-background/60 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/40 transition-all"
                aria-label="Search albums"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full text-foreground/35 hover:text-foreground/60 hover:bg-foreground/10 transition-colors"
                  aria-label="Clear search"
                  type="button"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Album count */}
            <span className="text-xs text-foreground/35 hidden sm:block shrink-0">
              {albums.length} albums
            </span>
          </div>
        </div>
      </header>

      {/* Album grid */}
      <div className="container mx-auto px-4 py-6">
        <AlbumList albums={albums} searchQuery={debouncedSearch} />

        {hasMore && (
          <div ref={sentinelRef} className="flex justify-center py-8">
            {isLoading && <Loading variant="inline" />}
          </div>
        )}

        {!hasMore && albums.length > 0 && (
          <div className="text-center py-8 text-foreground/40 text-sm">
            All {albums.length} albums loaded
          </div>
        )}

        {!isLoading && albums.length === 0 && search && (
          <div className="text-center py-20">
            <div className="text-4xl mb-3 opacity-30">&#128269;</div>
            <p className="text-foreground/60 text-lg">
              No albums found matching &quot;{search}&quot;
            </p>
            <p className="text-foreground/35 text-sm mt-1">
              Try a different search term
            </p>
          </div>
        )}
      </div>
    </>
  );
}
