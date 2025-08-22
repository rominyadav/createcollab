"use client";

import Navigation from "@/components/ui/navigation";
import BrandTypesSection from "@/components/user-ui/brand-types-section";
import BrandsCTASection from "@/components/user-ui/brands-cta-section";
import BrandsHero from "@/components/user-ui/brands-hero";
import CampaignTypesSection from "@/components/user-ui/campaign-types-section";
import HowItWorksSection from "@/components/user-ui/how-it-works-section";
import PlatformFeaturesSection from "@/components/user-ui/platform-features-section";
import SuccessMetricsSection from "@/components/user-ui/success-metrics-section";

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <BrandsHero />

      {/* Brand Types Section */}
      <BrandTypesSection />

      {/* Campaign Types Section */}
      <CampaignTypesSection />

      {/* Success Metrics Section */}
      <SuccessMetricsSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Platform Features Section */}
      <PlatformFeaturesSection />

      {/* CTA Section */}
      <BrandsCTASection />
    </div>
  );
}
