"use client";

import { useEffect, useRef } from "react";

import { useMutation } from "convex/react";

import { api } from "@/lib/convex-api";

interface VideoPlayerProps {
  videoUrl: string;
  videoId?: string;
  title?: string;
  autoPlay?: boolean;
  controls?: boolean;
  className?: string;
}

export function VideoPlayer({
  videoUrl,
  videoId,
  title,
  autoPlay = false,
  controls = true,
  className = "",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const incrementViews = useMutation(api.videoFeeds.incrementViews);
  const hasIncrementedViews = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      if (videoId && !hasIncrementedViews.current) {
        incrementViews({ id: videoId as any });
        hasIncrementedViews.current = true;
      }
    };

    video.addEventListener("play", handlePlay);
    return () => video.removeEventListener("play", handlePlay);
  }, [videoId, incrementViews]);

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      title={title}
      autoPlay={autoPlay}
      controls={controls}
      className={`h-full w-full object-cover ${className}`}
      playsInline
      preload="metadata"
    >
      Your browser does not support the video tag.
    </video>
  );
}
