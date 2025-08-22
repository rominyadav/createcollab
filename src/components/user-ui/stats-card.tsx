"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";

interface StatsCardProps {
  number: string;
  label: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
  style?: React.CSSProperties;
}

export function StatsCard({
  number,
  label,
  icon,
  trend,
  className,
  style,
}: StatsCardProps) {
  return (
    <Card
      className={cn(
        "group border-0 bg-gradient-to-br from-white/10 to-white/5 text-center backdrop-blur-sm",
        className
      )}
      style={style}
    >
      <CardContent className="p-6">
        {icon && (
          <div className="mb-4 text-3xl transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        )}
        <div className="mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent transition-transform duration-300 group-hover:scale-110 lg:text-5xl">
          {number}
        </div>
        <div className="mb-2 text-lg text-gray-300 transition-colors duration-300 group-hover:text-white">
          {label}
        </div>
        {trend && (
          <div
            className={cn(
              "text-sm font-medium",
              trend.isPositive ? "text-green-400" : "text-red-400"
            )}
          >
            {trend.isPositive ? "↗" : "↘"} {trend.value}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
