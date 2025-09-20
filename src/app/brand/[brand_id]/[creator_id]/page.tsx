"use client";

import { useParams } from "next/navigation";

import { useQuery } from "convex/react";

import { BrandDashboard } from "@/components/brand/brand-dashboard";

import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

export default function BrandPage() {
  const params = useParams();
  const brandId = params.brand_id as Id<"brands">;
  const userId = params.creator_id as Id<"users">;

  const brand = useQuery(api.brands.getBrandById, { brandId });
  const user = useQuery(api.users.getUserById, { userId });
  const hasAccess = useQuery(api.brands.checkBrandAccess, { brandId, userId });

  if (brand === undefined || user === undefined || hasAccess === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!brand || !user || !hasAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-4xl">🚫</div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don&apos;t have permission to access this brand dashboard.
          </p>
        </div>
      </div>
    );
  }

  return <BrandDashboard brand={brand} creator={user} />;
}
