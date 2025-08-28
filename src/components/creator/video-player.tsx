"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ChevronDown,
  ChevronUp,
  Heart,
  MessageCircle,
  MoreVertical,
  Share,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

interface VideoPlayerProps {
  videos: Video[];
  currentIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const VideoPlayer = React.memo(function VideoPlayer({
  videos,
  currentIndex,
  onClose,
  onIndexChange,
}: VideoPlayerProps) {
  const [isLiked, setIsLiked] = useState(false);
  const currentVideo = videos[currentIndex];

  const getYouTubeEmbedUrl = useCallback((url: string) => {
    const videoId = url.match(
      /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&\n?#]+)/
    );
    return videoId
      ? `https://www.youtube.com/embed/${videoId[1]}?autoplay=1&rel=0&modestbranding=1`
      : null;
  }, []);

  const getTikTokEmbedUrl = useCallback((url: string) => {
    const videoId = url.match(/\/video\/(\d+)/);
    return videoId ? `https://www.tiktok.com/embed/v2/${videoId[1]}` : null;
  }, []);

  const videoData = useMemo(() => {
    const isYouTubeVideo =
      currentVideo.videoUrl.includes("youtube.com") ||
      currentVideo.videoUrl.includes("youtu.be");
    const isTikTokVideo = currentVideo.videoUrl.includes("tiktok.com");

    const embedUrl = isYouTubeVideo
      ? getYouTubeEmbedUrl(currentVideo.videoUrl)
      : isTikTokVideo
        ? getTikTokEmbedUrl(currentVideo.videoUrl)
        : null;

    return { isYouTubeVideo, isTikTokVideo, embedUrl };
  }, [currentVideo.videoUrl, getYouTubeEmbedUrl, getTikTokEmbedUrl]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  }, [currentIndex, onIndexChange]);

  const handleNext = useCallback(() => {
    if (currentIndex < videos.length - 1) {
      onIndexChange(currentIndex + 1);
    }
  }, [currentIndex, videos.length, onIndexChange]);

  const handleLike = useCallback(() => {
    setIsLiked(!isLiked);
  }, [isLiked]);

  // Preload adjacent videos
  useEffect(() => {
    const preloadVideo = (index: number) => {
      if (index >= 0 && index < videos.length) {
        const video = videos[index];
        if (
          video.videoUrl.includes("youtube.com") ||
          video.videoUrl.includes("youtu.be")
        ) {
          const videoId = video.videoUrl.match(
            /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&\n?#]+)/
          );
          if (videoId) {
            const link = document.createElement("link");
            link.rel = "prefetch";
            link.href = `https://www.youtube.com/embed/${videoId[1]}`;
            document.head.appendChild(link);
          }
        }
      }
    };

    // Preload next and previous videos
    preloadVideo(currentIndex + 1);
    preloadVideo(currentIndex - 1);
  }, [currentIndex, videos]);

  useEffect(() => {
    let touchStartY = 0;
    let isSwiping = false;
    let wheelTimeout: NodeJS.Timeout | null = null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (wheelTimeout) return;

      wheelTimeout = setTimeout(() => {
        wheelTimeout = null;
      }, 300);

      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      isSwiping = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwiping) {
        const currentY = e.touches[0].clientY;
        const deltaY = Math.abs(touchStartY - currentY);
        if (deltaY > 10) {
          isSwiping = true;
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isSwiping) {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;

        if (Math.abs(deltaY) > 50) {
          if (deltaY > 0) {
            handleNext();
          } else {
            handlePrevious();
          }
        }
      }
      isSwiping = false;
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.body.style.overflow = "";
      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }
    };
  }, [handleNext, handlePrevious, onClose]);

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
          className={`relative mx-auto w-full max-w-sm bg-black transition-opacity duration-150 ${
            currentVideo.aspectRatio === "16:9"
              ? "aspect-video"
              : "aspect-[9/16]"
          }`}
        >
          {(videoData.isYouTubeVideo || videoData.isTikTokVideo) &&
          videoData.embedUrl ? (
            <iframe
              key={currentVideo.id}
              src={videoData.embedUrl}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="eager"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="text-center text-white">
                <div className="mb-4 text-6xl">🎬</div>
                <p className="text-lg">{currentVideo.title}</p>
                <p className="mt-2 text-sm opacity-70">
                  {currentVideo.duration}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 right-4 flex -translate-y-1/2 transform flex-col gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="text-white hover:bg-white/20 disabled:opacity-30"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex === videos.length - 1}
            className="text-white hover:bg-white/20 disabled:opacity-30"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>

        {/* Video Info & Actions */}
        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-end justify-between">
            {/* Video Info */}
            <div className="mr-4 flex-1">
              <div className="mb-2 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-emerald-500 text-white">
                    {currentVideo.creatorAvatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">
                    {currentVideo.creatorName}
                  </p>
                  <p className="text-sm text-white/70">
                    {currentVideo.uploadedAt}
                  </p>
                </div>
              </div>
              <p className="mb-2 text-sm text-white">{currentVideo.title}</p>
              <div className="flex items-center gap-4 text-sm text-white/70">
                <span>{currentVideo.views} views</span>
                <span>•</span>
                <span>{currentVideo.category}</span>
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
                <span className="mt-1 text-xs">{currentVideo.likes}</span>
              </button>

              <button className="flex flex-col items-center text-white transition-colors hover:text-blue-500">
                <MessageCircle className="h-6 w-6" />
                <span className="mt-1 text-xs">{currentVideo.comments}</span>
              </button>

              <button className="flex flex-col items-center text-white transition-colors hover:text-green-500">
                <Share className="h-6 w-6" />
                <span className="mt-1 text-xs">{currentVideo.shares}</span>
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
