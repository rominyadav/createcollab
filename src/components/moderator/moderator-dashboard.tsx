"use client";

import { useState } from "react";

import { BrandReviews } from "./brand-reviews";
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
      case "reports":
        return <VideoModeration />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <ModeratorNavigation
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      <div className="p-6">{renderContent()}</div>
    </ModeratorNavigation>
  );
}
