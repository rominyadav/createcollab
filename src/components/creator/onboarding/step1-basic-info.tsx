"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { CreatorOnboardingData } from "../creator-onboarding";

interface Step1Props {
  formData: CreatorOnboardingData;
  updateFormData: (updates: Partial<CreatorOnboardingData>) => void;
  onNext: () => void;
  onFinishLater: () => void;
}

export default function Step1BasicInfo({
  formData,
  updateFormData,
  onNext,
  onFinishLater,
}: Step1Props) {
  const [selectedNiche, setSelectedNiche] = useState(formData.niche);

  const categoryData = {
    Technology: [
      "Software Development",
      "Mobile Apps",
      "Web Development",
      "AI & Machine Learning",
    ],
    Fashion: ["Clothing", "Accessories", "Footwear", "Beauty & Cosmetics"],
    "Food & Beverage": ["Restaurants", "Food Delivery", "Cooking", "Baking"],
    "Health & Fitness": ["Gym & Fitness", "Yoga", "Nutrition", "Mental Health"],
    "Travel & Tourism": [
      "Hotels",
      "Airlines",
      "Adventure Travel",
      "Cultural Tourism",
    ],
    Education: [
      "Online Courses",
      "Language Learning",
      "Skill Development",
      "Academic Tutoring",
    ],
  };

  const categories = Object.keys(categoryData);
  const subcategories = selectedNiche
    ? categoryData[selectedNiche as keyof typeof categoryData]
    : [];

  const durations = ["15sec", "30sec", "60sec", "1-5min", "5min+"] as const;

  const handleNicheSelect = (niche: string) => {
    setSelectedNiche(niche);
    updateFormData({ niche, subNiches: [] });
  };

  const handleSubNicheToggle = (subNiche: string) => {
    const currentSubNiches = formData.subNiches;
    const isSelected = currentSubNiches.includes(subNiche);

    if (isSelected) {
      updateFormData({
        subNiches: currentSubNiches.filter((s) => s !== subNiche),
      });
    } else if (currentSubNiches.length < 5) {
      updateFormData({
        subNiches: [...currentSubNiches, subNiche],
      });
    }
  };

  const updatePricing = (
    duration: keyof CreatorOnboardingData["pricing"],
    updates: Partial<CreatorOnboardingData["pricing"][typeof duration]>
  ) => {
    updateFormData({
      pricing: {
        ...formData.pricing,
        [duration]: { ...formData.pricing[duration], ...updates },
      },
    });
  };

  const hasPricingSet = Object.values(formData.pricing).some(
    (p) =>
      (p.type === "fixed" && p.amount && p.amount > 0) ||
      (p.type === "range" && p.min && p.max && p.min > 0 && p.max > 0)
  );

  const isFormValid =
    formData.name &&
    formData.creatorType &&
    formData.niche &&
    formData.subNiches.length >= 3 &&
    hasPricingSet;

  return (
    <div className="animate-in fade-in-50 space-y-4 duration-300">
      {/* Name Input */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
        />
      </div>

      {/* Creator Type Selection */}
      <div className="space-y-2">
        <Label>Creator Type</Label>
        <div className="grid grid-cols-1 gap-2">
          {["Content Creator", "Social Media Influencer"].map((type) => (
            <Button
              key={type}
              type="button"
              variant={formData.creatorType === type ? "default" : "outline"}
              className="justify-start py-2 text-sm"
              onClick={() =>
                updateFormData({
                  creatorType: type as
                    | "Content Creator"
                    | "Social Media Influencer",
                })
              }
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Niche Selection */}
      <div className="space-y-2">
        <Label>Select Your Niche</Label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              type="button"
              variant={selectedNiche === category ? "default" : "outline"}
              className="h-auto justify-start py-2 text-sm"
              onClick={() => handleNicheSelect(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Sub-niche Selection */}
      {selectedNiche && (
        <div className="animate-in fade-in-50 space-y-2 duration-300">
          <Label>Choose Your Specialties (Select 3-5)</Label>
          <div className="flex max-h-32 flex-wrap gap-1 overflow-y-auto rounded-md border p-2">
            {subcategories.map((subcategory) => {
              const isSelected = formData.subNiches.includes(subcategory);
              const isDisabled = !isSelected && formData.subNiches.length >= 5;

              return (
                <Badge
                  key={subcategory}
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer text-xs transition-all duration-200 select-none ${
                    isDisabled
                      ? "cursor-not-allowed opacity-50"
                      : "hover:border-emerald-300 hover:bg-emerald-100"
                  }`}
                  onClick={() =>
                    !isDisabled && handleSubNicheToggle(subcategory)
                  }
                >
                  {subcategory}
                </Badge>
              );
            })}
          </div>
          <p className="text-muted-foreground text-xs">
            Selected: {formData.subNiches.length}/5 specialties
          </p>
        </div>
      )}

      {/* Pricing Configuration */}
      {formData.subNiches.length >= 3 && (
        <div className="animate-in fade-in-50 space-y-3 duration-300">
          <Label className="text-sm font-medium">Set Your Pricing (NPR)</Label>
          <div className="grid gap-2">
            {durations.map((duration) => {
              const pricing = formData.pricing[duration];
              return (
                <Card key={duration} className="p-3">
                  <CardContent className="space-y-2 p-0">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">{duration}</Label>
                      <div className="flex gap-1">
                        <Button
                          type="button"
                          variant={
                            pricing.type === "fixed" ? "default" : "outline"
                          }
                          size="sm"
                          className="h-6 px-2 py-1 text-xs"
                          onClick={() =>
                            updatePricing(duration, {
                              type: "fixed",
                              amount: 0,
                              min: undefined,
                              max: undefined,
                            })
                          }
                        >
                          Fixed
                        </Button>
                        <Button
                          type="button"
                          variant={
                            pricing.type === "range" ? "default" : "outline"
                          }
                          size="sm"
                          className="h-6 px-2 py-1 text-xs"
                          onClick={() =>
                            updatePricing(duration, {
                              type: "range",
                              min: 0,
                              max: 0,
                              amount: undefined,
                            })
                          }
                        >
                          Range
                        </Button>
                      </div>
                    </div>

                    {pricing.type === "fixed" ? (
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={pricing.amount || ""}
                        onChange={(e) =>
                          updatePricing(duration, {
                            amount: Number(e.target.value),
                          })
                        }
                        className="h-8 text-sm"
                      />
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={pricing.min || ""}
                          onChange={(e) =>
                            updatePricing(duration, {
                              min: Number(e.target.value),
                            })
                          }
                          className="h-8 text-sm"
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={pricing.max || ""}
                          onChange={(e) =>
                            updatePricing(duration, {
                              max: Number(e.target.value),
                            })
                          }
                          className="h-8 text-sm"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onFinishLater}
        >
          Finish Later
        </Button>
        <Button
          type="button"
          className="flex-1"
          onClick={onNext}
          disabled={!isFormValid}
        >
          Next
        </Button>
      </div>

      {!isFormValid && (
        <p className="text-muted-foreground text-center text-xs">
          {!formData.name || !formData.creatorType || !formData.niche
            ? "Please fill in all fields to continue"
            : formData.subNiches.length < 3
              ? "Please select at least 3 specialties to continue"
              : "Please set pricing for at least one duration to continue"}
        </p>
      )}
    </div>
  );
}
