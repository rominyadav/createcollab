import React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

interface ReviewCardProps {
  id: number;
  name: string;
  avatar: string;
  primaryInfo: string;
  secondaryInfo: string;
  email: string;
  additionalInfo?: string;
  onReview: () => void;
  onApprove: () => void;
  onReject: () => void;
  avatarGradient?: string;
}

export const ReviewCard = React.memo<ReviewCardProps>(
  ({
    name,
    avatar,
    primaryInfo,
    secondaryInfo,
    email,
    additionalInfo,
    onReview,
    onApprove,
    onReject,
    avatarGradient = "from-purple-400 to-pink-400",
  }) => (
    <Card className="border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback
                className={`bg-gradient-to-r ${avatarGradient} text-white`}
              >
                {avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{primaryInfo}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {secondaryInfo}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {email}
              </p>
              {additionalInfo && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {additionalInfo}
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onReview}>
              <Icon name="eye" size="sm" className="mr-2" />
              Review
            </Button>
            <Button variant="emerald" size="sm" onClick={onApprove}>
              <Icon name="checkCircle" size="sm" className="mr-2" />
              Approve
            </Button>
            <Button variant="destructive" size="sm" onClick={onReject}>
              <Icon name="xCircle" size="sm" className="mr-2" />
              Reject
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
);

ReviewCard.displayName = "ReviewCard";
