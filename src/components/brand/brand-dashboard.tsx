"use client";

import { useEffect, useState } from "react";

import { Creator } from "@/components/mock-data/creator-mockdata";
import videosData from "@/components/mock-data/videos-mockdata.json";

import { Feed } from "../creator/feed";
import { storage } from "../creator/utils/storage";
import { VideoPlayer } from "../creator/video-player";
import { BrandMobileNav } from "./brand-mobile-nav";
import { BrandChats } from "./chats/brand-chats";
import { CreateCampaign } from "./create-campaign/create-campaign";
import { BrandMyCampaigns } from "./my-campaigns/brand-my-campaigns";
import { BrandProfile } from "./profile/brand-profile";
import { CreatorSearch } from "./search/creator-search";
import { BrandUpload } from "./upload/brand-upload";
import { BrandWallet } from "./wallet/brand-wallet";

interface Brand {
  id: number;
  name: string;
  logo: string;
  industry: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  founded: string;
  employees: string;
  revenue: string;
  status: string;
  verified: boolean;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    district: string;
    province: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  adminUsers: Array<{
    id: number;
    creatorId: number;
    name: string;
    email: string;
    role: string;
    phone: string;
    avatar: string;
    isPrimary: boolean;
  }>;
  campaigns: Array<{
    id: number;
    title: string;
    budget: number;
    status: string;
    startDate: string;
    endDate: string;
  }>;
}

interface BrandDashboardProps {
  brand: Brand;
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

export function BrandDashboard({ brand, creator }: BrandDashboardProps) {
  const [activeTab, setActiveTab] = useState("feed");
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  // Load saved tab from localStorage on mount
  useEffect(() => {
    const savedTab = storage.get<string>(
      `brand-${brand.id}-creator-${creator.id}-active-tab`,
      "feed"
    );
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, [brand.id, creator.id]);

  // Prevent pull-to-refresh on mobile
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const touchDelta = touchY - touchStartY;

      // Prevent pull-to-refresh when at top of page and swiping down
      if (touchDelta > 0 && window.scrollY === 0) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const handleTabChange = (tab: string) => {
    if (tab === "create-campaign") {
      setShowCreateCampaign(true);
    } else if (tab === "upload") {
      setShowUpload(true);
    } else {
      setActiveTab(tab);
      storage.set(`brand-${brand.id}-creator-${creator.id}-active-tab`, tab);
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

  const renderContent = () => {
    switch (activeTab) {
      case "feed":
        return <Feed onVideoClick={handleVideoClick} />;
      case "explore":
        return <CreatorSearch brandId={brand.id} />;
      case "my-campaigns":
        return <BrandMyCampaigns brandId={brand.id} />;
      case "chats":
        return <BrandChats brandId={brand.id} creatorId={creator.id} />;
      case "wallet":
        return <BrandWallet brandId={brand.id} />;
      case "profile":
        return <BrandProfile brand={brand} creator={creator} />;
      default:
        return <Feed onVideoClick={handleVideoClick} />;
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Navigation */}
      <BrandMobileNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        brandName={brand.name}
        creatorName={creator.name}
      />

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

      {/* Create Campaign Modal */}
      {showCreateCampaign && (
        <CreateCampaign
          brandId={brand.id}
          onClose={() => setShowCreateCampaign(false)}
        />
      )}

      {/* Brand Upload Modal */}
      {showUpload && (
        <BrandUpload
          brandName={brand.name}
          onClose={() => setShowUpload(false)}
        />
      )}
    </div>
  );
}
