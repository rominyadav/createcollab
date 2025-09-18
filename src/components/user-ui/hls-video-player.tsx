"use client";

import { useEffect, useRef, useState } from "react";

import { useMutation } from "convex/react";
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

import { api } from "@/lib/convex-api";

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
  videoData,
}: HLSVideoPlayerProps) {
  const actualHlsUrls = hlsUrls || videoData?.hlsUrls;
  const actualFallbackUrl = fallbackUrl || videoData?.videoUrl;

  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([100]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [currentQuality, setCurrentQuality] = useState<string>("auto");
  const [availableQualities, setAvailableQualities] = useState<
    Array<{ key: string; label: string; url: string }>
  >([]);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const incrementViews = useMutation(api.videoFeeds.incrementViews);

  const hideControlsAfterDelay = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  const showControlsAndResetTimer = () => {
    setShowControls(true);
    hideControlsAfterDelay();
  };

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

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [togglePlay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

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
        if (Hls.isSupported()) {
          const hls = new Hls();
          hlsRef.current = hls;
          hls.loadSource(selectedQuality.url);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (autoPlay) video.play().catch(() => {});
          });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = selectedQuality.url;
          if (autoPlay) video.play().catch(() => {});
        }
        setCurrentQuality(selectedQuality.key);
      }
    } else if (actualFallbackUrl) {
      video.src = actualFallbackUrl;
      if (autoPlay) video.play().catch(() => {});
    }

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const updateBuffered = () => {
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("progress", updateBuffered);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("progress", updateBuffered);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [actualHlsUrls, actualFallbackUrl, autoPlay]);

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
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  const changeQuality = (qualityKey: string) => {
    const video = videoRef.current;
    if (!video) return;
    const quality = availableQualities.find((q) => q.key === qualityKey);
    if (!quality || !quality.url) return;

    const currentTime = video.currentTime;
    const wasPlaying = !video.paused;

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(quality.url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.currentTime = currentTime;
        if (wasPlaying) video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = quality.url;
      video.currentTime = currentTime;
      if (wasPlaying) video.play();
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
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg bg-black ${className}`}
      onMouseEnter={showControlsAndResetTimer}
      onMouseMove={showControlsAndResetTimer}
    >
      <div className="relative h-full w-full" onClick={togglePlay}>
        <video
          ref={videoRef}
          className="h-full w-full"
          onPlay={() => {
            setIsPlaying(true);
            if (videoId && !hasTrackedView) {
              incrementViews({ id: videoId as any });
              setHasTrackedView(true);
            }
          }}
          onPause={() => setIsPlaying(false)}
        />
      </div>

      {showControls && (
        <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="mb-4" onClick={(e) => e.stopPropagation()}>
            <div
              className="relative h-2 w-full cursor-pointer rounded-full bg-gray-600"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                const newTime = percent * duration;
                handleSeek([newTime]);
              }}
            >
              {/* Buffered section */}
              <div
                className="absolute h-full rounded-full bg-gray-400"
                style={{
                  width:
                    duration > 0
                      ? `${Math.min((buffered / duration) * 100, 100)}%`
                      : "0%",
                }}
              />
              {/* Played section with luminous effect */}
              <div
                className="absolute h-full rounded-full bg-blue-200 shadow-[0_0_8px_rgba(147,197,253,0.6)]"
                style={{
                  width:
                    duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
                }}
              />
              {/* Seek handle */}
              <div
                className="absolute h-4 w-4 rounded-full bg-white shadow-lg"
                style={{
                  left:
                    duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
                  top: "50%",
                  transform: "translateX(-50%) translateY(-50%)",
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>

              <div className="w-20" onClick={(e) => e.stopPropagation()}>
                <div
                  className="relative h-2 w-full cursor-pointer rounded-full bg-gray-600"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    const newVolume = percent * 100;
                    handleVolumeChange([newVolume]);
                  }}
                >
                  {/* Volume level */}
                  <div
                    className="absolute h-full rounded-full bg-gray-300"
                    style={{ width: `${volume[0]}%` }}
                  />
                  {/* Volume handle */}
                  <div
                    className="absolute h-4 w-4 rounded-full bg-white shadow-lg"
                    style={{
                      left: `${volume[0]}%`,
                      top: "50%",
                      transform: "translateX(-50%) translateY(-50%)",
                    }}
                  />
                </div>
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
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
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
