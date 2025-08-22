import { useEffect, useState } from "react";

import { Flag, Users, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

import { CampaignVideo } from "./campaign-video";
import { CampaignVideoReview } from "./campaign-video-review";
import { CreatorPublicVideo } from "./creator-public-video";
import { CreatorPublicVideoReview } from "./creator-public-video-review";
import { ReportedVideo } from "./reported-video";
import { ReportedVideoReview } from "./reported-video-review";

// Define interfaces for the video types
interface CampaignVideoType {
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

interface CreatorPublicVideoType {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  creatorName: string;
  creatorAvatar: string;
  creatorFollowers: string;
  creatorLocation: string;
  status: "pending" | "approved" | "rejected";
  uploadedAt: string;
  videoUrl: string;
  videoLayout: "9:16" | "16:9";
  duration: string;
  category: string;
  tags: string[];
}

interface ReportedVideoType {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  creatorName: string;
  creatorAvatar: string;
  creatorFollowers: string;
  creatorLocation: string;
  status: "pending" | "reviewed" | "dismissed" | "hidden";
  uploadedAt: string;
  videoUrl: string;
  videoLayout: "9:16" | "16:9";
  duration: string;
  category: string;
  tags: string[];
  reports: {
    id: number;
    reporterName: string;
    reportDate: string;
    reason: string;
    severity: "low" | "medium" | "high";
  }[];
  firstReportedOn: string;
}

export function VideoModeration() {
  const [activeSection, setActiveSection] = useState<
    "campaign" | "public" | "reported"
  >("campaign");
  const [selectedCampaignVideo, setSelectedCampaignVideo] =
    useState<CampaignVideoType | null>(null);
  const [selectedPublicVideo, setSelectedPublicVideo] =
    useState<CreatorPublicVideoType | null>(null);
  const [selectedReportedVideo, setSelectedReportedVideo] =
    useState<ReportedVideoType | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load active video section from localStorage on component mount
  useEffect(() => {
    setMounted(true);
    const savedVideoSection = localStorage.getItem(
      "video-moderation-active-section"
    );
    if (
      savedVideoSection &&
      ["campaign", "public", "reported"].includes(savedVideoSection)
    ) {
      setActiveSection(savedVideoSection as "campaign" | "public" | "reported");
    }
  }, []);

  // Save active video section to localStorage whenever it changes
  const handleVideoSectionChange = (
    section: "campaign" | "public" | "reported"
  ) => {
    setActiveSection(section);
    if (mounted) {
      // Only save when mounted to prevent hydration issues
      localStorage.setItem("video-moderation-active-section", section);
    }
  };

  const handleCampaignVideoPreview = (video: CampaignVideoType) => {
    setSelectedCampaignVideo(video);
  };

  const handlePublicVideoPreview = (video: CreatorPublicVideoType) => {
    setSelectedPublicVideo(video);
  };

  const handleCampaignVideoApprove = (videoId: number) => {
    console.log(`Campaign video ${videoId} approved`);
    setSelectedCampaignVideo(null);
  };

  const handleCampaignVideoReject = (videoId: number) => {
    console.log(`Campaign video ${videoId} rejected`);
    setSelectedCampaignVideo(null);
  };

  const handlePublicVideoApprove = (videoId: number) => {
    console.log(`Public video ${videoId} approved`);
    setSelectedPublicVideo(null);
  };

  const handlePublicVideoReject = (videoId: number) => {
    console.log(`Public video ${videoId} rejected`);
    setSelectedPublicVideo(null);
  };

  const handleReportedVideoPreview = (video: ReportedVideoType) => {
    setSelectedReportedVideo(video);
  };

  const handleHideVideo = (videoId: number) => {
    console.log(`Video ${videoId} hidden`);
    setSelectedReportedVideo(null);
  };

  const handleDismissReport = (videoId: number) => {
    console.log(`Report for video ${videoId} dismissed`);
    setSelectedReportedVideo(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Video Moderation
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Review and moderate video content from campaigns and creators
        </p>
      </div>

      {/* Section Tabs */}
      <Card className="border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-700">
        <CardHeader>
          <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 dark:bg-slate-600">
            <Button
              variant={activeSection === "campaign" ? "emerald" : "ghost"}
              size="sm"
              onClick={() => handleVideoSectionChange("campaign")}
              className="flex items-center gap-2"
            >
              <Video className="h-4 w-4" />
              Campaign Videos
            </Button>
            <Button
              variant={activeSection === "public" ? "emerald" : "ghost"}
              size="sm"
              onClick={() => handleVideoSectionChange("public")}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Creator Public Videos
            </Button>
            <Button
              variant={activeSection === "reported" ? "emerald" : "ghost"}
              size="sm"
              onClick={() => handleVideoSectionChange("reported")}
              className="flex items-center gap-2"
            >
              <Flag className="h-4 w-4" />
              Reported Videos
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Content Sections */}
      {activeSection === "campaign" ? (
        <CampaignVideo onPreview={handleCampaignVideoPreview} />
      ) : activeSection === "public" ? (
        <CreatorPublicVideo onPreview={handlePublicVideoPreview} />
      ) : (
        <ReportedVideo onPreview={handleReportedVideoPreview} />
      )}

      {/* Campaign Video Review Modal */}
      {selectedCampaignVideo && (
        <CampaignVideoReview
          video={selectedCampaignVideo}
          onApprove={handleCampaignVideoApprove}
          onReject={handleCampaignVideoReject}
          onClose={() => setSelectedCampaignVideo(null)}
        />
      )}

      {/* Creator Public Video Review Modal */}
      {selectedPublicVideo && (
        <CreatorPublicVideoReview
          video={selectedPublicVideo}
          onApprove={handlePublicVideoApprove}
          onReject={handlePublicVideoReject}
          onClose={() => setSelectedPublicVideo(null)}
        />
      )}

      {/* Reported Video Review Modal */}
      {selectedReportedVideo && (
        <ReportedVideoReview
          video={selectedReportedVideo}
          onHideVideo={handleHideVideo}
          onDismissReport={handleDismissReport}
          onClose={() => setSelectedReportedVideo(null)}
        />
      )}
    </div>
  );
}
