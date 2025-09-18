"use client";

import * as React from "react";

import { useQuery } from "convex/react";
import { Play } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { api } from "@/lib/convex-api";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  id?: number;
  _id?: string;
  title: string;
  duration: string;
  views: string | number;
  creatorName: string;
  creatorAvatar: string;
  uploadedAt?: string | number;
  category?: string;
  campaignName?: string;
  type?: "public" | "campaign";
  onClick?: () => void;
  className?: string;
}

const formatUploadedAt = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  return "Just now";
};

export function VideoCard({
  _id,
  title,
  duration,
  views,
  creatorName,
  creatorAvatar,
  uploadedAt,
  category,
  campaignName,
  type,
  onClick,
  className,
}: VideoCardProps) {
  // Get real-time video data for updated counts
  const videoData = useQuery(
    api.videoFeeds.getVideoById,
    _id ? { id: _id as any } : "skip"
  );

  // Get thumbnail URL if available
  const thumbnailUrl = useQuery(
    api.videoFeeds.getFileUrl,
    videoData?.thumbnailFileId ? { fileId: videoData.thumbnailFileId } : "skip"
  );

  // Use real-time data if available, fallback to props
  const displayViews =
    videoData?.views ??
    (typeof views === "number" ? views : parseInt(views as string) || 0);
  return (
    <div
      className={cn(
        "group cursor-pointer transition-all duration-200",
        className
      )}
      onClick={onClick}
    >
      <Card className="relative aspect-[9/16] overflow-hidden p-0 transition-all duration-200 hover:shadow-lg">
        {/* Video Thumbnail */}
        <div className="from-muted to-muted/80 absolute inset-0 flex items-center justify-center bg-gradient-to-br">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="text-center">
              <div className="mb-1 text-3xl sm:text-4xl">🎬</div>
              <div className="text-muted-foreground text-xs font-medium">
                {duration}
              </div>
            </div>
          )}
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-all duration-200 group-hover:opacity-100">
          <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
            <Play className="h-6 w-6 fill-white text-white sm:h-8 sm:w-8" />
          </div>
        </div>

        {/* Video Stats Overlay */}
        <div className="absolute right-2 bottom-2 left-2">
          <div className="flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-1.5 rounded-md bg-black/60 px-2 py-1 backdrop-blur-sm">
              <span>{displayViews.toLocaleString()}</span>
              {uploadedAt && (
                <>
                  <span>•</span>
                  <span>
                    {typeof uploadedAt === "number"
                      ? formatUploadedAt(uploadedAt)
                      : uploadedAt}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Duration Badge */}
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 bg-black/80 text-white hover:bg-black/80"
        >
          {duration}
        </Badge>

        {/* Category/Type Badge */}
        <Badge className="absolute top-2 left-2 bg-emerald-500/90 hover:bg-emerald-500/90">
          {type === "campaign" ? "Campaign" : category || "Public"}
        </Badge>
      </Card>

      {/* Video Metadata Below Thumbnail */}
      <div className="mt-3 space-y-2">
        <h3 className="text-foreground line-clamp-2 text-sm leading-tight font-medium">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-emerald-500 text-xs font-bold text-white">
              {creatorAvatar}
            </AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground truncate text-sm">
            {creatorName}
          </span>
        </div>
        {type === "campaign" && campaignName && (
          <p className="text-xs font-medium text-emerald-600">{campaignName}</p>
        )}
      </div>
    </div>
  );
}
