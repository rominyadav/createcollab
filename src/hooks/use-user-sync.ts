"use client";

import { useEffect } from "react";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";

import { api } from "../../convex/_generated/api";

export const useUserSync = () => {
  const { user, isLoaded } = useUser();
  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    if (isLoaded && user) {
      const syncUser = async () => {
        try {
          const roles = (user.publicMetadata.roles as string[]) || [];

          await createUser({
            clerkId: user.id,
            email: user.emailAddresses[0]?.emailAddress || "",
            name: user.fullName || undefined,
            avatar: user.imageUrl || undefined,
            roles: roles as ("creator" | "brand" | "moderator")[],
          });
        } catch (error) {
          console.error("Failed to sync user:", error);
        }
      };

      syncUser();
    }
  }, [isLoaded, user, createUser]);

  return { user, isLoaded };
};
