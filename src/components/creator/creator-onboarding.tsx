"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import Step1BasicInfo from "./onboarding/step1-basic-info";
import Step2SocialLinks from "./onboarding/step2-social-links";
import Step3Verification from "./onboarding/step3-verification";

export interface CreatorOnboardingData {
  // Step 1
  name: string;
  creatorType: "Content Creator" | "Social Media Influencer" | "";
  niche: string;
  subNiches: string[];
  pricing: {
    "15sec": {
      type: "fixed" | "range";
      amount?: number;
      min?: number;
      max?: number;
    };
    "30sec": {
      type: "fixed" | "range";
      amount?: number;
      min?: number;
      max?: number;
    };
    "60sec": {
      type: "fixed" | "range";
      amount?: number;
      min?: number;
      max?: number;
    };
    "1-5min": {
      type: "fixed" | "range";
      amount?: number;
      min?: number;
      max?: number;
    };
    "5min+": {
      type: "fixed" | "range";
      amount?: number;
      min?: number;
      max?: number;
    };
  };

  // Step 2
  bio: string;
  socialPlatforms: {
    instagram: boolean;
    facebook: boolean;
    tiktok: boolean;
    youtube: boolean;
  };

  // Step 3
  panCard: string;
  phoneNumber: string;
  legalName: string;
  country: string;
  province: string;
  city: string;
  street: string;
  zipCode: string;
  paymentId: string;
  profilePicture: File | null;
}

export default function CreatorOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CreatorOnboardingData>({
    name: "",
    creatorType: "",
    niche: "",
    subNiches: [],
    pricing: {
      "15sec": { type: "fixed", amount: 0 },
      "30sec": { type: "fixed", amount: 0 },
      "60sec": { type: "fixed", amount: 0 },
      "1-5min": { type: "fixed", amount: 0 },
      "5min+": { type: "fixed", amount: 0 },
    },
    bio: "",
    socialPlatforms: {
      instagram: false,
      facebook: false,
      tiktok: false,
      youtube: false,
    },
    panCard: "",
    phoneNumber: "",
    legalName: "",
    country: "",
    province: "",
    city: "",
    street: "",
    zipCode: "",
    paymentId: "",
    profilePicture: null,
  });

  const getProgressValue = () => {
    switch (currentStep) {
      case 1:
        return 0;
      case 2:
        return 40;
      case 3:
        return 80;
      default:
        return 0;
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinishLater = () => {
    router.push("/creators");
  };

  const handleSubmit = () => {
    // Mock submission - in real app, this would save to backend
    console.log("Submitting creator onboarding data:", formData);
    router.push("/creators");
  };

  const updateFormData = (updates: Partial<CreatorOnboardingData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-2xl font-bold text-transparent">
            Creator Onboarding
          </CardTitle>
          <p className="text-muted-foreground">
            Step {currentStep} of 3 - Let&apos;s get you set up
          </p>
          <div className="mt-4">
            <Progress value={getProgressValue()} className="h-3" />
          </div>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <Step1BasicInfo
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onFinishLater={handleFinishLater}
            />
          )}
          {currentStep === 2 && (
            <Step2SocialLinks
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <Step3Verification
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
