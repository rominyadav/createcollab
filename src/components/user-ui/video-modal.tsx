"use client";

import { useEffect, useState } from "react";

import { useQuery } from "convex/react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { api } from "@/lib/convex-api";

import { ReactHLSPlayer } from "./react-hls-player";

interface VideoModalProps {
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ videoId, isOpen, onClose }: VideoModalProps) {
  const [mounted, setMounted] = useState(false);

  const videoData = useQuery(
    api.videoFeeds.getVideoById,
    videoId ? { id: videoId as any } : "skip"
  );

  const videoUrl = useQuery(
    api.videoFeeds.getFileUrl,
    videoData?.videoFileId ? { fileId: videoData.videoFileId } : "skip"
  );

  // For transcoded videos, use HLS URLs instead of original video
  const effectiveVideoUrl = videoData?.isTranscoded ? null : videoUrl;

  // Debug logging
  console.log("VideoModal - videoId:", videoId);
  console.log("VideoModal - videoData:", videoData);
  console.log("VideoModal - videoUrl:", videoUrl);
  console.log("VideoModal - hlsUrls:", videoData?.hlsUrls);
  console.log("VideoModal - isTranscoded:", videoData?.isTranscoded);

  // Test HLS URL directly
  if (videoData?.hlsUrls?.p720) {
    console.log("Testing HLS URL:", videoData.hlsUrls.p720);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-black p-0">
        <div className="relative aspect-video">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>

          {videoData ? (
            <ReactHLSPlayer
              videoId={videoId}
              hlsUrls={videoData.hlsUrls}
              fallbackUrl={effectiveVideoUrl}
              title={videoData.title}
              autoPlay={true}
              className="h-full w-full overflow-hidden rounded-lg"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-white">
              <div>Loading video...</div>
            </div>
          )}
        </div>

        {videoData && (
          <div className="p-4 text-white">
            <h2 className="mb-2 text-xl font-semibold">{videoData.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span>{videoData.views.toLocaleString()} views</span>
              <span>•</span>
              <span>{videoData.creatorName}</span>
              <span>•</span>
              <span>{videoData.category}</span>
            </div>
            {videoData.description && (
              <p className="mt-3 text-gray-300">{videoData.description}</p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
