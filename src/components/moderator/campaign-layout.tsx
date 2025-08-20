import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Gift,
  Globe,
  MapPin,
  Target,
  Users,
  XCircle,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CampaignLayoutProps {
  campaign: {
    id: number;
    title: string;
    brand: string;
    brandLogo: string;
    status: "pending" | "approved" | "rejected" | "active" | "completed";
    budget: string;
    rewardType: "cash" | "product" | "coupon" | "mixed";
    targetCreators: number;
    joinedCreators: number;
    location: string;
    category: string;
    createdAt: string;
    validUntil: string;
    description: string;
    ageRange: string;
    gender: string;
    videoScript: string;
    timezone: string;
    campaignAcceptanceUntil: string;
    videoDeliveryUntil: string;
    cashRewardDetails?: string;
  };
  onApprove?: (campaignId: number) => void;
  onReject?: (campaignId: number) => void;
  onClose?: () => void;
}

interface Creator {
  id: number;
  name: string;
  avatar: string;
  followers: string;
  niche: string;
  location: string;
  joinedDate: string;
  status: "pending" | "approved" | "rejected";
  videoSubmitted: boolean;
  videoUrl?: string;
}

// Mock data for creators who joined the campaign
const mockJoinedCreators: Creator[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "SJ",
    followers: "12.5K",
    niche: "Fashion",
    location: "Kathmandu, Nepal",
    joinedDate: "2024-01-16",
    status: "approved",
    videoSubmitted: true,
    videoUrl: "https://example.com/video1",
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "MC",
    followers: "8.2K",
    niche: "Tech",
    location: "Pokhara, Nepal",
    joinedDate: "2024-01-17",
    status: "pending",
    videoSubmitted: false,
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "EW",
    followers: "45.1K",
    niche: "Lifestyle",
    location: "Lalitpur, Nepal",
    joinedDate: "2024-01-18",
    status: "approved",
    videoSubmitted: true,
    videoUrl: "https://example.com/video3",
  },
  {
    id: 4,
    name: "Raj Sharma",
    avatar: "RS",
    followers: "22.3K",
    niche: "Food",
    location: "Biratnagar, Nepal",
    joinedDate: "2024-01-19",
    status: "rejected",
    videoSubmitted: false,
  },
];

export function CampaignLayout({
  campaign,
  onApprove,
  onReject,
  onClose,
}: CampaignLayoutProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRewardTypeIcon = (type: string) => {
    switch (type) {
      case "cash":
        return <DollarSign className="h-5 w-5" />;
      case "product":
        return <Gift className="h-5 w-5" />;
      case "coupon":
        return <Gift className="h-5 w-5" />;
      case "mixed":
        return (
          <div className="flex gap-1">
            <DollarSign className="h-4 w-4" />
            <Gift className="h-4 w-4" />
          </div>
        );
      default:
        return <Gift className="h-5 w-5" />;
    }
  };

  const getCreatorStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-lg font-semibold text-white">
                {campaign.brandLogo}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {campaign.title}
                </h2>
                <p className="text-gray-600">by {campaign.brand}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getStatusColor(campaign.status)}>
                {campaign.status.charAt(0).toUpperCase() +
                  campaign.status.slice(1)}
              </Badge>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main Content - Left Column */}
            <div className="space-y-6 lg:col-span-2">
              {/* Campaign Title Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Campaign Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      {campaign.title}
                    </h3>
                    <p className="leading-relaxed text-gray-700">
                      {campaign.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {campaign.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {campaign.category}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Details Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Campaign Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Timezone
                        </label>
                        <p className="mt-1 flex items-center gap-2 text-sm text-gray-900">
                          <Globe className="h-4 w-4" />
                          {campaign.timezone}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Campaign Valid Until
                        </label>
                        <p className="mt-1 flex items-center gap-2 text-sm text-gray-900">
                          <Clock className="h-4 w-4" />
                          {campaign.validUntil}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Campaign Acceptance Until
                        </label>
                        <p className="mt-1 flex items-center gap-2 text-sm text-gray-900">
                          <Calendar className="h-4 w-4" />
                          {campaign.campaignAcceptanceUntil}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Video Delivery Until
                        </label>
                        <p className="mt-1 flex items-center gap-2 text-sm text-gray-900">
                          <Clock className="h-4 w-4" />
                          {campaign.videoDeliveryUntil}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Budget
                        </label>
                        <p className="text-2xl font-bold text-green-600">
                          {campaign.budget}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Target Creators
                        </label>
                        <p className="text-sm text-gray-900">
                          {campaign.targetCreators} creators
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Joined Creators
                        </label>
                        <p className="text-sm text-gray-900">
                          {campaign.joinedCreators} creators
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Creator Requirements Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Creator Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Age Range
                      </label>
                      <p className="text-sm text-gray-900">
                        {campaign.ageRange}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <p className="text-sm text-gray-900">{campaign.gender}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <p className="text-sm text-gray-900">
                        {campaign.location}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Video Script
                    </label>
                    <div className="mt-2 rounded-lg border bg-gray-50 p-4">
                      <FileText className="mb-2 h-4 w-4 text-gray-400" />
                      <p className="text-sm leading-relaxed text-gray-900">
                        {campaign.videoScript}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reward Types Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Reward Types & Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Reward Type
                      </label>
                      <div className="mt-2 flex items-center gap-3">
                        {getRewardTypeIcon(campaign.rewardType)}
                        <Badge variant="outline" className="px-4 py-2 text-lg">
                          {campaign.rewardType.charAt(0).toUpperCase() +
                            campaign.rewardType.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    {campaign.cashRewardDetails && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Cash Reward Details
                        </label>
                        <div className="mt-2 rounded-lg border border-green-200 bg-green-50 p-3">
                          <DollarSign className="mb-2 h-4 w-4 text-green-600" />
                          <p className="text-sm text-green-800">
                            {campaign.cashRewardDetails}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Auto Generated Agreement Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Auto Generated Agreement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="space-y-3 text-sm text-blue-800">
                      <p>
                        <strong>1. Campaign Terms:</strong> Creators must submit
                        videos by {campaign.videoDeliveryUntil}.
                      </p>
                      <p>
                        <strong>2. Content Guidelines:</strong> Videos must
                        follow the provided script and brand guidelines.
                      </p>
                      <p>
                        <strong>3. Reward Distribution:</strong> Rewards will be
                        distributed within 7 days of video approval.
                      </p>
                      <p>
                        <strong>4. Quality Standards:</strong> Videos must meet
                        minimum quality and engagement standards.
                      </p>
                      <p>
                        <strong>5. Rights & Usage:</strong> Brand reserves
                        rights to use approved content for marketing purposes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Campaign Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Campaign Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status.charAt(0).toUpperCase() +
                        campaign.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Created</span>
                    <span className="text-sm text-gray-900">
                      {campaign.createdAt}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Valid Until</span>
                    <span className="text-sm text-gray-900">
                      {campaign.validUntil}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Target</span>
                    <span className="text-sm font-medium text-gray-900">
                      {campaign.targetCreators}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Joined</span>
                    <span className="text-sm font-medium text-blue-600">
                      {campaign.joinedCreators}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">
                      {Math.round(
                        (campaign.joinedCreators / campaign.targetCreators) *
                          100
                      )}
                      %
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Joined by Creators */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Joined Creators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockJoinedCreators.map((creator) => (
                      <div
                        key={creator.id}
                        className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-xs text-white">
                            {creator.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="truncate text-sm font-medium text-gray-900">
                              {creator.name}
                            </h4>
                            <Badge
                              className={getCreatorStatusColor(creator.status)}
                            >
                              {creator.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500">
                            {creator.followers} followers
                          </p>
                          <p className="text-xs text-gray-500">
                            {creator.location}
                          </p>
                        </div>
                        <div className="text-right">
                          {creator.videoSubmitted ? (
                            <Badge
                              variant="outline"
                              className="border-green-200 text-green-600"
                            >
                              Video Submitted
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="border-yellow-200 text-yellow-600"
                            >
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              {campaign.status === "pending" && (
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <Button
                        onClick={() => onApprove?.(campaign.id)}
                        variant="emerald"
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve Campaign
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => onReject?.(campaign.id)}
                        className="w-full border-red-200 text-red-600 hover:border-red-300"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject Campaign
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
