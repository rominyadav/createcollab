import React from "react";

import {
  Building2,
  Flag,
  LogOut,
  Megaphone,
  MessageSquare,
  Search,
  Shield,
  TrendingUp,
  UserCog,
  Users,
  Video,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { NotificationSystem } from "./notification-system";

interface ModeratorNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  children: React.ReactNode;
}

export function ModeratorNavigation({
  activeSection,
  onSectionChange,
  children,
}: ModeratorNavigationProps) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: TrendingUp,
      description: "Overview and analytics",
      badge: null,
    },
    {
      id: "creators",
      label: "Creator Reviews",
      icon: Users,
      description: "Manage creator applications",
      badge: { count: 12, variant: "warning" as const },
    },
    {
      id: "brands",
      label: "Brand Reviews",
      icon: Building2,
      description: "Review brand profiles",
      badge: { count: 5, variant: "info" as const },
    },
    {
      id: "videos",
      label: "Video Moderation",
      icon: Video,
      description: "Content moderation queue",
      badge: { count: 23, variant: "destructive" as const },
    },
    {
      id: "campaigns",
      label: "Campaign Moderation",
      icon: Megaphone,
      description: "Campaign approval system",
      badge: { count: 8, variant: "default" as const },
    },
    {
      id: "moderators",
      label: "Moderator Management",
      icon: UserCog,
      description: "Team and permissions",
      badge: null,
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
      description: "User communications",
      badge: { count: 3, variant: "warning" as const },
    },
    {
      id: "search",
      label: "Creator Search",
      icon: Search,
      description: "Find and filter creators",
      badge: null,
    },
    {
      id: "reports",
      label: "Reported Videos",
      icon: Flag,
      description: "Handle user reports",
      badge: { count: 7, variant: "destructive" as const },
    },
  ];

  const getBadgeColor = (variant: string) => {
    switch (variant) {
      case "destructive":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-white";
      case "info":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-slate-600 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 shadow-lg">
        <div className="flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg ring-4 ring-blue-400/20">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Moderator Dashboard
              </h1>
              <p className="font-medium text-slate-300">
                Content & User Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <NotificationSystem />
            <div className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Avatar className="h-10 w-10 ring-2 ring-white/30">
                <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-bold text-white">
                  MD
                </AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">Moderator</p>
                <p className="text-xs text-slate-300">admin@platform.com</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 rounded-xl border-white/30 bg-white/10 px-4 text-white transition-all duration-200 hover:border-white/50 hover:bg-white/20"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="min-h-screen w-72 border-r border-slate-600 bg-slate-800 shadow-lg">
          <nav className="p-6">
            <div className="space-y-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <div key={item.id} className="relative">
                    <Button
                      onClick={() => onSectionChange(item.id)}
                      variant="ghost"
                      className={`h-auto w-full justify-start rounded-xl p-4 transition-all duration-200 ${
                        isActive
                          ? "border border-blue-400/30 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-200 shadow-lg"
                          : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:shadow-md"
                      }`}
                    >
                      <div className="flex w-full items-start">
                        <div
                          className={`mr-3 rounded-lg p-2 ${
                            isActive
                              ? "bg-blue-500/30 text-blue-200"
                              : "bg-slate-700 text-slate-400"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{item.label}</span>
                            {item.badge && (
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-semibold ${getBadgeColor(item.badge.variant)}`}
                              >
                                {item.badge.count}
                              </span>
                            )}
                          </div>
                          <p
                            className={`mt-1 text-xs ${
                              isActive ? "text-blue-200" : "text-slate-400"
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Button>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r-full bg-blue-500" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 rounded-xl border border-slate-500 bg-gradient-to-r from-slate-700 to-slate-600 p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-200">
                Quick Stats
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Pending Reviews</span>
                  <span className="font-semibold text-red-400">35</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Today's Reports</span>
                  <span className="font-semibold text-yellow-400">12</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Active Campaigns</span>
                  <span className="font-semibold text-green-400">8</span>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
