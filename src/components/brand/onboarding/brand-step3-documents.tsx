"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { BrandOnboardingData } from "../brand-onboarding";

interface BrandStep3Props {
  formData: BrandOnboardingData;
  updateFormData: (updates: Partial<BrandOnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function BrandStep3Documents({
  formData,
  updateFormData,
  onNext,
  onBack,
}: BrandStep3Props) {
  const [taxType, setTaxType] = useState<"pan" | "vat">(
    formData.documents.panNumber
      ? "pan"
      : formData.documents.vatNumber
        ? "vat"
        : "pan"
  );

  const updateDocuments = (
    field: keyof BrandOnboardingData["documents"],
    value: string
  ) => {
    updateFormData({
      documents: {
        ...formData.documents,
        [field]: value,
      },
    });
  };

  const handleTaxTypeChange = (type: "pan" | "vat") => {
    setTaxType(type);
    // Clear the other tax field when switching
    if (type === "pan") {
      updateDocuments("vatNumber", "");
    } else {
      updateDocuments("panNumber", "");
    }
  };

  const hasTaxNumber =
    taxType === "pan"
      ? formData.documents.panNumber
      : formData.documents.vatNumber;
  const isFormValid = hasTaxNumber && formData.documents.companyRegistration;

  return (
    <div className="animate-in fade-in-50 space-y-6 duration-300">
      <div className="text-center">
        <Label className="text-lg font-medium">Business Documents</Label>
        <p className="text-muted-foreground mt-1 text-sm">
          Provide your business registration and tax documents
        </p>
      </div>

      <div className="grid gap-4">
        {/* Tax Number Selection */}
        <Card className="p-4">
          <CardContent className="space-y-4 p-0">
            <div>
              <Label className="text-sm font-medium">Tax Registration *</Label>
              <p className="text-muted-foreground mt-1 text-xs">
                Choose either PAN or VAT registration (not both)
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant={taxType === "pan" ? "default" : "outline"}
                size="sm"
                onClick={() => handleTaxTypeChange("pan")}
                className="flex-1"
              >
                PAN Number
              </Button>
              <Button
                type="button"
                variant={taxType === "vat" ? "default" : "outline"}
                size="sm"
                onClick={() => handleTaxTypeChange("vat")}
                className="flex-1"
              >
                VAT Number
              </Button>
            </div>

            {taxType === "pan" ? (
              <div className="space-y-2">
                <Label htmlFor="panNumber">PAN Number *</Label>
                <Input
                  id="panNumber"
                  placeholder="ABCDE1234F"
                  value={formData.documents.panNumber}
                  onChange={(e) =>
                    updateDocuments("panNumber", e.target.value.toUpperCase())
                  }
                  maxLength={10}
                  className="font-mono"
                />
                <p className="text-muted-foreground text-xs">
                  Permanent Account Number for tax purposes
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="vatNumber">VAT Number *</Label>
                <Input
                  id="vatNumber"
                  placeholder="VAT123456789"
                  value={formData.documents.vatNumber}
                  onChange={(e) =>
                    updateDocuments("vatNumber", e.target.value.toUpperCase())
                  }
                  maxLength={15}
                  className="font-mono"
                />
                <p className="text-muted-foreground text-xs">
                  Value Added Tax registration number
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Company Registration */}
        <Card className="p-4">
          <CardContent className="space-y-3 p-0">
            <div>
              <Label
                htmlFor="companyRegistration"
                className="text-sm font-medium"
              >
                Company Registration *
              </Label>
              <p className="text-muted-foreground mt-1 text-xs">
                Official company registration number (required)
              </p>
            </div>

            <Input
              id="companyRegistration"
              placeholder="REG123456789"
              value={formData.documents.companyRegistration}
              onChange={(e) =>
                updateDocuments(
                  "companyRegistration",
                  e.target.value.toUpperCase()
                )
              }
              maxLength={20}
              className="font-mono"
            />
          </CardContent>
        </Card>

        {/* Business Registration Number - Optional */}
        <Card className="p-4">
          <CardContent className="space-y-3 p-0">
            <div>
              <Label
                htmlFor="registrationNumber"
                className="text-sm font-medium"
              >
                Business Registration Number
              </Label>
              <p className="text-muted-foreground mt-1 text-xs">
                Additional business registration (optional)
              </p>
            </div>

            <Input
              id="registrationNumber"
              placeholder="COMP001/2024"
              value={formData.documents.registrationNumber}
              onChange={(e) =>
                updateDocuments(
                  "registrationNumber",
                  e.target.value.toUpperCase()
                )
              }
              maxLength={20}
              className="font-mono"
            />
          </CardContent>
        </Card>
      </div>

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
                Document Verification
              </h4>
              <p className="mt-1 text-xs text-blue-700">
                Tax registration and company registration are required. Business
                registration number is optional but recommended.
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
          onClick={onNext}
          disabled={!isFormValid}
        >
          Next
        </Button>
      </div>

      {!isFormValid && (
        <p className="text-muted-foreground text-center text-xs">
          Please fill in {taxType.toUpperCase()} number and company registration
          to continue
        </p>
      )}
    </div>
  );
}
