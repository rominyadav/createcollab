"use client";

import { useEffect, useState } from "react";

import { Creator } from "@/components/mock-data/creator-mockdata";

import { ExploreCampaigns } from "./campaigns/explore/explore-campaigns";
import { MyCampaigns } from "./campaigns/my-campaigns/my-campaigns";
import { Chats } from "./chats";
import { Feed } from "./feed";
import { MobileNav } from "./mobile-nav";
import { Profile } from "./profile/components/profile";
import { Upload } from "./upload";
import { storage } from "./utils/storage";
import { VideoPlayer } from "./video-player";
import { Wallet } from "./wallet";

interface CreatorDashboardProps {
  creator: Creator;
}

interface Video {
  _id: string;
  title: string;
  videoUrl: string;
  videoFileId?: string;
  thumbnailUrl?: string;
  duration: string;
  views: string | number;
  likes: string | number;
  comments: string | number;
  shares: string | number;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  uploadedAt: string | number;
  aspectRatio: string;
  category: string;
  type: "public" | "campaign";
  campaignName?: string;
}

export function CreatorDashboard({ creator }: CreatorDashboardProps) {
  const [activeTab, setActiveTab] = useState("feed");
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [appliedCampaigns, setAppliedCampaigns] = useState<number[]>([]);

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
    setCurrentVideo(video);
    setShowVideoPlayer(true);
  };

  const handleCloseVideoPlayer = () => {
    setShowVideoPlayer(false);
    setCurrentVideo(null);
  };

  const handleViewCampaign = (campaign: unknown) => {
    console.log("Viewing campaign:", campaign);
    // In real app, this would navigate to campaign details
  };

  const handleApplyCampaign = (campaignId: number) => {
    setAppliedCampaigns((prev) => [...prev, campaignId]);
    console.log("Applied to campaign:", campaignId);
    // In real app, this would send application to backend
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
            onApplyCampaign={handleApplyCampaign}
            appliedCampaigns={appliedCampaigns}
          />
        );
      case "my-campaigns":
        return <MyCampaigns onViewCampaign={handleViewCampaign} />;
      case "chats":
        return <Chats creatorId={creator.id} />;
      case "wallet":
        if (!creator.verified) {
          return (
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="text-center">
                <div className="mb-4 text-6xl">🔒</div>
                <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Wallet Access Restricted
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Please complete profile verification to access your wallet.
                </p>
              </div>
            </div>
          );
        }
        return <Wallet creatorId={creator.id.toString()} />;
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
    <div className="bg-background min-h-screen">
      {/* Navigation */}
      <MobileNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        creatorName={creator.name}
      />

      {/* Main Content */}
      <main className="overflow-y-auto pb-16 md:ml-64 md:pb-0">
        <div className="w-full">{renderContent()}</div>
      </main>

      {/* Video Player Modal */}
      {showVideoPlayer && currentVideo && (
        <VideoPlayer video={currentVideo} onClose={handleCloseVideoPlayer} />
      )}

      {/* Upload Modal */}
      {showUpload && <Upload onClose={() => setShowUpload(false)} />}
    </div>
  );
}
