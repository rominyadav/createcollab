import { useState } from "react";

import { CheckCircle, Eye, XCircle } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

// Import mock data
import creatorMockData from "../mock-data/creator-mockdata.json";
import { CreatorProfileReview } from "./creator-profile-review";

// Define Creator interface locally since the JSON import doesn't export types
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
  pricing: any;
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
  location: any;
  engagement: string;
  videos: any[];
}

// Use mock data from JSON file and ensure all creators in review are not verified
const pendingCreators: Creator[] = creatorMockData
  .filter((creator) => creator.status === "pending")
  .map((creator) => ({
    ...creator,
    verified: false, // All creators in review section should not be verified
  }));

export function CreatorReviews() {
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  const handleApproval = (creatorId: number, action: "approve" | "reject") => {
    console.log(`Creator ${creatorId} ${action}d`);
    // In real app, you'd update the state properly
    setSelectedCreator(null); // Close the review modal
  };

  const handleReviewClick = (creator: Creator) => {
    setSelectedCreator(creator);
  };

  const handleCloseReview = () => {
    setSelectedCreator(null);
  };

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
          <Card
            key={creator.id}
            className="border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-700"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">
                      {creator.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {creator.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {creator.followers} followers • {creator.niche}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Submitted Recently
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {creator.email}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReviewClick(creator)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Review
                  </Button>
                  <Button
                    variant="emerald"
                    size="sm"
                    onClick={() => handleApproval(creator.id, "approve")}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleApproval(creator.id, "reject")}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Creator Profile Review Modal */}
      {selectedCreator && (
        <CreatorProfileReview
          creator={selectedCreator}
          onApprove={(creatorId) => handleApproval(creatorId, "approve")}
          onReject={(creatorId) => handleApproval(creatorId, "reject")}
          onClose={handleCloseReview}
        />
      )}
    </div>
  );
}
