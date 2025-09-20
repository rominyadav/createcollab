"use client";

import { useEffect } from "react";

import BrandOnboarding from "@/components/brand/brand-onboarding";

import { assignBrandRole } from "@/features/auth/actions/update-role";

export default function BrandOnboardingPage() {
  useEffect(() => {
    assignBrandRole();
  }, []);

  return <BrandOnboarding />;
}
