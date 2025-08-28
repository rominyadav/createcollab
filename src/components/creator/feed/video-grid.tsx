"use client";

import { VideoCard } from "@/components/user-ui/video-card";

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
        <VideoCard
          key={`${video.id}-${Math.random()}`}
          id={video.id}
          title={video.title}
          duration={video.duration}
          views={video.views}
          creatorName={video.creatorName}
          creatorAvatar={video.creatorAvatar}
          uploadedAt={video.uploadedAt}
          category={video.category}
          onClick={() => onVideoClick(video)}
        />
      ))}
    </div>
  );
}
