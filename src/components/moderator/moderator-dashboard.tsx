"use client";

import { useEffect, useState } from "react";

import { ThemeProvider } from "../theme-provider";
import { CampaignModeration } from "./campaign-moderation";
import { CreatorReviews } from "./creator-reviews";
import { DashboardOverview } from "./dashboard-overview";
import { Messages } from "./messages";
import { ModeratorManagement } from "./moderator-management";
import { ModeratorNavigation } from "./moderator-navigation";
import { BrandReviews } from "./reviews/brand-reviews";
import { BrandSearch } from "./search/brand-search";
import { CreatorSearch } from "./search/creator-search";
import { VideoModeration } from "./video-moderation";

export default function ModeratorDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mounted, setMounted] = useState(false);

  // Load active section from localStorage on component mount
  useEffect(() => {
    setMounted(true);
    try {
      const savedSection = localStorage.getItem("moderator-active-section");
      if (savedSection) {
        setActiveSection(savedSection);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save active section to localStorage whenever it changes
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (mounted) {
      try {
        localStorage.setItem("moderator-active-section", section);
      } catch {
        // Ignore localStorage errors
      }
    }
  };

  const sectionComponents = {
    dashboard: DashboardOverview,
    creators: CreatorReviews,
    brands: BrandReviews,
    videos: VideoModeration,
    campaigns: CampaignModeration,
    moderators: ModeratorManagement,
    messages: Messages,
    search: CreatorSearch,
    "brand-list": BrandSearch,
  } as const;

  const Component =
    sectionComponents[activeSection as keyof typeof sectionComponents] ||
    DashboardOverview;

  return (
    <ThemeProvider>
      <ModeratorNavigation
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      >
        <div className="bg-white p-6 dark:bg-slate-800">
          <Component />
        </div>
      </ModeratorNavigation>
    </ThemeProvider>
  );
}
