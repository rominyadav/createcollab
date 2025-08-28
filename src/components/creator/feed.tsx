"use client";

import { useEffect, useState } from "react";

import videosData from "@/components/mock-data/videos-mockdata.json";

import { EmptyState, EndOfContent, LoadingState } from "./feed/loading-state";
import { VideoGrid } from "./feed/video-grid";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: string;
  likes: string;
  comments: string;
  shares: string;
  creatorId: number;
  creatorName: string;
  creatorAvatar: string;
  uploadedAt: string;
  aspectRatio: string;
  category: string;
}

interface FeedProps {
  onVideoClick: (video: Video) => void;
}

const allVideos: Video[] = videosData as Video[];

export function Feed({ onVideoClick }: FeedProps) {
  const [videos, setVideos] = useState<Video[]>(allVideos.slice(0, 6));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(allVideos.length > 6);

  const loadMoreVideos = () => {
    if (!hasMore || loading) return;

    setLoading(true);
    setTimeout(() => {
      const isDesktop = window.innerWidth >= 768;
      const videosToAdd = isDesktop ? 12 : 6;
      const currentLength = videos.length;
      const remainingVideos = allVideos.slice(
        currentLength,
        currentLength + videosToAdd
      );

      if (remainingVideos.length > 0) {
        setVideos((prev) => [...prev, ...remainingVideos]);
        setHasMore(currentLength + remainingVideos.length < allVideos.length);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Trigger load more when user is within 200px of bottom
      if (scrollTop + windowHeight >= documentHeight - 200 && !loading) {
        loadMoreVideos();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, loadMoreVideos]);

  // Load more videos initially if screen is large and needs more content
  useEffect(() => {
    const checkIfNeedMoreContent = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // If content doesn't fill the screen, load more
      if (documentHeight <= windowHeight && !loading && hasMore) {
        loadMoreVideos();
      }
    };

    // Check after initial render and when videos change
    const timer = setTimeout(checkIfNeedMoreContent, 100);
    return () => clearTimeout(timer);
  }, [videos, loading, hasMore, loadMoreVideos]);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 p-4 backdrop-blur-sm dark:border-slate-600 dark:bg-slate-800/95">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Feed
        </h1>
      </div>

      {/* Video Grid */}
      <div className="p-2 sm:p-4 md:p-6">
        <VideoGrid videos={videos} onVideoClick={onVideoClick} />
      </div>

      {/* Loading State */}
      {loading && <LoadingState />}

      {/* End of Content */}
      {!hasMore && videos.length > 0 && <EndOfContent />}

      {/* Empty State */}
      {videos.length === 0 && !loading && <EmptyState />}
    </div>
  );
}
