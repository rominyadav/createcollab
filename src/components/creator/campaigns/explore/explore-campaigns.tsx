"use client";

import { useState } from "react";

import {
  Campaign,
  CampaignCard,
  CategoryFilter,
  VerificationNotice,
} from "../shared";

interface ExploreCampaignsProps {
  isVerified: boolean;
  onViewCampaign: (campaign: Campaign) => void;
}

const mockCampaigns: Campaign[] = [
  {
    id: 1,
    title: "Summer Fashion Collection Launch",
    description:
      "Promote our new summer collection with authentic styling videos",
    brandName: "StyleHub Fashion",
    brandLogo: "SH",
    price: 5000,
    currency: "NPR",
    createdDate: "2024-01-15",
    validTillDate: "2024-02-15",
    creatorsSlotRemaining: 3,
    totalSlots: 10,
    category: "Fashion",
    requirements: ["Minimum 10K followers", "Fashion niche creators only"],
    deliverables: ["1 Instagram Reel", "1 TikTok video"],
    status: "active",
  },
  {
    id: 2,
    title: "Tech Product Review Campaign",
    description: "Review our latest smartphone with detailed features showcase",
    brandName: "TechCorp Inc.",
    brandLogo: "TC",
    price: 8000,
    currency: "NPR",
    createdDate: "2024-01-20",
    validTillDate: "2024-02-20",
    creatorsSlotRemaining: 5,
    totalSlots: 8,
    category: "Technology",
    requirements: ["Tech reviewers preferred", "Minimum 5K followers"],
    deliverables: ["1 detailed review video", "Unboxing content"],
    status: "active",
  },
  {
    id: 3,
    title: "Healthy Lifestyle Challenge",
    description: "Promote our fitness app with workout and nutrition content",
    brandName: "FitLife App",
    brandLogo: "FL",
    price: 3500,
    currency: "NPR",
    createdDate: "2024-01-10",
    validTillDate: "2024-02-10",
    creatorsSlotRemaining: 0,
    totalSlots: 15,
    category: "Health & Fitness",
    requirements: ["Fitness/lifestyle creators", "Minimum 8K followers"],
    deliverables: ["Workout videos using app", "App review"],
    status: "full",
  },
];

export function ExploreCampaigns({
  isVerified,
  onViewCampaign,
}: ExploreCampaignsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    "Fashion",
    "Technology",
    "Health & Fitness",
    "Food & Beverage",
    "Beauty & Skincare",
  ];

  const filteredCampaigns = mockCampaigns.filter(
    (campaign) =>
      selectedCategory === "all" || campaign.category === selectedCategory
  );

  return (
    <div className="pb-20 md:pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
        <h1 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
          Explore Campaigns
        </h1>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Campaigns List */}
      <div className="space-y-4 p-4">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onViewCampaign={onViewCampaign}
            isVerified={isVerified}
          />
        ))}
      </div>

      <VerificationNotice isVerified={isVerified} />
    </div>
  );
}
