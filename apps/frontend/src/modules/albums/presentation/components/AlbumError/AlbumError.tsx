"use client";

interface AlbumErrorProps {
  error: Error;
}

export function AlbumError({ error }: AlbumErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="max-w-md w-full p-8 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <svg
              className="w-8 h-8 text-error-600 dark:text-error-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-xl font-bold text-error-900 dark:text-error-100">
              Error Loading Albums
            </h2>
          </div>
          <p className="text-error-800 dark:text-error-200">
            {error.message ||
              "An unexpected error occurred while loading albums."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-error-600 hover:bg-error-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
