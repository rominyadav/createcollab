"use client";

import { useEffect, useRef, useState } from "react";

import Hls from "hls.js";
import {
  Maximize,
  Pause,
  Play,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";

interface HLSVideoPlayerProps {
  videoId?: string;
  hlsUrls?: {
    p360?: string;
    p480?: string;
    p720?: string;
    p1080?: string;
    p1440?: string;
    p2160?: string;
  };
  fallbackUrl?: string;
  title?: string;
  autoPlay?: boolean;
  className?: string;
  // Legacy support
  videoData?: {
    hlsUrls?: {
      p360?: string;
      p480?: string;
      p720?: string;
      p1080?: string;
      p1440?: string;
      p2160?: string;
    };
    videoUrl: string;
    title: string;
    isTranscoded?: boolean;
  };
}

export function HLSVideoPlayer({
  videoId,
  hlsUrls,
  fallbackUrl,
  title,
  autoPlay = false,
  className = "",
  videoData, // Legacy support
}: HLSVideoPlayerProps) {
  // Support both new and legacy prop formats
  const actualHlsUrls = hlsUrls || videoData?.hlsUrls;
  const actualFallbackUrl = fallbackUrl || videoData?.videoUrl;
  const actualTitle = title || videoData?.title;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([100]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [currentQuality, setCurrentQuality] = useState<string>("auto");
  const [availableQualities, setAvailableQualities] = useState<
    Array<{ key: string; label: string; url: string }>
  >([]);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Cleanup previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // Setup available qualities - convert storage IDs to API URLs
    const qualities = [];
    if (actualHlsUrls) {
      if (actualHlsUrls.p2160)
        qualities.push({
          key: "p2160",
          label: "2160p (4K)",
          url: `/api/hls?id=${actualHlsUrls.p2160}`,
        });
      if (actualHlsUrls.p1440)
        qualities.push({
          key: "p1440",
          label: "1440p (2K)",
          url: `/api/hls?id=${actualHlsUrls.p1440}`,
        });
      if (actualHlsUrls.p1080)
        qualities.push({
          key: "p1080",
          label: "1080p (HD)",
          url: `/api/hls?id=${actualHlsUrls.p1080}`,
        });
      if (actualHlsUrls.p720)
        qualities.push({
          key: "p720",
          label: "720p",
          url: `/api/hls?id=${actualHlsUrls.p720}`,
        });
      if (actualHlsUrls.p480)
        qualities.push({
          key: "p480",
          label: "480p",
          url: `/api/hls?id=${actualHlsUrls.p480}`,
        });
      if (actualHlsUrls.p360)
        qualities.push({
          key: "p360",
          label: "360p",
          url: `/api/hls?id=${actualHlsUrls.p360}`,
        });
    }

    if (qualities.length > 0) {
      qualities.unshift({ key: "auto", label: "Auto", url: "" });
      setAvailableQualities(qualities);

      // Auto-select best quality based on screen size
      const screenWidth = window.innerWidth;
      let autoQuality = "p720";
      if (screenWidth >= 3840) autoQuality = "p2160";
      else if (screenWidth >= 2560) autoQuality = "p1440";
      else if (screenWidth >= 1920) autoQuality = "p1080";
      else if (screenWidth >= 1280) autoQuality = "p720";
      else if (screenWidth >= 854) autoQuality = "p480";
      else autoQuality = "p360";

      const selectedQuality =
        qualities.find((q) => q.key === autoQuality) || qualities[1];
      if (selectedQuality && selectedQuality.url) {
        // Use HLS.js for .m3u8 files
        if (Hls.isSupported()) {
          const hls = new Hls();
          hlsRef.current = hls;
          hls.loadSource(selectedQuality.url);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log("HLS manifest loaded");
            if (autoPlay) {
              video.play().catch(() => {});
            }
          });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          // Native HLS support (Safari)
          video.src = selectedQuality.url;
          if (autoPlay) {
            video.play().catch(() => {});
          }
        }
        setCurrentQuality(selectedQuality.key);
      }
    } else if (actualFallbackUrl) {
      // Fallback to original video
      video.src = actualFallbackUrl;
      if (autoPlay) {
        video.play().catch(() => {});
      }
    }

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [actualHlsUrls, actualFallbackUrl, autoPlay]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = value[0];
    video.volume = newVolume / 100;
    setVolume([newVolume]);
    setIsMuted(newVolume === 0);
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const changeQuality = (qualityKey: string) => {
    const video = videoRef.current;
    if (!video) return;

    const quality = availableQualities.find((q) => q.key === qualityKey);
    if (!quality || !quality.url) return;

    const currentTime = video.currentTime;
    const wasPlaying = !video.paused;

    // Cleanup previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // Load new quality with HLS.js
    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(quality.url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.currentTime = currentTime;
        if (wasPlaying) {
          video.play();
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = quality.url;
      video.currentTime = currentTime;
      if (wasPlaying) {
        video.play();
      }
    }

    setCurrentQuality(qualityKey);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-black ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="h-full w-full"
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {showControls && (
        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlay}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>

              <div className="w-20">
                <Slider
                  value={volume}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="w-full"
                />
              </div>

              <span className="text-sm text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {availableQualities.length > 1 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {availableQualities.map((quality) => (
                      <DropdownMenuItem
                        key={quality.key}
                        onClick={() => changeQuality(quality.key)}
                        className={
                          currentQuality === quality.key ? "bg-accent" : ""
                        }
                      >
                        {quality.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {(!actualHlsUrls || Object.keys(actualHlsUrls).length === 0) && (
        <div className="absolute top-2 right-2 rounded bg-yellow-500 px-2 py-1 text-xs text-black">
          Processing...
        </div>
      )}
    </div>
  );
}
