"use client";

import * as React from "react";

import { Play } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { cn } from "@/lib/utils";

interface VideoCardProps {
  id: number;
  title: string;
  duration: string;
  views: string;
  creatorName: string;
  creatorAvatar: string;
  uploadedAt?: string;
  category?: string;
  campaignName?: string;
  type?: "public" | "campaign";
  onClick?: () => void;
  className?: string;
}

export function VideoCard({
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
  return (
    <Card
      className={cn(
        "group relative aspect-[9/16] cursor-pointer overflow-hidden p-0 transition-all duration-200 hover:shadow-md",
        className
      )}
      onClick={onClick}
    >
      {/* Video Thumbnail */}
      <div className="from-muted to-muted/80 absolute inset-0 flex items-center justify-center bg-gradient-to-br">
        <div className="text-center">
          <div className="mb-1 text-3xl sm:text-4xl">🎬</div>
          <div className="text-muted-foreground text-xs font-medium">
            {duration}
          </div>
        </div>
      </div>

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-all duration-200 group-hover:opacity-100">
        <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
          <Play className="h-6 w-6 fill-white text-white sm:h-8 sm:w-8" />
        </div>
      </div>

      {/* Video Info Overlay */}
      <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 sm:p-3">
        <div className="mb-1 flex items-center gap-1.5">
          <Avatar className="h-4 w-4 sm:h-5 sm:w-5">
            <AvatarFallback className="bg-emerald-500 text-xs font-bold text-white">
              {creatorAvatar}
            </AvatarFallback>
          </Avatar>
          <span className="truncate text-xs font-medium text-white sm:text-sm">
            {creatorName}
          </span>
        </div>
        <p className="mb-1 line-clamp-2 text-xs leading-tight font-medium text-white sm:text-sm">
          {title}
        </p>
        {type === "campaign" && campaignName && (
          <p className="mb-1 text-xs font-medium text-emerald-400">
            {campaignName}
          </p>
        )}
        <div className="flex items-center gap-2 text-xs text-white/80">
          <span>{views}</span>
          {uploadedAt && (
            <>
              <span>•</span>
              <span>{uploadedAt}</span>
            </>
          )}
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
  );
}
