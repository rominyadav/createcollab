import { CheckCircle, Eye, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

interface ReportedVideo {
  id: number;
  title: string;
  creator: string;
  reports: number;
  reason: string;
  submitted: string;
}

// Mock data - in real app, this would come from props or context
const reportedVideos: ReportedVideo[] = [
  {
    id: 1,
    title: "Product Review - Latest Smartphone",
    creator: "Mike Chen",
    reports: 3,
    reason: "Misleading content",
    submitted: "1 hour ago",
  },
  {
    id: 2,
    title: "Fashion Haul Summer 2025",
    creator: "Sarah Johnson",
    reports: 1,
    reason: "Inappropriate content",
    submitted: "3 hours ago",
  },
];

export function VideoModeration() {
  const handleAction = (videoId: number, action: "approve" | "remove") => {
    console.log(`Video ${videoId} ${action}d`);
    // In real app, you'd update the state properly
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Video Moderation</h2>
        <p className="text-gray-600">
          Review and moderate reported video content
        </p>
      </div>

      <div className="grid gap-6">
        {reportedVideos.map((video) => (
          <Card key={video.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{video.title}</h3>
                  <p className="text-gray-600">by {video.creator}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <Badge variant="destructive" className="text-xs">
                      {video.reports} reports
                    </Badge>
                    <span className="text-sm text-gray-500">
                      Reason: {video.reason}
                    </span>
                    <span className="text-sm text-gray-500">
                      Reported {video.submitted}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Watch
                  </Button>
                  <Button
                    variant="emerald"
                    size="sm"
                    onClick={() => handleAction(video.id, "approve")}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleAction(video.id, "remove")}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
