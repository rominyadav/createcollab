"use client";

import { useEffect } from "react";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";

export function AutoSyncUser() {
  const { user } = useUser();
  const existingUser = useQuery(
    api.users.getUserByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );
  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    if (user && existingUser === null) {
      const selectedRole = localStorage.getItem("selectedRole") || "creator";
      createUser({
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        name: user.fullName || user.emailAddresses[0]?.emailAddress || "",
        avatar: user.imageUrl,
        roles: [selectedRole],
      });
      // Clear the role from localStorage after use
      localStorage.removeItem("selectedRole");
    }
  }, [user, existingUser, createUser]);

  return null;
}
