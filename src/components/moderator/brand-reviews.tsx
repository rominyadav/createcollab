import { useState } from "react";

import { CheckCircle, Eye, XCircle } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

// Import mock data
import brandMockData from "../mock-data/brand-mockdata.json";
import { BrandProfileReview } from "./brand-profile-review";

interface Brand {
  id: number;
  name: string;
  logo: string;
  industry: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  founded: string;
  employees: string;
  revenue: string;
  status: string;
  verified: boolean;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    district?: string;
    province?: string;
    coordinates?: { lat: number; lng: number };
  };
  documents: {
    panNumber: string;
    vatNumber: string;
    companyRegistration: string;
    registrationNumber: string;
  };
  adminUsers: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
    phone: string;
    avatar: string;
    isPrimary: boolean;
  }>;
  billing: {
    plan: string;
    subscriptionType: string;
    subscriptionExpiry: string;
    monthlyAmount: number;
    currency: string;
    paymentMethod: string;
    lastBillingDate: string;
    nextBillingDate: string;
  };
  depositRequests: Array<{
    id: number;
    amount: number;
    currency: string;
    status: string;
    requestedDate: string;
    approvedDate?: string;
    purpose: string;
    adminUser: string;
  }>;
  coupons: Array<{
    id: number;
    code: string;
    discount: string;
    type: string;
    validFrom: string;
    validUntil: string;
    maxUses: number;
    usedCount: number;
    minOrderAmount: number;
    status: string;
  }>;
  creatorCollaborations: Array<{
    creatorId: number;
    creatorName: string;
    creatorAvatar: string;
    campaigns: number;
    totalSpent: number;
    lastCollaboration: string;
    rating: number;
  }>;
  submitted: string;
  campaigns: Array<{
    id: number;
    title: string;
    budget: number;
    status: string;
    startDate: string;
    endDate: string;
  }>;
}

// Use mock data from JSON file and filter pending brands
const pendingBrands: Brand[] = brandMockData.filter(
  (brand) => brand.status === "pending"
);

export function BrandReviews() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const handleApproval = (brandId: number, action: "approve" | "reject") => {
    console.log(`Brand ${brandId} ${action}d`);
    // In real app, you'd update the state properly
    setSelectedBrand(null); // Close the review modal
  };

  const handleReviewClick = (brand: Brand) => {
    setSelectedBrand(brand);
  };

  const handleCloseReview = () => {
    setSelectedBrand(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Brand Reviews
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Review and approve brand profile submissions
        </p>
      </div>

      <div className="grid gap-6">
        {pendingBrands.map((brand) => (
          <Card
            key={brand.id}
            className="border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-700"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                      {brand.logo}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {brand.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {brand.industry} • {brand.employees} employees •{" "}
                      {brand.revenue}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {brand.email} • {brand.phone}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {brand.location.city}, {brand.location.state},{" "}
                      {brand.location.country}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Submitted {brand.submitted}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReviewClick(brand)}
                  >
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

      {/* Brand Profile Review Modal */}
      {selectedBrand && (
        <BrandProfileReview
          brand={selectedBrand}
          onApprove={(brandId) => handleApproval(brandId, "approve")}
          onReject={(brandId) => handleApproval(brandId, "reject")}
          onClose={handleCloseReview}
        />
      )}
    </div>
  );
}
