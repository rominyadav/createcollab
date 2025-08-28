"use client";

import { useState } from "react";

import { CheckCircle, Clock, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Campaign, CampaignCard } from "../shared";

interface MyCampaign extends Campaign {
  joinedDate: string;
  deadline: string;
  progress: number;
  completedDeliverables: string[];
}

interface MyCampaignsProps {
  onViewCampaign: (campaign: MyCampaign) => void;
}

const mockMyCampaigns: MyCampaign[] = [
  {
    id: 1,
    title: "Summer Fashion Collection Launch",
    description:
      "Promote our new summer collection with authentic styling videos",
    brandName: "StyleHub Fashion",
    brandLogo: "SH",
    price: 5000,
    currency: "NPR",
    createdDate: "2024-01-15",
    validTillDate: "2024-02-15",
    creatorsSlotRemaining: 3,
    totalSlots: 10,
    category: "Fashion",
    requirements: ["Minimum 10K followers", "Fashion niche creators only"],
    deliverables: ["1 Instagram Reel", "1 TikTok video", "Story mentions"],
    status: "active",
    joinedDate: "2024-01-20",
    deadline: "2024-02-15",
    progress: 60,
    completedDeliverables: ["1 Instagram Reel", "Story mentions"],
  },
  {
    id: 2,
    title: "Tech Product Review Campaign",
    description: "Review our latest smartphone with detailed features showcase",
    brandName: "TechCorp Inc.",
    brandLogo: "TC",
    price: 8000,
    currency: "NPR",
    createdDate: "2024-01-15",
    validTillDate: "2024-02-10",
    creatorsSlotRemaining: 5,
    totalSlots: 8,
    category: "Technology",
    requirements: ["Tech reviewers preferred", "Minimum 5K followers"],
    deliverables: [
      "1 detailed review video",
      "Unboxing content",
      "Feature highlights",
    ],
    status: "completed",
    joinedDate: "2024-01-15",
    deadline: "2024-02-10",
    progress: 100,
    completedDeliverables: [
      "1 detailed review video",
      "Unboxing content",
      "Feature highlights",
    ],
  },
];

export function MyCampaigns({ onViewCampaign }: MyCampaignsProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const statusOptions = ["all", "active", "completed", "pending", "rejected"];

  const filteredCampaigns = mockMyCampaigns.filter(
    (campaign) => selectedStatus === "all" || campaign.status === selectedStatus
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="pb-20 md:pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
        <h1 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
          My Campaigns
        </h1>

        {/* Status Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {statusOptions.map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus(status)}
              className="whitespace-nowrap"
            >
              {status === "all"
                ? "All"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4 p-4">
        {filteredCampaigns.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mb-4 text-4xl">📋</div>
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              No campaigns found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedStatus === "all"
                ? "You haven't joined any campaigns yet"
                : `No ${selectedStatus} campaigns found`}
            </p>
          </div>
        ) : (
          filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onViewCampaign={onViewCampaign}
              showProgress={true}
              progress={campaign.progress}
            />
          ))
        )}
      </div>
    </div>
  );
}
