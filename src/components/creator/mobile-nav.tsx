"use client";

import {
  Home,
  MessageCircle,
  Plus,
  Search,
  User,
  Video,
  Wallet,
} from "lucide-react";

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  const navItems = [
    { id: "feed", icon: Home, label: "Feed" },
    { id: "explore", icon: Search, label: "Explore" },
    { id: "upload", icon: Plus, label: "Upload", isUpload: true },
    { id: "chats", icon: MessageCircle, label: "Chats" },
    { id: "wallet", icon: Wallet, label: "Wallet" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-800">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center rounded-lg p-2 transition-all duration-200 ${
                item.isUpload
                  ? "-mt-2 scale-110 transform bg-emerald-500 text-white shadow-lg"
                  : isActive
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                    : "text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
              }`}
            >
              <Icon className={`h-5 w-5 ${item.isUpload ? "h-6 w-6" : ""}`} />
              <span
                className={`mt-1 text-xs ${item.isUpload ? "text-xs font-medium" : ""}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
