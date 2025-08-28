"use client";

import { useState } from "react";

import {
  FileText,
  Image,
  Play,
  Upload as UploadIcon,
  Video,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface UploadProps {
  onClose: () => void;
}

export function Upload({ onClose }: UploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    "Fashion",
    "Beauty",
    "Tech",
    "Food",
    "Lifestyle",
    "Travel",
    "Gaming",
    "Education",
    "Music",
    "Comedy",
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
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

  const handleUpload = async () => {
    if (!selectedFile || !title.trim() || !category) {
      alert("Please fill in all required fields");
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      console.log("Uploading video:", {
        file: selectedFile.name,
        title,
        description,
        category,
        tags,
      });

      setIsUploading(false);
      onClose();

      // Show success message
      alert(
        "Video uploaded successfully! It will be reviewed before going live."
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
            Upload Video
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* File Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Video File *
            </label>
            {!selectedFile ? (
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-slate-600">
                <Video className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Drag and drop your video here, or click to browse
                </p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="video-upload"
                />
                <Button asChild variant="outline">
                  <label htmlFor="video-upload" className="cursor-pointer">
                    Choose Video File
                  </label>
                </Button>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Supported formats: MP4, MOV, AVI (Max: 100MB)
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

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <Textarea
              placeholder="Describe your video..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={500}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {description.length}/500 characters
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategory(cat)}
                  className="text-xs"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Tags */}
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

          {/* Upload Guidelines */}
          <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
            <CardContent className="p-4">
              <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-100">
                Upload Guidelines
              </h4>
              <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <li>• Videos will be reviewed before going live</li>
                <li>• Ensure content follows community guidelines</li>
                <li>• High-quality videos get better engagement</li>
                <li>• Add relevant tags to help users discover your content</li>
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
