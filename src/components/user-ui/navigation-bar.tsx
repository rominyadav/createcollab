"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface NavigationItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isUpload?: boolean;
}

interface NavigationBarProps {
  items: NavigationItem[];
  activeItem: string;
  onItemChange: (id: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function NavigationBar({
  items,
  activeItem,
  onItemChange,
  orientation = "horizontal",
  className,
}: NavigationBarProps) {
  return (
    <nav
      className={cn(
        "flex gap-1",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.id;

        return (
          <Button
            key={item.id}
            variant={
              item.isUpload ? "default" : isActive ? "secondary" : "ghost"
            }
            size={orientation === "horizontal" ? "icon" : "default"}
            onClick={() => onItemChange(item.id)}
            className={cn(
              "transition-all duration-200",
              orientation === "horizontal" && "h-12 w-12 rounded-full",
              orientation === "vertical" && "h-auto w-full justify-start gap-3",
              item.isUpload &&
                "bg-emerald-500 font-medium text-white shadow-lg hover:bg-emerald-600",
              item.isUpload && orientation === "horizontal" && "scale-110",
              !item.isUpload &&
                isActive &&
                orientation === "vertical" &&
                "bg-emerald-50 font-bold text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400",
              !item.isUpload &&
                isActive &&
                orientation === "horizontal" &&
                "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400",
              !item.isUpload &&
                !isActive &&
                "text-muted-foreground font-medium hover:text-emerald-600"
            )}
          >
            <Icon
              className={cn(
                item.isUpload ? "h-6 w-6" : "h-5 w-5",
                orientation === "vertical" && "flex-shrink-0"
              )}
            />
            {orientation === "vertical" && <span>{item.label}</span>}
          </Button>
        );
      })}
    </nav>
  );
}
