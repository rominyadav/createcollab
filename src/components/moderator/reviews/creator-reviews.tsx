import { useCallback, useMemo, useState } from "react";

import creatorMockData from "../../mock-data/creator-mockdata.json";
import { CreatorProfileReview } from "../creator-profile-review";
import { ReviewCard } from "../shared";

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
  pricing: Record<
    string,
    { type: "fixed" | "range"; amount?: number; min?: number; max?: number }
  >;
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

export function CreatorReviews() {
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  const pendingCreators = useMemo(
    () =>
      creatorMockData
        .filter((creator) => creator.status === "pending")
        .map((creator) => ({ ...creator, verified: false })),
    []
  );

  const handleApproval = useCallback(
    (creatorId: number, action: "approve" | "reject") => {
      console.log(`Creator ${creatorId} ${action}d`);
      setSelectedCreator(null);
    },
    []
  );

  const handleReviewClick = useCallback((creator: Creator) => {
    setSelectedCreator(creator);
  }, []);

  const handleCloseReview = useCallback(() => {
    setSelectedCreator(null);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Creator Reviews
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Review and approve creator profile submissions
        </p>
      </div>

      <div className="grid gap-6">
        {pendingCreators.map((creator) => (
          <ReviewCard
            key={creator.id}
            id={creator.id}
            name={creator.name}
            avatar={creator.avatar}
            primaryInfo={`${creator.followers} followers • ${creator.niche}`}
            secondaryInfo="Submitted Recently"
            email={creator.email}
            onReview={() => handleReviewClick(creator as any)}
            onApprove={() => handleApproval(creator.id, "approve")}
            onReject={() => handleApproval(creator.id, "reject")}
          />
        ))}
      </div>

      {selectedCreator && (
        <CreatorProfileReview
          creator={selectedCreator as any}
          onApprove={(creatorId) => handleApproval(creatorId, "approve")}
          onReject={(creatorId) => handleApproval(creatorId, "reject")}
          onClose={handleCloseReview}
        />
      )}
    </div>
  );
}
