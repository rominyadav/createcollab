import { useRef, useState } from "react";

import {
  Calendar,
  CheckCircle,
  FileText,
  Image as ImageIcon,
  MapPin,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Target,
  Users,
  Volume2,
  VolumeX,
  XCircle,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CampaignVideo {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  campaignType: "Review" | "Unboxing" | "Brand Collaboration" | "Pro";
  campaignTitle: string;
  creatorName: string;
  creatorAvatar: string;
  creatorFollowers: string;
  creatorLocation: string;
  status: "pending" | "approved" | "rejected";
  uploadedAt: string;
  videoUrl: string;
  videoLayout: "9:16" | "16:9";
  duration: string;
}

interface CampaignVideoReviewProps {
  video: CampaignVideo;
  onApprove: (videoId: number) => void;
  onReject: (videoId: number) => void;
  onClose: () => void;
}

export function CampaignVideoReview({
  video,
  onApprove,
  onReject,
  onClose,
}: CampaignVideoReviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Mock thumbnails (in real app, these would be generated from the video)
  const thumbnails = [
    "/api/placeholder/300/400",
    "/api/placeholder/300/400",
    "/api/placeholder/300/400",
    "/api/placeholder/300/400",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getCampaignTypeColor = (type: string) => {
    switch (type) {
      case "Review":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "Unboxing":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
      case "Brand Collaboration":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300";
      case "Pro":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getVideoLayoutIcon = (layout: string) => {
    return layout === "9:16" ? "📱" : "🖥️";
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (isFullscreen) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-start justify-center bg-gradient-to-b from-black/10 via-black/20 to-black/30 p-4 pt-8 backdrop-blur-sm duration-300">
      <div className="animate-in slide-in-from-top-4 relative max-h-[90vh] w-full max-w-7xl scale-100 transform overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 hover:scale-[1.02] dark:border-slate-600 dark:bg-slate-800">
        {/* 3D Depth Effect */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600"></div>
        <div className="relative z-10">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-lg font-semibold text-white">
                  🎬
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Video Review: {video.title}
                  </h2>
                  <p className="text-gray-600 dark:text-slate-300">
                    Campaign: {video.campaignTitle}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(video.status)}>
                  {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                </Badge>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Main Content - Left Column */}
              <div className="space-y-6 lg:col-span-2">
                {/* Video Player */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Play className="h-5 w-5" />
                      Video Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative overflow-hidden rounded-lg bg-black">
                      {/* Video Element */}
                      <video
                        ref={videoRef}
                        className={`w-full ${video.videoLayout === "9:16" ? "mx-auto aspect-[9/16] max-h-[600px]" : "aspect-video"}`}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleTimeUpdate}
                      >
                        <source src={video.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {/* Video Controls Overlay */}
                      <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        {/* Progress Bar */}
                        <div
                          ref={progressRef}
                          className="mb-3 h-2 w-full cursor-pointer rounded-full bg-white/30"
                          onClick={handleProgressClick}
                        >
                          <div
                            className="h-full rounded-full bg-emerald-500 transition-all duration-100"
                            style={{
                              width: `${(currentTime / (videoRef.current?.duration || 1)) * 100}%`,
                            }}
                          />
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={togglePlayPause}
                              className="text-white hover:bg-white/20"
                            >
                              {isPlaying ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                            <span className="text-sm text-white">
                              {formatTime(currentTime)} / {video.duration}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
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
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={toggleFullscreen}
                              className="text-white hover:bg-white/20"
                            >
                              {isFullscreen ? (
                                <Minimize2 className="h-4 w-4" />
                              ) : (
                                <Maximize2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Video Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <FileText className="h-5 w-5" />
                      Video Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {video.title}
                      </h3>
                      <p className="leading-relaxed text-gray-700 dark:text-slate-300">
                        {video.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {getVideoLayoutIcon(video.videoLayout)}
                        </span>
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
                            Video Layout
                          </label>
                          <p className="text-sm text-gray-900 dark:text-white">
                            {video.videoLayout}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400 dark:text-slate-500" />
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
                            Uploaded
                          </label>
                          <p className="text-sm text-gray-900 dark:text-white">
                            {video.uploadedAt}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Thumbnail Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <ImageIcon className="h-5 w-5" />
                      Choose Thumbnail
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-3">
                      {thumbnails.map((thumbnail, index) => (
                        <div
                          key={index}
                          className={`relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                            selectedThumbnail === index
                              ? "border-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-800"
                              : "border-gray-200 hover:border-gray-300 dark:border-slate-600 dark:hover:border-slate-500"
                          }`}
                          onClick={() => setSelectedThumbnail(index)}
                        >
                          <div className="flex aspect-[9/16] w-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-600 dark:to-slate-500">
                            <div className="text-center">
                              <div className="mb-1 text-2xl">🎬</div>
                              <div className="text-xs text-gray-500 dark:text-slate-400">
                                Thumbnail {index + 1}
                              </div>
                            </div>
                          </div>
                          {selectedThumbnail === index && (
                            <div className="absolute top-2 right-2 rounded-full bg-emerald-500 p-1 text-white">
                              <CheckCircle className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Campaign Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      Campaign Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-gray-400 dark:text-slate-500" />
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
                          Campaign Type
                        </label>
                        <Badge
                          className={getCampaignTypeColor(video.campaignType)}
                        >
                          {video.campaignType}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
                        Campaign Title
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {video.campaignTitle}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Creator Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      Creator Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-sm font-bold text-white">
                          {video.creatorAvatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {video.creatorName}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                          <Users className="h-3 w-3" />
                          <span>{video.creatorFollowers} followers</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                          <MapPin className="h-3 w-3" />
                          <span>{video.creatorLocation}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Video Properties */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      Video Properties
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Layout
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-lg">
                          {getVideoLayoutIcon(video.videoLayout)}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {video.videoLayout}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Duration
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {video.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Status
                      </span>
                      <Badge className={getStatusColor(video.status)}>
                        {video.status.charAt(0).toUpperCase() +
                          video.status.slice(1)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                {video.status === "pending" && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <Button
                          onClick={() => onApprove(video.id)}
                          variant="emerald"
                          className="w-full"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve Video
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => onReject(video.id)}
                          className="w-full"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject Video
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
