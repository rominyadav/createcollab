import {
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Gift,
  Globe,
  Heart,
  MapPin,
  Send,
  Share2,
  Target,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CampaignViewProps {
  campaign: {
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
  };
  onApply?: (campaignId: number) => void;
  onClose?: () => void;
  isApplied?: boolean;
  isVerified?: boolean;
}

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

export function CampaignView({
  campaign,
  onApply,
  onClose,
  isApplied = false,
  isVerified = true,
}: CampaignViewProps) {
  const progressPercentage = Math.round(
    ((campaign.totalSlots - campaign.creatorsSlotRemaining) /
      campaign.totalSlots) *
      100
  );

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-start justify-center bg-gradient-to-b from-black/10 via-black/20 to-black/30 p-4 pt-8 backdrop-blur-sm duration-300">
      <div className="animate-in slide-in-from-top-4 relative max-h-[90vh] w-full max-w-6xl scale-100 transform overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 hover:scale-[1.02] dark:border-slate-600 dark:bg-slate-800">
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600"></div>
        <div className="relative z-10">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-xl font-semibold text-white">
                    {campaign.brandLogo}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {campaign.title}
                  </h2>
                  <p className="text-gray-600 dark:text-slate-300">
                    by {campaign.brandName}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status.charAt(0).toUpperCase() +
                        campaign.status.slice(1)}
                    </Badge>
                    <Badge variant="outline">{campaign.category}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {campaign.currency} {campaign.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    per creator
                  </p>
                </div>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Main Content */}
              <div className="space-y-6 lg:col-span-2">
                {/* Campaign Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Target className="h-5 w-5" />
                      Campaign Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-gray-700 dark:text-slate-300">
                      {campaign.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Users className="h-5 w-5" />
                      Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {campaign.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
                          <span className="text-sm text-gray-700 dark:text-slate-300">
                            {requirement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Deliverables */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <FileText className="h-5 w-5" />
                      Deliverables
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {campaign.deliverables.map((deliverable, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                          <span className="text-sm text-gray-700 dark:text-slate-300">
                            {deliverable}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Campaign Guidelines */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <FileText className="h-5 w-5" />
                      Campaign Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-900/20">
                      <div className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
                        <p>
                          <strong>1. Content Quality:</strong> Ensure
                          high-quality video and audio production.
                        </p>
                        <p>
                          <strong>2. Brand Guidelines:</strong> Follow brand
                          colors, tone, and messaging.
                        </p>
                        <p>
                          <strong>3. Authenticity:</strong> Create genuine,
                          engaging content that resonates with your audience.
                        </p>
                        <p>
                          <strong>4. Deadlines:</strong> Submit content by the
                          specified deadline.
                        </p>
                        <p>
                          <strong>5. Disclosure:</strong> Include proper
                          sponsorship disclosure as required by law.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Campaign Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      Campaign Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Status
                      </span>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status.charAt(0).toUpperCase() +
                          campaign.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Created
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {new Date(campaign.createdDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Valid Until
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {new Date(campaign.validTillDate).toLocaleDateString()}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Total Slots
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {campaign.totalSlots}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Remaining
                      </span>
                      <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        {campaign.creatorsSlotRemaining}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Progress
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {progressPercentage}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-slate-600">
                        <div
                          className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                      <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                        {campaign.totalSlots - campaign.creatorsSlotRemaining}{" "}
                        of {campaign.totalSlots} slots filled
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reward Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Gift className="h-5 w-5" />
                      Reward
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="mb-2 flex items-center justify-center">
                        <DollarSign className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                        {campaign.currency} {campaign.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Payment upon approval
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {!isVerified ? (
                        <Button disabled className="w-full">
                          Verification Required
                        </Button>
                      ) : isApplied ? (
                        <Button disabled className="w-full bg-gray-400">
                          Already Applied
                        </Button>
                      ) : campaign.status === "full" ? (
                        <Button disabled className="w-full">
                          Campaign Full
                        </Button>
                      ) : (
                        <Button
                          onClick={() => onApply?.(campaign.id)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Apply to Campaign
                        </Button>
                      )}

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Heart className="mr-1 h-4 w-4" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Share2 className="mr-1 h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Brand Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      About {campaign.brandName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3 flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                          {campaign.brandLogo}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {campaign.brandName}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {campaign.category} Brand
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Trusted brand with multiple successful campaigns on our
                      platform.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
