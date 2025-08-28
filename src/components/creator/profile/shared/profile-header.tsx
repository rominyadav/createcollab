"use client";

import { Creator } from "@/components/mock-data/creator-mockdata";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProfileHeaderProps {
  creator: Creator;
  campaignVideosCount: number;
}

export function ProfileHeader({
  creator,
  campaignVideosCount,
}: ProfileHeaderProps) {
  const getVerificationBadge = () => {
    if (creator.verified) {
      return <Badge className="bg-blue-600 text-white">✓ Verified</Badge>;
    }
    return <Badge variant="outline">Pending Verification</Badge>;
  };

  return (
    <div className="text-center">
      <Avatar className="mx-auto mb-4 h-24 w-24">
        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-2xl font-bold text-white">
          {creator.avatar}
        </AvatarFallback>
      </Avatar>

      <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
        {creator.name}
      </h2>

      <p className="mb-2 text-gray-600 dark:text-gray-400">
        {creator.niche} Creator
      </p>

      {getVerificationBadge()}

      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {creator.followers}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {creator.following}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {creator.videos.length + campaignVideosCount}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Videos</p>
        </div>
      </div>
    </div>
  );
}
