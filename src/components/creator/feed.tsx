"use client";

import { useEffect, useState } from "react";

import { useQuery } from "convex/react";

import { PageHeader } from "@/components/user-ui/page-header";

import { api } from "@/lib/convex-api";

import { EmptyState, EndOfContent, LoadingState } from "./feed/loading-state";
import { VideoGrid } from "./feed/video-grid";

interface Video {
  _id: string;
  title: string;
  videoUrl: string;
  videoFileId?: string;
  thumbnailUrl?: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  uploadedAt: number;
  aspectRatio: string;
  category: string;
  type: "public" | "campaign";
  campaignName?: string;
}

interface FeedProps {
  onVideoClick: (video: Video) => void;
}

export function Feed({ onVideoClick }: FeedProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);

  const videoFeedsQuery = useQuery(api.videoFeeds.getVideoFeeds, {
    limit: 10,
    cursor: cursor || undefined,
  });

  // Load initial videos
  useEffect(() => {
    if (videoFeedsQuery && !cursor) {
      const formattedVideos = videoFeedsQuery.videos.map((video) => ({
        ...video,
        views: video.views.toString(),
        likes: video.likes.toString(),
        comments: video.comments.toString(),
        shares: video.shares.toString(),
        uploadedAt: formatUploadedAt(video.uploadedAt),
      }));
      setVideos(formattedVideos);
      setHasMore(!!videoFeedsQuery.nextCursor);
    }
  }, [videoFeedsQuery, cursor]);

  // Load more videos when cursor changes
  useEffect(() => {
    if (videoFeedsQuery && cursor) {
      const formattedVideos = videoFeedsQuery.videos.map((video) => ({
        ...video,
        views: video.views.toString(),
        likes: video.likes.toString(),
        comments: video.comments.toString(),
        shares: video.shares.toString(),
        uploadedAt: formatUploadedAt(video.uploadedAt),
      }));
      setVideos((prev) => [...prev, ...formattedVideos]);
      setHasMore(!!videoFeedsQuery.nextCursor);
      setLoading(false);
    }
  }, [videoFeedsQuery, cursor]);

  const formatUploadedAt = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  const loadMoreVideos = () => {
    if (!hasMore || loading || !videoFeedsQuery?.nextCursor) return;
    setLoading(true);
    setCursor(videoFeedsQuery.nextCursor);
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

  // Prevent pull-to-refresh on mobile
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const touchDelta = touchY - touchStartY;

      // Prevent pull-to-refresh when at top of page and swiping down
      if (touchDelta > 0 && window.scrollY === 0) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <PageHeader title="Feed" />

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
