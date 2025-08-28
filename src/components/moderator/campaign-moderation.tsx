import { useState } from "react";

import {
  Calendar,
  CheckCircle,
  DollarSign,
  Eye,
  Gift,
  MapPin,
  Search,
  Users,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { CampaignLayout } from "./campaign-layout";

interface Campaign {
  id: number;
  title: string;
  brand: string;
  brandLogo: string;
  status: "pending" | "approved" | "rejected" | "active" | "completed";
  budget: string;
  rewardType: "cash" | "product" | "coupon" | "mixed";
  targetCreators: number;
  joinedCreators: number;
  location: string;
  category: string;
  createdAt: string;
  validUntil: string;
  description: string;
  ageRange: string;
  gender: string;
  videoScript: string;
  timezone: string;
  campaignAcceptanceUntil: string;
  videoDeliveryUntil: string;
  cashRewardDetails?: string;
}

// Mock data - in real app, this would come from props or context
const mockCampaigns: Campaign[] = [
  {
    id: 1,
    title: "Summer Fashion Collection Launch",
    brand: "StyleHub Fashion",
    brandLogo: "SH",
    status: "pending",
    budget: "$5,000",
    rewardType: "mixed",
    targetCreators: 20,
    joinedCreators: 0,
    location: "Nepal",
    category: "Fashion & Beauty",
    createdAt: "2024-01-15",
    validUntil: "2024-03-15",
    description:
      "Promote our new summer collection featuring vibrant colors and sustainable materials. Creators will showcase different outfits and styling tips.",
    ageRange: "18-35",
    gender: "All",
    videoScript:
      "Create a 60-second video showcasing 3 different summer outfits. Include styling tips and mention the sustainable aspect of our materials.",
    timezone: "Asia/Kathmandu",
    campaignAcceptanceUntil: "2024-02-15",
    videoDeliveryUntil: "2024-03-01",
    cashRewardDetails: "$250 per approved video + 10% commission on sales",
  },
  {
    id: 2,
    title: "Tech Gadget Review Campaign",
    brand: "TechCorp Inc.",
    brandLogo: "TC",
    status: "approved",
    budget: "$8,000",
    rewardType: "product",
    targetCreators: 15,
    joinedCreators: 8,
    location: "Global",
    category: "Technology",
    createdAt: "2024-01-10",
    validUntil: "2024-04-10",
    description:
      "Review our latest smartphone with focus on camera quality, battery life, and gaming performance. Target tech-savvy audience.",
    ageRange: "16-45",
    gender: "All",
    videoScript:
      "Unbox and review the smartphone, test camera in different lighting, demonstrate battery life, and show gaming performance.",
    timezone: "UTC",
    campaignAcceptanceUntil: "2024-02-10",
    videoDeliveryUntil: "2024-03-25",
    cashRewardDetails: "Free smartphone + $100 cash bonus for top 3 reviews",
  },
  {
    id: 3,
    title: "Healthy Food Recipe Challenge",
    brand: "FreshBites",
    brandLogo: "FB",
    status: "active",
    budget: "$3,500",
    rewardType: "cash",
    targetCreators: 25,
    joinedCreators: 18,
    location: "Nepal",
    category: "Food & Health",
    createdAt: "2024-01-05",
    validUntil: "2024-02-28",
    description:
      "Create healthy recipes using our organic ingredients. Focus on quick, nutritious meals that can be prepared in under 30 minutes.",
    ageRange: "25-50",
    gender: "All",
    videoScript:
      "Prepare a healthy meal using our ingredients, explain nutritional benefits, and show cooking process within 30 minutes.",
    timezone: "Asia/Kathmandu",
    campaignAcceptanceUntil: "2024-01-25",
    videoDeliveryUntil: "2024-02-20",
    cashRewardDetails: "$150 per approved recipe video",
  },
  {
    id: 4,
    title: "Fitness Motivation Series",
    brand: "FitLife",
    brandLogo: "FL",
    status: "pending",
    budget: "$6,000",
    rewardType: "mixed",
    targetCreators: 30,
    joinedCreators: 0,
    location: "Global",
    category: "Health & Fitness",
    createdAt: "2024-01-20",
    validUntil: "2024-05-20",
    description:
      "Create motivational fitness content including workout routines, healthy meal prep, and transformation stories.",
    ageRange: "18-40",
    gender: "All",
    videoScript:
      "Share your fitness journey, demonstrate a workout routine, and provide motivation for viewers to start their fitness journey.",
    timezone: "UTC",
    campaignAcceptanceUntil: "2024-02-20",
    videoDeliveryUntil: "2024-04-20",
    cashRewardDetails:
      "$200 per video + free fitness equipment + exclusive gym membership",
  },
  {
    id: 5,
    title: "Travel Destination Showcase",
    brand: "Wanderlust Tours",
    brandLogo: "WT",
    status: "rejected",
    budget: "$4,500",
    rewardType: "mixed",
    targetCreators: 12,
    joinedCreators: 0,
    location: "Nepal",
    category: "Travel & Tourism",
    createdAt: "2024-01-08",
    validUntil: "2024-06-08",
    description:
      "Showcase beautiful destinations in Nepal, local culture, and travel tips for tourists visiting the country.",
    ageRange: "21-55",
    gender: "All",
    videoScript:
      "Visit a tourist destination, showcase local culture, provide travel tips, and highlight unique experiences.",
    timezone: "Asia/Kathmandu",
    campaignAcceptanceUntil: "2024-02-08",
    videoDeliveryUntil: "2024-05-08",
    cashRewardDetails:
      "$300 per video + sponsored travel to featured destination",
  },
  {
    id: 6,
    title: "Educational Content Series",
    brand: "LearnHub",
    brandLogo: "LH",
    status: "completed",
    budget: "$7,000",
    rewardType: "cash",
    targetCreators: 20,
    joinedCreators: 20,
    location: "Global",
    category: "Education",
    createdAt: "2023-12-01",
    validUntil: "2024-01-31",
    description:
      "Create educational content on various subjects including math, science, history, and language learning.",
    ageRange: "13-25",
    gender: "All",
    videoScript:
      "Create an engaging educational video on any subject, make it interactive and easy to understand for students.",
    timezone: "UTC",
    campaignAcceptanceUntil: "2023-12-31",
    videoDeliveryUntil: "2024-01-15",
    cashRewardDetails: "$350 per approved educational video",
  },
];

const itemsPerPage = 5;

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200";
    case "approved":
      return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200";
    case "rejected":
      return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200";
    case "active":
      return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200";
    case "completed":
      return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
    default:
      return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
  }
};

const getRewardTypeIcon = (type: string) => {
  switch (type) {
    case "cash":
      return <DollarSign className="h-4 w-4" />;
    case "product":
      return <Gift className="h-4 w-4" />;
    case "coupon":
      return <Gift className="h-4 w-4" />;
    case "mixed":
      return (
        <div className="flex gap-1">
          <DollarSign className="h-3 w-3" />
          <Gift className="h-3 w-3" />
        </div>
      );
    default:
      return <Gift className="h-4 w-4" />;
  }
};

export function CampaignModeration() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Campaign["status"] | "all">(
    "all"
  );
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || campaign.status === statusFilter;
    const matchesCategory =
      !categoryFilter || campaign.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCampaigns = filteredCampaigns.slice(startIndex, endIndex);

  const handleReview = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleApproval = (campaignId: number, action: "approve" | "reject") => {
    // In real app, this would update the backend
    console.log(`Campaign ${campaignId} ${action}d`);
    // Update local state
    const updatedCampaigns = mockCampaigns.map((campaign) =>
      campaign.id === campaignId
        ? {
            ...campaign,
            status: action === "approve" ? "approved" : "rejected",
          }
        : campaign
    );
    // In real app, you'd update the state properly
    console.log("Updated campaigns:", updatedCampaigns);
  };

  const categories = [
    ...new Set(mockCampaigns.map((campaign) => campaign.category)),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Campaign Moderation
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Review and manage campaign submissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {mockCampaigns.filter((c) => c.status === "pending").length} Pending
          </Badge>
          <Badge variant="outline" className="text-sm">
            {mockCampaigns.filter((c) => c.status === "active").length} Active
          </Badge>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-700">
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search campaigns by title, brand, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as
                      | "all"
                      | "pending"
                      | "approved"
                      | "rejected"
                      | "active"
                      | "completed"
                  )
                }
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Campaigns List */}
      <Card className="border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-700">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                    Reward
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                    Creators
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-slate-600 dark:bg-slate-700">
                {currentCampaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-600"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-sm font-semibold text-white">
                            {campaign.brandLogo}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {campaign.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {campaign.category}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-400">
                            <Calendar className="h-3 w-3" />
                            {campaign.createdAt}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {campaign.brand}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-300">
                        <MapPin className="h-3 w-3" />
                        {campaign.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status.charAt(0).toUpperCase() +
                          campaign.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {campaign.budget}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getRewardTypeIcon(campaign.rewardType)}
                        <span className="text-sm text-gray-900 capitalize dark:text-white">
                          {campaign.rewardType}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {campaign.joinedCreators}/{campaign.targetCreators}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReview(campaign)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          Review
                        </Button>
                        {campaign.status === "pending" && (
                          <>
                            <Button
                              variant="emerald"
                              size="sm"
                              onClick={() =>
                                handleApproval(campaign.id, "approve")
                              }
                            >
                              <CheckCircle className="h-4 w-4" />
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                handleApproval(campaign.id, "reject")
                              }
                            >
                              <XCircle className="h-4 w-4" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredCampaigns.length)} of{" "}
                {filteredCampaigns.length} results
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-10"
                    >
                      {page}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campaign Review Modal */}
      {selectedCampaign && (
        <CampaignLayout
          campaign={selectedCampaign}
          onApprove={(campaignId) => {
            handleApproval(campaignId, "approve");
            setSelectedCampaign(null);
          }}
          onReject={(campaignId) => {
            handleApproval(campaignId, "reject");
            setSelectedCampaign(null);
          }}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </div>
  );
}
