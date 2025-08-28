"use client";

import { useEffect, useState } from "react";

import {
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Plus,
  Users,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/user-ui/page-header";

import campaignsMockData from "../../mock-data/campaigns-mockdata.json";
import { CreateCampaign } from "../create-campaign/create-campaign";
import {
  campaignStorage,
  exportCampaignsData,
  updateCampaignAPI,
} from "../utils/campaign-storage";
import { CampaignDetails } from "./campaign-details";
import { CampaignManage } from "./campaign-manage";

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

interface BrandMyCampaignsProps {
  brandId: number;
}

// Mock campaigns data - filter by brand
const mockCampaigns: Campaign[] = campaignsMockData;

export function BrandMyCampaigns({ brandId }: BrandMyCampaignsProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [manageCampaign, setManageCampaign] = useState<Campaign | null>(null);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize campaigns from storage or mock data
  useEffect(() => {
    const initializedCampaigns =
      campaignStorage.initializeCampaigns(mockCampaigns);
    setCampaigns(initializedCampaigns);
    setIsLoading(false);
  }, []);

  const statusOptions = ["all", "active", "planning", "completed", "paused"];

  // Filter campaigns by brand (in real app, this would be done via API)
  const brandCampaigns = campaigns.filter((campaign) => {
    // Mock filtering logic - in real app, campaigns would have brandId
    return true; // For now, show all campaigns
  });

  const filteredCampaigns = brandCampaigns.filter(
    (campaign) => selectedStatus === "all" || campaign.status === selectedStatus
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "planning":
        return <Calendar className="h-4 w-4" />;
      case "paused":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "planning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "paused":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const handleViewCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleManageCampaign = (campaign: Campaign) => {
    setManageCampaign(campaign);
  };

  const handleSaveCampaign = async (updatedCampaign: Campaign) => {
    try {
      // Update via API (simulated)
      await updateCampaignAPI(updatedCampaign);

      // Update local state
      setCampaigns(
        campaigns.map((c) =>
          c.id === updatedCampaign.id ? updatedCampaign : c
        )
      );

      console.log("Campaign updated successfully:", updatedCampaign);
    } catch (error) {
      console.error("Error updating campaign:", error);
      alert("Failed to update campaign. Please try again.");
    }
  };

  const handleCampaignCreated = (newCampaign: Campaign) => {
    console.log("handleCampaignCreated called with:", newCampaign);
    setCampaigns((prev) => [...prev, newCampaign]);
    console.log("Campaign created successfully:", newCampaign);
  };

  return (
    <div className="pb-20 md:pb-8">
      <PageHeader title="My Campaigns">
        {/* Create Campaign Button */}
        <div className="space-y-2 px-4 pb-2">
          <Button
            onClick={() => setShowCreateCampaign(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
          <Button
            onClick={() => {
              const data = exportCampaignsData();
              navigator.clipboard.writeText(JSON.stringify(data, null, 2));
              alert(
                "Campaigns data copied to clipboard! Paste it into campaigns-mockdata.json"
              );
            }}
            variant="outline"
            className="w-full text-xs"
          >
            Export to JSON
          </Button>
        </div>

        {/* Status Filter */}
        <div className="px-4 pb-4">
          <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
            <TabsList
              className="bg-muted grid w-full"
              style={{
                gridTemplateColumns: `repeat(${statusOptions.length}, 1fr)`,
              }}
            >
              {statusOptions.map((status) => (
                <TabsTrigger
                  key={status}
                  value={status}
                  className="flex items-center gap-1 text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                >
                  {getStatusIcon(status)}
                  {status === "all"
                    ? "All"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </PageHeader>

      {/* Campaigns List */}
      <div className="space-y-4 p-4">
        {isLoading ? (
          <div className="py-12 text-center">
            <div className="mb-4 text-4xl">⏳</div>
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Loading campaigns...
            </h3>
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mb-4 text-4xl">📋</div>
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              No campaigns found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedStatus === "all"
                ? "You haven't created any campaigns yet"
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
                <div className="mb-3 flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {campaign.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {campaign.category}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status.charAt(0).toUpperCase() +
                          campaign.status.slice(1)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {campaign.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                      NPR {campaign.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      per creator
                    </p>
                  </div>
                </div>

                {/* Campaign Info */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Created:{" "}
                      {new Date(campaign.createdDate).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>
                      Valid till:{" "}
                      {new Date(campaign.validTillDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>
                      {campaign.totalSlots - campaign.creatorsSlotRemaining} of{" "}
                      {campaign.totalSlots} creators joined
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="mb-1 flex justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>Creator Slots</span>
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
                <p className="mb-4 line-clamp-2 text-sm text-gray-700 dark:text-gray-300">
                  {campaign.description}
                </p>

                {/* Requirements Preview */}
                <div className="mb-4">
                  <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Requirements:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {campaign.requirements.slice(0, 2).map((req, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                    {campaign.requirements.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{campaign.requirements.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Campaign ID: #{campaign.id}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewCampaign(campaign)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => handleManageCampaign(campaign)}
                    >
                      Manage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <CampaignDetails
          campaignId={selectedCampaign.id}
          onClose={() => setSelectedCampaign(null)}
        />
      )}

      {/* Campaign Management Modal */}
      {manageCampaign && (
        <CampaignManage
          campaign={manageCampaign}
          onClose={() => setManageCampaign(null)}
          onSave={handleSaveCampaign}
        />
      )}

      {/* Create Campaign Modal */}
      {showCreateCampaign && (
        <CreateCampaign
          brandId={brandId}
          brandName="Your Brand" // In real app, get from brand data
          brandLogo="YB" // In real app, get from brand data
          onClose={() => setShowCreateCampaign(false)}
          onCampaignCreated={handleCampaignCreated}
        />
      )}
    </div>
  );
}
