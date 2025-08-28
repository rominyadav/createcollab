"use client";

import { useEffect, useState } from "react";

import { Creator } from "@/components/mock-data/creator-mockdata";
import videosData from "@/components/mock-data/videos-mockdata.json";

import { Chats } from "./chats";
import { ExploreCampaigns } from "./explore-campaigns";
import { Feed } from "./feed";
import { MobileNav } from "./mobile-nav";
import { MyCampaigns } from "./my-campaigns";
import { Profile } from "./profile";
import { Upload } from "./upload";
import { storage } from "./utils/storage";
import { VideoPlayer } from "./video-player";
import { Wallet } from "./wallet";

interface CreatorDashboardProps {
  creator: Creator;
}

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: string;
  likes: string;
  comments: string;
  shares: string;
  creatorId: number;
  creatorName: string;
  creatorAvatar: string;
  uploadedAt: string;
  aspectRatio: string;
  category: string;
}

const allVideos: Video[] = videosData as Video[];

export function CreatorDashboard({ creator }: CreatorDashboardProps) {
  const [activeTab, setActiveTab] = useState("feed");
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showUpload, setShowUpload] = useState(false);

  // Load saved tab from localStorage on mount
  useEffect(() => {
    const savedTab = storage.get<string>(
      `creator-${creator.id}-active-tab`,
      "feed"
    );
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, [creator.id]);

  const handleTabChange = (tab: string) => {
    if (tab === "upload") {
      setShowUpload(true);
    } else {
      setActiveTab(tab);
      storage.set(`creator-${creator.id}-active-tab`, tab);
    }
  };

  const handleVideoClick = (video: Video) => {
    const videoIndex = allVideos.findIndex((v) => v.id === video.id);
    setCurrentVideoIndex(videoIndex >= 0 ? videoIndex : 0);
    setShowVideoPlayer(true);
  };

  const handleCloseVideoPlayer = () => {
    setShowVideoPlayer(false);
  };

  const handleVideoIndexChange = (index: number) => {
    setCurrentVideoIndex(index);
  };

  const handleViewCampaign = (campaign: unknown) => {
    console.log("Viewing campaign:", campaign);
    // In real app, this would navigate to campaign details
  };

  const handleSettingsClick = () => {
    console.log("Opening settings");
    // In real app, this would navigate to settings
  };

  const renderContent = () => {
    switch (activeTab) {
      case "feed":
        return <Feed onVideoClick={handleVideoClick} />;
      case "explore":
        return (
          <ExploreCampaigns
            isVerified={creator.verified}
            onViewCampaign={handleViewCampaign}
          />
        );
      case "my-campaigns":
        return <MyCampaigns onViewCampaign={handleViewCampaign} />;
      case "chats":
        return <Chats creatorId={creator.id} />;
      case "wallet":
        return <Wallet creatorId={creator.id} />;
      case "profile":
        return (
          <Profile
            creator={creator}
            onSettingsClick={handleSettingsClick}
            onVideoClick={handleVideoClick}
          />
        );
      default:
        return <Feed onVideoClick={handleVideoClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Navigation */}
      <MobileNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content */}
      <main className="overflow-y-auto pb-16 md:ml-64 md:pb-0">
        <div className="w-full">{renderContent()}</div>
      </main>

      {/* Video Player Modal */}
      {showVideoPlayer && (
        <VideoPlayer
          videos={allVideos}
          currentIndex={currentVideoIndex}
          onClose={handleCloseVideoPlayer}
          onIndexChange={handleVideoIndexChange}
        />
      )}

      {/* Upload Modal */}
      {showUpload && <Upload onClose={() => setShowUpload(false)} />}
    </div>
  );
}
