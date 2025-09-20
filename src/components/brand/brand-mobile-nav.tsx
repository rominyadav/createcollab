"use client";

import { useClerk } from "@clerk/nextjs";
import {
  Briefcase,
  Home,
  LogOut,
  MessageCircle,
  Plus,
  Search,
  User,
  Wallet,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NavigationBar } from "@/components/user-ui/navigation-bar";

interface BrandMobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  brandName: string;
  creatorName: string;
}

export function BrandMobileNav({
  activeTab,
  onTabChange,
  brandName,
  creatorName,
}: BrandMobileNavProps) {
  const { signOut } = useClerk();

  const navItems = [
    { id: "feed", icon: Home, label: "Feed" },
    { id: "explore", icon: Search, label: "Explore" },
    { id: "my-campaigns", icon: Briefcase, label: "My Campaigns" },
    { id: "upload", icon: Plus, label: "Upload", isUpload: true },
    { id: "chats", icon: MessageCircle, label: "Chats" },
    { id: "wallet", icon: Wallet, label: "Wallet" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="bg-background fixed top-0 left-0 z-40 hidden h-full w-64 flex-col border-r border-gray-200 md:flex dark:border-slate-600">
        {/* Brand Header */}
        <div className="border-b border-gray-200 p-4 dark:border-slate-600">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {brandName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                {brandName}
              </h2>
              <p className="truncate text-xs text-gray-600 dark:text-gray-400">
                Admin: {creatorName}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 p-4">
          <NavigationBar
            items={navItems}
            activeItem={activeTab}
            onItemChange={onTabChange}
            orientation="vertical"
            className="space-y-2"
          />
        </div>

        {/* Create Campaign Button */}
        <div className="border-t border-gray-200 p-4 dark:border-slate-600">
          <Button
            onClick={() => onTabChange("create-campaign")}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>

        {/* Logout Button */}
        <div className="border-t border-gray-200 p-4 dark:border-slate-600">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700"
            onClick={() => signOut()}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed right-0 bottom-0 left-0 z-50 border-t backdrop-blur-sm md:hidden">
        <div className="safe-area-pb px-4 py-3">
          <NavigationBar
            items={navItems}
            activeItem={activeTab}
            onItemChange={onTabChange}
            orientation="horizontal"
            className="grid grid-cols-7 justify-items-center"
          />
        </div>
      </div>
    </>
  );
}
