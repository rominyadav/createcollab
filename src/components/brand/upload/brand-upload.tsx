"use client";

import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Upload as UploadIcon, Video, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

import { api } from "@/lib/convex-api";
import { getConvexFileUrl } from "@/lib/convex-client";

interface BrandUploadProps {
  onClose: () => void;
  brandName: string;
}

export function BrandUpload({ onClose, brandName }: BrandUploadProps) {
  const { user } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const generateUploadUrl = useMutation(api.videoFeeds.generateUploadUrl);
  const createVideoFeed = useMutation(api.videoFeeds.createVideoFeed);

  const categories = [
    "Product Demo",
    "Behind the Scenes",
    "Brand Story",
    "Tutorial",
    "Announcement",
    "Event Coverage",
    "Customer Stories",
    "Company Culture",
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleThumbnailSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedThumbnail(file);
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
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
    if (!selectedFile || !title.trim() || !category || !user) {
      alert("Please fill in all required fields");
      return;
    }

    setIsUploading(true);
    setProgress(10);

    try {
      // Get video duration
      const duration = await getDuration(selectedFile);
      setProgress(30);

      // Upload video to Convex
      const videoFileId = await uploadToConvex(selectedFile);
      setProgress(50);

      // Upload thumbnail if provided
      let thumbnailFileId = undefined;
      let thumbnailUrl = undefined;
      if (selectedThumbnail) {
        thumbnailFileId = await uploadToConvex(selectedThumbnail);
        thumbnailUrl = thumbnailFileId;
        setProgress(70);
      }

      // Store file ID, URL will be generated dynamically
      const videoUrl = videoFileId; // We'll get the actual URL in the component

      // Create video record
      await createVideoFeed({
        title,
        description,
        videoFileId,
        thumbnailFileId,
        videoUrl,
        thumbnailUrl,
        duration,
        creatorId: user.id,
        creatorName: brandName,
        creatorAvatar: brandName.charAt(0).toUpperCase(),
        aspectRatio: "9:16",
        category,
        type: "public",
      });

      setProgress(100);

      // Reset form
      setSelectedFile(null);
      setSelectedThumbnail(null);
      setTitle("");
      setDescription("");
      setCategory("");
      setTags([]);

      onClose();
      alert("Brand video uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
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
            Upload Brand Video
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Video File *
            </label>
            {!selectedFile ? (
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-slate-600">
                <Video className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Upload your brand&apos;s official video content
                </p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="brand-video-upload"
                />
                <Button asChild variant="outline">
                  <label
                    htmlFor="brand-video-upload"
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
                  <Video className="h-10 w-10 text-emerald-600" />
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

          {/* Thumbnail Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Thumbnail (Optional)
            </label>
            {!selectedThumbnail ? (
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center dark:border-slate-600">
                <div className="mb-2 text-4xl">🖼️</div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  Upload a custom thumbnail
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailSelect}
                  className="hidden"
                  id="brand-thumbnail-upload"
                />
                <Button asChild variant="outline" size="sm">
                  <label
                    htmlFor="brand-thumbnail-upload"
                    className="cursor-pointer"
                  >
                    Choose Image
                  </label>
                </Button>
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 p-3 dark:border-slate-600">
                <div className="flex items-center gap-3">
                  <img
                    src={URL.createObjectURL(selectedThumbnail)}
                    alt="Thumbnail preview"
                    className="h-16 w-16 rounded object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {selectedThumbnail.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {formatFileSize(selectedThumbnail.size)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedThumbnail(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title *
            </label>
            <Input
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {title.length}/100 characters
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <Textarea
              placeholder="Describe your brand video..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={500}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {description.length}/500 characters
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Content Type *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategory(cat)}
                  className={`text-xs ${
                    category === cat
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : ""
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tags
            </label>
            <div className="mb-2 flex gap-2">
              <Input
                placeholder="Add a tag"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                className="flex-1"
              />
              <Button
                onClick={handleAddTag}
                size="sm"
                disabled={!currentTag.trim()}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    #{tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20">
            <CardContent className="p-4">
              <h4 className="mb-2 font-medium text-emerald-900 dark:text-emerald-100">
                Brand Upload Guidelines
              </h4>
              <ul className="space-y-1 text-sm text-emerald-800 dark:text-emerald-200">
                <li>• Official brand content will be featured prominently</li>
                <li>• Videos represent your brand on the platform</li>
                <li>• High-quality content builds brand credibility</li>
                <li>• No campaign linking required for brand uploads</li>
              </ul>
            </CardContent>
          </Card>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Upload Progress
              </label>
              <Progress value={progress} />
            </div>
          )}

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
              disabled={
                !selectedFile || !title.trim() || !category || isUploading
              }
            >
              {isUploading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload Video
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
