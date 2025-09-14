"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useUser } from "@clerk/nextjs";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "creator" | "brand" | "moderator";
  fallbackUrl?: string;
}

export const ProtectedRoute = ({
  children,
  requiredRole,
  fallbackUrl = "/sign-in",
}: ProtectedRouteProps) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        router.push(fallbackUrl);
        return;
      }

      if (requiredRole) {
        const userRole = user.publicMetadata.role as string;
        const userRoles = (user.publicMetadata.roles as string[]) || [];

        if (userRole !== requiredRole && !userRoles.includes(requiredRole)) {
          // Redirect to appropriate dashboard based on user's primary role
          const redirectUrl =
            userRole === "creator"
              ? "/creator/onboarding"
              : userRole === "brand"
                ? "/brand/onboarding"
                : "/sign-in";

          router.push(redirectUrl);
          return;
        }
      }
    }
  }, [isLoaded, user, requiredRole, router, fallbackUrl]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-muted-foreground mt-4 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredRole) {
    const userRole = user.publicMetadata.role as string;
    const userRoles = (user.publicMetadata.roles as string[]) || [];

    if (userRole !== requiredRole && !userRoles.includes(requiredRole)) {
      return null;
    }
  }

  return <>{children}</>;
};
