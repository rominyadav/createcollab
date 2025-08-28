"use client";

import { useState } from "react";

import { Globe, Grid, MapPin, Settings, Users, Video } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

import { Creator } from "@/components/mock-data/creator-mockdata";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ProfileHeader } from "../shared/profile-header";
import { VideoGrid } from "../shared/video-grid";

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

  // Mock campaign videos
  const campaignVideos = [
    {
      id: 101,
      title: "StyleHub Fashion Campaign",
      duration: "1:30",
      views: "8.2K",
      campaignName: "Summer Collection",
    },
    {
      id: 102,
      title: "TechCorp Product Review",
      duration: "3:45",
      views: "12.1K",
      campaignName: "Smartphone Launch",
    },
  ];

  return (
    <div className="pb-20 md:pb-8">
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
        <ProfileHeader
          creator={creator}
          campaignVideosCount={campaignVideos.length}
        />

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

          <VideoGrid
            videos={activeTab === "public" ? creator.videos : campaignVideos}
            onVideoClick={onVideoClick}
            type={activeTab}
          />
        </div>
      </div>
    </div>
  );
}
