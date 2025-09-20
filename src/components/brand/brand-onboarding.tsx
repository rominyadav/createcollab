"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import BrandStep1BasicInfo from "./onboarding/brand-step1-basic-info";
import BrandStep2SocialMedia from "./onboarding/brand-step2-social-media";
import BrandStep3Documents from "./onboarding/brand-step3-documents";
import BrandStep4AdminUsers from "./onboarding/brand-step4-admin-users";

export interface BrandOnboardingData {
  // Step 1: Basic Info
  companyName: string;
  industry: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  founded: string;
  employees: string;
  revenue: string;

  // Step 2: Social Media & Location
  socialMedia: {
    facebook: { connected: boolean; accountName?: string };
    instagram: { connected: boolean; accountName?: string };
    twitter: { connected: boolean; accountName?: string };
    linkedin: { connected: boolean; accountName?: string };
  };
  location: {
    address: string;
    city: string;
    country: string;
    province: string;
  };

  // Step 3: Documents
  documents: {
    panNumber: string;
    vatNumber: string;
    companyRegistration: string;
    registrationNumber: string;
  };

  // Step 4: Admin Users
  adminUsers: Array<{
    name: string;
    email: string;
    role: string;
    phone: string;
    isPrimary: boolean;
  }>;
}

export default function BrandOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BrandOnboardingData>({
    companyName: "",
    industry: "",
    email: "",
    phone: "",
    website: "",
    description: "",
    founded: "",
    employees: "",
    revenue: "",
    socialMedia: {
      facebook: { connected: false },
      instagram: { connected: false },
      twitter: { connected: false },
      linkedin: { connected: false },
    },
    location: {
      address: "",
      city: "",
      country: "",
      province: "",
    },
    documents: {
      panNumber: "",
      vatNumber: "",
      companyRegistration: "",
      registrationNumber: "",
    },
    adminUsers: [
      {
        name: "John Doe",
        email: "john.doe@company.com",
        role: "CEO",
        phone: "+977-9841234567",
        isPrimary: true,
      },
    ],
  });

  const getProgressValue = () => {
    switch (currentStep) {
      case 1:
        return 0;
      case 2:
        return 25;
      case 3:
        return 50;
      case 4:
        return 75;
      default:
        return 0;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinishLater = () => {
    router.push("/brands");
  };

  const handleSubmit = () => {
    console.log("Submitting brand onboarding data:", formData);
    router.push("/brands");
  };

  const updateFormData = (updates: Partial<BrandOnboardingData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-2xl font-bold text-transparent">
            Brand Onboarding
          </CardTitle>
          <p className="text-muted-foreground">
            Step {currentStep} of 4 - Set up your brand profile
          </p>
          <div className="mt-4">
            <Progress value={getProgressValue()} className="h-3" />
          </div>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <BrandStep1BasicInfo
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onFinishLater={handleFinishLater}
            />
          )}
          {currentStep === 2 && (
            <BrandStep2SocialMedia
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <BrandStep3Documents
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 4 && (
            <BrandStep4AdminUsers
              formData={formData}
              updateFormData={updateFormData}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
