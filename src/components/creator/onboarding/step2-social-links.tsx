"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { CreatorOnboardingData } from "../creator-onboarding";

interface Step2Props {
  formData: CreatorOnboardingData;
  updateFormData: (updates: Partial<CreatorOnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const socialPlatforms = [
  { key: "instagram", name: "Instagram", color: "from-pink-500 to-purple-600" },
  { key: "facebook", name: "Facebook", color: "from-blue-600 to-blue-700" },
  { key: "tiktok", name: "TikTok", color: "from-gray-800 to-gray-900" },
  { key: "youtube", name: "YouTube", color: "from-red-500 to-red-600" },
] as const;

export default function Step2SocialLinks({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step2Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Mock Clerk auth profile picture - in real app this would come from useUser()
  const defaultProfileUrl =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";

  const togglePlatform = (
    platform: keyof CreatorOnboardingData["socialPlatforms"]
  ) => {
    updateFormData({
      socialPlatforms: {
        ...formData.socialPlatforms,
        [platform]: !formData.socialPlatforms[platform],
      },
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ profilePicture: file });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const hasConnectedPlatform = Object.values(formData.socialPlatforms).some(
    Boolean
  );

  return (
    <div className="animate-in fade-in-50 space-y-4 duration-300">
      {/* Profile Picture Section */}
      <div className="space-y-3 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-emerald-200 shadow-lg">
              <Image
                src={previewUrl || defaultProfileUrl}
                alt="Profile"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
            <Label
              htmlFor="profilePicture"
              className="absolute -right-1 -bottom-1 cursor-pointer rounded-full bg-emerald-500 p-1.5 shadow-lg transition-colors hover:bg-emerald-600"
            >
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </Label>
          </div>
          <div>
            <Label className="text-base font-semibold">
              {formData.name || "Creator"}
            </Label>
            <p className="text-muted-foreground text-xs">
              {formData.creatorType || "Content Creator"}
            </p>
          </div>
        </div>

        {/* Mobile Upload Button */}
        <div className="md:hidden">
          <Label htmlFor="profilePicture" className="cursor-pointer">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              asChild
            >
              <span>Upload Profile Picture</span>
            </Button>
          </Label>
        </div>

        <Input
          id="profilePicture"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Bio Section */}
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself and your content..."
          value={formData.bio}
          onChange={(e) => updateFormData({ bio: e.target.value })}
          rows={3}
          className="resize-none"
        />
      </div>

      <div className="text-center">
        <Label className="text-base">Connect Social Media</Label>
        <p className="text-muted-foreground mt-1 text-xs">
          Link your accounts to showcase reach
        </p>
      </div>

      <div className="grid gap-2">
        {socialPlatforms.map((platform) => {
          const isConnected = formData.socialPlatforms[platform.key];

          return (
            <Card
              key={platform.key}
              className="transition-all duration-200 hover:shadow-md"
            >
              <CardContent className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full bg-gradient-to-r ${platform.color} flex items-center justify-center text-sm font-semibold text-white`}
                  >
                    {platform.name[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{platform.name}</h3>
                    <p className="text-muted-foreground text-xs">
                      {isConnected ? "Connected" : "Not connected"}
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  variant={isConnected ? "default" : "outline"}
                  size="sm"
                  onClick={() => togglePlatform(platform.key)}
                  className={`text-xs ${isConnected ? "bg-green-600 hover:bg-green-700" : ""}`}
                >
                  {isConnected ? "Connected" : "Connect"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {hasConnectedPlatform && (
        <div className="animate-in fade-in-50 rounded-md border border-green-200 bg-green-50 p-3 text-center duration-300">
          <p className="text-sm font-medium text-green-700">
            Great! You&apos;ve connected{" "}
            {Object.values(formData.socialPlatforms).filter(Boolean).length}{" "}
            platform(s)
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-2 pt-4">
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
          variant="ghost"
          className="flex-1"
          onClick={onNext}
        >
          Skip
        </Button>
        <Button type="button" className="flex-1" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
