export function LoadingState() {
  return (
    <div className="flex justify-center py-8">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"></div>
        <span className="text-sm font-medium">Loading more videos...</span>
      </div>
    </div>
  );
}

export function EndOfContent() {
  return (
    <div className="flex justify-center py-8">
      <div className="text-center text-gray-500 dark:text-gray-400">
        <div className="mb-2 text-2xl">🎬</div>
        <p className="text-sm font-medium">You&apos;ve reached the end!</p>
        <p className="text-xs">No more videos to load</p>
      </div>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-6xl">🎬</div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        No videos yet
      </h3>
      <p className="max-w-sm text-gray-600 dark:text-gray-400">
        Start following creators or check back later for new content
      </p>
    </div>
  );
}
