import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

interface SearchHeaderProps {
  title: string;
  icon: React.ReactNode;
  showAdvancedSearch: boolean;
  onToggleAdvanced: () => void;
  onClearFilters: () => void;
}

export const SearchHeader = React.memo<SearchHeaderProps>(
  ({ title, icon, showAdvancedSearch, onToggleAdvanced, onClearFilters }) => (
    <Card className="border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleAdvanced}
              className="flex items-center gap-2"
            >
              <Icon name="filter" size="sm" />
              {showAdvancedSearch ? "Hide" : "Advanced"} Search
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="flex items-center gap-2"
            >
              <Icon name="x" size="sm" />
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
);

SearchHeader.displayName = "SearchHeader";
