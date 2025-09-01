import React from "react";

import { Input } from "@/components/ui/input";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: Array<{
    label: string;
    value: string;
    options: Array<{ value: string; label: string }>;
    onChange: (value: string) => void;
  }>;
  additionalInfo?: React.ReactNode;
}

export const SearchFilters = React.memo<SearchFiltersProps>(
  ({ searchQuery, onSearchChange, filters, additionalInfo }) => (
    <>
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {filters.map((filter) => (
          <div key={filter.label}>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {filter.label}
            </label>
            <select
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
        {additionalInfo}
      </div>
    </>
  )
);

SearchFilters.displayName = "SearchFilters";
