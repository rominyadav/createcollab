"use client";

import { useState } from "react";

import { Building2, Globe, MapPin, Settings, User, Users } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/user-ui/page-header";

import { Creator } from "@/types/creator";

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

interface BrandProfileProps {
  brand: Brand;
  creator: Creator;
}

export function BrandProfile({ brand, creator }: BrandProfileProps) {
  const [activeProfile, setActiveProfile] = useState<"brand" | "individual">(
    "brand"
  );

  const handleSettingsClick = () => {
    console.log("Opening settings");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const renderBrandProfile = () => (
    <div className="space-y-6">
      {/* Brand Header */}
      <div className="text-center">
        <Avatar className="mx-auto mb-4 h-24 w-24">
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-2xl font-bold text-white">
            {brand.logo}
          </AvatarFallback>
        </Avatar>

        <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
          {brand.name}
        </h2>

        <p className="mb-2 text-gray-600 dark:text-gray-400">
          {brand.industry} Company
        </p>

        <div className="flex items-center justify-center gap-2">
          {brand.verified && (
            <Badge className="bg-blue-600 text-white">✓ Verified</Badge>
          )}
          <Badge className={getStatusColor(brand.status)}>
            {brand.status.charAt(0).toUpperCase() + brand.status.slice(1)}
          </Badge>
        </div>

        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {brand.campaigns.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Campaigns
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {brand.adminUsers.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Admins</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {brand.founded}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Founded</p>
          </div>
        </div>
      </div>

      {/* Brand Description */}
      <Card>
        <CardContent className="p-4">
          <p className="text-center text-gray-700 dark:text-slate-300">
            {brand.description}
          </p>
        </CardContent>
      </Card>

      {/* Company Details */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-400" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm">
              {brand.location.city}, {brand.location.country}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {brand.location.address}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-gray-400" />
              Company Size
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm">{brand.employees} employees</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Revenue: {brand.revenue}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-400" />
            <a
              href={`https://${brand.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              {brand.website}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">📧</span>
            <span className="text-sm text-gray-900 dark:text-white">
              {brand.email}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">📞</span>
            <span className="text-sm text-gray-900 dark:text-white">
              {brand.phone}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Admin Users */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Brand Administrators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {brand.adminUsers.map((admin) => (
              <div
                key={admin.id}
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-slate-600"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white">
                    {admin.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {admin.name}
                    </p>
                    {admin.isPrimary && (
                      <Badge variant="outline" className="text-xs">
                        Primary
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {admin.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {brand.campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-slate-600"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {campaign.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Budget: NPR {campaign.budget.toLocaleString()}
                  </p>
                </div>
                <Badge className={getStatusColor(campaign.status)}>
                  {campaign.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIndividualProfile = () => (
    <div className="space-y-6">
      {/* Individual Header */}
      <div className="text-center">
        <Avatar className="mx-auto mb-4 h-24 w-24">
          <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-2xl font-bold text-white">
            {creator.avatar}
          </AvatarFallback>
        </Avatar>

        <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
          {creator.name}
        </h2>

        <p className="mb-2 text-gray-600 dark:text-gray-400">
          {creator.niche} Creator & Brand Admin
        </p>

        <div className="flex items-center justify-center gap-2">
          {creator.verified && (
            <Badge className="bg-blue-600 text-white">✓ Verified</Badge>
          )}
          <Badge className={getStatusColor(creator.status)}>
            {creator.status.charAt(0).toUpperCase() + creator.status.slice(1)}
          </Badge>
        </div>

        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {creator.followers}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Followers
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {creator.following}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Following
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {creator.videos.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Videos</p>
          </div>
        </div>
      </div>

      {/* Individual Bio */}
      <Card>
        <CardContent className="p-4">
          <p className="text-center text-gray-700 dark:text-slate-300">
            {creator.bio}
          </p>
        </CardContent>
      </Card>

      {/* Creator Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-400" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm">
              {creator.location.city}, {creator.location.country}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-gray-400" />
              Engagement
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm">{creator.engagement}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Score: {creator.creatorScore}/100
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Creator Role in Brand */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Role in {brand.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/20">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="font-medium text-emerald-900 dark:text-emerald-100">
                  Brand Administrator
                </p>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  Managing campaigns and creator relationships for {brand.name}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Videos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {creator.videos.slice(0, 4).map((video) => (
              <div
                key={video.id}
                className="rounded-lg border border-gray-200 p-3 dark:border-slate-600"
              >
                <div className="mb-2 flex aspect-video items-center justify-center rounded bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-600 dark:to-slate-500">
                  <div className="text-center">
                    <div className="mb-1 text-2xl">🎬</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">
                      {video.duration}
                    </div>
                  </div>
                </div>
                <h4 className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  {video.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
                  <span>{video.views} views</span>
                  <span>{video.uploadedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="pb-20 md:pb-8">
      <PageHeader
        title="Profile"
        action={{
          icon: Settings,
          onClick: handleSettingsClick,
          label: "Settings",
        }}
      />

      <div className="space-y-6 p-4">
        {/* Profile Toggle */}
        <Card>
          <CardContent className="p-4">
            <Tabs
              value={activeProfile}
              onValueChange={(value) =>
                setActiveProfile(value as "brand" | "individual")
              }
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="brand"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                  <Building2 className="h-4 w-4" />
                  Brand Profile
                </TabsTrigger>
                <TabsTrigger
                  value="individual"
                  className="flex items-center gap-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                >
                  <User className="h-4 w-4" />
                  Individual Profile
                </TabsTrigger>
              </TabsList>

              <TabsContent value="brand" className="mt-6">
                {renderBrandProfile()}
              </TabsContent>

              <TabsContent value="individual" className="mt-6">
                {renderIndividualProfile()}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
