"use client";

import { HLSVideoPlayer } from "./hls-video-player";

interface VideoPlayerProps {
  videoUrl: string;
  videoId?: string;
  title?: string;
  autoPlay?: boolean;
  controls?: boolean;
  className?: string;
  hlsUrls?: {
    p360?: string;
    p480?: string;
    p720?: string;
    p1080?: string;
    p1440?: string;
    p2160?: string;
  };
  isTranscoded?: boolean;
}

export function VideoPlayer({
  videoUrl,
  videoId,
  title,
  autoPlay = false,
  className = "",
  hlsUrls,
  isTranscoded = false,
}: VideoPlayerProps) {
  return (
    <HLSVideoPlayer
      videoId={videoId}
      hlsUrls={hlsUrls}
      fallbackUrl={videoUrl}
      title={title}
      autoPlay={autoPlay}
      className={className}
    />
  );
}
