"use client";

import { useState } from "react";

import { Creator } from "@/components/mock-data/creator-mockdata";

import { Chats } from "./chats";
import { ExploreCampaigns } from "./explore-campaigns";
import { Feed } from "./feed";
import { MobileNav } from "./mobile-nav";
import { MyCampaigns } from "./my-campaigns";
import { Profile } from "./profile";
import { Upload } from "./upload";
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

const mockVideos: Video[] = [
  {
    id: 1,
    title: "Summer Fashion Trends 2024",
    thumbnail: "/api/placeholder/300/400",
    videoUrl: "/api/placeholder/video/1",
    duration: "2:15",
    views: "15.2K",
    likes: "2.1K",
    comments: "342",
    shares: "89",
    creatorId: 1,
    creatorName: "Sarah Johnson",
    creatorAvatar: "SJ",
    uploadedAt: "2 days ago",
    aspectRatio: "9:16",
    category: "Fashion",
  },
  {
    id: 2,
    title: "iPhone 15 Pro Review",
    thumbnail: "/api/placeholder/300/400",
    videoUrl: "/api/placeholder/video/2",
    duration: "8:45",
    views: "12.3K",
    likes: "1.8K",
    comments: "256",
    shares: "67",
    creatorId: 2,
    creatorName: "Mike Chen",
    creatorAvatar: "MC",
    uploadedAt: "3 days ago",
    aspectRatio: "9:16",
    category: "Tech",
  },
  {
    id: 3,
    title: "Morning Routine 2024",
    thumbnail: "/api/placeholder/300/400",
    videoUrl: "/api/placeholder/video/3",
    duration: "12:30",
    views: "28.9K",
    likes: "4.2K",
    comments: "512",
    shares: "156",
    creatorId: 3,
    creatorName: "Emma Wilson",
    creatorAvatar: "EW",
    uploadedAt: "1 day ago",
    aspectRatio: "9:16",
    category: "Lifestyle",
  },
];

export function CreatorDashboard({ creator }: CreatorDashboardProps) {
  const [activeTab, setActiveTab] = useState("feed");
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showUpload, setShowUpload] = useState(false);

  const handleTabChange = (tab: string) => {
    if (tab === "upload") {
      setShowUpload(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handleVideoClick = (video: Video) => {
    const videoIndex = mockVideos.findIndex((v) => v.id === video.id);
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
          videos={mockVideos}
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
