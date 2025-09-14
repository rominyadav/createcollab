"use client";

import { useParams } from "next/navigation";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { CreatorDashboard } from "@/components/creator/creator-dashboard";

import { api } from "../../../../convex/_generated/api";

export default function CreatorPage() {
  const params = useParams();
  const { user } = useUser();
  const uuid = params.id as string;

  const creator = useQuery(
    api.creators.getCreatorByClerkId,
    user ? { clerkId: user.id } : "skip"
  );

  if (!user || !creator) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-muted-foreground mt-4 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user owns this creator profile
  if (creator.uuid !== uuid) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">🚫</div>
          <h1 className="mb-2 text-2xl font-bold">Access Denied</h1>
          <p className="text-gray-600">
            You can only access your own dashboard.
          </p>
        </div>
      </div>
    );
  }

  // Adapt Convex creator data to match expected interface
  const adaptedCreator = {
    id: 1,
    name: creator.name,
    avatar: user?.imageUrl || creator.avatar || "/placeholder-avatar.jpg",
    bio: creator.bio || "No bio available",
    verified: creator.verified || false,
    followers: creator.followers || "0",
    following: creator.following || "0",
    videos: [],
    engagement: creator.engagement || "0%",
    location: {
      city: creator.address?.city || "Unknown",
      country: creator.address?.country || "Unknown",
    },
    socialLinks: creator.socialLinks || [],
    niche: creator.niche || "General",
    joinedDate: "2024",
    totalViews: "0",
    totalLikes: "0",
  };

  return <CreatorDashboard creator={adaptedCreator} />;
}
