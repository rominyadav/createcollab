"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";

import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";

export function SyncUserButton() {
  const { user } = useUser();
  const createUser = useMutation(api.users.createUser);

  const handleSync = async () => {
    if (!user) return;

    try {
      await createUser({
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        name: user.fullName || user.emailAddresses[0]?.emailAddress || "",
        avatar: user.imageUrl,
      });
      alert("User synced successfully!");
    } catch (error) {
      console.error("Sync failed:", error);
      alert("Sync failed - user might already exist");
    }
  };

  if (!user) return null;

  return (
    <Button onClick={handleSync} variant="outline">
      Sync User to DB
    </Button>
  );
}
