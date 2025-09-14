"use client";

import { useEffect } from "react";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";

import BrandOnboarding from "@/components/brand/brand-onboarding";

import { assignBrandRole } from "@/features/auth/actions/update-role";

import { api } from "../../../../convex/_generated/api";

export default function BrandOnboardingPage() {
  const { user } = useUser();
  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    const syncAndAssignRole = async () => {
      if (user) {
        try {
          await createUser({
            clerkId: user.id,
            email: user.emailAddresses[0]?.emailAddress || "",
            name: user.fullName || undefined,
            avatar: user.imageUrl || undefined,
            roles: ["brand", "creator"],
          });
          await assignBrandRole();
        } catch (error) {
          console.error("Sync error:", error);
        }
      }
    };

    syncAndAssignRole();
  }, [user, createUser]);

  return <BrandOnboarding />;
}
