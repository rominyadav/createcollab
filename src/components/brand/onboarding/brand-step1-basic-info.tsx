"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  type BrandStep1Data,
  brandStep1Schema,
} from "@/features/brand/schemas";

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
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<BrandStep1Data>({
    resolver: zodResolver(brandStep1Schema),
    defaultValues: {
      companyName: formData.companyName,
      industry: formData.industry,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      description: formData.description,
      founded: formData.founded,
      employees: formData.employees,
      revenue: formData.revenue,
    },
    mode: "onChange",
  });

  const watchedValues = watch();

  const onSubmit = (data: BrandStep1Data) => {
    updateFormData(data);
    onNext();
  };
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="animate-in fade-in-50 space-y-4 duration-300"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            placeholder="Enter company name"
            {...register("companyName")}
          />
          {errors.companyName && (
            <p className="text-sm text-red-500">{errors.companyName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry *</Label>
          <select
            id="industry"
            {...register("industry")}
            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          {errors.industry && (
            <p className="text-sm text-red-500">{errors.industry.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Business Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="contact@company.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            placeholder="+977-1-4444444"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            placeholder="https://www.company.com"
            {...register("website")}
          />
          {errors.website && (
            <p className="text-sm text-red-500">{errors.website.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="founded">Founded Year *</Label>
          <Input id="founded" placeholder="2020" {...register("founded")} />
          {errors.founded && (
            <p className="text-sm text-red-500">{errors.founded.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="employees">Company Size *</Label>
          <select
            id="employees"
            {...register("employees")}
            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select size</option>
            {employeeSizes.map((size) => (
              <option key={size} value={size}>
                {size} employees
              </option>
            ))}
          </select>
          {errors.employees && (
            <p className="text-sm text-red-500">{errors.employees.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="revenue">Annual Revenue *</Label>
          <select
            id="revenue"
            {...register("revenue")}
            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select range</option>
            {revenueRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          {errors.revenue && (
            <p className="text-sm text-red-500">{errors.revenue.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Company Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe your company and what you do..."
          {...register("description")}
          rows={3}
          className="resize-none"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
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
        <Button type="submit" className="flex-1" disabled={!isValid}>
          Next
        </Button>
      </div>

      {!isValid && Object.keys(errors).length > 0 && (
        <p className="text-muted-foreground text-center text-xs">
          Please fix the errors above to continue
        </p>
      )}
    </form>
  );
}
