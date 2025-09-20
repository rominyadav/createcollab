"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";

export function DashboardRedirect() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const userData = useQuery(
    api.users.getUserByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  const brandData = useQuery(
    api.brands.getBrandByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  useEffect(() => {
    if (
      !isLoaded ||
      !user ||
      userData === undefined ||
      brandData === undefined
    ) {
      return;
    }

    // If user doesn't exist in our database, redirect to sign up
    if (!userData) {
      router.push("/sign-up");
      return;
    }

    // Check if user has brand role and has a brand
    if (userData.roles.includes("brand") && brandData) {
      router.push(`/brand/${brandData._id}/${userData._id}`);
      return;
    }

    // Check if user has brand role but no brand (needs onboarding)
    if (userData.roles.includes("brand") && !brandData) {
      router.push("/brand/onboarding");
      return;
    }

    // For other roles, redirect to appropriate dashboards (future implementation)
    if (userData.roles.includes("creator")) {
      router.push(`/creator/${userData._id}`);
      return;
    }

    if (userData.roles.includes("moderator")) {
      router.push("/moderator");
      return;
    }

    // Default fallback
    router.push("/sign-up");
  }, [isLoaded, user, userData, brandData, router]);

  if (!isLoaded || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
        <p className="mt-2 text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
