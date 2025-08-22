import { useState } from "react";

import { Flag, Users, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

import { CampaignVideo } from "./campaign-video";
import { CampaignVideoReview } from "./campaign-video-review";
import { CreatorPublicVideo } from "./creator-public-video";
import { CreatorPublicVideoReview } from "./creator-public-video-review";
import { ReportedVideo } from "./reported-video";
import { ReportedVideoReview } from "./reported-video-review";

interface ReportedVideo {
  id: number;
  title: string;
  creator: string;
  reports: number;
  reason: string;
  submitted: string;
}

// Mock data - in real app, this would come from props or context
const reportedVideos: ReportedVideo[] = [
  {
    id: 1,
    title: "Product Review - Latest Smartphone",
    creator: "Mike Chen",
    reports: 3,
    reason: "Misleading content",
    submitted: "1 hour ago",
  },
  {
    id: 2,
    title: "Fashion Haul Summer 2025",
    creator: "Sarah Johnson",
    reports: 1,
    reason: "Inappropriate content",
    submitted: "3 hours ago",
  },
];

export function VideoModeration() {
  const [activeSection, setActiveSection] = useState<
    "campaign" | "public" | "reported"
  >("campaign");
  const [selectedCampaignVideo, setSelectedCampaignVideo] = useState<any>(null);
  const [selectedPublicVideo, setSelectedPublicVideo] = useState<any>(null);
  const [selectedReportedVideo, setSelectedReportedVideo] = useState<any>(null);

  const handleAction = (videoId: number, action: "approve" | "remove") => {
    console.log(`Video ${videoId} ${action}d`);
    // In real app, you'd update the state properly
  };

  const handleCampaignVideoPreview = (video: any) => {
    setSelectedCampaignVideo(video);
  };

  const handlePublicVideoPreview = (video: any) => {
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

  const handleReportedVideoPreview = (video: any) => {
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
              onClick={() => setActiveSection("campaign")}
              className="flex items-center gap-2"
            >
              <Video className="h-4 w-4" />
              Campaign Videos
            </Button>
            <Button
              variant={activeSection === "public" ? "emerald" : "ghost"}
              size="sm"
              onClick={() => setActiveSection("public")}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Creator Public Videos
            </Button>
            <Button
              variant={activeSection === "reported" ? "emerald" : "ghost"}
              size="sm"
              onClick={() => setActiveSection("reported")}
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
