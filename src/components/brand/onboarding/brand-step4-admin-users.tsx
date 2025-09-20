"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { api } from "../../../../convex/_generated/api";
import type { BrandOnboardingData } from "../brand-onboarding";

interface BrandStep4Props {
  formData: BrandOnboardingData;
  updateFormData: (updates: Partial<BrandOnboardingData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function BrandStep4AdminUsers({
  formData,
  updateFormData,
  onSubmit,
  onBack,
}: BrandStep4Props) {
  const { user } = useUser();
  const convexUser = useQuery(
    api.users.getUserByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );
  const commonRoles = [
    "CEO",
    "Founder",
    "Managing Director",
    "Marketing Director",
    "Creative Director",
    "Operations Manager",
    "Brand Manager",
    "CMO",
  ];

  const updateAdminUser = (
    index: number,
    field: "role" | "phone" | "isPrimary",
    value: string | boolean
  ) => {
    const updatedUsers = [...formData.adminUsers];
    updatedUsers[index] = { ...updatedUsers[index], [field]: value };
    updateFormData({ adminUsers: updatedUsers });
  };

  const addAdminUser = () => {
    updateFormData({
      adminUsers: [
        ...formData.adminUsers,
        {
          name: "",
          email: "",
          role: "",
          phone: "",
          isPrimary: false,
        },
      ],
    });
  };

  const removeAdminUser = (index: number) => {
    if (formData.adminUsers.length > 1) {
      const updatedUsers = formData.adminUsers.filter((_, i) => i !== index);
      updateFormData({ adminUsers: updatedUsers });
    }
  };

  const setPrimaryUser = (index: number) => {
    const updatedUsers = formData.adminUsers.map((user, i) => ({
      ...user,
      isPrimary: i === index,
    }));
    updateFormData({ adminUsers: updatedUsers });
  };

  // Simplified validation - only check if we have at least one complete admin user who is primary
  const isFormValid =
    formData.adminUsers.length > 0 &&
    formData.adminUsers.some(
      (adminUser) =>
        adminUser.role.trim() && adminUser.phone.trim() && adminUser.isPrimary
    );

  return (
    <div className="animate-in fade-in-50 space-y-6 duration-300">
      <div className="text-center">
        <Label className="text-lg font-medium">Admin Users</Label>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage team members who will have access to your brand account
        </p>
      </div>

      {/* Info about pre-populated user */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
              <svg
                className="h-3 w-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-800">
                Account Owner Pre-filled
              </h4>
              <p className="mt-1 text-xs text-blue-700">
                We&apos;ve pre-filled your details as the primary admin. You can
                edit these details or add additional team members.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {formData.adminUsers.map((adminUser, index) => (
          <Card
            key={index}
            className={`p-4 ${index === 0 ? "border-emerald-200 bg-emerald-50" : ""}`}
          >
            <CardContent className="space-y-4 p-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium">
                    {index === 0 ? "Account Owner" : `Admin User ${index + 1}`}
                  </Label>
                  {adminUser.isPrimary && (
                    <Badge variant="default" className="text-xs">
                      Primary
                    </Badge>
                  )}
                  {index === 0 && (
                    <Badge
                      variant="outline"
                      className="border-emerald-300 bg-emerald-100 text-xs"
                    >
                      You
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  {!adminUser.isPrimary && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPrimaryUser(index)}
                      className="h-6 px-2 py-1 text-xs"
                    >
                      Set Primary
                    </Button>
                  )}
                  {formData.adminUsers.length > 1 && index !== 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeAdminUser(index)}
                      className="h-6 px-2 py-1 text-xs text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    value={index === 0 && convexUser ? convexUser.name : ""}
                    disabled
                    className="h-8 bg-gray-50 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    value={index === 0 && convexUser ? convexUser.email : ""}
                    disabled
                    className="h-8 bg-gray-50 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`role-${index}`}>Role *</Label>
                  <Input
                    id={`role-${index}`}
                    placeholder="CEO"
                    value={adminUser.role}
                    onChange={(e) =>
                      updateAdminUser(index, "role", e.target.value)
                    }
                    className="h-8 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`phone-${index}`}>Phone *</Label>
                  <Input
                    id={`phone-${index}`}
                    placeholder="+977-9841234567"
                    value={adminUser.phone}
                    onChange={(e) =>
                      updateAdminUser(index, "phone", e.target.value)
                    }
                    className="h-8 text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {commonRoles.map((role) => (
                  <Badge
                    key={role}
                    variant="outline"
                    className="cursor-pointer text-xs hover:bg-emerald-100"
                    onClick={() => updateAdminUser(index, "role", role)}
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addAdminUser}
        className="w-full"
      >
        + Add Another Admin User
      </Button>

      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
              <svg
                className="h-3 w-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-green-800">
                Ready to Submit
              </h4>
              <p className="mt-1 text-xs text-green-700">
                Your brand profile is complete! After submission, our team will
                review your application within 24-48 hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="button"
          className="flex-1"
          onClick={onSubmit}
          disabled={!isFormValid}
        >
          Submit Application
        </Button>
      </div>

      {!isFormValid && (
        <p className="text-muted-foreground text-center text-xs">
          Please ensure the primary admin user has all required details filled
          in
        </p>
      )}
    </div>
  );
}
