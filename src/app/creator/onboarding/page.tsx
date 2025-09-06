"use client";

import { useEffect } from "react";

import { assignCreatorRole } from "@/features/auth/actions/update-role";

export default function CreatorOnboardingPage() {
  useEffect(() => {
    assignCreatorRole();
  }, []);

  return <div>Creator Onboarding</div>;
}
