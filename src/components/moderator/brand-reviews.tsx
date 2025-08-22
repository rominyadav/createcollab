import { CheckCircle, Eye, XCircle } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

interface Brand {
  id: number;
  name: string;
  industry: string;
  employees: string;
  submitted: string;
  status: "pending" | "approved" | "rejected";
}

// Mock data - in real app, this would come from props or context
const pendingBrands: Brand[] = [
  {
    id: 1,
    name: "TechCorp Inc.",
    industry: "Technology",
    employees: "500-1000",
    submitted: "3 hours ago",
    status: "pending",
  },
  {
    id: 2,
    name: "StyleHub",
    industry: "Fashion",
    employees: "50-100",
    submitted: "1 day ago",
    status: "pending",
  },
];

export function BrandReviews() {
  const handleApproval = (brandId: number, action: "approve" | "reject") => {
    console.log(`Brand ${brandId} ${action}d`);
    // In real app, you'd update the state properly
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Brand Reviews</h2>
        <p className="text-gray-600">
          Review and approve brand profile submissions
        </p>
      </div>

      <div className="grid gap-6">
        {pendingBrands.map((brand) => (
          <Card key={brand.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                      {brand.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{brand.name}</h3>
                    <p className="text-gray-600">
                      {brand.industry} • {brand.employees} employees
                    </p>
                    <p className="text-sm text-gray-500">
                      Submitted {brand.submitted}
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
                    onClick={() => handleApproval(brand.id, "approve")}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleApproval(brand.id, "reject")}
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
