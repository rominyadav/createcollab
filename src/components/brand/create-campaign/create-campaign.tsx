"use client";

import { useState } from "react";

import { Calendar, DollarSign, Plus, Target, Users, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createCampaignAPI } from "../utils/campaign-storage";

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

interface CreateCampaignProps {
  brandId: number;
  brandName: string;
  brandLogo: string;
  onClose: () => void;
  onCampaignCreated?: (campaign: Campaign) => void;
}

export function CreateCampaign({
  brandId,
  brandName,
  brandLogo,
  onClose,
  onCampaignCreated,
}: CreateCampaignProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    pricePerCreator: "",
    totalSlots: "",
    validTillDate: "",
    requirements: [""],
    deliverables: [""],
  });

  const categories = [
    "Fashion",
    "Technology",
    "Food & Beverage",
    "Beauty & Skincare",
    "Health & Fitness",
    "Travel",
    "Lifestyle",
    "Gaming",
    "Education",
    "Business",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (
    field: "requirements" | "deliverables",
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field: "requirements" | "deliverables") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (
    field: "requirements" | "deliverables",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const campaignData = {
        title: formData.title,
        description: formData.description,
        brandName,
        brandLogo,
        price: parseInt(formData.pricePerCreator),
        currency: "NPR",
        createdDate: new Date().toISOString().split("T")[0],
        validTillDate: formData.validTillDate,
        creatorsSlotRemaining: parseInt(formData.totalSlots),
        totalSlots: parseInt(formData.totalSlots),
        category: formData.category,
        requirements: formData.requirements.filter((req) => req.trim() !== ""),
        deliverables: formData.deliverables.filter((del) => del.trim() !== ""),
        status: "active",
      };

      const newCampaign = await createCampaignAPI(campaignData);
      if (onCampaignCreated && typeof onCampaignCreated === "function") {
        onCampaignCreated(newCampaign);
      }
      onClose();
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Failed to create campaign. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-start justify-center bg-gradient-to-b from-black/10 via-black/20 to-black/30 p-4 pt-8 backdrop-blur-sm duration-300">
      <div className="animate-in slide-in-from-top-4 relative max-h-[90vh] w-full max-w-4xl scale-100 transform overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 dark:border-slate-600 dark:bg-slate-800">
        <div className="relative z-10">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 text-white">
                  <Plus className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Create New Campaign
                  </h2>
                  <p className="text-gray-600 dark:text-slate-300">
                    Set up your campaign to find the perfect creators
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={onClose}>
                <X className="h-4 w-4" />
                Close
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Basic Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Basic Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="title">Campaign Title</Label>
                        <Input
                          id="title"
                          placeholder="Enter campaign title"
                          value={formData.title}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your campaign goals and expectations"
                          value={formData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          rows={4}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="category">Category</Label>
                        <select
                          id="category"
                          value={formData.category}
                          onChange={(e) =>
                            handleInputChange("category", e.target.value)
                          }
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                          required
                        >
                          <option value="">Select category</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Budget & Pricing */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Budget & Pricing
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="budget">Total Budget (NPR)</Label>
                        <Input
                          id="budget"
                          type="number"
                          placeholder="100000"
                          value={formData.budget}
                          onChange={(e) =>
                            handleInputChange("budget", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="pricePerCreator">
                          Price per Creator (NPR)
                        </Label>
                        <Input
                          id="pricePerCreator"
                          type="number"
                          placeholder="5000"
                          value={formData.pricePerCreator}
                          onChange={(e) =>
                            handleInputChange("pricePerCreator", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="totalSlots">Total Creator Slots</Label>
                        <Input
                          id="totalSlots"
                          type="number"
                          placeholder="10"
                          value={formData.totalSlots}
                          onChange={(e) =>
                            handleInputChange("totalSlots", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="validTillDate">Valid Till Date</Label>
                        <DatePicker
                          date={
                            formData.validTillDate
                              ? new Date(formData.validTillDate + "T00:00:00")
                              : undefined
                          }
                          onDateChange={(date) => {
                            if (date) {
                              const year = date.getFullYear();
                              const month = String(
                                date.getMonth() + 1
                              ).padStart(2, "0");
                              const day = String(date.getDate()).padStart(
                                2,
                                "0"
                              );
                              handleInputChange(
                                "validTillDate",
                                `${year}-${month}-${day}`
                              );
                            } else {
                              handleInputChange("validTillDate", "");
                            }
                          }}
                          placeholder="Select campaign end date"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Requirements */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Creator Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {formData.requirements.map((requirement, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder="e.g., Minimum 10K followers"
                            value={requirement}
                            onChange={(e) =>
                              handleArrayChange(
                                "requirements",
                                index,
                                e.target.value
                              )
                            }
                            required
                          />
                          {formData.requirements.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                removeArrayItem("requirements", index)
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem("requirements")}
                        className="w-full"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Requirement
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Deliverables */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Deliverables
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {formData.deliverables.map((deliverable, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder="e.g., 1 Instagram Reel"
                            value={deliverable}
                            onChange={(e) =>
                              handleArrayChange(
                                "deliverables",
                                index,
                                e.target.value
                              )
                            }
                            required
                          />
                          {formData.deliverables.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                removeArrayItem("deliverables", index)
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem("deliverables")}
                        className="w-full"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Deliverable
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Preview */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Campaign Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {formData.title && (
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {formData.title}
                            </h4>
                          </div>
                        )}
                        {formData.category && (
                          <Badge variant="outline">{formData.category}</Badge>
                        )}
                        {formData.pricePerCreator && (
                          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                            NPR{" "}
                            {parseInt(
                              formData.pricePerCreator
                            ).toLocaleString()}
                          </div>
                        )}
                        {formData.totalSlots && (
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {formData.totalSlots} creator slots available
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-4 border-t pt-6">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Campaign"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
