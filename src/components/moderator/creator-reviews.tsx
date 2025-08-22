import { CheckCircle, Eye, XCircle } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

interface Creator {
  id: number;
  name: string;
  followers: string;
  category: string;
  submitted: string;
  status: "pending" | "approved" | "rejected";
  email: string;
  bio: string;
  socialLinks: string[];
}

// Mock data - in real app, this would come from props or context
const pendingCreators: Creator[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    followers: "12.5K",
    category: "Fashion",
    submitted: "2 hours ago",
    status: "pending",
    email: "sarah.j@email.com",
    bio: "Fashion enthusiast sharing latest trends and style tips",
    socialLinks: ["@sarahfashion", "sarahfashion.com"],
  },
  {
    id: 2,
    name: "Mike Chen",
    followers: "8.2K",
    category: "Tech",
    submitted: "5 hours ago",
    status: "pending",
    email: "mike.chen@email.com",
    bio: "Tech reviewer and gadget enthusiast",
    socialLinks: ["@miketech", "miketechreviews.com"],
  },
  {
    id: 3,
    name: "Emma Wilson",
    followers: "45.1K",
    category: "Lifestyle",
    submitted: "1 day ago",
    status: "pending",
    email: "emma.w@email.com",
    bio: "Lifestyle blogger sharing daily inspiration and tips",
    socialLinks: ["@emmalifestyle", "emmalifestyle.com"],
  },
];

export function CreatorReviews() {
  const handleApproval = (creatorId: number, action: "approve" | "reject") => {
    console.log(`Creator ${creatorId} ${action}d`);
    // In real app, you'd update the state properly
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
                      {creator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {creator.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {creator.followers} followers • {creator.category}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Submitted {creator.submitted}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {creator.email}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
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
    </div>
  );
}
