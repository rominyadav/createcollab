import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";

import { ThemeToggle } from "./theme-toggle";

interface Brand {
  id: number;
  name: string;
  logo: string;
  industry: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  founded: string;
  employees: string;
  revenue: string;
  status: string;
  verified: boolean;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    district?: string;
    province?: string;
    coordinates?: { lat: number; lng: number };
  };
  documents: {
    panNumber: string;
    vatNumber: string;
    companyRegistration: string;
    registrationNumber: string;
  };
  adminUsers: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
    phone: string;
    avatar: string;
    isPrimary: boolean;
  }>;
  billing: {
    plan: string;
    subscriptionType: string;
    subscriptionExpiry: string;
    monthlyAmount: number;
    currency: string;
    paymentMethod: string;
    lastBillingDate: string;
    nextBillingDate: string;
  };
  depositRequests: Array<{
    id: number;
    amount: number;
    currency: string;
    status: string;
    requestedDate: string;
    approvedDate?: string;
    purpose: string;
    adminUser: string;
  }>;
  coupons: Array<{
    id: number;
    code: string;
    discount: string;
    type: string;
    validFrom: string;
    validUntil: string;
    maxUses: number;
    usedCount: number;
    minOrderAmount: number;
    currency: string;
    status: string;
  }>;
  creatorCollaborations: Array<{
    creatorId: number;
    creatorName: string;
    creatorAvatar: string;
    campaigns: number;
    totalSpent: number;
    lastCollaboration: string;
    rating: number;
  }>;
  submitted: string;
  campaigns: Array<{
    id: number;
    title: string;
    budget: number;
    status: string;
    startDate: string;
    endDate: string;
  }>;
}

interface BrandProfileReviewProps {
  brand: Brand;
  onApprove: (brandId: number) => void;
  onReject: (brandId: number) => void;
  onClose: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "approved":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

const getRequestStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "approved":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

const getCouponStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "expired":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "inactive":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

export function BrandProfileReview({
  brand,
  onApprove,
  onReject,
  onClose,
}: BrandProfileReviewProps) {
  const [selectedCreator, setSelectedCreator] = useState<number | null>(null);

  const handleCreatorClick = (creatorId: number) => {
    setSelectedCreator(creatorId);
    // In a real app, this would navigate to the creator profile
    console.log(`Navigating to creator ${creatorId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* 3D Depth Effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-30 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600"></div>
      <div className="relative z-10">
        <Card className="h-[90vh] w-[95vw] max-w-7xl overflow-hidden border-0 bg-white/95 shadow-2xl backdrop-blur-sm dark:bg-slate-800/95">
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 dark:from-slate-700 dark:to-slate-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-xl font-bold text-white">
                    {brand.logo}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {brand.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {brand.industry} • {brand.employees} employees •{" "}
                    {brand.revenue}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative z-30">
                  <ThemeToggle />
                </div>
                <Badge className={getStatusColor(brand.status)}>
                  {brand.status.charAt(0).toUpperCase() + brand.status.slice(1)}
                </Badge>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="rounded-xl border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:border-slate-500 dark:hover:bg-slate-600"
                >
                  <Icon name="x" size="sm" />
                  Close
                </Button>
              </div>
            </div>
          </CardHeader>

          <div className="flex h-full overflow-hidden">
            {/* Left Side - Main Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Brand Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="building" variant="primary" />
                      Brand Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Email
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {brand.email}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Phone
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {brand.phone}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Website
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {brand.website}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Founded
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {brand.founded}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Description
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {brand.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="mapPin" variant="muted" size="sm" />
                      <span className="text-gray-900 dark:text-white">
                        {brand.location.address}, {brand.location.city},{" "}
                        {brand.location.state}, {brand.location.country}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Company Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="fileText" variant="primary" />
                      Company Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          PAN Number
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {brand.documents.panNumber}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          VAT Number
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {brand.documents.vatNumber}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Company Registration
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {brand.documents.companyRegistration}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Registration Number
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {brand.documents.registrationNumber}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Brand Admin Users */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="users" variant="primary" />
                      Brand Admin Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {brand.adminUsers.map((admin) => (
                        <div
                          key={admin.id}
                          className="flex items-center gap-3 rounded-lg border p-3"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                              {admin.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {admin.name}
                              </h4>
                              {admin.isPrimary && (
                                <Badge variant="secondary" className="text-xs">
                                  Primary
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {admin.role}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                              {admin.email}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                              {admin.phone}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Account & Billing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="creditCard" variant="primary" />
                      Account & Billing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Plan
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {brand.billing.plan}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Subscription Type
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {brand.billing.subscriptionType}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Monthly Amount
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {brand.billing.currency} {brand.billing.monthlyAmount}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Payment Method
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {brand.billing.paymentMethod}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Last Billing
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {brand.billing.lastBillingDate}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Next Billing
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {brand.billing.nextBillingDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="calendar" variant="muted" size="sm" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Subscription expires: {brand.billing.subscriptionExpiry}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Deposit Requests */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="dollarSign" variant="primary" />
                      Deposit Requests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {brand.depositRequests.map((request) => (
                        <div key={request.id} className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {request.currency}{" "}
                                {request.amount.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {request.purpose}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-500">
                                Requested by: {request.adminUser}
                              </p>
                            </div>
                            <Badge
                              className={getRequestStatusColor(request.status)}
                            >
                              {request.status}
                            </Badge>
                          </div>
                          <div className="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                            <span>Requested: {request.requestedDate}</span>
                            {request.approvedDate && (
                              <span>Approved: {request.approvedDate}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Coupons & Discounts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="tag" variant="primary" />
                      Coupons & Discounts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {brand.coupons.map((coupon) => (
                        <div key={coupon.id} className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {coupon.code} - {coupon.discount}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Min Order: {coupon.currency || "NPR"}{" "}
                                {coupon.minOrderAmount.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-500">
                                Used: {coupon.usedCount}/{coupon.maxUses}
                              </p>
                            </div>
                            <Badge
                              className={getCouponStatusColor(coupon.status)}
                            >
                              {coupon.status}
                            </Badge>
                          </div>
                          <div className="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                            <span>
                              Valid: {coupon.validFrom} - {coupon.validUntil}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Creator Collaborations */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="userCheck" variant="primary" />
                      Creator Collaborations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                      {brand.creatorCollaborations.map((collab) => (
                        <div
                          key={collab.creatorId}
                          className="group cursor-pointer rounded-lg border p-4 text-center transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 dark:hover:border-blue-600 dark:hover:bg-blue-950/20"
                          onClick={() => handleCreatorClick(collab.creatorId)}
                        >
                          <Avatar className="mx-auto mb-3 h-16 w-16">
                            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-lg font-bold text-white">
                              {collab.creatorAvatar}
                            </AvatarFallback>
                          </Avatar>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                            {collab.creatorName}
                          </h4>
                          <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <p>{collab.campaigns} campaigns</p>
                            <p>₹{collab.totalSpent.toLocaleString()}</p>
                            <div className="flex items-center justify-center gap-1">
                              <Icon
                                name="star"
                                size="xs"
                                className="fill-yellow-400 text-yellow-400"
                              />
                              <span>{collab.rating}</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              Last: {collab.lastCollaboration}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Campaigns */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="trendingUp" variant="primary" />
                      Active Campaigns
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {brand.campaigns.map((campaign) => (
                        <div
                          key={campaign.id}
                          className="rounded-lg border p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {campaign.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Budget: ₹{campaign.budget.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-500">
                                {campaign.startDate} - {campaign.endDate}
                              </p>
                            </div>
                            <Badge className={getStatusColor(campaign.status)}>
                              {campaign.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Side - Action Buttons */}
            <div className="w-80 border-l bg-gray-50 p-6 dark:border-slate-600 dark:bg-slate-700">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Review Actions
                </h3>

                <div className="space-y-3">
                  <Button
                    onClick={() => onApprove(brand.id)}
                    className="w-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    <Icon name="checkCircle" size="sm" className="mr-2" />
                    Approve Brand
                  </Button>

                  <Button
                    onClick={() => onReject(brand.id)}
                    variant="destructive"
                    className="w-full"
                  >
                    <Icon name="xCircle" size="sm" className="mr-2" />
                    Reject Brand
                  </Button>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Quick Stats
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Admin Users:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {brand.adminUsers.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Active Coupons:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {
                          brand.coupons.filter((c) => c.status === "active")
                            .length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Creator Collaborations:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {brand.creatorCollaborations.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Pending Deposits:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {
                          brand.depositRequests.filter(
                            (r) => r.status === "pending"
                          ).length
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Contact Info
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="phone" variant="muted" size="sm" />
                      <span className="text-gray-900 dark:text-white">
                        {brand.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="globe" variant="muted" size="sm" />
                      <span className="text-gray-900 dark:text-white">
                        {brand.website}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="mapPin" variant="muted" size="sm" />
                      <span className="text-gray-900 dark:text-white">
                        {brand.location.city}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
