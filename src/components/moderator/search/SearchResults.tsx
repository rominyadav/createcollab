import React from "react";

import { MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Pagination } from "../shared";

interface SearchResultsProps<T> {
  title: string;
  icon: React.ReactNode;
  results: T[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  renderItem: (item: T) => React.ReactNode;
}

export function SearchResults<T>({
  title,
  icon,
  results,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  renderItem,
}: SearchResultsProps<T>) {
  if (results.length === 0) return null;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = results.slice(startIndex, endIndex);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title} ({results.length} found)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">{currentItems.map(renderItem)}</div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={results.length}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      </CardContent>
    </Card>
  );
}

interface CreatorResultItemProps {
  creator: {
    id: number;
    name: string;
    avatar: string;
    niche: string;
    followers: string;
    verified: boolean;
    engagement: string;
    location: {
      city: string;
      state: string;
      country: string;
    };
  };
  onViewProfile: () => void;
}

export const CreatorResultItem = React.memo<CreatorResultItemProps>(
  ({ creator, onViewProfile }) => (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-600">
      <div className="flex items-center space-x-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 font-semibold text-white">
          {creator.avatar}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {creator.name}
            </h3>
            {creator.verified && (
              <Badge variant="default" className="bg-green-600 text-xs">
                Verified
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {creator.niche} • {creator.followers} followers
          </p>
          <div className="mt-1 flex items-center gap-2">
            <MapPin className="h-3 w-3 text-gray-400 dark:text-gray-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {creator.location.city}, {creator.location.state},{" "}
              {creator.location.country}
            </span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {creator.engagement} engagement
        </p>
        <Button
          variant="emerald"
          size="sm"
          className="mt-2"
          onClick={onViewProfile}
        >
          View Profile
        </Button>
      </div>
    </div>
  )
);

CreatorResultItem.displayName = "CreatorResultItem";

interface BrandResultItemProps {
  brand: {
    id: number;
    name: string;
    logo: string;
    industry: string;
    employees: string;
    verified: boolean;
    status: string;
    founded: string;
    revenue: string;
    location: {
      city: string;
      state: string;
      country: string;
    };
    campaigns: Array<{ id: number }>;
    billing: {
      plan: string;
    };
  };
  onViewProfile: () => void;
}

export const BrandResultItem = React.memo<BrandResultItemProps>(
  ({ brand, onViewProfile }) => (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-600">
      <div className="flex items-center space-x-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 font-semibold text-white">
          {brand.logo}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {brand.name}
            </h3>
            {brand.verified && (
              <Badge variant="default" className="bg-green-600 text-xs">
                Verified
              </Badge>
            )}
            <Badge
              variant={brand.status === "approved" ? "default" : "secondary"}
              className={brand.status === "approved" ? "bg-green-600" : ""}
            >
              {brand.status}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {brand.industry} • {brand.employees} employees
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {brand.location.city}, {brand.location.state},{" "}
            {brand.location.country}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Founded: {brand.founded} • Revenue: {brand.revenue}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {brand.campaigns.length} campaigns
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {brand.billing.plan} Plan
        </p>
        <Button
          variant="emerald"
          size="sm"
          className="mt-2"
          onClick={onViewProfile}
        >
          View Details
        </Button>
      </div>
    </div>
  )
);

BrandResultItem.displayName = "BrandResultItem";
