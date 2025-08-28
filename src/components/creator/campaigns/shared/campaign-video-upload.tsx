"use client";

import { useState } from "react";

import { CheckCircle, Upload as UploadIcon, Video, X } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Campaign } from "./campaign-card";

interface CampaignVideoUploadProps {
  campaign: Campaign;
  onClose: () => void;
}

export function CampaignVideoUpload({
  campaign,
  onClose,
}: CampaignVideoUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) {
      alert("Please select a video file and enter a title");
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      console.log("Uploading campaign video:", {
        campaignId: campaign.id,
        file: selectedFile.name,
        title,
        description,
      });

      setIsUploading(false);
      onClose();

      // Show success message
      alert(
        "Campaign video uploaded successfully! The brand will review your submission."
      );
    }, 3000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="max-h-[90vh] w-full max-w-2xl overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <UploadIcon className="h-5 w-5" />
            Upload Campaign Video
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Campaign Info */}
          <Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-white">
                    {campaign.brandLogo}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-emerald-900 dark:text-emerald-100">
                    {campaign.title}
                  </h4>
                  <p className="text-sm text-emerald-700 dark:text-emerald-200">
                    {campaign.brandName} • {campaign.currency}{" "}
                    {campaign.price.toLocaleString()}
                  </p>
                </div>
                <Badge className="bg-emerald-600 text-white">
                  {campaign.category}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Deliverables Checklist */}
          <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
            <CardContent className="p-4">
              <h4 className="mb-3 font-medium text-blue-900 dark:text-blue-100">
                Campaign Deliverables
              </h4>
              <div className="space-y-2">
                {campaign.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-800 dark:text-blue-200">
                      {deliverable}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Campaign Video *
            </label>
            {!selectedFile ? (
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-slate-600">
                <Video className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Upload your campaign video for brand review
                </p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="campaign-video-upload"
                />
                <Button asChild variant="outline">
                  <label
                    htmlFor="campaign-video-upload"
                    className="cursor-pointer"
                  >
                    Choose Video File
                  </label>
                </Button>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Supported formats: MP4, MOV, AVI (Max: 500MB)
                </p>
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 p-4 dark:border-slate-600">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <Video className="h-10 w-10 text-emerald-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-gray-900 dark:text-white">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Video Title *
            </label>
            <Input
              placeholder="Enter video title for this campaign"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {title.length}/100 characters
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Campaign Notes
            </label>
            <Textarea
              placeholder="Add any notes about your campaign video submission..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={300}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {description.length}/300 characters
            </p>
          </div>

          {/* Upload Guidelines */}
          <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
            <CardContent className="p-4">
              <h4 className="mb-2 font-medium text-orange-900 dark:text-orange-100">
                Campaign Video Guidelines
              </h4>
              <ul className="space-y-1 text-sm text-orange-800 dark:text-orange-200">
                <li>• Ensure video meets all campaign requirements</li>
                <li>• Brand will review and approve your submission</li>
                <li>• Payment will be processed after approval</li>
                <li>
                  • Follow brand guidelines and deliverable specifications
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Upload Button */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              disabled={!selectedFile || !title.trim() || isUploading}
            >
              {isUploading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Submit Campaign Video
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
