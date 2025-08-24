"use client";

import { useEffect, useState } from "react";

import { ThemeProvider } from "../theme-provider";
import { BrandReviews } from "./brand-reviews";
import { BrandSearch } from "./brand-search";
import { CampaignModeration } from "./campaign-moderation";
import { CreatorReviews } from "./creator-reviews";
import { CreatorSearch } from "./creator-search";
import { DashboardOverview } from "./dashboard-overview";
import { Messages } from "./messages";
import { ModeratorManagement } from "./moderator-management";
import { ModeratorNavigation } from "./moderator-navigation";
import { VideoModeration } from "./video-moderation";

export default function ModeratorDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mounted, setMounted] = useState(false);

  // Load active section from localStorage on component mount
  useEffect(() => {
    setMounted(true);
    const savedSection = localStorage.getItem("moderator-active-section");
    if (savedSection) {
      setActiveSection(savedSection);
    }
  }, []);

  // Save active section to localStorage whenever it changes
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (mounted) {
      // Only save when mounted to prevent hydration issues
      localStorage.setItem("moderator-active-section", section);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />;
      case "creators":
        return <CreatorReviews />;
      case "brands":
        return <BrandReviews />;
      case "videos":
        return <VideoModeration />;
      case "campaigns":
        return <CampaignModeration />;
      case "moderators":
        return <ModeratorManagement />;
      case "messages":
        return <Messages />;
      case "search":
        return <CreatorSearch />;
      case "brand-list":
        return <BrandSearch />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <ThemeProvider>
      <ModeratorNavigation
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      >
        <div className="bg-white p-6 dark:bg-slate-800">{renderContent()}</div>
      </ModeratorNavigation>
    </ThemeProvider>
  );
}
