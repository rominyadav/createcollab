"use client";

import { useState } from "react";

import {
  Clock,
  MapPin,
  MessageCircle,
  Play,
  Star,
  Users,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Creator {
  id: number;
  name: string;
  avatar: string;
  followers: string;
  following: string;
  niche: string;
  bio: string;
  pricing: Record<
    string,
    { type: string; amount?: number; min?: number; max?: number }
  >;
  profileCompletion: string;
  status: string;
  verified: boolean;
  creatorScore: number;
  location: {
    city: string;
    state: string;
    country: string;
  };
  engagement: string;
  videos: Array<{
    id: number;
    title: string;
    thumbnail: string;
    duration: string;
    views: string;
    likes: string;
    uploadedAt: string;
  }>;
}

interface BrandCreatorProfileViewProps {
  creator: Creator;
  brandId: number;
  onClose: () => void;
}

export function BrandCreatorProfileView({
  creator,
  brandId,
  onClose,
}: BrandCreatorProfileViewProps) {
  const [showChat, setShowChat] = useState(false);

  const formatPricing = (pricing: {
    type: string;
    amount?: number;
    min?: number;
    max?: number;
  }) =>
    pricing.type === "fixed"
      ? `NPR ${pricing.amount?.toLocaleString()}`
      : `NPR ${pricing.min?.toLocaleString()}${pricing.max !== pricing.min ? ` - ${pricing.max?.toLocaleString()}` : ""}`;

  const getScoreColor = (score: number) => {
    if (score >= 90)
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300";
    if (score >= 80)
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
    if (score >= 70)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
    if (score >= 60)
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
    return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    return "Poor";
  };

  // Mock past collaborations data
  const pastCollaborations = [
    { brandName: "StyleHub", campaigns: 3, rating: 4.8 },
    { brandName: "TechCorp", campaigns: 2, rating: 4.9 },
    { brandName: "FoodieDelight", campaigns: 1, rating: 4.7 },
  ];

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-start justify-center bg-gradient-to-b from-black/10 via-black/20 to-black/30 p-4 pt-8 backdrop-blur-sm duration-300">
      <div className="animate-in slide-in-from-top-4 relative max-h-[90vh] w-full max-w-6xl scale-100 transform overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 hover:scale-[1.02] dark:border-slate-600 dark:bg-slate-800">
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-30 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600"></div>
        <div className="relative z-10">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-xl font-semibold text-white">
                    {creator.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {creator.name}
                  </h2>
                  <p className="text-gray-600 dark:text-slate-300">
                    {creator.niche} Creator • {creator.followers} followers
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    {creator.verified && (
                      <Badge className="bg-blue-600 text-white">
                        ✓ Verified
                      </Badge>
                    )}
                    <Badge className={getScoreColor(creator.creatorScore)}>
                      Score: {creator.creatorScore}/100
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setShowChat(true)}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline" onClick={onClose}>
                  <X className="h-4 w-4" />
                  Close
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Main Content */}
              <div className="space-y-6 lg:col-span-2">
                {/* Creator Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Users className="h-5 w-5" />
                      Creator Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-700 dark:text-slate-300">
                          {creator.bio}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
                              Followers
                            </label>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              {creator.followers}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-gray-400" />
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
                              Engagement
                            </label>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              {creator.engagement}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-slate-400">
                          {creator.location.city}, {creator.location.state},{" "}
                          {creator.location.country}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Video Pricing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Clock className="h-5 w-5" />
                      Video Pricing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {Object.entries(creator.pricing).map(
                        ([duration, pricing]) => (
                          <div
                            key={duration}
                            className="rounded-lg border border-gray-200 p-3 text-center dark:border-slate-600"
                          >
                            <div className="mb-2 text-sm font-medium text-gray-700 dark:text-slate-300">
                              {duration}
                            </div>
                            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                              {formatPricing(pricing)}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Past Collaborations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Star className="h-5 w-5" />
                      Past Collaborations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pastCollaborations.map((collab, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-slate-600"
                        >
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {collab.brandName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {collab.campaigns} campaigns completed
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium text-gray-900 dark:text-white">
                                {collab.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Creator Videos */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Play className="h-5 w-5" />
                      Creator Videos ({creator.videos.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {creator.videos.slice(0, 4).map((video) => (
                        <div
                          key={video.id}
                          className="group rounded-lg border border-gray-200 p-4 transition-all duration-200 hover:border-emerald-300 hover:shadow-md dark:border-slate-600 dark:hover:border-emerald-600"
                        >
                          <div className="mb-3 flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-600 dark:to-slate-500">
                            <div className="text-center">
                              <div className="mb-2 text-3xl">🎬</div>
                              <div className="text-sm text-gray-500 dark:text-slate-400">
                                {video.duration}
                              </div>
                            </div>
                          </div>
                          <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                            {video.title}
                          </h4>
                          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-slate-400">
                            <span>{video.views} views</span>
                            <span>{video.likes} likes</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Creator Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      Creator Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">
                          {creator.creatorScore}/100
                        </div>
                        <Badge className={getScoreColor(creator.creatorScore)}>
                          {getScoreLabel(creator.creatorScore)}
                        </Badge>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-slate-600">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            creator.creatorScore >= 90
                              ? "bg-emerald-500"
                              : creator.creatorScore >= 80
                                ? "bg-blue-500"
                                : creator.creatorScore >= 70
                                  ? "bg-yellow-500"
                                  : creator.creatorScore >= 60
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                          }`}
                          style={{ width: `${creator.creatorScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Profile Status
                      </span>
                      <Badge
                        className={
                          creator.profileCompletion === "Complete"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                            : "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
                        }
                      >
                        {creator.profileCompletion}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Total Videos
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {creator.videos.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Niche
                      </span>
                      <Badge variant="outline">{creator.niche}</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Actions */}
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <Button
                        onClick={() => setShowChat(true)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Start Conversation
                      </Button>
                      <Button variant="outline" className="w-full">
                        Invite to Campaign
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat notification */}
      {showChat && (
        <div className="fixed right-6 bottom-6 rounded-lg bg-emerald-600 p-4 text-white shadow-lg">
          <p className="text-sm">Chat feature will be implemented soon!</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowChat(false)}
            className="mt-2 text-white hover:bg-emerald-700"
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
}
