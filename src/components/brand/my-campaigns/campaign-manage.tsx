"use client";

import { useState } from "react";

import {
  Calendar,
  Coins,
  Edit,
  FileText,
  Gift,
  Save,
  Target,
  Users,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

interface Campaign {
  id: number;
  title: string;
  description: string;
  brandName: string;
  brandLogo: string;
  price: number;
  currency: string;
  createdDate: string;
  validTillDate: string;
  creatorsSlotRemaining: number;
  totalSlots: number;
  category: string;
  requirements: string[];
  deliverables: string[];
  status: string;
}

interface CampaignManageProps {
  campaign: Campaign;
  onClose: () => void;
  onSave: (updatedCampaign: Campaign) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
    case "full":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
    case "completed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
    case "planning":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
  }
};

export function CampaignManage({
  campaign,
  onClose,
  onSave,
}: CampaignManageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCampaign, setEditedCampaign] = useState<Campaign>(campaign);
  const [newRequirement, setNewRequirement] = useState("");
  const [newDeliverable, setNewDeliverable] = useState("");

  const progressPercentage = Math.round(
    ((editedCampaign.totalSlots - editedCampaign.creatorsSlotRemaining) /
      editedCampaign.totalSlots) *
      100
  );

  const handleSave = () => {
    onSave(editedCampaign);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedCampaign(campaign);
    setIsEditing(false);
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setEditedCampaign({
        ...editedCampaign,
        requirements: [...editedCampaign.requirements, newRequirement.trim()],
      });
      setNewRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    setEditedCampaign({
      ...editedCampaign,
      requirements: editedCampaign.requirements.filter((_, i) => i !== index),
    });
  };

  const addDeliverable = () => {
    if (newDeliverable.trim()) {
      setEditedCampaign({
        ...editedCampaign,
        deliverables: [...editedCampaign.deliverables, newDeliverable.trim()],
      });
      setNewDeliverable("");
    }
  };

  const removeDeliverable = (index: number) => {
    setEditedCampaign({
      ...editedCampaign,
      deliverables: editedCampaign.deliverables.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-8 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-slate-600 dark:bg-slate-800">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6 grid grid-cols-[1fr_auto] items-start gap-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-xl font-semibold text-white">
                  {editedCampaign.brandLogo}
                </AvatarFallback>
              </Avatar>
              <div>
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Campaign Title
                      </Label>
                      <Input
                        value={editedCampaign.title}
                        onChange={(e) =>
                          setEditedCampaign({
                            ...editedCampaign,
                            title: e.target.value,
                          })
                        }
                        className="h-14 w-full min-w-[500px] border-2 text-xl font-bold text-gray-900 focus:border-emerald-500 dark:text-white"
                        placeholder="Enter campaign title..."
                      />
                    </div>
                    <p className="text-gray-600 dark:text-slate-300">
                      by {editedCampaign.brandName}
                    </p>
                  </div>
                ) : (
                  <div className="max-w-3xl">
                    <h2 className="text-3xl leading-tight font-bold break-words text-gray-900 dark:text-white">
                      {editedCampaign.title}
                    </h2>
                    <p className="mt-1 text-gray-600 dark:text-slate-300">
                      by {editedCampaign.brandName}
                    </p>
                  </div>
                )}
                <div className="mt-3 flex items-center gap-2">
                  <Badge className={getStatusColor(editedCampaign.status)}>
                    {editedCampaign.status.charAt(0).toUpperCase() +
                      editedCampaign.status.slice(1)}
                  </Badge>
                  <Badge variant="outline">{editedCampaign.category}</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="text-right">
                {isEditing ? (
                  <div className="space-y-2">
                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Price per Creator
                    </Label>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-gray-600">
                        NPR
                      </span>
                      <Input
                        type="number"
                        value={editedCampaign.price}
                        onChange={(e) =>
                          setEditedCampaign({
                            ...editedCampaign,
                            price: parseInt(e.target.value) || 0,
                          })
                        }
                        className="h-10 w-32 border-2 text-right text-lg font-bold focus:border-emerald-500"
                        placeholder="5000"
                      />
                    </div>
                    <p className="text-sm text-gray-500">per creator</p>
                  </div>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                      NPR {editedCampaign.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      per creator
                    </p>
                  </>
                )}
              </div>
              {isEditing ? (
                <div className="flex gap-3">
                  <Button
                    onClick={handleSave}
                    className="h-10 bg-emerald-600 px-6 py-2 hover:bg-emerald-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="h-10 px-6 py-2"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="h-10 border-emerald-200 px-6 py-2 text-emerald-700 hover:bg-emerald-50"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Campaign
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="h-10 px-4 py-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Target className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Category
                      </Label>
                      <select
                        value={editedCampaign.category}
                        onChange={(e) =>
                          setEditedCampaign({
                            ...editedCampaign,
                            category: e.target.value,
                          })
                        }
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                      >
                        <option value="Fashion">Fashion</option>
                        <option value="Technology">Technology</option>
                        <option value="Food & Beverage">Food & Beverage</option>
                        <option value="Beauty & Skincare">
                          Beauty & Skincare
                        </option>
                        <option value="Health & Fitness">
                          Health & Fitness
                        </option>
                        <option value="Travel">Travel</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Education">Education</option>
                        <option value="Business">Business</option>
                      </select>
                    </div>
                  )}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </Label>
                    {isEditing ? (
                      <Textarea
                        value={editedCampaign.description}
                        onChange={(e) =>
                          setEditedCampaign({
                            ...editedCampaign,
                            description: e.target.value,
                          })
                        }
                        rows={4}
                        placeholder="Campaign description..."
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 leading-relaxed text-gray-700 dark:text-slate-300">
                        {editedCampaign.description}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Users className="h-5 w-5" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {editedCampaign.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
                        <span className="flex-1 text-sm text-gray-700 dark:text-slate-300">
                          {requirement}
                        </span>
                        {isEditing && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeRequirement(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                  {isEditing && (
                    <div className="mt-4 flex gap-2">
                      <Input
                        placeholder="Add new requirement..."
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && addRequirement()
                        }
                      />
                      <Button onClick={addRequirement}>Add</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Deliverables */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <FileText className="h-5 w-5" />
                    Deliverables
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {editedCampaign.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                        <span className="flex-1 text-sm text-gray-700 dark:text-slate-300">
                          {deliverable}
                        </span>
                        {isEditing && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeDeliverable(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                  {isEditing && (
                    <div className="mt-4 flex gap-2">
                      <Input
                        placeholder="Add new deliverable..."
                        value={newDeliverable}
                        onChange={(e) => setNewDeliverable(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && addDeliverable()
                        }
                      />
                      <Button onClick={addDeliverable}>Add</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Campaign Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">
                    Campaign Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">
                      Status
                    </span>
                    <Badge className={getStatusColor(editedCampaign.status)}>
                      {editedCampaign.status.charAt(0).toUpperCase() +
                        editedCampaign.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">
                      Created
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {new Date(
                        editedCampaign.createdDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">
                      Valid Until
                    </span>
                    {isEditing ? (
                      <DatePicker
                        date={
                          new Date(editedCampaign.validTillDate + "T00:00:00")
                        }
                        onDateChange={(date) => {
                          if (date) {
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(
                              2,
                              "0"
                            );
                            const day = String(date.getDate()).padStart(2, "0");
                            setEditedCampaign({
                              ...editedCampaign,
                              validTillDate: `${year}-${month}-${day}`,
                            });
                          }
                        }}
                        className="w-40 text-sm"
                      />
                    ) : (
                      <span className="text-sm text-gray-900 dark:text-white">
                        {new Date(
                          editedCampaign.validTillDate
                        ).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Total Slots
                      </span>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={editedCampaign.totalSlots}
                          onChange={(e) =>
                            setEditedCampaign({
                              ...editedCampaign,
                              totalSlots: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-20 text-sm"
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {editedCampaign.totalSlots}
                        </span>
                      )}
                    </div>
                    {isEditing && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Remaining slots will be auto-calculated
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">
                      Remaining
                    </span>
                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      {editedCampaign.creatorsSlotRemaining}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {progressPercentage}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-slate-600">
                      <div
                        className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                      {editedCampaign.totalSlots -
                        editedCampaign.creatorsSlotRemaining}{" "}
                      of {editedCampaign.totalSlots} slots filled
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reward Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Gift className="h-5 w-5" />
                    Reward
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="mb-2 flex items-center justify-center">
                      <Coins className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                      NPR {editedCampaign.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Payment upon approval
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
