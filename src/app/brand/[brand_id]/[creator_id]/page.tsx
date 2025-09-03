"use client";

import { useParams } from "next/navigation";

import { BrandDashboard } from "@/components/brand/brand-dashboard";
import brandMockData from "@/components/mock-data/brand-mockdata.json";
import creatorMockData from "@/components/mock-data/creator-mockdata.json";

export default function BrandPage() {
  const params = useParams();
  const brandId = parseInt(params.brand_id as string);
  const creatorId = parseInt(params.creator_id as string);

  // Find brand by ID
  const brand = brandMockData.find((b) => b.id === brandId);

  // Find creator by ID
  const creator = creatorMockData.find((c) => c.id === creatorId);

  // Verify that the creator is an admin of this brand
  const isValidAdmin = brand?.adminUsers.some(
    (admin) => admin.creatorId === creatorId
  );

  if (!brand || !creator || !isValidAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="mb-4 text-4xl">🚫</div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You don&apos;t have permission to access this brand dashboard.
          </p>
        </div>
      </div>
    );
  }

  return <BrandDashboard brand={brand} creator={creator} />;
}
