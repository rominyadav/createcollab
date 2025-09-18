import { NextRequest, NextResponse } from "next/server";

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { videoId, storageId } = await request.json();

    if (!videoId || !storageId) {
      return NextResponse.json(
        { error: "Video ID and storage ID are required" },
        { status: 400 }
      );
    }

    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

    if (!convexUrl) {
      return NextResponse.json(
        { error: "Convex URL not configured" },
        { status: 500 }
      );
    }

    // Run transcoder container with volume mount
    const dockerCmd = `docker run --rm -v "${process.cwd()}/transcoded:/tmp/transcoded" -e VIDEO_ID="${videoId}" -e STORAGE_ID="${storageId}" -e CONVEX_URL="${convexUrl}" video-transcoder`;

    console.log("Starting transcoder with command:", dockerCmd);

    // Run in background
    execAsync(dockerCmd)
      .then(() => console.log("Transcoding completed successfully"))
      .catch((error) => {
        console.error("Transcoding failed:", error);
      });

    return NextResponse.json({ success: true, message: "Transcoding started" });
  } catch (error) {
    console.error("Transcoding API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
