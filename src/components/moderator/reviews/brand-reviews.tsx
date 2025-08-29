import { useCallback, useMemo, useState } from "react";

import brandMockData from "../../mock-data/brand-mockdata.json";
import { BrandProfileReview } from "../brand-profile-review";
import { ReviewCard } from "../shared";

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

export function BrandReviews() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const pendingBrands = useMemo(
    () => brandMockData.filter((brand) => brand.status === "pending"),
    []
  );

  const handleApproval = useCallback(
    (brandId: number, action: "approve" | "reject") => {
      console.log("Brand approval action", { brandId, action });
      setSelectedBrand(null);
    },
    []
  );

  const handleReviewClick = useCallback((brand: Brand) => {
    setSelectedBrand(brand);
  }, []);

  const handleCloseReview = useCallback(() => {
    setSelectedBrand(null);
  }, []);

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
          <ReviewCard
            key={brand.id}
            id={brand.id}
            name={brand.name}
            avatar={brand.logo}
            primaryInfo={`${brand.industry} • ${brand.employees} employees • ${brand.revenue}`}
            secondaryInfo={`${brand.email} • ${brand.phone}`}
            email={`${brand.location.city}, ${brand.location.state}, ${brand.location.country}`}
            additionalInfo={`Submitted ${brand.submitted}`}
            onReview={() => handleReviewClick(brand as any)}
            onApprove={() => handleApproval(brand.id, "approve")}
            onReject={() => handleApproval(brand.id, "reject")}
            avatarGradient="from-green-400 to-blue-500"
          />
        ))}
      </div>

      {selectedBrand && (
        <BrandProfileReview
          brand={selectedBrand as any}
          onApprove={(brandId) => handleApproval(brandId, "approve")}
          onReject={(brandId) => handleApproval(brandId, "reject")}
          onClose={handleCloseReview}
        />
      )}
    </div>
  );
}
