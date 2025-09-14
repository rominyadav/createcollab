"use client";

import { useEffect } from "react";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";

import CreatorOnboarding from "@/components/creator/creator-onboarding";

import { assignCreatorRole } from "@/features/auth/actions/update-role";

import { api } from "../../../../convex/_generated/api";

export default function CreatorOnboardingPage() {
  const { user } = useUser();
  const createUser = useMutation(api.users.createUser);
  const createCreator = useMutation(api.creators.createCreator);

  useEffect(() => {
    const syncAndAssignRole = async () => {
      if (user) {
        try {
          const userId = await createUser({
            clerkId: user.id,
            email: user.emailAddresses[0]?.emailAddress || "",
            name: user.fullName || undefined,
            avatar: user.imageUrl || undefined,
            roles: ["creator"],
          });

          await createCreator({
            userId,
            clerkId: user.id,
            name: user.fullName || "",
            email: user.emailAddresses[0]?.emailAddress || "",
          });

          await assignCreatorRole();
        } catch (error) {
          console.error("Sync error:", error);
        }
      }
    };

    syncAndAssignRole();
  }, [user, createUser, createCreator]);

  return <CreatorOnboarding />;
}
