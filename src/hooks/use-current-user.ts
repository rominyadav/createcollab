import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";

export const useCurrentUser = () => {
  const { user } = useUser();
  const convexUser = useQuery(
    api.users.getUserByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  return {
    user,
    convexUser,
    isLoading: !user || convexUser === undefined,
  };
};
