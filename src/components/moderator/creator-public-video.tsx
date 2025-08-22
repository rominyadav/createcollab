import { useEffect, useState } from "react";

import { Calendar, Eye, MapPin, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CreatorPublicVideo {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  creatorName: string;
  creatorAvatar: string;
  creatorFollowers: string;
  creatorLocation: string;
  status: "pending" | "approved" | "rejected";
  uploadedAt: string;
  videoUrl: string;
  videoLayout: "9:16" | "16:9";
  duration: string;
  reports: number;
  reportReason?: string;
  category: string;
  tags: string[];
}

// Mock data for creator public videos
const mockCreatorPublicVideos: CreatorPublicVideo[] = [
  {
    id: 1,
    title: "My Daily Routine - Productivity Tips",
    description:
      "Sharing my morning routine and productivity hacks that help me stay focused throughout the day.",
    thumbnail: "/api/placeholder/300/400",
    creatorName: "Alex Thompson",
    creatorAvatar: "AT",
    creatorFollowers: "15.7K",
    creatorLocation: "Kathmandu, Nepal",
    status: "pending",
    uploadedAt: "1 hour ago",
    videoUrl: "https://example.com/video1",
    videoLayout: "9:16",
    duration: "7:23",

    category: "Lifestyle",
    tags: ["productivity", "routine", "tips"],
  },
  {
    id: 2,
    title: "Street Food Tour - Kathmandu Edition",
    description:
      "Exploring the best street food spots in Kathmandu with local recommendations and food reviews.",
    thumbnail: "/api/placeholder/300/400",
    creatorName: "Priya Sharma",
    creatorAvatar: "PS",
    creatorFollowers: "28.3K",
    creatorLocation: "Lalitpur, Nepal",
    status: "pending",
    uploadedAt: "3 hours ago",
    videoUrl: "https://example.com/video2",
    videoLayout: "16:9",
    duration: "12:45",
    category: "Food & Travel",
    tags: ["street food", "kathmandu", "food tour", "nepal"],
  },
  {
    id: 3,
    title: "Gaming Highlights - Epic Wins & Fails",
    description:
      "Compilation of my best gaming moments, epic wins, and hilarious fails from various games.",
    thumbnail: "/api/placeholder/300/400",
    creatorName: "Rahul Kumar",
    creatorAvatar: "RK",
    creatorFollowers: "42.1K",
    creatorLocation: "Pokhara, Nepal",
    status: "pending",
    uploadedAt: "6 hours ago",
    videoUrl: "https://example.com/video3",
    videoLayout: "16:9",
    duration: "18:32",
    category: "Gaming",
    tags: ["gaming", "highlights", "wins", "fails"],
  },
  {
    id: 4,
    title: "DIY Home Decoration Ideas",
    description:
      "Creative and budget-friendly home decoration ideas using recycled materials and simple techniques.",
    thumbnail: "/api/placeholder/300/400",
    creatorName: "Maya Patel",
    creatorAvatar: "MP",
    creatorFollowers: "19.8K",
    creatorLocation: "Biratnagar, Nepal",
    status: "pending",
    uploadedAt: "1 day ago",
    videoUrl: "https://example.com/video4",
    videoLayout: "9:16",
    duration: "9:15",
    category: "Home & DIY",
    tags: ["diy", "home decoration", "crafts", "budget"],
  },
];

interface CreatorPublicVideoProps {
  onPreview: (video: CreatorPublicVideo) => void;
}

export function CreatorPublicVideo({ onPreview }: CreatorPublicVideoProps) {
  const [statusFilter, setStatusFilter] = useState<
    CreatorPublicVideo["status"] | "all"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 15;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Lifestyle":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "Food & Travel":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
      case "Gaming":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
      case "Home & DIY":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getVideoLayoutIcon = (layout: string) => {
    return layout === "9:16" ? "📱" : "🖥️";
  };

  const filteredVideos = mockCreatorPublicVideos.filter((video) => {
    const matchesStatus =
      statusFilter === "all" || video.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || video.category === categoryFilter;
    return matchesStatus && matchesCategory;
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
  }, [statusFilter, categoryFilter]);

  const categories = [
    ...new Set(mockCreatorPublicVideos.map((video) => video.category)),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Creator Public Video Moderation
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Review and moderate public videos uploaded by creators
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
                    e.target.value as CreatorPublicVideo["status"] | "all"
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
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {
                  mockCreatorPublicVideos.filter((v) => v.status === "pending")
                    .length
                }{" "}
                Pending
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
                    <Eye className="h-4 w-4" />
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

                {/* Category & Tags */}
                <div className="mb-3 flex items-center gap-2">
                  <Badge className={getCategoryColor(video.category)}>
                    {video.category}
                  </Badge>
                </div>

                {/* Tags */}
                <div className="mb-3 flex flex-wrap gap-1">
                  {video.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-slate-700 dark:text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                  {video.tags.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{video.tags.length - 3} more
                    </span>
                  )}
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
                      <Users className="h-3 w-3" />
                      <span>{video.creatorFollowers}</span>
                      <MapPin className="h-3 w-3" />
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
                    <Calendar className="h-3 w-3" />
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
