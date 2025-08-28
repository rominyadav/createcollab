"use client";

import { Calendar, Clock, Eye, Users } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface Campaign {
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

interface CampaignCardProps {
  campaign: Campaign;
  onViewCampaign: (campaign: Campaign) => void;
  isVerified?: boolean;
  showProgress?: boolean;
  progress?: number;
}

export function CampaignCard({
  campaign,
  onViewCampaign,
  isVerified = true,
  showProgress = false,
  progress = 0,
}: CampaignCardProps) {
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
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  return (
    <Card className="border-gray-200 dark:border-slate-600">
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
              {campaign.creatorsSlotRemaining} of {campaign.totalSlots} slots
              remaining
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="mb-1 flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>{showProgress ? "Progress" : "Slots filled"}</span>
            <span>
              {showProgress
                ? `${progress}%`
                : `${campaign.totalSlots - campaign.creatorsSlotRemaining}/${campaign.totalSlots}`}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-slate-600">
            <div
              className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
              style={{
                width: showProgress
                  ? `${progress}%`
                  : `${((campaign.totalSlots - campaign.creatorsSlotRemaining) / campaign.totalSlots) * 100}%`,
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
  );
}
