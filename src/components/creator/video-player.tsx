"use client";

import React, {
  useCallback,
  useEffect,
  useState
} from "react";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import {
  Heart,
  MessageCircle,
  MoreVertical,
  Share,
  X
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HLSVideoPlayer } from "@/components/user-ui/hls-video-player";

import { api } from "@/lib/convex-api";

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

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
}

const VideoPlayer = React.memo(function VideoPlayer({
  video,
  onClose,
}: VideoPlayerProps) {
  const { user } = useUser();

  // Early return if video is not provided
  if (!video) {
    return null;
  }

  const [likesCount, setLikesCount] = useState(
    typeof video.likes === "number"
      ? video.likes
      : parseInt(video.likes as string) || 0
  );

  // Get the actual file URL from Convex
  const fileUrl = useQuery(api.videoFeeds.getFileUrl, {
    fileId: video.videoFileId as any,
  });

  // Check if user has liked this video
  const isLiked = useQuery(
    api.videoFeeds.checkUserLike,
    user
      ? {
        videoId: video._id as any,
        userId: user.id,
      }
      : "skip"
  );

  // Mutations
  const toggleLikeMutation = useMutation(api.videoFeeds.toggleLike);
  const incrementViewsMutation = useMutation(api.videoFeeds.incrementViews);

  // Only support DB videos now

  const handleLike = useCallback(async () => {
    if (!user) return;

    try {
      const result = await toggleLikeMutation({
        videoId: video._id as any,
        userId: user.id,
      });

      if (result) {
        setLikesCount(result.count);
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  }, [user, video._id, toggleLikeMutation]);



  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Video Container */}
      <div className="relative flex h-full items-center justify-center">
        {/* Video */}
        <div
          className={`relative mx-auto w-full max-w-sm bg-black transition-opacity duration-150 ${video.aspectRatio === "16:9" ? "aspect-video" : "aspect-[9/16]"}`}
        >
          {fileUrl ? (
            <HLSVideoPlayer
              key={video._id}
              videoId={video._id}
              fallbackUrl={fileUrl}
              title={video.title}
              autoPlay
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="text-center text-white">
                <div className="mb-4 text-6xl">🎬</div>
                <p className="text-lg">{video.title}</p>
                <p className="mt-2 text-sm opacity-70">{video.duration}</p>
              </div>
            </div>
          )}
        </div>

        {/* Video Info & Actions */}
        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-end justify-between">
            {/* Video Info */}
            <div className="mr-4 flex-1">
              <div className="mb-2 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-emerald-500 text-white">
                    {video.creatorAvatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">{video.creatorName}</p>
                  <p className="text-sm text-white/70">
                    {typeof video.uploadedAt === "number"
                      ? new Date(video.uploadedAt).toLocaleDateString()
                      : video.uploadedAt}
                  </p>
                </div>
              </div>
              <p className="mb-2 text-sm text-white">{video.title}</p>
              <div className="flex items-center gap-4 text-sm text-white/70">
                <span>
                  {typeof video.views === "number"
                    ? video.views.toLocaleString()
                    : video.views}{" "}
                  views
                </span>
                <span>•</span>
                <span>{video.category}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleLike}
                className="flex flex-col items-center text-white transition-colors hover:text-red-500"
              >
                <Heart
                  className={`h-6 w-6 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                />
                <span className="mt-1 text-xs">
                  {likesCount.toLocaleString()}
                </span>
              </button>

              <button className="flex flex-col items-center text-white transition-colors hover:text-blue-500">
                <MessageCircle className="h-6 w-6" />
                <span className="mt-1 text-xs">
                  {typeof video.comments === "number"
                    ? video.comments.toLocaleString()
                    : video.comments}
                </span>
              </button>

              <button className="flex flex-col items-center text-white transition-colors hover:text-green-500">
                <Share className="h-6 w-6" />
                <span className="mt-1 text-xs">
                  {typeof video.shares === "number"
                    ? video.shares.toLocaleString()
                    : video.shares}
                </span>
              </button>

              <button className="flex flex-col items-center text-white transition-colors hover:text-gray-300">
                <MoreVertical className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export { VideoPlayer };

