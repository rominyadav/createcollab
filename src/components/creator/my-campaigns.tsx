"use client";

import { useState } from "react";

import {
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Users,
  XCircle,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface MyCampaign {
  id: number;
  title: string;
  description: string;
  brandName: string;
  brandLogo: string;
  price: number;
  currency: string;
  joinedDate: string;
  deadline: string;
  status: "active" | "completed" | "pending" | "rejected";
  category: string;
  progress: number;
  deliverables: string[];
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
    joinedDate: "2024-01-20",
    deadline: "2024-02-15",
    status: "active",
    category: "Fashion",
    progress: 60,
    deliverables: ["1 Instagram Reel", "1 TikTok video", "Story mentions"],
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
    joinedDate: "2024-01-15",
    deadline: "2024-02-10",
    status: "completed",
    category: "Technology",
    progress: 100,
    deliverables: [
      "1 detailed review video",
      "Unboxing content",
      "Feature highlights",
    ],
    completedDeliverables: [
      "1 detailed review video",
      "Unboxing content",
      "Feature highlights",
    ],
  },
  {
    id: 3,
    title: "Beauty Product Launch",
    description: "Launch our new skincare line with authentic product reviews",
    brandName: "GlowUp Cosmetics",
    brandLogo: "GU",
    price: 6500,
    currency: "NPR",
    joinedDate: "2024-01-25",
    deadline: "2024-02-20",
    status: "pending",
    category: "Beauty & Skincare",
    progress: 0,
    deliverables: [
      "Product review video",
      "Before/after results",
      "Tutorial content",
    ],
    completedDeliverables: [],
  },
];

export function MyCampaigns({ onViewCampaign }: MyCampaignsProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const statusOptions = ["all", "active", "completed", "pending", "rejected"];

  const filteredCampaigns = mockMyCampaigns.filter(
    (campaign) => selectedStatus === "all" || campaign.status === selectedStatus
  );

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

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

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="pb-20">
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
            <Card
              key={campaign.id}
              className="border-gray-200 dark:border-slate-600"
            >
              <CardContent className="p-4">
                {/* Campaign Header */}
                <div className="mb-3 flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-white">
                      {campaign.brandLogo}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {truncateText(campaign.title, 40)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {campaign.brandName}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge
                        className={getStatusColor(campaign.status)}
                        variant="outline"
                      >
                        <div className="flex items-center gap-1">
                          {getStatusIcon(campaign.status)}
                          {campaign.status}
                        </div>
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {campaign.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {campaign.currency} {campaign.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Campaign Info */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Joined:{" "}
                      {new Date(campaign.joinedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>
                      Deadline:{" "}
                      {new Date(campaign.deadline).toLocaleDateString()}
                      {campaign.status === "active" && (
                        <span className="ml-2 text-orange-600 dark:text-orange-400">
                          ({getDaysRemaining(campaign.deadline)} days left)
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                {campaign.status !== "rejected" && (
                  <div className="mb-4">
                    <div className="mb-1 flex justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>Progress</span>
                      <span>{campaign.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-slate-600">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          campaign.status === "completed"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Deliverables Progress */}
                <div className="mb-4">
                  <p className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                    Deliverables: {campaign.completedDeliverables.length}/
                    {campaign.deliverables.length} completed
                  </p>
                  <div className="space-y-1">
                    {campaign.deliverables.map((deliverable, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-xs"
                      >
                        <div
                          className={`h-2 w-2 rounded-full ${
                            campaign.completedDeliverables.includes(deliverable)
                              ? "bg-green-500"
                              : "bg-gray-300 dark:bg-slate-600"
                          }`}
                        />
                        <span
                          className={`${
                            campaign.completedDeliverables.includes(deliverable)
                              ? "text-green-600 line-through dark:text-green-400"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {deliverable}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                  {truncateText(campaign.description, 100)}
                </p>

                {/* Action Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={() => onViewCampaign(campaign)}
                    variant="default"
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Eye className="mr-1 h-4 w-4" />
                    View Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
