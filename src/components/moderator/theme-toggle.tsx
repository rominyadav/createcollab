"use client";

import { useEffect, useState } from "react";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
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
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("moderator-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("moderator-theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="sm"
      className="flex items-center gap-2 rounded-xl border-white/30 bg-white/10 px-4 text-white transition-all duration-200 hover:border-white/50 hover:bg-white/20"
    >
      {isDark ? (
        <>
          <Sun className="h-4 w-4" />
          Light
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          Dark
        </>
      )}
    </Button>
  );
}
