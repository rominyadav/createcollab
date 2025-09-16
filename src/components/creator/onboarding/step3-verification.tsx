"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

import type { CreatorOnboardingData } from "../creator-onboarding";

interface Step3Props {
  formData: CreatorOnboardingData;
  updateFormData: (updates: Partial<CreatorOnboardingData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function Step3Verification({
  formData,
  updateFormData,
  onSubmit,
  onBack,
}: Step3Props) {
  const locationData = {
    Nepal: {
      "Koshi Province": ["Jhapa", "Ilam", "Panchthar"],
      "Bagmati Province": ["Kathmandu", "Lalitpur", "Bhaktapur"],
      "Gandaki Province": ["Kaski", "Syangja", "Parbat"],
    },
    India: {
      Maharashtra: ["Mumbai", "Pune", "Nagpur"],
      Delhi: ["New Delhi", "North Delhi", "South Delhi"],
    },
  };

  const countries = Object.keys(locationData);
  const provinces =
    formData.country === "Nepal"
      ? Object.keys(locationData.Nepal)
      : formData.country === "India"
        ? Object.keys(locationData.India)
        : [];

  const cities =
    formData.country === "Nepal" && formData.province
      ? locationData.Nepal[
          formData.province as keyof typeof locationData.Nepal
        ] || []
      : formData.country === "India" && formData.province
        ? locationData.India[
            formData.province as keyof typeof locationData.India
          ] || []
        : [];

  const getCountryCode = () => {
    switch (formData.country) {
      case "Nepal":
        return "+977";
      case "India":
        return "+91";
      default:
        return "+977";
    }
  };

  const validatePhoneNumber = (phone: string) => {
    if (formData.country === "Nepal") {
      return /^9[0-9]{9}$/.test(phone);
    }
    if (formData.country === "India") {
      return /^[6-9][0-9]{9}$/.test(phone);
    }
    return phone.length >= 10;
  };

  const isEligibleForVerification =
    formData.panCard &&
    formData.phoneNumber &&
    formData.paymentId &&
    validatePhoneNumber(formData.phoneNumber);

  const isFormValid =
    formData.country &&
    formData.province &&
    formData.city &&
    formData.street &&
    formData.zipCode &&
    formData.panCard &&
    formData.phoneNumber &&
    validatePhoneNumber(formData.phoneNumber) &&
    formData.legalName &&
    formData.paymentId;

  return (
    <div className="animate-in fade-in-50 space-y-6 duration-300">
      <div className="text-center">
        <Label className="text-lg">Verification & Tax Information</Label>
        <p className="text-muted-foreground mt-1 text-sm">
          Complete your profile for verification eligibility
        </p>
      </div>

      <div className="grid gap-4">
        <div className="space-y-4">
          <Label className="text-base font-medium">Shipping Address</Label>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select
              id="country"
              value={formData.country}
              onChange={(e) =>
                updateFormData({
                  country: e.target.value,
                  province: "",
                  city: "",
                })
              }
              placeholder="Select country"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Select>
          </div>

          {formData.country && (
            <div className="space-y-2">
              <Label htmlFor="province">
                {formData.country === "Nepal" ? "Province" : "State"}
              </Label>
              <Select
                id="province"
                value={formData.province}
                onChange={(e) =>
                  updateFormData({
                    province: e.target.value,
                    city: "",
                  })
                }
                placeholder={`Select ${formData.country === "Nepal" ? "province" : "state"}`}
              >
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </Select>
            </div>
          )}

          {formData.province && (
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select
                id="city"
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
                placeholder="Select city"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              placeholder="Enter street address"
              value={formData.street}
              onChange={(e) => updateFormData({ street: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              placeholder="44600"
              value={formData.zipCode}
              onChange={(e) => updateFormData({ zipCode: e.target.value })}
              maxLength={6}
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium">Personal Information</Label>

          <div className="space-y-2">
            <Label htmlFor="legalName">Legal Creator Name</Label>
            <Input
              id="legalName"
              placeholder="Full legal name as per documents"
              value={formData.legalName}
              onChange={(e) => updateFormData({ legalName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <div className="flex gap-2">
              <Input className="w-20" value={getCountryCode()} disabled />
              <Input
                id="phoneNumber"
                placeholder={
                  formData.country === "Nepal" ? "9841234567" : "9876543210"
                }
                value={formData.phoneNumber}
                onChange={(e) =>
                  updateFormData({ phoneNumber: e.target.value })
                }
                maxLength={10}
                className={
                  !validatePhoneNumber(formData.phoneNumber) &&
                  formData.phoneNumber
                    ? "border-red-500"
                    : ""
                }
              />
            </div>
            {!validatePhoneNumber(formData.phoneNumber) &&
              formData.phoneNumber && (
                <p className="text-xs text-red-500">
                  {formData.country === "Nepal"
                    ? "Must start with 9 and be 10 digits"
                    : "Must be a valid 10-digit number"}
                </p>
              )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="panCard">PAN Card Number</Label>
            <Input
              id="panCard"
              placeholder="ABCDE1234F"
              value={formData.panCard}
              onChange={(e) =>
                updateFormData({ panCard: e.target.value.toUpperCase() })
              }
              maxLength={10}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentId">Khalti or eSewa ID</Label>
            <Input
              id="paymentId"
              placeholder="Enter your Khalti or eSewa ID"
              value={formData.paymentId}
              onChange={(e) => updateFormData({ paymentId: e.target.value })}
            />
          </div>
        </div>
      </div>

      {isEligibleForVerification && (
        <Card className="animate-in fade-in-50 border-green-200 bg-green-50 duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <p className="text-sm font-medium text-green-700">
                Profile eligible for moderator verification
              </p>
            </div>
            <p className="mt-1 text-xs text-green-600">
              Your profile will be reviewed by our moderation team
            </p>
          </CardContent>
        </Card>
      )}

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
          Submit
        </Button>
      </div>

      {!isFormValid && (
        <p className="text-muted-foreground text-center text-sm">
          Please fill in all required fields to submit
        </p>
      )}
    </div>
  );
}
