"use client";

import { useEffect, useState } from "react";

import { Play } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

// Mock videos data
const mockVideos: Video[] = [
  {
    id: 1,
    title: "Summer Fashion Trends 2024",
    thumbnail: "/api/placeholder/300/400",
    videoUrl: "/api/placeholder/video/1",
    duration: "2:15",
    views: "15.2K",
    likes: "2.1K",
    comments: "342",
    shares: "89",
    creatorId: 1,
    creatorName: "Sarah Johnson",
    creatorAvatar: "SJ",
    uploadedAt: "2 days ago",
    aspectRatio: "9:16",
    category: "Fashion",
  },
  {
    id: 2,
    title: "iPhone 15 Pro Review",
    thumbnail: "/api/placeholder/300/400",
    videoUrl: "/api/placeholder/video/2",
    duration: "8:45",
    views: "12.3K",
    likes: "1.8K",
    comments: "256",
    shares: "67",
    creatorId: 2,
    creatorName: "Mike Chen",
    creatorAvatar: "MC",
    uploadedAt: "3 days ago",
    aspectRatio: "9:16",
    category: "Tech",
  },
  {
    id: 3,
    title: "Morning Routine 2024",
    thumbnail: "/api/placeholder/300/400",
    videoUrl: "/api/placeholder/video/3",
    duration: "12:30",
    views: "28.9K",
    likes: "4.2K",
    comments: "512",
    shares: "156",
    creatorId: 3,
    creatorName: "Emma Wilson",
    creatorAvatar: "EW",
    uploadedAt: "1 day ago",
    aspectRatio: "9:16",
    category: "Lifestyle",
  },
  {
    id: 4,
    title: "Traditional Nepali Momo Recipe",
    thumbnail: "/api/placeholder/300/400",
    videoUrl: "/api/placeholder/video/4",
    duration: "15:30",
    views: "25.6K",
    likes: "3.8K",
    comments: "423",
    shares: "134",
    creatorId: 4,
    creatorName: "Raj Sharma",
    creatorAvatar: "RS",
    uploadedAt: "5 days ago",
    aspectRatio: "9:16",
    category: "Food",
  },
  {
    id: 5,
    title: "Natural Makeup Look Tutorial",
    thumbnail: "/api/placeholder/300/400",
    videoUrl: "/api/placeholder/video/5",
    duration: "8:45",
    views: "18.9K",
    likes: "2.7K",
    comments: "298",
    shares: "78",
    creatorId: 5,
    creatorName: "Priya Shrestha",
    creatorAvatar: "PS",
    uploadedAt: "1 week ago",
    aspectRatio: "9:16",
    category: "Beauty",
  },
  {
    id: 6,
    title: "Style Guide: Casual to Formal",
    thumbnail: "/api/placeholder/300/400",
    videoUrl: "/api/placeholder/video/6",
    duration: "4:32",
    views: "8.7K",
    likes: "1.3K",
    comments: "167",
    shares: "45",
    creatorId: 1,
    creatorName: "Sarah Johnson",
    creatorAvatar: "SJ",
    uploadedAt: "1 week ago",
    aspectRatio: "9:16",
    category: "Fashion",
  },
];

export function Feed({ onVideoClick }: FeedProps) {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [loading, setLoading] = useState(false);

  const loadMoreVideos = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Add more videos based on screen size
      const isDesktop = window.innerWidth >= 768;
      const videosToAdd = isDesktop ? 12 : 6;
      const newVideos = Array.from({ length: videosToAdd }, (_, i) => ({
        ...mockVideos[i % mockVideos.length],
        id: Date.now() + i,
      }));
      setVideos((prev) => [...prev, ...newVideos]);
      setLoading(false);
    }, 1000);
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
  }, [loading]);

  // Load more videos initially if screen is large and needs more content
  useEffect(() => {
    const checkIfNeedMoreContent = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // If content doesn't fill the screen, load more
      if (documentHeight <= windowHeight && !loading && videos.length < 50) {
        loadMoreVideos();
      }
    };

    // Check after initial render and when videos change
    const timer = setTimeout(checkIfNeedMoreContent, 100);
    return () => clearTimeout(timer);
  }, [videos, loading]);

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
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
          {videos.map((video) => (
            <div
              key={`${video.id}-${Math.random()}`}
              className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-all duration-200 hover:shadow-md dark:bg-slate-700"
              onClick={() => onVideoClick(video)}
            >
              {/* Video Thumbnail */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-600 dark:to-slate-700">
                <div className="text-center">
                  <div className="mb-1 text-3xl sm:text-4xl">🎬</div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {video.duration}
                  </div>
                </div>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-all duration-200 group-hover:opacity-100">
                <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                  <Play className="h-6 w-6 fill-white text-white sm:h-8 sm:w-8" />
                </div>
              </div>

              {/* Video Info Overlay */}
              <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 sm:p-3">
                <div className="mb-1 flex items-center gap-1.5">
                  <Avatar className="h-4 w-4 sm:h-5 sm:w-5">
                    <AvatarFallback className="bg-emerald-500 text-xs font-bold text-white">
                      {video.creatorAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate text-xs font-medium text-white sm:text-sm">
                    {video.creatorName}
                  </span>
                </div>
                <p className="mb-1 line-clamp-2 text-xs leading-tight font-medium text-white sm:text-sm">
                  {video.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <span>{video.views}</span>
                  <span>•</span>
                  <span>{video.uploadedAt}</span>
                </div>
              </div>

              {/* Duration Badge */}
              <div className="absolute top-2 right-2 rounded-md bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                {video.duration}
              </div>

              {/* Category Badge */}
              <div className="absolute top-2 left-2 rounded-md bg-emerald-500/90 px-1.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                {video.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"></div>
            <span className="text-sm font-medium">Loading more videos...</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {videos.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 text-6xl">🎬</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            No videos yet
          </h3>
          <p className="max-w-sm text-gray-600 dark:text-gray-400">
            Start following creators or check back later for new content
          </p>
        </div>
      )}
    </div>
  );
}
