"use client";

import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Upload, Video, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { api } from "@/lib/convex-api";

interface VideoUploadProps {
  onUploadComplete?: () => void;
  campaignId?: string;
  campaignName?: string;
  type?: "public" | "campaign";
}

export function VideoUpload({
  onUploadComplete,
  campaignId,
  campaignName,
  type = "public",
}: VideoUploadProps) {
  const { user } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const generateUploadUrl = useMutation(api.videoFeeds.generateUploadUrl);
  const createVideoFeed = useMutation(api.videoFeeds.createVideoFeed);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
    }
  };

  const getDuration = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        const duration = video.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        resolve(`${minutes}:${seconds.toString().padStart(2, "0")}`);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const uploadToConvex = async (file: File) => {
    const uploadUrl = await generateUploadUrl();

    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    const { storageId } = await result.json();
    return storageId;
  };

  const handleUpload = async () => {
    if (!file || !title || !category || !user) return;

    setUploading(true);
    setProgress(10);

    try {
      // Get video duration
      const duration = await getDuration(file);
      setProgress(30);

      // Upload to Convex
      const videoFileId = await uploadToConvex(file);
      setProgress(70);

      // Get public URL
      const videoUrl = `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${videoFileId}`;

      // Create video record
      await createVideoFeed({
        title,
        description,
        videoFileId,
        videoUrl,
        duration,
        creatorId: user.id,
        creatorName: user.fullName || user.username || "Unknown",
        creatorAvatar:
          user.firstName?.charAt(0) + user.lastName?.charAt(0) || "U",
        aspectRatio: "9:16",
        category,
        campaignId: campaignId as any,
        campaignName,
        type,
      });

      setProgress(100);

      // Reset form
      setFile(null);
      setTitle("");
      setDescription("");
      setCategory("");

      onUploadComplete?.();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          Upload Video
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Upload */}
        <div className="space-y-2">
          <Label>Video File</Label>
          <div className="border-muted-foreground/25 rounded-lg border-2 border-dashed p-6 text-center">
            {file ? (
              <div className="flex items-center justify-between">
                <span className="text-sm">{file.name}</span>
                <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div>
                <Upload className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                <p className="text-muted-foreground mb-2 text-sm">
                  Click to upload or drag and drop
                </p>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="video-upload"
                />
                <Label
                  htmlFor="video-upload"
                  className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Choose File
                </Label>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
            rows={3}
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fashion">Fashion</SelectItem>
              <SelectItem value="Tech">Tech</SelectItem>
              <SelectItem value="Lifestyle">Lifestyle</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Beauty">Beauty</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Wellness">Wellness</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
              <SelectItem value="Fitness">Fitness</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="space-y-2">
            <Label>Upload Progress</Label>
            <Progress value={progress} />
          </div>
        )}

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!file || !title || !category || uploading}
          className="w-full"
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </Button>
      </CardContent>
    </Card>
  );
}
