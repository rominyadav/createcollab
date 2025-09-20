"use client";

import { useRouter } from "next/navigation";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";

export function useDashboardRedirect() {
  const { user } = useUser();
  const router = useRouter();

  const userData = useQuery(
    api.users.getUserByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  const brandData = useQuery(
    api.brands.getBrandByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  const redirectToDashboard = () => {
    if (!user || userData === undefined || brandData === undefined) {
      return;
    }

    if (!userData) {
      router.push("/sign-up");
      return;
    }

    if (userData.roles.includes("brand") && brandData) {
      router.push(`/brand/${brandData._id}/${userData._id}`);
      return;
    }

    if (userData.roles.includes("brand") && !brandData) {
      router.push("/brand/onboarding");
      return;
    }

    if (userData.roles.includes("creator")) {
      router.push(`/creator/${userData._id}`);
      return;
    }

    if (userData.roles.includes("moderator")) {
      router.push("/moderator");
      return;
    }

    router.push("/sign-up");
  };

  return {
    redirectToDashboard,
    isLoading: userData === undefined || brandData === undefined,
  };
}
