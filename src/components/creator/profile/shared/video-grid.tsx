"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { VideoCard } from "@/components/user-ui/video-card";

interface Video {
  id: number;
  title: string;
  duration: string;
  views: string;
  uploadedAt?: string;
  campaignName?: string;
  creatorName?: string;
  creatorAvatar?: string;
}

interface VideoGridProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
  type: "public" | "campaign";
  creatorName?: string;
  creatorAvatar?: string;
}

export function VideoGrid({
  videos,
  onVideoClick,
  type,
  creatorName,
  creatorAvatar,
}: VideoGridProps) {
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
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          id={video.id}
          title={video.title}
          duration={video.duration}
          views={video.views}
          creatorName={video.creatorName || creatorName || "Creator"}
          creatorAvatar={video.creatorAvatar || creatorAvatar || "U"}
          uploadedAt={video.uploadedAt}
          campaignName={video.campaignName}
          type={type}
          onClick={() => onVideoClick(video)}
        />
      ))}
    </div>
  );
}
