"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";

import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";

export function SyncUser() {
  const { user } = useUser();
  const syncUser = useMutation(api.users.syncUser);

  const handleSync = async () => {
    if (!user) return;

    await syncUser({
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress || "",
      name: user.fullName || user.emailAddresses[0]?.emailAddress || "",
      avatar: user.imageUrl,
    });
  };

  if (!user) return null;

  return (
    <Button onClick={handleSync} variant="outline">
      Sync User to Database
    </Button>
  );
}
