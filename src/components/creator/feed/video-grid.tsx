"use client";

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

interface VideoGridProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
}

export function VideoGrid({ videos, onVideoClick }: VideoGridProps) {
  return (
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
  );
}
