import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

interface CampaignVideo {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  campaignType: "Review" | "Unboxing" | "Brand Collaboration" | "Pro";
  campaignTitle: string;
  creatorName: string;
  creatorAvatar: string;
  creatorFollowers: string;
  creatorLocation: string;
  status: "pending" | "approved" | "rejected";
  uploadedAt: string;
  videoUrl: string;
  videoLayout: "9:16" | "16:9";
  duration: string;
}

// Mock data for campaign videos
const mockCampaignVideos: CampaignVideo[] = [
  {
    id: 1,
    title: "iPhone 15 Pro Max Review - Is it Worth It?",
    description:
      "Comprehensive review of the latest iPhone with camera tests, performance benchmarks, and real-world usage.",
    thumbnail: "/api/placeholder/300/400",
    campaignType: "Review",
    campaignTitle: "Tech Gadget Review Campaign",
    creatorName: "Mike Chen",
    creatorAvatar: "MC",
    creatorFollowers: "8.2K",
    creatorLocation: "Pokhara, Nepal",
    status: "pending",
    uploadedAt: "2 hours ago",
    videoUrl: "https://www.youtube.com/shorts/GY9eWaZNnJo",
    videoLayout: "9:16",
    duration: "4:32",
  },
  {
    id: 2,
    title: "Summer Fashion Haul - Sustainable Brands",
    description:
      "Showcasing eco-friendly summer fashion with styling tips and sustainable fashion advice.",
    thumbnail: "/api/placeholder/300/400",
    campaignType: "Brand Collaboration",
    campaignTitle: "Summer Fashion Collection Launch",
    creatorName: "Sarah Johnson",
    creatorAvatar: "SJ",
    creatorFollowers: "12.5K",
    creatorLocation: "Kathmandu, Nepal",
    status: "pending",
    uploadedAt: "5 hours ago",
    videoUrl: "https://example.com/video2",
    videoLayout: "16:9",
    duration: "6:15",
  },
  {
    id: 3,
    title: "Healthy Breakfast Recipes - Quick & Nutritious",
    description:
      "Three easy breakfast recipes that can be prepared in under 15 minutes using organic ingredients.",
    thumbnail: "/api/placeholder/300/400",
    campaignType: "Pro",
    campaignTitle: "Healthy Food Recipe Challenge",
    creatorName: "Emma Wilson",
    creatorAvatar: "EW",
    creatorFollowers: "45.1K",
    creatorLocation: "Lalitpur, Nepal",
    status: "pending",
    uploadedAt: "1 day ago",
    videoUrl: "https://example.com/video3",
    videoLayout: "9:16",
    duration: "8:42",
  },
  {
    id: 4,
    title: "Fitness Motivation - 30-Day Challenge",
    description:
      "Motivational fitness content with workout routines and transformation stories to inspire viewers.",
    thumbnail: "/api/placeholder/300/400",
    campaignType: "Brand Collaboration",
    campaignTitle: "Fitness Motivation Series",
    creatorName: "Raj Sharma",
    creatorAvatar: "RS",
    creatorFollowers: "22.3K",
    creatorLocation: "Biratnagar, Nepal",
    status: "pending",
    uploadedAt: "2 days ago",
    videoUrl: "https://example.com/video4",
    videoLayout: "16:9",
    duration: "5:18",
  },
  {
    id: 5,
    title: "Quick & Easy Momo Recipe",
    description:
      "Step-by-step guide to making authentic Nepali momos with a special chutney recipe.",
    thumbnail: "/api/placeholder/300/400",
    campaignType: "Brand Collaboration",
    campaignTitle: "Taste of Nepal",
    creatorName: "Anita Gurung",
    creatorAvatar: "AG",
    creatorFollowers: "45.1K",
    creatorLocation: "Kathmandu, Nepal",
    status: "approved",
    uploadedAt: "1 day ago",
    videoUrl: "https://example.com/video5",
    videoLayout: "9:16",
    duration: "0:58",
  },
  {
    id: 6,
    title: "Himalayan Sunrise - Timelapse",
    description:
      "A breathtaking 4K timelapse of the sun rising over the Annapurna mountain range.",
    thumbnail: "/api/placeholder/300/400",
    campaignType: "Review",
    campaignTitle: "Visit Nepal 2023",
    creatorName: "Bikram Thapa",
    creatorAvatar: "BT",
    creatorFollowers: "18.7K",
    creatorLocation: "Pokhara, Nepal",
    status: "pending",
    uploadedAt: "3 days ago",
    videoUrl: "https://example.com/video6",
    videoLayout: "16:9",
    duration: "2:15",
  },
  {
    id: 7,
    title: "My Morning Skincare Routine",
    description:
      "Sharing my affordable and effective daily skincare products for glowing skin.",
    thumbnail: "/api/placeholder/300/400",
    campaignType: "Review",
    campaignTitle: "Glow Up Secrets",
    creatorName: "Priya Joshi",
    creatorAvatar: "PJ",
    creatorFollowers: "89.4K",
    creatorLocation: "Lalitpur, Nepal",
    status: "rejected",
    uploadedAt: "1 week ago",
    videoUrl: "https://example.com/video7",
    videoLayout: "9:16",
    duration: "1:22",
  },
  {
    id: 8,
    title: "Street Food Tour of Kathmandu",
    description:
      "Exploring the best street food spots in Ason and Indrachowk, from chatpate to juju dhau.",
    thumbnail: "/api/placeholder/300/400",
    campaignType: "Brand Collaboration",
    campaignTitle: "Nepali Bites",
    creatorName: "Suman Khadka",
    creatorAvatar: "SK",
    creatorFollowers: "120.5K",
    creatorLocation: "Kathmandu, Nepal",
    status: "approved",
    uploadedAt: "4 days ago",
    videoUrl: "https://example.com/video8",
    videoLayout: "16:9",
    duration: "12:47",
  },
  {
    id: 9,
    title: "POV: Hiking to Namche Bazaar",
    description:
      "A first-person view of the stunning trek from Lukla to Namche Bazaar on the way to Everest Base Camp.",
    thumbnail: "/api/placeholder/300/400",
    campaignType: "Review",
    campaignTitle: "Himalayan Diaries",
    creatorName: "Tenzing Sherpa",
    creatorAvatar: "TS",
    creatorFollowers: "33.8K",
    creatorLocation: "Solukhumbu, Nepal",
    status: "pending",
    uploadedAt: "5 days ago",
    videoUrl: "https://example.com/video9",
    videoLayout: "9:16",
    duration: "0:45",
  },
  {
    id: 10,
    title: "DIY Traditional Nepali Jewelry",
    description:
      "Crafting a beautiful 'Naugedi' necklace and 'Tilhari' using traditional methods passed down through generations.",
    thumbnail: "/api/placeholder/300/400",
    campaignType: "Brand Collaboration",
    campaignTitle: "Nepali Heritage Crafts",
    creatorName: "Laxmi Maharjan",
    creatorAvatar: "LM",
    creatorFollowers: "15.2K",
    creatorLocation: "Bhaktapur, Nepal",
    status: "approved",
    uploadedAt: "Just now",
    videoUrl: "https://example.com/video10",
    videoLayout: "16:9",
    duration: "8:31",
  },
];

interface CampaignVideoProps {
  onPreview: (video: CampaignVideo) => void;
}

export function CampaignVideo({ onPreview }: CampaignVideoProps) {
  const [statusFilter, setStatusFilter] = useState<
    CampaignVideo["status"] | "all"
  >("all");
  const [campaignTypeFilter, setCampaignTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 15;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200";
      case "approved":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200";
      case "rejected":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
    }
  };

  const getCampaignTypeColor = (type: string) => {
    switch (type) {
      case "Review":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200";
      case "Unboxing":
        return "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200";
      case "Brand Collaboration":
        return "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200";
      case "Pro":
        return "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
    }
  };

  const getVideoLayoutIcon = (layout: string) => {
    return layout === "9:16" ? "📱" : "🖥️";
  };

  const filteredVideos = mockCampaignVideos.filter((video) => {
    const matchesStatus =
      statusFilter === "all" || video.status === statusFilter;
    const matchesType =
      campaignTypeFilter === "all" || video.campaignType === campaignTypeFilter;
    return matchesStatus && matchesType;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const currentVideos = filteredVideos.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, campaignTypeFilter]);

  const campaignTypes = [
    ...new Set(mockCampaignVideos.map((video) => video.campaignType)),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Campaign Video Moderation
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Review videos uploaded through campaigns by creators
        </p>
      </div>

      {/* Filters */}
      <Card className="border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-700">
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as CampaignVideo["status"] | "all"
                  )
                }
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={campaignTypeFilter}
                onChange={(e) => setCampaignTypeFilter(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="all">All Campaign Types</option>
                {campaignTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {
                  mockCampaignVideos.filter((v) => v.status === "pending")
                    .length
                }{" "}
                Pending
              </Badge>
              <Badge variant="outline" className="text-sm">
                {
                  mockCampaignVideos.filter((v) => v.status === "approved")
                    .length
                }{" "}
                Approved
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Videos Grid */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {currentVideos.map((video) => (
          <Card
            key={video.id}
            className="group border-gray-200 bg-white transition-all duration-200 hover:shadow-lg dark:border-slate-600 dark:bg-slate-700"
          >
            <CardContent className="p-0">
              {/* Video Thumbnail */}
              <div className="relative">
                <div className="flex aspect-[9/16] w-full items-center justify-center rounded-t-lg bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-600 dark:to-slate-700">
                  <div className="text-center">
                    <div className="mb-2 text-4xl">🎬</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Video Thumbnail
                    </div>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute right-2 bottom-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                  {video.duration}
                </div>

                {/* Layout Indicator */}
                <div className="absolute top-2 left-2 flex items-center gap-1 rounded bg-white/90 px-2 py-1 text-xs text-black">
                  <span>{getVideoLayoutIcon(video.videoLayout)}</span>
                  {video.videoLayout}
                </div>

                {/* Preview Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/20 group-hover:opacity-100">
                  <Button
                    onClick={() => onPreview(video)}
                    variant="emerald"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Icon name="eye" size="sm" />
                    Preview
                  </Button>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                {/* Title */}
                <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 dark:text-white">
                  {video.title}
                </h3>

                {/* Campaign Type & Title */}
                <div className="mb-3 flex items-center gap-2">
                  <Badge className={getCampaignTypeColor(video.campaignType)}>
                    {video.campaignType}
                  </Badge>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="line-clamp-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {video.campaignTitle}
                  </span>
                </div>

                {/* Creator Info */}
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-xs font-semibold text-white">
                    {video.creatorAvatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {video.creatorName}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Icon name="users" size="xs" />
                      <span>{video.creatorFollowers}</span>
                      <Icon name="mapPin" size="xs" />
                      <span className="truncate">{video.creatorLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Upload Time */}
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(video.status)}>
                    {video.status.charAt(0).toUpperCase() +
                      video.status.slice(1)}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Icon name="calendar" size="xs" />
                    <span>{video.uploadedAt}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "emerald" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="h-10 w-10"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mb-4 text-4xl">🎬</div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              No videos found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters or check back later for new
              submissions.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
