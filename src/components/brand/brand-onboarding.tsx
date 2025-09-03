"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import categoryData from "@/components/mock-data/category-mockdata.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BrandOnboardingProps {
  onComplete?: (data: BrandOnboardingData) => void;
}

interface BrandOnboardingData {
  companyName: string;
  category: string;
  subcategories: string[];
}

export default function BrandOnboarding({ onComplete }: BrandOnboardingProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<BrandOnboardingData>({
    companyName: "",
    category: "",
    subcategories: [],
  });

  const categories = Object.keys(categoryData);
  const subcategories = formData.category
    ? categoryData[formData.category as keyof typeof categoryData]
    : [];

  const handleCategorySelect = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      category,
      subcategories: [], // Reset subcategories when category changes
    }));
  };

  const handleSubcategoryToggle = (subcategory: string) => {
    setFormData((prev) => ({
      ...prev,
      subcategories: prev.subcategories.includes(subcategory)
        ? prev.subcategories.filter((s) => s !== subcategory)
        : [...prev.subcategories, subcategory],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.companyName &&
      formData.category &&
      formData.subcategories.length > 0
    ) {
      onComplete?.(formData);
      // For now, redirect to brands page - in real app, this would redirect to the specific brand dashboard
      router.push("/brands");
    }
  };

  const isFormValid =
    formData.companyName &&
    formData.category &&
    formData.subcategories.length > 0;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-2xl font-bold text-transparent">
            Complete Your Brand Profile
          </CardTitle>
          <p className="text-muted-foreground">
            Tell us about your company to get started
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Enter your company name"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    companyName: e.target.value,
                  }))
                }
                required
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-3">
              <Label>Business Category</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant={
                      formData.category === category ? "default" : "outline"
                    }
                    className="h-auto justify-start py-3"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Subcategory Selection */}
            {formData.category && (
              <div className="space-y-3">
                <Label>Select Subcategories (Choose multiple)</Label>
                <div className="flex max-h-48 flex-wrap gap-2 overflow-y-auto rounded-md border p-2">
                  {subcategories.map((subcategory) => (
                    <Badge
                      key={subcategory}
                      variant={
                        formData.subcategories.includes(subcategory)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer transition-all duration-200 select-none hover:border-emerald-300 hover:bg-emerald-100"
                      onClick={() => handleSubcategoryToggle(subcategory)}
                    >
                      {subcategory}
                    </Badge>
                  ))}
                </div>
                {formData.subcategories.length > 0 && (
                  <p className="text-muted-foreground text-sm">
                    Selected: {formData.subcategories.length} subcategories
                  </p>
                )}
              </div>
            )}

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={!isFormValid}>
                Continue to Dashboard
              </Button>
              {!isFormValid && (
                <p className="text-muted-foreground mt-2 text-center text-sm">
                  Please fill in all fields to continue
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
