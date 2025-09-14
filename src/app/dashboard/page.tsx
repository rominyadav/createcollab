"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { api } from "../../../convex/_generated/api";

export default function DashboardRedirect() {
  const { user } = useUser();
  const router = useRouter();
  const creator = useQuery(
    api.creators.getCreatorByClerkId,
    user ? { clerkId: user.id } : "skip"
  );

  useEffect(() => {
    if (user && creator !== undefined) {
      if (creator && creator.uuid) {
        // User exists in database, redirect to their dashboard
        router.push(`/creator/${creator.uuid}`);
      } else {
        // User doesn't exist, redirect to onboarding
        router.push("/creator/onboarding");
      }
    }
  }, [user, creator, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
        <p className="text-muted-foreground mt-4 text-sm">Redirecting...</p>
      </div>
    </div>
  );
}
