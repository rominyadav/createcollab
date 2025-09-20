"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { useClerk } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import {
  Building2,
  Camera,
  Facebook,
  FileText,
  Globe,
  Instagram,
  Linkedin,
  LogOut,
  MapPin,
  Settings,
  Twitter,
  User,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/user-ui/page-header";

import { api } from "../../../../convex/_generated/api";

interface Brand {
  _id: string;
  clerkId: string;
  companyName: string;
  industry: string;
  email: string;
  phone: string;
  website?: string;
  description?: string;
  founded?: string;
  employees?: string;
  revenue?: string;
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
  documents: {
    panNumber?: string;
    vatNumber?: string;
    companyRegistration?: string;
    registrationNumber?: string;
  };
  adminUsers: Array<{
    userId: string;
    role: string;
    phone: string;
    isPrimary: boolean;
  }>;
  logo?: string;

  verifyStatus?: "pending" | "verified" | "rejected";
  isOnboardingComplete: boolean;
  createdAt: number;
  updatedAt: number;
}

interface User {
  _id: string;
  clerkId: string;
  email: string;
  name: string;
  avatar?: string;
  roles: string[];
  createdAt: number;
  updatedAt: number;
}

interface BrandProfileProps {
  brand: Brand;
  creator: User;
}

export function BrandProfile({ brand, creator }: BrandProfileProps) {
  const [activeProfile, setActiveProfile] = useState<"brand" | "individual">(
    "brand"
  );
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const updateBrandLogo = useMutation(api.brands.updateLogo);
  const updateUserAvatar = useMutation(api.users.updateAvatar);
  const { signOut } = useClerk();

  const handleSettingsClick = () => {
    console.log("Opening settings");
  };

  const handleLogout = () => {
    signOut();
  };

  const handleLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await result.json();
      await updateBrandLogo({ brandId: brand._id, logoFileId: storageId });
    } catch (error) {
      console.error("Logo upload failed:", error);
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await result.json();
      await updateUserAvatar({ userId: creator._id, avatarFileId: storageId });
    } catch (error) {
      console.error("Avatar upload failed:", error);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const renderBrandProfile = () => (
    <div className="space-y-6">
      {/* Brand Header */}
      <div className="text-center">
        <div className="relative mx-auto mb-4 h-24 w-24">
          {brand.logo ? (
            <Image
              src={brand.logo}
              alt={brand.companyName}
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-2xl font-bold text-white">
                {brand.companyName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          <button
            onClick={() => logoInputRef.current?.click()}
            disabled={isUploadingLogo}
            className="absolute -right-1 -bottom-1 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Camera className="h-3 w-3" />
          </button>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
        </div>

        <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
          {brand.companyName}
        </h2>

        <p className="mb-2 text-gray-600 dark:text-gray-400">
          {brand.industry} Company
        </p>

        <div className="flex items-center justify-center gap-2">
          <Badge
            className={
              brand.verifyStatus === "verified"
                ? "bg-green-600 text-white"
                : brand.verifyStatus === "rejected"
                  ? "bg-red-600 text-white"
                  : "bg-yellow-600 text-white"
            }
          >
            {brand.verifyStatus === "verified"
              ? "✓ Verified"
              : brand.verifyStatus === "rejected"
                ? "✗ Rejected"
                : "⏳ Pending Verification"}
          </Badge>
        </div>

        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">0</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Campaigns
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {brand.adminUsers.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Admins</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {brand.founded || "N/A"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Founded</p>
          </div>
        </div>
      </div>

      {/* Brand Description */}
      <Card>
        <CardContent className="p-4">
          <p className="text-center text-gray-700 dark:text-slate-300">
            {brand.description || "No description available"}
          </p>
        </CardContent>
      </Card>

      {/* Company Details */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-400" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm">
              {brand.location.city}, {brand.location.country}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {brand.location.address}, {brand.location.province}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-gray-400" />
              Company Size
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm">{brand.employees || "N/A"} employees</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Revenue: {brand.revenue || "N/A"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-400" />
            {brand.website ? (
              <a
                href={`https://${brand.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                {brand.website}
              </a>
            ) : (
              <span className="text-sm text-gray-500">No website</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">📧</span>
            <span className="text-sm text-gray-900 dark:text-white">
              {brand.email}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">📞</span>
            <span className="text-sm text-gray-900 dark:text-white">
              {brand.phone}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Social Media Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`flex items-center gap-3 rounded-lg border p-3 ${
                brand.socialMedia.facebook.connected
                  ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20"
                  : "border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/20"
              }`}
            >
              <Facebook
                className={`h-5 w-5 ${
                  brand.socialMedia.facebook.connected
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Facebook
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {brand.socialMedia.facebook.connected
                    ? brand.socialMedia.facebook.accountName || "Connected"
                    : "Not connected"}
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-3 rounded-lg border p-3 ${
                brand.socialMedia.instagram.connected
                  ? "border-pink-200 bg-pink-50 dark:border-pink-800 dark:bg-pink-900/20"
                  : "border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/20"
              }`}
            >
              <Instagram
                className={`h-5 w-5 ${
                  brand.socialMedia.instagram.connected
                    ? "text-pink-600"
                    : "text-gray-400"
                }`}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Instagram
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {brand.socialMedia.instagram.connected
                    ? brand.socialMedia.instagram.accountName || "Connected"
                    : "Not connected"}
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-3 rounded-lg border p-3 ${
                brand.socialMedia.twitter.connected
                  ? "border-sky-200 bg-sky-50 dark:border-sky-800 dark:bg-sky-900/20"
                  : "border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/20"
              }`}
            >
              <Twitter
                className={`h-5 w-5 ${
                  brand.socialMedia.twitter.connected
                    ? "text-sky-600"
                    : "text-gray-400"
                }`}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Twitter
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {brand.socialMedia.twitter.connected
                    ? brand.socialMedia.twitter.accountName || "Connected"
                    : "Not connected"}
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-3 rounded-lg border p-3 ${
                brand.socialMedia.linkedin.connected
                  ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20"
                  : "border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/20"
              }`}
            >
              <Linkedin
                className={`h-5 w-5 ${
                  brand.socialMedia.linkedin.connected
                    ? "text-blue-700"
                    : "text-gray-400"
                }`}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  LinkedIn
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {brand.socialMedia.linkedin.connected
                    ? brand.socialMedia.linkedin.accountName || "Connected"
                    : "Not connected"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4 text-gray-400" />
            Company Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-600">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                PAN Number
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {brand.documents.panNumber || "Not provided"}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-600">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                VAT Number
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {brand.documents.vatNumber || "Not provided"}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-600">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Registration Number
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {brand.documents.registrationNumber || "Not provided"}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-600">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Company Registration
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {brand.documents.companyRegistration || "Not provided"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Users */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Brand Administrators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {brand.adminUsers.map((admin, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-slate-600"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white">
                    {admin.role.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {admin.role}
                    </p>
                    {admin.isPrimary && (
                      <Badge variant="outline" className="text-xs">
                        Primary
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {admin.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-4 text-center text-gray-500">
            No campaigns available
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIndividualProfile = () => (
    <div className="space-y-6">
      {/* Individual Header */}
      <div className="text-center">
        <div className="relative mx-auto mb-4 h-24 w-24">
          {creator.avatar ? (
            <Image
              src={creator.avatar}
              alt={creator.name}
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-2xl font-bold text-white">
                {creator.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          <button
            onClick={() => avatarInputRef.current?.click()}
            disabled={isUploadingAvatar}
            className="absolute -right-1 -bottom-1 rounded-full bg-emerald-600 p-2 text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            <Camera className="h-3 w-3" />
          </button>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </div>

        <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
          {creator.name}
        </h2>

        <p className="mb-2 text-gray-600 dark:text-gray-400">
          {creator.roles.join(", ")} & Brand Admin
        </p>

        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {brand.adminUsers.find((admin) => admin.userId === creator._id)
                ?.role || "Admin"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Role</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {new Date(creator.createdAt).getFullYear()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Joined</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              Active
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
          </div>
        </div>
      </div>

      {/* Individual Info */}
      <Card>
        <CardContent className="p-4">
          <p className="text-center text-gray-700 dark:text-slate-300">
            Brand administrator managing campaigns and creator relationships.
          </p>
        </CardContent>
      </Card>

      {/* User Details */}
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-gray-400" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="mb-1 text-sm">
              <span className="text-gray-600">Email:</span> {creator.email}
            </p>
            <p className="mb-1 text-sm">
              <span className="text-gray-600">Phone:</span>{" "}
              {brand.adminUsers.find((admin) => admin.userId === creator._id)
                ?.phone || "N/A"}
            </p>
            <p className="text-sm">
              <span className="text-gray-600">Role:</span>{" "}
              {brand.adminUsers.find((admin) => admin.userId === creator._id)
                ?.role || "N/A"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Creator Role in Brand */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Role in {brand.companyName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/20">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="font-medium text-emerald-900 dark:text-emerald-100">
                  Brand Administrator
                </p>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  Managing campaigns and creator relationships for{" "}
                  {brand.companyName}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="pb-20 md:pb-8">
      <PageHeader
        title="Profile"
        action={{
          icon: LogOut,
          onClick: handleLogout,
          label: "Logout",
        }}
      />

      <div className="space-y-6 p-4">
        {/* Profile Toggle */}
        <Card>
          <CardContent className="p-4">
            <Tabs
              value={activeProfile}
              onValueChange={(value) =>
                setActiveProfile(value as "brand" | "individual")
              }
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="brand"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                  <Building2 className="h-4 w-4" />
                  Brand Profile
                </TabsTrigger>
                <TabsTrigger
                  value="individual"
                  className="flex items-center gap-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                >
                  <User className="h-4 w-4" />
                  Individual Profile
                </TabsTrigger>
              </TabsList>

              <TabsContent value="brand" className="mt-6">
                {renderBrandProfile()}
              </TabsContent>

              <TabsContent value="individual" className="mt-6">
                {renderIndividualProfile()}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
