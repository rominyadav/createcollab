"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

import type { BrandOnboardingData } from "../brand-onboarding";

interface BrandStep2Props {
  formData: BrandOnboardingData;
  updateFormData: (updates: Partial<BrandOnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const socialPlatforms = [
  {
    key: "facebook",
    name: "Facebook",
    color: "from-blue-600 to-blue-700",
    icon: "📘",
    description: "Connect your Facebook Business Page",
  },
  {
    key: "instagram",
    name: "Instagram",
    color: "from-pink-500 to-purple-600",
    icon: "📷",
    description: "Connect your Instagram Business Account",
  },
  {
    key: "twitter",
    name: "Twitter/X",
    color: "from-gray-800 to-gray-900",
    icon: "🐦",
    description: "Connect your Twitter Business Account",
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    color: "from-blue-700 to-blue-800",
    icon: "💼",
    description: "Connect your LinkedIn Company Page",
  },
] as const;

export default function BrandStep2SocialMedia({
  formData,
  updateFormData,
  onNext,
  onBack,
}: BrandStep2Props) {
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
    formData.location.country === "Nepal"
      ? Object.keys(locationData.Nepal)
      : formData.location.country === "India"
        ? Object.keys(locationData.India)
        : [];

  const cities =
    formData.location.country === "Nepal" && formData.location.province
      ? locationData.Nepal[
          formData.location.province as keyof typeof locationData.Nepal
        ] || []
      : formData.location.country === "India" && formData.location.province
        ? locationData.India[
            formData.location.province as keyof typeof locationData.India
          ] || []
        : [];

  const handleSocialConnect = (
    platform: keyof BrandOnboardingData["socialMedia"]
  ) => {
    // Mock OAuth connection - in real app this would trigger OAuth flow
    const mockAccountNames = {
      facebook: "@YourBrandPage",
      instagram: "@yourbrand",
      twitter: "@YourBrand",
      linkedin: "Your Company",
    };

    const isConnected = formData.socialMedia[platform].connected;

    updateFormData({
      socialMedia: {
        ...formData.socialMedia,
        [platform]: {
          connected: !isConnected,
          accountName: !isConnected ? mockAccountNames[platform] : undefined,
        },
      },
    });
  };

  const updateLocation = (
    field: keyof BrandOnboardingData["location"],
    value: string
  ) => {
    const updates: Partial<BrandOnboardingData["location"]> = {
      [field]: value,
    };

    // Reset dependent fields when country or province changes
    if (field === "country") {
      updates.province = "";
      updates.city = "";
    } else if (field === "province") {
      updates.city = "";
    }

    updateFormData({
      location: {
        ...formData.location,
        ...updates,
      },
    });
  };

  const isFormValid =
    formData.location.address &&
    formData.location.country &&
    formData.location.province &&
    formData.location.city;

  const connectedCount = Object.values(formData.socialMedia).filter(
    (platform) => platform.connected
  ).length;

  return (
    <div className="animate-in fade-in-50 space-y-6 duration-300">
      {/* Social Media Section */}
      <div className="space-y-4">
        <div className="text-center">
          <Label className="text-base font-medium">Connect Social Media</Label>
          <p className="text-muted-foreground mt-1 text-sm">
            Connect your brand&apos;s social media accounts via OAuth (optional)
          </p>
        </div>

        <div className="grid gap-3">
          {socialPlatforms.map((platform) => {
            const isConnected = formData.socialMedia[platform.key].connected;
            const accountName = formData.socialMedia[platform.key].accountName;

            return (
              <Card
                key={platform.key}
                className={`transition-all duration-200 hover:shadow-md ${isConnected ? "border-green-200 bg-green-50" : ""}`}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full bg-gradient-to-r ${platform.color} flex items-center justify-center text-lg text-white`}
                    >
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{platform.name}</h3>
                      <p className="text-muted-foreground text-xs">
                        {isConnected
                          ? `Connected as ${accountName}`
                          : platform.description}
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant={isConnected ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSocialConnect(platform.key)}
                    className={`text-xs ${isConnected ? "bg-green-600 hover:bg-green-700" : ""}`}
                  >
                    {isConnected ? "Connected" : "Connect"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {connectedCount > 0 && (
          <div className="rounded-md border border-green-200 bg-green-50 p-3 text-center">
            <p className="text-sm font-medium text-green-700">
              Great! You&apos;ve connected {connectedCount} social media account
              {connectedCount > 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>

      {/* Location Section */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Business Location *</Label>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Select
              id="country"
              value={formData.location.country}
              onChange={(e) => updateLocation("country", e.target.value)}
              placeholder="Select country"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Select>
          </div>

          {formData.location.country && (
            <div className="space-y-2">
              <Label htmlFor="province">
                {formData.location.country === "Nepal" ? "Province" : "State"} *
              </Label>
              <Select
                id="province"
                value={formData.location.province}
                onChange={(e) => updateLocation("province", e.target.value)}
                placeholder={`Select ${formData.location.country === "Nepal" ? "province" : "state"}`}
              >
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </Select>
            </div>
          )}

          {formData.location.province && (
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Select
                id="city"
                value={formData.location.city}
                onChange={(e) => updateLocation("city", e.target.value)}
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

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              placeholder="123 Business Street"
              value={formData.location.address}
              onChange={(e) => updateLocation("address", e.target.value)}
            />
          </div>
        </div>
      </div>

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
          Please fill in all required location fields to continue
        </p>
      )}
    </div>
  );
}
