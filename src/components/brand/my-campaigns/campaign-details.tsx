"use client";

import { useState } from "react";

import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  MessageSquare,
  Play,
  ThumbsDown,
  ThumbsUp,
  Users,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface CampaignSubmission {
  id: number;
  creatorId: number;
  creatorName: string;
  creatorAvatar: string;
  videoTitle: string;
  videoThumbnail: string;
  videoDuration: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected" | "revision_requested";
  feedback?: string;
  deliverables: string[];
}

interface CampaignDetailsProps {
  campaignId: number;
  onClose: () => void;
}

const mockCampaign = {
  id: 1,
  title: "Summer Fashion Collection Launch",
  description:
    "Promote our new summer collection with authentic styling videos showcasing the latest trends and versatile pieces perfect for the summer season.",
  budget: 50000,
  currency: "NPR",
  startDate: "2024-01-15",
  endDate: "2024-02-15",
  status: "active",
  totalSlots: 10,
  filledSlots: 7,
  category: "Fashion",
  requirements: [
    "Minimum 10K followers",
    "Fashion niche creators only",
    "Video duration: 30-60 seconds",
  ],
  deliverables: ["1 Instagram Reel", "1 TikTok video", "Story mentions"],
};

const mockSubmissions: CampaignSubmission[] = [
  {
    id: 1,
    creatorId: 1,
    creatorName: "Sarah Johnson",
    creatorAvatar: "SJ",
    videoTitle: "Summer Fashion Haul - StyleHub Collection",
    videoThumbnail: "/api/placeholder/300/400",
    videoDuration: "0:45",
    submittedDate: "2024-01-22",
    status: "pending",
    deliverables: ["1 Instagram Reel", "Story mentions"],
  },
  {
    id: 2,
    creatorId: 3,
    creatorName: "Emma Wilson",
    creatorAvatar: "EW",
    videoTitle: "Styling Summer Outfits - 5 Looks",
    videoThumbnail: "/api/placeholder/300/400",
    videoDuration: "1:20",
    submittedDate: "2024-01-20",
    status: "approved",
    deliverables: ["1 Instagram Reel", "1 TikTok video", "Story mentions"],
  },
  {
    id: 3,
    creatorId: 5,
    creatorName: "Priya Shrestha",
    creatorAvatar: "PS",
    videoTitle: "Summer Fashion Trends 2024",
    videoThumbnail: "/api/placeholder/300/400",
    videoDuration: "0:58",
    submittedDate: "2024-01-18",
    status: "revision_requested",
    feedback:
      "Great content! Could you add more close-up shots of the accessories? Also, please mention the brand name more prominently.",
    deliverables: ["1 Instagram Reel"],
  },
];

export function CampaignDetails({ campaignId, onClose }: CampaignDetailsProps) {
  const [selectedSubmission, setSelectedSubmission] =
    useState<CampaignSubmission | null>(null);
  const [feedback, setFeedback] = useState("");

  const handleSubmissionAction = (
    submissionId: number,
    action: "approve" | "reject" | "request_revision"
  ) => {
    console.log(`${action} submission ${submissionId}`, { feedback });
    setSelectedSubmission(null);
    setFeedback("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case "revision_requested":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <X className="h-4 w-4" />;
      case "revision_requested":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white dark:bg-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Campaign Details
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
          {/* Campaign Info */}
          <div className="space-y-6 lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Campaign Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {mockCampaign.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {mockCampaign.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Budget:</span>
                    <p className="font-medium">
                      NPR {mockCampaign.budget.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <Badge className="ml-1 bg-emerald-600 text-white">
                      {mockCampaign.status}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-500">Start Date:</span>
                    <p className="font-medium">{mockCampaign.startDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">End Date:</span>
                    <p className="font-medium">{mockCampaign.endDate}</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-gray-500">Creators:</span>
                  <div className="mt-1 flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">
                      {mockCampaign.filledSlots}/{mockCampaign.totalSlots} slots
                      filled
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-gray-500">Requirements:</span>
                  <ul className="mt-1 space-y-1">
                    {mockCampaign.requirements.map((req, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        • {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-sm text-gray-500">Deliverables:</span>
                  <ul className="mt-1 space-y-1">
                    {mockCampaign.deliverables.map((deliverable, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        • {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submissions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Creator Submissions ({mockSubmissions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="rounded-lg border p-4 dark:border-slate-600"
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {submission.creatorAvatar}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {submission.creatorName}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {submission.videoTitle}
                              </p>
                            </div>
                            <Badge
                              className={getStatusColor(submission.status)}
                            >
                              {getStatusIcon(submission.status)}
                              <span className="ml-1 capitalize">
                                {submission.status.replace("_", " ")}
                              </span>
                            </Badge>
                          </div>

                          <div className="mb-3 flex items-center gap-4 text-sm text-gray-500">
                            <span>Duration: {submission.videoDuration}</span>
                            <span>Submitted: {submission.submittedDate}</span>
                          </div>

                          <div className="mb-3">
                            <span className="text-sm text-gray-500">
                              Deliverables completed:
                            </span>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {submission.deliverables.map(
                                (deliverable, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {deliverable}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>

                          {submission.feedback && (
                            <div className="mb-3 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                Feedback:
                              </span>
                              <p className="mt-1 text-sm text-blue-800 dark:text-blue-200">
                                {submission.feedback}
                              </p>
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                console.log("View video", submission.id)
                              }
                            >
                              <Eye className="mr-1 h-4 w-4" />
                              View Video
                            </Button>

                            {submission.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-emerald-600 hover:bg-emerald-700"
                                  onClick={() =>
                                    handleSubmissionAction(
                                      submission.id,
                                      "approve"
                                    )
                                  }
                                >
                                  <ThumbsUp className="mr-1 h-4 w-4" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    setSelectedSubmission(submission)
                                  }
                                >
                                  <MessageSquare className="mr-1 h-4 w-4" />
                                  Review
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {mockSubmissions.length === 0 && (
                    <div className="py-8 text-center">
                      <Play className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                      <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        No submissions yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Creators will submit their content here for review.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Review Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Review Submission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                    Reviewing: {selectedSubmission.videoTitle}
                  </p>
                  <p className="text-sm font-medium">
                    by {selectedSubmission.creatorName}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Feedback (optional)
                  </label>
                  <Textarea
                    placeholder="Provide feedback for the creator..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    onClick={() =>
                      handleSubmissionAction(selectedSubmission.id, "approve")
                    }
                  >
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      handleSubmissionAction(
                        selectedSubmission.id,
                        "request_revision"
                      )
                    }
                  >
                    <MessageSquare className="mr-1 h-4 w-4" />
                    Request Changes
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() =>
                      handleSubmissionAction(selectedSubmission.id, "reject")
                    }
                  >
                    <ThumbsDown className="mr-1 h-4 w-4" />
                    Reject
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setSelectedSubmission(null)}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
