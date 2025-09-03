"use client";

import { useState } from "react";

import { Search, Users } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/user-ui/page-header";

import creatorMockData from "../../mock-data/creator-mockdata.json";
import { BrandCreatorProfileView } from "./brand-creator-profile-view";

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
    { type: string; amount?: number; min?: number; max?: number }
  >;
  shippingAddress: string;
  profileCompletion: string;
  status: string;
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

interface CreatorSearchProps {
  brandId: number;
}

const mockCreators: Creator[] = creatorMockData;

export function CreatorSearch({ brandId }: CreatorSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  const niches = [
    "Fashion",
    "Tech",
    "Lifestyle",
    "Food",
    "Beauty",
    "Travel",
    "Fitness",
  ];

  const filteredCreators = mockCreators.filter((creator) => {
    const matchesSearch =
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.bio.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesNiche = !selectedNiche || creator.niche === selectedNiche;

    return matchesSearch && matchesNiche && creator.status === "approved";
  });

  const handleViewProfile = (creator: Creator) => {
    setSelectedCreator(creator);
  };

  const handleCloseProfile = () => {
    setSelectedCreator(null);
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

  return (
    <div className="pb-20 md:pb-8">
      <PageHeader title="Search Creators" />

      <div className="space-y-6 p-4">
        {/* Search and Filters */}
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search creators by name, niche, or bio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={selectedNiche === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedNiche("")}
                className={`whitespace-nowrap ${
                  selectedNiche === ""
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700"
                }`}
              >
                All Niches
              </Button>
              {niches.map((niche) => (
                <Button
                  key={niche}
                  variant={selectedNiche === niche ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedNiche(niche)}
                  className={`whitespace-nowrap ${
                    selectedNiche === niche
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {niche}
                </Button>
              ))}
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredCreators.length} creators found
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {filteredCreators.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                  No creators found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search criteria or filters.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredCreators.map((creator) => (
              <Card
                key={creator.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-lg font-bold text-white">
                        {creator.avatar}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {creator.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {creator.niche} Creator
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {creator.verified && (
                            <Badge className="bg-blue-600 text-white">
                              ✓ Verified
                            </Badge>
                          )}
                          <Badge className={getStatusColor(creator.status)}>
                            {creator.status}
                          </Badge>
                        </div>
                      </div>

                      <p className="mb-3 line-clamp-2 text-sm text-gray-700 dark:text-gray-300">
                        {creator.bio}
                      </p>

                      <div className="mb-3 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>{creator.followers} followers</span>
                        <span>{creator.engagement} engagement</span>
                        <span>Score: {creator.creatorScore}/100</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {creator.location.city}, {creator.location.country}
                        </div>
                        <Button
                          onClick={() => handleViewProfile(creator)}
                          className="bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Creator Profile Modal */}
      {selectedCreator && (
        <BrandCreatorProfileView
          creator={selectedCreator}
          brandId={brandId}
          onClose={handleCloseProfile}
        />
      )}
    </div>
  );
}
