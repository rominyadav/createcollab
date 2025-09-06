"use client";

import { useEffect } from "react";

import { assignBrandRole } from "@/features/auth/actions/update-role";

export default function BrandOnboardingPage() {
  useEffect(() => {
    assignBrandRole();
  }, []);

  return <div>Brand Onboarding</div>;
}
