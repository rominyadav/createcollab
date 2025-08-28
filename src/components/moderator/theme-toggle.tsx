"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem("moderator-theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      // Default to system preference
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add("dark");
      if (mounted) {
        // Only save when mounted to prevent hydration issues
        localStorage.setItem("moderator-theme", "dark");
      }
    } else {
      document.documentElement.classList.remove("dark");
      if (mounted) {
        // Only save when mounted to prevent hydration issues
        localStorage.setItem("moderator-theme", "light");
      }
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 rounded-xl border-gray-300 bg-gray-100 px-4 text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-200 dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:border-white/50 dark:hover:bg-white/20"
        disabled
      >
        <div className="h-4 w-4 animate-pulse rounded bg-gray-400 dark:bg-white/50"></div>
        Loading...
      </Button>
    );
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="sm"
      className="flex items-center gap-2 rounded-xl border-gray-300 bg-gray-100 px-4 text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-200 dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:border-white/50 dark:hover:bg-white/20"
    >
      {isDark ? (
        <>
          <Icon name="sun" size="sm" />
          Light
        </>
      ) : (
        <>
          <Icon name="moon" size="sm" />
          Dark
        </>
      )}
    </Button>
  );
}
