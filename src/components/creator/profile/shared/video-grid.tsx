"use client";

import { Play } from "lucide-react";

interface Video {
  id: number;
  title: string;
  duration: string;
  views: string;
  uploadedAt?: string;
  campaignName?: string;
}

interface VideoGridProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
  type: "public" | "campaign";
}

export function VideoGrid({ videos, onVideoClick, type }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-4xl">🎬</div>
        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
          No {type} videos yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {type === "public"
            ? "Start creating and uploading your content"
            : "Complete campaigns to see your campaign videos here"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {videos.map((video) => (
        <div
          key={video.id}
          className="group relative aspect-[9/16] cursor-pointer bg-gray-100 dark:bg-slate-700"
          onClick={() => onVideoClick(video)}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-600 dark:to-slate-700">
            <div className="text-center">
              <div className="mb-1 text-2xl">🎬</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {video.duration}
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
            <Play className="h-6 w-6 text-white" />
          </div>

          <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent p-2">
            <p className="mb-1 line-clamp-2 text-xs text-white">
              {video.title}
            </p>
            {type === "campaign" && video.campaignName && (
              <p className="mb-1 text-xs text-emerald-400">
                {video.campaignName}
              </p>
            )}
            <div className="flex items-center gap-2 text-xs text-white">
              <span>{video.views}</span>
              {video.uploadedAt && (
                <>
                  <span>•</span>
                  <span>{video.uploadedAt}</span>
                </>
              )}
            </div>
          </div>

          <div className="absolute top-2 right-2 rounded bg-black/70 px-1 py-0.5 text-xs text-white">
            {video.duration}
          </div>

          {type === "campaign" && (
            <div className="absolute top-2 left-2 rounded bg-emerald-500 px-1 py-0.5 text-xs text-white">
              Campaign
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
