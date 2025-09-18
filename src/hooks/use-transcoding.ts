"use client";

import { useState } from "react";

export function useTranscoding() {
  const [isTranscoding, setIsTranscoding] = useState(false);

  const triggerTranscoding = async (videoId: string) => {
    setIsTranscoding(true);
    try {
      const response = await fetch("/api/transcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Transcoding failed");
      }

      return { success: true, message: result.message };
    } catch (error) {
      console.error("Transcoding error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Transcoding failed",
      };
    } finally {
      setIsTranscoding(false);
    }
  };

  return { triggerTranscoding, isTranscoding };
}
