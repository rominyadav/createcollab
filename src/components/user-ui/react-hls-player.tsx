"use client";

import { useRef, useState } from "react";

import {
  Maximize,
  Pause,
  Play,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-react";
import ReactPlayer from "react-player";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";

interface ReactHLSPlayerProps {
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
}

export function ReactHLSPlayer({
  videoId,
  hlsUrls,
  fallbackUrl,
  title,
  autoPlay = false,
  className = "",
}: ReactHLSPlayerProps) {
  const [playing, setPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [currentQuality, setCurrentQuality] = useState("auto");
  const playerRef = useRef<ReactPlayer>(null);

  // Get best available HLS URL
  const getBestHLSUrl = () => {
    if (!hlsUrls) {
      console.log("No HLS URLs available, using fallback:", fallbackUrl);
      return fallbackUrl;
    }

    console.log("Available HLS URLs:", hlsUrls);

    // Priority order: 720p -> 480p -> 360p -> 1080p -> higher
    const selectedUrl =
      hlsUrls.p720 ||
      hlsUrls.p480 ||
      hlsUrls.p360 ||
      hlsUrls.p1080 ||
      hlsUrls.p1440 ||
      hlsUrls.p2160 ||
      fallbackUrl;
    console.log("Selected video URL:", selectedUrl);

    return selectedUrl;
  };

  const videoUrl = getBestHLSUrl();

  // Available qualities
  const availableQualities = [];
  if (hlsUrls) {
    if (hlsUrls.p2160)
      availableQualities.push({
        key: "p2160",
        label: "2160p (4K)",
        url: hlsUrls.p2160,
      });
    if (hlsUrls.p1440)
      availableQualities.push({
        key: "p1440",
        label: "1440p (2K)",
        url: hlsUrls.p1440,
      });
    if (hlsUrls.p1080)
      availableQualities.push({
        key: "p1080",
        label: "1080p (HD)",
        url: hlsUrls.p1080,
      });
    if (hlsUrls.p720)
      availableQualities.push({
        key: "p720",
        label: "720p",
        url: hlsUrls.p720,
      });
    if (hlsUrls.p480)
      availableQualities.push({
        key: "p480",
        label: "480p",
        url: hlsUrls.p480,
      });
    if (hlsUrls.p360)
      availableQualities.push({
        key: "p360",
        label: "360p",
        url: hlsUrls.p360,
      });
  }

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handleSeekChange = (value: number[]) => {
    const seekTo = value[0] / 100;
    setPlayed(seekTo);
    playerRef.current?.seekTo(seekTo);
  };

  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    const player = playerRef.current?.getInternalPlayer();
    if (player && player.requestFullscreen) {
      player.requestFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  console.log("ReactHLSPlayer - videoUrl:", videoUrl);
  console.log("ReactHLSPlayer - hlsUrls:", hlsUrls);
  console.log("ReactHLSPlayer - fallbackUrl:", fallbackUrl);

  if (!videoUrl) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-900 text-white ${className}`}
      >
        <div className="text-center">
          <div className="mb-2 text-4xl">🎬</div>
          <div>Video processing...</div>
          <div className="mt-2 text-xs">No video URL available</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative bg-black ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={playing}
        volume={volume}
        muted={muted}
        width="100%"
        height="100%"
        onProgress={handleProgress}
        onDuration={handleDuration}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={(error) => {
          console.error("ReactPlayer error:", error);
        }}
        onReady={() => {
          console.log("ReactPlayer ready with URL:", videoUrl);
        }}
        config={{
          file: {
            attributes: {
              crossOrigin: "anonymous",
            },
          },
        }}
      />

      {showControls && (
        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={[played * 100]}
              max={100}
              step={0.1}
              onValueChange={handleSeekChange}
              className="w-full"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePlayPause}
                className="text-white hover:bg-white/20"
              >
                {playing ? (
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
                {muted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>

              <div className="w-20">
                <Slider
                  value={[volume * 100]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="w-full"
                />
              </div>

              <span className="text-sm text-white">
                {formatTime(played * duration)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {availableQualities.length > 0 && (
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
                        onClick={() => setCurrentQuality(quality.key)}
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

      {(!hlsUrls || Object.keys(hlsUrls).length === 0) && (
        <div className="absolute top-2 right-2 rounded bg-yellow-500 px-2 py-1 text-xs text-black">
          Processing...
        </div>
      )}
    </div>
  );
}
