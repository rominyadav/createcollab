"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  action?: {
    icon: React.ComponentType<{ className?: string }>;
    onClick: () => void;
    label?: string;
  };
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  action,
  className,
  children,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 border-b backdrop-blur",
        className
      )}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">{title}</h1>
        {action && (
          <Button
            variant="ghost"
            size="sm"
            onClick={action.onClick}
            aria-label={action.label}
          >
            <action.icon className="h-5 w-5" />
          </Button>
        )}
      </div>
      {children}
    </header>
  );
}
