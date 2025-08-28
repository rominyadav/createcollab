"use client";

import {
  Briefcase,
  Home,
  MessageCircle,
  Plus,
  Search,
  User,
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
    { id: "my-campaigns", icon: Briefcase, label: "My Campaigns" },
    { id: "upload", icon: Plus, label: "Upload", isUpload: true },
    { id: "chats", icon: MessageCircle, label: "Chats" },
    { id: "wallet", icon: Wallet, label: "Wallet" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-sm md:hidden dark:border-slate-600 dark:bg-slate-800/95">
        <div className="safe-area-pb flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex min-w-0 flex-col items-center justify-center rounded-lg p-2 transition-all duration-200 ${
                  item.isUpload
                    ? "-mt-2 scale-110 transform bg-emerald-500 text-white shadow-lg hover:bg-emerald-600"
                    : isActive
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-emerald-400"
                }`}
              >
                <Icon className={`${item.isUpload ? "h-6 w-6" : "h-5 w-5"}`} />
                <span
                  className={`mt-1 truncate text-xs font-medium ${item.isUpload ? "" : ""}`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="fixed top-0 bottom-0 left-0 z-40 hidden w-64 flex-col border-r border-gray-200 bg-white md:flex dark:border-slate-600 dark:bg-slate-800">
        <div className="border-b border-gray-200 p-6 dark:border-slate-600">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Creator Hub
          </h2>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-all duration-200 ${
                  item.isUpload
                    ? "bg-emerald-500 font-medium text-white shadow-lg hover:bg-emerald-600"
                    : isActive
                      ? "bg-emerald-50 font-medium text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-emerald-400"
                }`}
              >
                <Icon
                  className={`${item.isUpload ? "h-6 w-6" : "h-5 w-5"} flex-shrink-0`}
                />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
