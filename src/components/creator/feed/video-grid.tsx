"use client";

import { VideoCard } from "@/components/user-ui/video-card";

interface Video {
  _id: string;
  title: string;
  videoUrl: string;
  videoFileId?: string;
  thumbnailUrl?: string;
  duration: string;
  views: string | number;
  likes: string | number;
  comments: string | number;
  shares: string | number;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  uploadedAt: string | number;
  aspectRatio: string;
  category: string;
  type: "public" | "campaign";
  campaignName?: string;
}

interface VideoGridProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
}

export function VideoGrid({ videos, onVideoClick }: VideoGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
      {videos.map((video) => (
        <VideoCard
          key={video._id}
          _id={video._id}
          title={video.title}
          duration={video.duration}
          views={video.views}
          creatorName={video.creatorName}
          creatorAvatar={video.creatorAvatar}
          uploadedAt={video.uploadedAt}
          category={video.category}
          campaignName={video.campaignName}
          type={video.type}
          onClick={() => onVideoClick(video)}
        />
      ))}
    </div>
  );
}
