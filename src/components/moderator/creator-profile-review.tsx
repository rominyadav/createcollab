"use client";

import { useState } from "react";

import {
  CheckCircle,
  Clock,
  MapPin,
  MessageCircle,
  Play,
  Star,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { MiniChat } from "./mini-chat";
import { ThemeToggle } from "./theme-toggle";

interface CreatorVideo {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: string;
  uploadedAt: string;
}

interface CreatorPricing {
  "15sec": {
    type: "fixed" | "range";
    amount?: number;
    min?: number;
    max?: number;
  };
  "30sec": {
    type: "fixed" | "range";
    amount?: number;
    min?: number;
    max?: number;
  };
  "60sec": {
    type: "fixed" | "range";
    amount?: number;
    min?: number;
    max?: number;
  };
  "1-5min": {
    type: "fixed" | "range";
    amount?: number;
    min?: number;
    max?: number;
  };
  "5min+": {
    type: "fixed" | "range";
    amount?: number;
    min?: number;
    max?: number;
  };
}

interface Creator {
  id: number;
  name: string;
  avatar: string;
  followers: string;
  following: string;
  niche: string;
  email: string;
  bio: string;
  socialLinks: string[];
  pricing: CreatorPricing;
  shippingAddress: string;
  profileCompletion: string;
  status: "pending" | "approved" | "rejected" | "blocked";
  verified: boolean;
  panCard: string;
  paymentVerification: {
    khalti: string;
    esewa: string;
    verified: boolean;
  };
  creatorScore: number;
  location: {
    city: string;
    state: string;
    country: string;
    district?: string;
    province?: string;
    coordinates?: { lat: number; lng: number };
  };
  engagement: string;
  videos: CreatorVideo[];
}

interface CreatorProfileReviewProps {
  creator: Creator;
  onApprove: (creatorId: number) => void;
  onReject: (creatorId: number) => void;
  onClose: () => void;
}

export function CreatorProfileReview({
  creator,
  onApprove,
  onReject,
  onClose,
}: CreatorProfileReviewProps) {
  const [showChat, setShowChat] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case "blocked":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getProfileCompletionColor = (completion: string) => {
    return completion === "Complete"
      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      : "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
  };

  const getCreatorScoreColor = (score: number) => {
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

  const getCreatorScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    return "Poor";
  };

  const getPaymentVerificationColor = (verified: boolean) => {
    return verified
      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
  };

  const formatPricing = (pricing: {
    type: "fixed" | "range";
    amount?: number;
    min?: number;
    max?: number;
  }) => {
    if (pricing.type === "fixed") {
      return `Rs ${pricing.amount}`;
    } else {
      return `Rs ${pricing.min}${pricing.max !== pricing.min ? ` - ${pricing.max}` : ""}`;
    }
  };

  const getSocialIcon = (platform: string) => {
    const lowerPlatform = platform.toLowerCase();
    if (lowerPlatform.includes("facebook") || lowerPlatform.includes("fb"))
      return <FaFacebook className="h-4 w-4 text-blue-600" />;
    if (lowerPlatform.includes("instagram") || lowerPlatform.includes("insta"))
      return <FaInstagram className="h-4 w-4 text-pink-600" />;
    if (lowerPlatform.includes("tiktok"))
      return <FaTiktok className="h-4 w-4 text-black dark:text-white" />;
    if (lowerPlatform.includes("youtube") || lowerPlatform.includes("yt"))
      return <FaYoutube className="h-4 w-4 text-red-600" />;
    return <Users className="h-4 w-4 text-gray-400" />;
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-start justify-center bg-gradient-to-b from-black/10 via-black/20 to-black/30 p-4 pt-8 backdrop-blur-sm duration-300">
      <div className="animate-in slide-in-from-top-4 relative max-h-[90vh] w-full max-w-7xl scale-100 transform overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 hover:scale-[1.02] dark:border-slate-600 dark:bg-slate-800">
        {/* 3D Depth Effect */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600"></div>
        <div className="relative z-10">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-lg font-semibold text-white">
                  👤
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Creator Profile Review: {creator.name}
                  </h2>
                  <p className="text-gray-600 dark:text-slate-300">
                    {creator.niche} • {creator.followers} followers
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <Badge className={getStatusColor(creator.status)}>
                  {creator.status.charAt(0).toUpperCase() +
                    creator.status.slice(1)}
                </Badge>
                <Button variant="outline" onClick={onClose}>
                  <X className="h-4 w-4" />
                  Close
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Main Content - Left Column */}
              <div className="space-y-6 lg:col-span-2">
                {/* Creator Card with Pricing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Users className="h-5 w-5" />
                      Creator Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-6">
                      {/* Avatar and Basic Info */}
                      <div className="flex flex-col items-center gap-3">
                        <Avatar className="h-24 w-24">
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-2xl font-bold text-white">
                            {creator.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <Badge
                            variant={creator.verified ? "default" : "secondary"}
                            className={creator.verified ? "bg-green-600" : ""}
                          >
                            {creator.verified ? "Verified" : "Unverified"}
                          </Badge>
                        </div>
                      </div>

                      {/* Creator Details */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {creator.name}
                          </h3>
                          <p className="text-gray-600 dark:text-slate-300">
                            {creator.email}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-700 dark:text-slate-300">
                            {creator.bio}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400 dark:text-slate-500" />
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
                            <Users className="h-4 w-4 text-gray-400 dark:text-slate-500" />
                            <div>
                              <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
                                Following
                              </label>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {creator.following}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400 dark:text-slate-500" />
                          <span className="text-sm text-gray-600 dark:text-slate-400">
                            {creator.location.city}, {creator.location.state},{" "}
                            {creator.location.country}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-gray-400 dark:text-slate-500" />
                          <span className="text-sm text-gray-600 dark:text-slate-400">
                            {creator.engagement} engagement rate
                          </span>
                        </div>

                        {/* Video Pricing Section - Compact */}
                        <div className="border-t pt-4">
                          <div className="mb-3 flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400 dark:text-slate-500" />
                            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
                              Video Pricing
                            </span>
                          </div>
                          <div className="grid grid-cols-5 gap-2">
                            {Object.entries(creator.pricing).map(
                              ([duration, pricing]) => (
                                <div
                                  key={duration}
                                  className="rounded border border-gray-200 p-2 text-center dark:border-slate-600"
                                >
                                  <div className="mb-1 text-xs font-medium text-gray-700 dark:text-slate-300">
                                    {duration}
                                  </div>
                                  <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                    {formatPricing(pricing)}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Videos Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Play className="h-5 w-5" />
                      Creator Videos ({creator.videos.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {creator.videos.map((video) => (
                        <div
                          key={video.id}
                          className="group cursor-pointer rounded-lg border border-gray-200 p-4 transition-all duration-200 hover:border-emerald-300 hover:shadow-md dark:border-slate-600 dark:hover:border-emerald-600"
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
                            <span>{video.uploadedAt}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Profile Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      Profile Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Completion
                      </span>
                      <Badge
                        className={getProfileCompletionColor(
                          creator.profileCompletion
                        )}
                      >
                        {creator.profileCompletion}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Verification
                      </span>
                      <Badge
                        variant={creator.verified ? "default" : "secondary"}
                        className={creator.verified ? "bg-green-600" : ""}
                      >
                        {creator.verified ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-1 h-4 w-4 text-gray-400 dark:text-slate-500" />
                      <p className="text-sm text-gray-700 dark:text-slate-300">
                        {creator.shippingAddress}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media Links */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      Social Media
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {creator.socialLinks.map((link, index) => (
                        <a
                          key={index}
                          href={`https://${link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-slate-600 dark:hover:bg-slate-600"
                        >
                          {getSocialIcon(link)}
                          <span className="text-sm text-gray-700 group-hover:text-emerald-600 dark:text-slate-300 dark:group-hover:text-emerald-400">
                            {link}
                          </span>
                          <div className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">
                            <svg
                              className="h-4 w-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </div>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Creator Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      Creator Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-slate-400">
                          Overall Score
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={getCreatorScoreColor(
                              creator.creatorScore
                            )}
                          >
                            {creator.creatorScore}/100
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {getCreatorScoreLabel(creator.creatorScore)}
                          </Badge>
                        </div>
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
                      <p className="text-center text-xs text-gray-500 dark:text-slate-400">
                        Based on social media metrics and platform performance
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* KYC & Payment Verification */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      KYC & Payment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        PAN Card
                      </span>
                      <span className="font-mono text-sm text-gray-900 dark:text-white">
                        {creator.panCard}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Khalti ID
                      </span>
                      <span className="font-mono text-sm text-gray-900 dark:text-white">
                        {creator.paymentVerification.khalti}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Esewa ID
                      </span>
                      <span className="font-mono text-sm text-gray-900 dark:text-white">
                        {creator.paymentVerification.esewa}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Payment Verified
                      </span>
                      <Badge
                        className={getPaymentVerificationColor(
                          creator.paymentVerification.verified
                        )}
                      >
                        {creator.paymentVerification.verified
                          ? "Verified"
                          : "Unverified"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                {creator.status === "pending" && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <Button
                          onClick={() => onApprove(creator.id)}
                          variant="emerald"
                          className="w-full"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve Creator
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => onReject(creator.id)}
                          className="w-full"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject Creator
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

      {/* Floating Chat Button */}
      <Button
        className="fixed right-6 bottom-6 h-16 w-16 rounded-full bg-emerald-500 p-0 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-emerald-600"
        onClick={toggleChat}
      >
        <MessageCircle className="h-8 w-8 text-white" />
      </Button>

      {/* Mini Chat Component */}
      {showChat && (
        <MiniChat
          creatorName={creator.name}
          creatorAvatar={creator.avatar}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
}
