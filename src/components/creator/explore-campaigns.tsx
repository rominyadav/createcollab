"use client";

import { useState } from "react";

import { Calendar, Clock, Eye, MapPin, Users } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Campaign {
  id: number;
  title: string;
  description: string;
  brandName: string;
  brandLogo: string;
  price: number;
  currency: string;
  createdDate: string;
  validTillDate: string;
  creatorsSlotRemaining: number;
  totalSlots: number;
  category: string;
  requirements: string[];
  deliverables: string[];
  status: string;
}

interface ExploreCampaignsProps {
  isVerified: boolean;
  onViewCampaign: (campaign: Campaign) => void;
}

const mockCampaigns: Campaign[] = [
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
    deliverables: ["1 Instagram Reel", "1 TikTok video"],
    status: "active",
  },
  {
    id: 2,
    title: "Tech Product Review Campaign",
    description: "Review our latest smartphone with detailed features showcase",
    brandName: "TechCorp Inc.",
    brandLogo: "TC",
    price: 8000,
    currency: "NPR",
    createdDate: "2024-01-20",
    validTillDate: "2024-02-20",
    creatorsSlotRemaining: 5,
    totalSlots: 8,
    category: "Technology",
    requirements: ["Tech reviewers preferred", "Minimum 5K followers"],
    deliverables: ["1 detailed review video", "Unboxing content"],
    status: "active",
  },
  {
    id: 3,
    title: "Healthy Lifestyle Challenge",
    description: "Promote our fitness app with workout and nutrition content",
    brandName: "FitLife App",
    brandLogo: "FL",
    price: 3500,
    currency: "NPR",
    createdDate: "2024-01-10",
    validTillDate: "2024-02-10",
    creatorsSlotRemaining: 0,
    totalSlots: 15,
    category: "Health & Fitness",
    requirements: ["Fitness/lifestyle creators", "Minimum 8K followers"],
    deliverables: ["Workout videos using app", "App review"],
    status: "full",
  },
];

export function ExploreCampaigns({
  isVerified,
  onViewCampaign,
}: ExploreCampaignsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    "Fashion",
    "Technology",
    "Health & Fitness",
    "Food & Beverage",
    "Beauty & Skincare",
  ];

  const filteredCampaigns = mockCampaigns.filter(
    (campaign) =>
      selectedCategory === "all" || campaign.category === selectedCategory
  );

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "full":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
        <h1 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
          Explore Campaigns
        </h1>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category === "all" ? "All" : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4 p-4">
        {filteredCampaigns.map((campaign) => (
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
                      {campaign.status}
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
                    Valid till:{" "}
                    {new Date(campaign.validTillDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>
                    {campaign.creatorsSlotRemaining} of {campaign.totalSlots}{" "}
                    slots remaining
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="mb-1 flex justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>Slots filled</span>
                  <span>
                    {campaign.totalSlots - campaign.creatorsSlotRemaining}/
                    {campaign.totalSlots}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-slate-600">
                  <div
                    className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
                    style={{
                      width: `${((campaign.totalSlots - campaign.creatorsSlotRemaining) / campaign.totalSlots) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                {truncateText(campaign.description, 100)}
              </p>

              {/* Action Button */}
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Created: {new Date(campaign.createdDate).toLocaleDateString()}
                </div>
                {isVerified ? (
                  <Button
                    onClick={() => onViewCampaign(campaign)}
                    variant="default"
                    size="sm"
                    disabled={campaign.status === "full"}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Eye className="mr-1 h-4 w-4" />
                    View Campaign
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    Verification Required
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Verification Notice */}
      {!isVerified && (
        <div className="fixed right-4 bottom-20 left-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-900/20">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Complete verification to view campaign details and apply
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
