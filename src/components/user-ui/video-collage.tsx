"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import "./animations/video-collage.css";

interface VideoItem {
  aspect: string;
  title: string;
  subtitle: string;
  vertical?: boolean;
  videoSrc?: string;
}

interface VideoCollageProps {
  videos: VideoItem[];
  className?: string;
  floating?: boolean;
}

export function VideoCollage({
  videos,
  className,
  floating = true,
}: VideoCollageProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid h-96 grid-cols-3 gap-4 lg:h-[500px]",
        floating && "floating",
        className
      )}
    >
      {videos.map((video, index) => (
        <div
          key={index}
          className={cn(
            "video-collage-item video-collage-container video-collage-glass flex cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-4 text-center text-white backdrop-blur-md",
            video.vertical && "row-span-2"
          )}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative flex h-full w-full flex-col items-center justify-center">
            {/* Video Element */}
            {video.videoSrc && (
              <video
                className="video-collage-video absolute inset-0 z-20 h-full w-full rounded-3xl object-cover"
                muted
                loop
                playsInline
                autoPlay
              >
                <source src={video.videoSrc} type="video/mp4" />
              </video>
            )}

            {/* Subtle Glass Effect Background */}
            <div
              className="absolute inset-0 z-10 rounded-3xl transition-all duration-700"
              style={{
                background:
                  hoveredIndex === index
                    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 100%)"
                    : "linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 50%, transparent 100%)",
              }}
            />

            {/* Subtle Glass Pattern Overlay */}
            <div className="absolute inset-0 rounded-3xl">
              <div className="h-full w-full bg-gradient-to-br from-white/5 via-transparent to-white/3" />
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-transparent via-white/2 to-transparent opacity-30" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
