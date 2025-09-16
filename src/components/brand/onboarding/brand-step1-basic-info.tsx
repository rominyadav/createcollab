"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import type { BrandOnboardingData } from "../brand-onboarding";

interface BrandStep1Props {
  formData: BrandOnboardingData;
  updateFormData: (updates: Partial<BrandOnboardingData>) => void;
  onNext: () => void;
  onFinishLater: () => void;
}

export default function BrandStep1BasicInfo({
  formData,
  updateFormData,
  onNext,
  onFinishLater,
}: BrandStep1Props) {
  const industries = [
    "Technology",
    "Fashion",
    "Food & Beverage",
    "Health & Fitness",
    "Travel & Tourism",
    "Education",
    "Entertainment",
    "Finance",
    "Automotive",
    "Real Estate",
  ];

  const employeeSizes = [
    "1-10",
    "11-50",
    "51-100",
    "101-250",
    "251-500",
    "501-1000",
    "1000+",
  ];

  const revenueRanges = [
    "Under $100K",
    "$100K - $500K",
    "$500K - $1M",
    "$1M - $5M",
    "$5M - $10M",
    "$10M - $50M",
    "$50M+",
  ];

  const isFormValid =
    formData.companyName &&
    formData.industry &&
    formData.email &&
    formData.phone &&
    formData.description &&
    formData.founded &&
    formData.employees &&
    formData.revenue;

  return (
    <div className="animate-in fade-in-50 space-y-4 duration-300">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            placeholder="Enter company name"
            value={formData.companyName}
            onChange={(e) => updateFormData({ companyName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry *</Label>
          <Select
            id="industry"
            value={formData.industry}
            onChange={(e) => updateFormData({ industry: e.target.value })}
            placeholder="Select industry"
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Business Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="contact@company.com"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            placeholder="+977-1-4444444"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            placeholder="www.company.com"
            value={formData.website}
            onChange={(e) => updateFormData({ website: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="founded">Founded Year *</Label>
          <Input
            id="founded"
            placeholder="2020"
            value={formData.founded}
            onChange={(e) => updateFormData({ founded: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employees">Company Size *</Label>
          <Select
            id="employees"
            value={formData.employees}
            onChange={(e) => updateFormData({ employees: e.target.value })}
            placeholder="Select size"
          >
            {employeeSizes.map((size) => (
              <option key={size} value={size}>
                {size} employees
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="revenue">Annual Revenue *</Label>
          <Select
            id="revenue"
            value={formData.revenue}
            onChange={(e) => updateFormData({ revenue: e.target.value })}
            placeholder="Select range"
          >
            {revenueRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Company Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe your company and what you do..."
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          rows={3}
          className="resize-none"
        />
      </div>

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
          Please fill in all required fields to continue
        </p>
      )}
    </div>
  );
}
