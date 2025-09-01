"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <Tabs value={selectedCategory} onValueChange={onCategoryChange}>
      <TabsList
        className="bg-muted grid w-full"
        style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}
      >
        {categories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className="text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
          >
            {category === "all" ? "All" : category}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
