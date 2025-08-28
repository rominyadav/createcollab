"use client";

import { useEffect, useState } from "react";

import { Heart, MessageCircle, MoreVertical, Play, Share } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
      setVideos((prev) => [...prev, ...mockVideos.slice(0, 3)]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading
      ) {
        return;
      }
      loadMoreVideos();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="pb-20">
      <div className="grid grid-cols-3 gap-1">
        {videos.map((video) => (
          <div
            key={`${video.id}-${Math.random()}`}
            className="group relative aspect-[9/16] cursor-pointer bg-gray-100 dark:bg-slate-700"
            onClick={() => onVideoClick(video)}
          >
            {/* Video Thumbnail */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-600 dark:to-slate-700">
              <div className="text-center">
                <div className="mb-1 text-2xl">🎬</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {video.duration}
                </div>
              </div>
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
              <Play className="h-8 w-8 text-white" />
            </div>

            {/* Video Info Overlay */}
            <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent p-2">
              <div className="mb-1 flex items-center gap-1">
                <Avatar className="h-4 w-4">
                  <AvatarFallback className="bg-emerald-500 text-xs text-white">
                    {video.creatorAvatar}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate text-xs text-white">
                  {video.creatorName}
                </span>
              </div>
              <p className="mb-1 line-clamp-2 text-xs text-white">
                {video.title}
              </p>
              <div className="flex items-center gap-2 text-xs text-white">
                <span>{video.views}</span>
                <span>•</span>
                <span>{video.uploadedAt}</span>
              </div>
            </div>

            {/* Duration Badge */}
            <div className="absolute top-2 right-2 rounded bg-black/70 px-1 py-0.5 text-xs text-white">
              {video.duration}
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-4">
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-emerald-500"></div>
        </div>
      )}
    </div>
  );
}
