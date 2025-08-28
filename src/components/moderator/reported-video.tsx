import { useEffect, useState } from "react";

import { Calendar, Eye, Flag, MapPin, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ReportedVideo {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  creatorName: string;
  creatorAvatar: string;
  creatorFollowers: string;
  creatorLocation: string;
  status: "pending" | "reviewed" | "dismissed" | "hidden";
  uploadedAt: string;
  videoUrl: string;
  videoLayout: "9:16" | "16:9";
  duration: string;
  category: string;
  tags: string[];
  reports: {
    id: number;
    reporterName: string;
    reportDate: string;
    reason: string;
    severity: "low" | "medium" | "high";
  }[];
  firstReportedOn: string;
}

// Mock data for reported videos
const mockReportedVideos: ReportedVideo[] = [
  {
    id: 1,
    title: "Controversial Political Discussion",
    description:
      "A heated discussion about current political events with strong opinions.",
    thumbnail: "/api/placeholder/300/400",
    creatorName: "Alex Thompson",
    creatorAvatar: "AT",
    creatorFollowers: "15.7K",
    creatorLocation: "Kathmandu, Nepal",
    status: "pending",
    uploadedAt: "2 days ago",
    videoUrl: "https://example.com/video1",
    videoLayout: "16:9",
    duration: "8:45",
    category: "Politics",
    tags: ["politics", "discussion", "controversial"],
    reports: [
      {
        id: 1,
        reporterName: "User123",
        reportDate: "1 hour ago",
        reason: "Hate speech",
        severity: "high",
      },
      {
        id: 2,
        reporterName: "Moderator456",
        reportDate: "30 minutes ago",
        reason: "Misinformation",
        severity: "medium",
      },
    ],
    firstReportedOn: "2 hours ago",
  },
  {
    id: 2,
    title: "Inappropriate Dance Moves",
    description:
      "Dance tutorial with moves that some viewers found inappropriate.",
    thumbnail: "/api/placeholder/300/400",
    creatorName: "Priya Sharma",
    creatorAvatar: "PS",
    creatorFollowers: "28.3K",
    creatorLocation: "Lalitpur, Nepal",
    status: "pending",
    uploadedAt: "1 day ago",
    videoUrl: "https://example.com/video2",
    videoLayout: "9:16",
    duration: "5:32",
    category: "Dance",
    tags: ["dance", "tutorial", "moves"],
    reports: [
      {
        id: 3,
        reporterName: "Parent789",
        reportDate: "3 hours ago",
        reason: "Inappropriate content",
        severity: "medium",
      },
    ],
    firstReportedOn: "3 hours ago",
  },
  {
    id: 3,
    title: "Fake Product Review",
    description:
      "Product review that appears to be misleading and contains false claims.",
    thumbnail: "/api/placeholder/300/400",
    creatorName: "Rahul Kumar",
    creatorAvatar: "RK",
    creatorFollowers: "42.1K",
    creatorLocation: "Pokhara, Nepal",
    status: "pending",
    uploadedAt: "3 days ago",
    videoUrl: "https://example.com/video3",
    videoLayout: "16:9",
    duration: "12:18",
    category: "Product Review",
    tags: ["review", "product", "misleading"],
    reports: [
      {
        id: 4,
        reporterName: "Consumer101",
        reportDate: "5 hours ago",
        reason: "Misleading content",
        severity: "high",
      },
      {
        id: 5,
        reporterName: "BrandRep",
        reportDate: "4 hours ago",
        reason: "False claims",
        severity: "high",
      },
      {
        id: 6,
        reporterName: "Viewer202",
        reportDate: "2 hours ago",
        reason: "Spam",
        severity: "low",
      },
    ],
    firstReportedOn: "5 hours ago",
  },
];

interface ReportedVideoProps {
  onPreview: (video: ReportedVideo) => void;
}

export function ReportedVideo({ onPreview }: ReportedVideoProps) {
  const [statusFilter, setStatusFilter] = useState<
    ReportedVideo["status"] | "all"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 20;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "reviewed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "dismissed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      case "hidden":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Politics":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Dance":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Product Review":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getVideoLayoutIcon = (layout: string) => {
    return layout === "9:16" ? "📱" : "🖥️";
  };

  const filteredVideos = mockReportedVideos.filter((video) => {
    const matchesStatus =
      statusFilter === "all" || video.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || video.category === categoryFilter;
    const matchesSeverity =
      severityFilter === "all" ||
      video.reports.some((report) => report.severity === severityFilter);
    return matchesStatus && matchesCategory && matchesSeverity;
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
  }, [statusFilter, categoryFilter, severityFilter]);

  const categories = [
    ...new Set(mockReportedVideos.map((video) => video.category)),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Reported Video Moderation
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Review and moderate videos that have been reported by users
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
                    e.target.value as ReportedVideo["status"] | "all"
                  )
                }
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="dismissed">Dismissed</option>
                <option value="hidden">Hidden</option>
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

              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="all">All Severity</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {
                  mockReportedVideos.filter((v) => v.status === "pending")
                    .length
                }{" "}
                Pending
              </Badge>
              <Badge variant="outline" className="text-sm">
                {mockReportedVideos.length} Total Reported
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Videos Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

                {/* Reports Badge */}
                <div className="absolute top-2 right-2 flex items-center gap-1 rounded bg-red-500 px-2 py-1 text-xs text-white">
                  <Flag className="h-3 w-3" />
                  {video.reports.length}
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
                    Review
                  </Button>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-3">
                {/* Title */}
                <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 dark:text-white">
                  {video.title}
                </h3>

                {/* Category & Reports Count */}
                <div className="mb-2 flex items-center gap-2">
                  <Badge className={getCategoryColor(video.category)}>
                    {video.category}
                  </Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    •
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    {video.reports.length}{" "}
                    {video.reports.length === 1 ? "report" : "reports"}
                  </Badge>
                </div>

                {/* Tags */}
                <div className="mb-2 flex flex-wrap gap-1">
                  {video.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-slate-700 dark:text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                  {video.tags.length > 2 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{video.tags.length - 2} more
                    </span>
                  )}
                </div>

                {/* Creator Info */}
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-xs font-semibold text-white">
                    {video.creatorAvatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-gray-900 dark:text-white">
                      {video.creatorName}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Users className="h-2 w-2" />
                      <span>{video.creatorFollowers}</span>
                      <MapPin className="h-2 w-2" />
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
            <div className="mb-4 text-4xl">🚫</div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              No reported videos found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters or check back later for new reports.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
