"use client";

import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import { ChevronDown } from "lucide-react";
import { HiBuildingOffice2, HiShieldCheck, HiSparkles } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { switchRole } from "@/features/auth/actions/update-role";

const roleIcons = {
  creator: HiSparkles,
  brand: HiBuildingOffice2,
  moderator: HiShieldCheck,
};

const roleLabels = {
  creator: "Creator",
  brand: "Brand",
  moderator: "Moderator",
};

export const RoleSwitcher = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return null;

  const currentRole = user.publicMetadata.role as string;
  const availableRoles = (user.publicMetadata.roles as string[]) || [];

  if (availableRoles.length <= 1) return null;

  const handleRoleSwitch = async (role: "creator" | "brand" | "moderator") => {
    if (role === currentRole) return;

    setIsLoading(true);
    try {
      await switchRole(role);

      // Redirect to appropriate dashboard
      const redirectUrl =
        role === "creator"
          ? "/creator/onboarding"
          : role === "brand"
            ? "/brand/onboarding"
            : "/moderator";

      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Failed to switch role:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const CurrentIcon = roleIcons[currentRole as keyof typeof roleIcons];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isLoading} className="gap-2">
          {CurrentIcon && <CurrentIcon className="h-4 w-4" />}
          {roleLabels[currentRole as keyof typeof roleLabels] || "Switch Role"}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableRoles.map((role) => {
          const Icon = roleIcons[role as keyof typeof roleIcons];
          const label = roleLabels[role as keyof typeof roleLabels];

          return (
            <DropdownMenuItem
              key={role}
              onClick={() =>
                handleRoleSwitch(role as "creator" | "brand" | "moderator")
              }
              disabled={role === currentRole}
              className="gap-2"
            >
              {Icon && <Icon className="h-4 w-4" />}
              {label}
              {role === currentRole && (
                <span className="text-muted-foreground ml-auto text-xs">
                  Current
                </span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
