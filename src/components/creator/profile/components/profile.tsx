"use client";

import { useState } from "react";

import { Globe, Grid, MapPin, Settings, Users, Video } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/user-ui/page-header";

import { Creator } from "@/types/creator";

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
      <PageHeader
        title="Profile"
        action={{
          icon: Settings,
          onClick: onSettingsClick,
          label: "Settings",
        }}
      />

      <div className="space-y-6 p-4">
        <ProfileHeader
          creator={creator}
          campaignVideosCount={campaignVideos.length}
        />

        {/* Bio */}
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-center">{creator.bio}</p>
          </CardContent>
        </Card>

        {/* Location & Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <MapPin className="text-muted-foreground h-4 w-4" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm">
                {creator.location.city}, {creator.location.country}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Users className="text-muted-foreground h-4 w-4" />
                Engagement
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm">{creator.engagement}</p>
            </CardContent>
          </Card>
        </div>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Social Media</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {creator.socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-auto justify-start gap-2 p-2"
                >
                  <a
                    href={`https://${link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getSocialIcon(link)}
                    <span className="truncate text-sm">
                      {link.replace(/^(https?:\/\/)?(www\.)?/, "")}
                    </span>
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Video Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "public" | "campaign")
          }
          className="space-y-4"
        >
          <TabsList className="bg-muted grid w-full grid-cols-2">
            <TabsTrigger
              value="public"
              className="flex items-center gap-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              <Grid className="h-4 w-4" />
              Public Videos
              <Badge
                variant="secondary"
                className="ml-1 border-0 bg-white/20 text-current"
              >
                {creator.videos.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="campaign"
              className="flex items-center gap-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              <Video className="h-4 w-4" />
              Campaign Videos
              <Badge
                variant="secondary"
                className="ml-1 border-0 bg-white/20 text-current"
              >
                {campaignVideos.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="public" className="space-y-4">
            <VideoGrid
              videos={creator.videos}
              onVideoClick={onVideoClick}
              type="public"
              creatorName={creator.name}
              creatorAvatar={creator.avatar}
            />
          </TabsContent>

          <TabsContent value="campaign" className="space-y-4">
            <VideoGrid
              videos={campaignVideos}
              onVideoClick={onVideoClick}
              type="campaign"
              creatorName={creator.name}
              creatorAvatar={creator.avatar}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
