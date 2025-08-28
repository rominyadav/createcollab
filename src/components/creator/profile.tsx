"use client";

import { useState } from "react";

import {
  Globe,
  Grid,
  MapPin,
  Play,
  Settings,
  Users,
  Video,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

import { Creator } from "@/components/mock-data/creator-mockdata";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileProps {
  creator: Creator;
  onSettingsClick: () => void;
  onVideoClick: (video: unknown) => void;
}

export function Profile({
  creator,
  onSettingsClick,
  onVideoClick,
}: ProfileProps) {
  const [activeTab, setActiveTab] = useState<"public" | "campaign">("public");

  const getSocialIcon = (link: string) => {
    const lowerLink = link.toLowerCase();
    if (lowerLink.includes("facebook"))
      return <FaFacebook className="h-4 w-4 text-blue-600" />;
    if (lowerLink.includes("instagram"))
      return <FaInstagram className="h-4 w-4 text-pink-600" />;
    if (lowerLink.includes("tiktok"))
      return <FaTiktok className="h-4 w-4 text-black dark:text-white" />;
    if (lowerLink.includes("youtube"))
      return <FaYoutube className="h-4 w-4 text-red-600" />;
    return <Globe className="h-4 w-4 text-gray-400" />;
  };

  const getVerificationBadge = () => {
    if (creator.verified) {
      return <Badge className="bg-blue-600 text-white">✓ Verified</Badge>;
    }
    return <Badge variant="outline">Pending Verification</Badge>;
  };

  // Mock campaign videos
  const campaignVideos = [
    {
      id: 101,
      title: "StyleHub Fashion Campaign",
      thumbnail: "/api/placeholder/300/400",
      duration: "1:30",
      views: "8.2K",
      campaignName: "Summer Collection",
    },
    {
      id: 102,
      title: "TechCorp Product Review",
      thumbnail: "/api/placeholder/300/400",
      duration: "3:45",
      views: "12.1K",
      campaignName: "Smartphone Launch",
    },
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Profile
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSettingsClick}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="space-y-6 p-4">
        {/* Profile Header */}
        <div className="text-center">
          <Avatar className="mx-auto mb-4 h-24 w-24">
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-2xl font-bold text-white">
              {creator.avatar}
            </AvatarFallback>
          </Avatar>

          <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
            {creator.name}
          </h2>

          <p className="mb-2 text-gray-600 dark:text-gray-400">
            {creator.niche} Creator
          </p>

          {getVerificationBadge()}

          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {creator.followers}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Followers
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {creator.following}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Following
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {creator.videos.length + campaignVideos.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Videos</p>
            </div>
          </div>
        </div>

        {/* Bio */}
        <Card>
          <CardContent className="p-4">
            <p className="text-center text-gray-700 dark:text-gray-300">
              {creator.bio}
            </p>
          </CardContent>
        </Card>

        {/* Location & Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location
                </span>
              </div>
              <p className="text-sm text-gray-900 dark:text-white">
                {creator.location.city}, {creator.location.country}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Engagement
                </span>
              </div>
              <p className="text-sm text-gray-900 dark:text-white">
                {creator.engagement}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Social Links */}
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-3 font-medium text-gray-900 dark:text-white">
              Social Media
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {creator.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={`https://${link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-gray-200 p-2 transition-colors hover:bg-gray-50 dark:border-slate-600 dark:hover:bg-slate-700"
                >
                  {getSocialIcon(link)}
                  <span className="truncate text-sm text-gray-700 dark:text-gray-300">
                    {link.replace(/^(https?:\/\/)?(www\.)?/, "")}
                  </span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Video Tabs */}
        <div className="space-y-4">
          <div className="flex border-b border-gray-200 dark:border-slate-600">
            <Button
              variant={activeTab === "public" ? "default" : "ghost"}
              onClick={() => setActiveTab("public")}
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500"
            >
              <Grid className="mr-2 h-4 w-4" />
              Public Videos ({creator.videos.length})
            </Button>
            <Button
              variant={activeTab === "campaign" ? "default" : "ghost"}
              onClick={() => setActiveTab("campaign")}
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500"
            >
              <Video className="mr-2 h-4 w-4" />
              Campaign Videos ({campaignVideos.length})
            </Button>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-3 gap-1">
            {activeTab === "public"
              ? creator.videos.map((video) => (
                  <div
                    key={video.id}
                    className="group relative aspect-[9/16] cursor-pointer bg-gray-100 dark:bg-slate-700"
                    onClick={() => onVideoClick(video)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-600 dark:to-slate-700">
                      <div className="text-center">
                        <div className="mb-1 text-2xl">🎬</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {video.duration}
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <Play className="h-6 w-6 text-white" />
                    </div>

                    <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <p className="mb-1 line-clamp-2 text-xs text-white">
                        {video.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-white">
                        <span>{video.views}</span>
                        <span>•</span>
                        <span>{video.uploadedAt}</span>
                      </div>
                    </div>

                    <div className="absolute top-2 right-2 rounded bg-black/70 px-1 py-0.5 text-xs text-white">
                      {video.duration}
                    </div>
                  </div>
                ))
              : campaignVideos.map((video) => (
                  <div
                    key={video.id}
                    className="group relative aspect-[9/16] cursor-pointer bg-gray-100 dark:bg-slate-700"
                    onClick={() => onVideoClick(video)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-600 dark:to-slate-700">
                      <div className="text-center">
                        <div className="mb-1 text-2xl">🎬</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {video.duration}
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <Play className="h-6 w-6 text-white" />
                    </div>

                    <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <p className="mb-1 line-clamp-2 text-xs text-white">
                        {video.title}
                      </p>
                      <p className="mb-1 text-xs text-emerald-400">
                        {video.campaignName}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-white">
                        <span>{video.views}</span>
                      </div>
                    </div>

                    <div className="absolute top-2 right-2 rounded bg-black/70 px-1 py-0.5 text-xs text-white">
                      {video.duration}
                    </div>

                    <div className="absolute top-2 left-2 rounded bg-emerald-500 px-1 py-0.5 text-xs text-white">
                      Campaign
                    </div>
                  </div>
                ))}
          </div>

          {/* Empty State */}
          {((activeTab === "public" && creator.videos.length === 0) ||
            (activeTab === "campaign" && campaignVideos.length === 0)) && (
            <div className="py-12 text-center">
              <div className="mb-4 text-4xl">🎬</div>
              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                No {activeTab} videos yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {activeTab === "public"
                  ? "Start creating and uploading your content"
                  : "Complete campaigns to see your campaign videos here"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
