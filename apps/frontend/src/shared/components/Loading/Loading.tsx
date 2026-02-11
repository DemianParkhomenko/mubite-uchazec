interface LoadingProps {
  variant?: 'full' | 'inline';
}

function SkeletonCard() {
  return (
    <div className="bg-album-card border border-album-border rounded-xl overflow-hidden">
      <div className="h-2 animate-shimmer" />
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-full animate-shimmer" />
          <div className="w-8 h-4 rounded-full animate-shimmer" />
        </div>
        <div className="h-4 rounded animate-shimmer mb-2 w-full" />
        <div className="h-4 rounded animate-shimmer mb-2 w-3/4" />
        <div className="h-3 rounded animate-shimmer w-16 mt-2" />
      </div>
    </div>
  );
}

export function Loading({ variant = 'full' }: LoadingProps) {
  if (variant === 'inline') {
    return (
      <div className="flex items-center justify-center gap-2 py-4">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary-500"
              style={{
                animation: `pulse-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
        <p className="text-foreground/50 text-sm">Loading more...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
