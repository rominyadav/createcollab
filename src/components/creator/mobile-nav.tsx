"use client";

import { useEffect, useState } from "react";

import {
  Briefcase,
  Home,
  MessageCircle,
  Plus,
  Search,
  User,
  Wallet,
} from "lucide-react";

import { NavigationBar } from "@/components/user-ui/navigation-bar";

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  creatorName?: string;
}

const navItems = [
  { id: "feed", icon: Home, label: "Feed" },
  { id: "explore", icon: Search, label: "Explore" },
  { id: "my-campaigns", icon: Briefcase, label: "My Campaigns" },
  { id: "upload", icon: Plus, label: "Upload", isUpload: true },
  { id: "chats", icon: MessageCircle, label: "Chats" },
  { id: "wallet", icon: Wallet, label: "Wallet" },
  { id: "profile", icon: User, label: "Profile" },
];

export function MobileNav({
  activeTab,
  onTabChange,
  creatorName = "Creator",
}: MobileNavProps) {
  const [greeting, setGreeting] = useState("");
  const [isGreetingReady, setIsGreetingReady] = useState(false);

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        setGreeting("Good morning");
      } else if (hour < 17) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
      setIsGreetingReady(true);
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {/* Mobile Navigation */}
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

      {/* Desktop Sidebar */}
      <div className="bg-background fixed top-0 bottom-0 left-0 z-40 hidden w-64 flex-col border-r md:flex">
        <div className="border-b p-6">
          <h2 className="text-xl font-bold text-emerald-600">CreateCollab</h2>
          {isGreetingReady && (
            <p className="animate-in fade-in-0 slide-in-from-bottom-2 mt-1 text-sm font-bold duration-500">
              Hi {creatorName}! {greeting}
            </p>
          )}
        </div>

        <div className="flex-1 p-4">
          <NavigationBar
            items={navItems}
            activeItem={activeTab}
            onItemChange={onTabChange}
            orientation="vertical"
            className="space-y-2"
          />
        </div>
      </div>
    </>
  );
}
