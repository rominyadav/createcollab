import { NextRequest, NextResponse } from "next/server";

import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const { videoId, hlsFiles, originalResolution } = await request.json();

    console.log("📹 Starting Convex upload...");

    // Debug: Check what files were actually generated
    const transcodedDir = path.join(process.cwd(), "transcoded", videoId);
    console.log("🔍 Checking transcoded directory:", transcodedDir);

    if (fs.existsSync(transcodedDir)) {
      const allFiles = fs.readdirSync(transcodedDir);
      console.log("📁 All generated files:", allFiles);

      // Check each quality directory
      allFiles.forEach((file) => {
        const filePath = path.join(transcodedDir, file);
        const stats = fs.statSync(filePath);
        console.log(`  📄 ${file}: ${stats.size} bytes`);

        // If it's an m3u8 file, show its content
        if (file.endsWith(".m3u8")) {
          const content = fs.readFileSync(filePath, "utf8");
          console.log(`  📝 Content of ${file}:`);
          console.log(content);
        }
      });
    } else {
      console.log("❌ Transcoded directory does not exist!");
    }

    const uploadedHlsUrls: Record<string, string> = {};

    // Upload each HLS file and its segments to Convex
    for (const [quality, dockerPath] of Object.entries(hlsFiles)) {
      if (typeof dockerPath === "string") {
        // Convert Docker path to host path
        const hostPath = dockerPath.replace(
          "/tmp/transcoded",
          path.join(process.cwd(), "transcoded")
        );
        const hostDir = path.dirname(hostPath);

        if (fs.existsSync(hostPath)) {
          try {
            // Upload HLS playlist
            // Read the playlist content and update segment URLs
            let playlistContent = fs.readFileSync(hostPath, "utf8");
            console.log(`  📄 Original playlist content for ${quality}:`);
            console.log(playlistContent.substring(0, 200));

            // Upload all segment files for this quality and update playlist
            const segmentPattern = quality.replace("p", "") + "p_";
            const segmentFiles = fs
              .readdirSync(hostDir)
              .filter((f) => f.startsWith(segmentPattern) && f.endsWith(".ts"));

            for (const segmentFile of segmentFiles) {
              const segmentPath = path.join(hostDir, segmentFile);

              // Generate upload URL for segment
              const segmentUploadResponse = await fetch(
                "http://localhost:3000/api/generateUploadUrl",
                {
                  method: "POST",
                }
              );
              const segmentUploadData = await segmentUploadResponse.json();
              const segmentUploadUrl =
                segmentUploadData.value || segmentUploadData;

              // Upload segment
              const segmentBuffer = fs.readFileSync(segmentPath);
              const segmentResponse = await fetch(segmentUploadUrl, {
                method: "POST",
                headers: { "Content-Type": "application/octet-stream" },
                body: segmentBuffer,
              });

              const segmentResult = await segmentResponse.json();
              console.log(
                `    📹 Uploaded segment ${segmentFile}: ${segmentResult.storageId}`
              );

              // Update playlist to reference our API endpoint for this segment
              const segmentUrl = `/api/hls?id=${segmentResult.storageId}`;
              playlistContent = playlistContent.replace(
                segmentFile,
                segmentUrl
              );
            }

            console.log(`  📄 Updated playlist content for ${quality}:`);
            console.log(playlistContent.substring(0, 200));

            // Generate upload URL for updated playlist
            const uploadUrlResponse = await fetch(
              "http://localhost:3000/api/generateUploadUrl",
              {
                method: "POST",
              }
            );
            const uploadUrlData = await uploadUrlResponse.json();
            const uploadUrl = uploadUrlData.value || uploadUrlData;

            // Upload the updated playlist
            const updatedPlaylistResponse = await fetch(uploadUrl, {
              method: "POST",
              headers: { "Content-Type": "application/octet-stream" },
              body: Buffer.from(playlistContent, "utf8"),
            });

            const { storageId } = await updatedPlaylistResponse.json();
            uploadedHlsUrls[quality] = storageId;

            console.log(`  ✅ Uploaded ${quality} playlist: ${storageId}`);
          } catch (error) {
            console.error(`  ❌ Failed to upload ${quality}:`, error);
          }
        }
      }
    }

    // Update video record
    try {
      const completeResponse = await fetch(
        "http://localhost:3000/api/completeTranscoding",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            videoId,
            hlsUrls: uploadedHlsUrls,
            originalResolution,
          }),
        }
      );

      const result = await completeResponse.json();
      console.log("📝 Updated video record:", result);
    } catch (error) {
      console.error("❌ Failed to update video record:", error);
    }

    // Clean up local files
    const cleanupDir = path.join(process.cwd(), "transcoded", videoId);
    if (fs.existsSync(cleanupDir)) {
      fs.rmSync(cleanupDir, { recursive: true, force: true });
      console.log("🧹 Cleaned up local files");
    }

    console.log("🎉 Transcoding pipeline completed!");

    return NextResponse.json({
      success: true,
      message: "Transcoding completed successfully",
      videoId,
      hlsFiles: Object.keys(hlsFiles),
      originalResolution,
    });
  } catch (error) {
    console.error("Upload transcoded files error:", error);
    return NextResponse.json(
      { error: "Failed to upload transcoded files" },
      { status: 500 }
    );
  }
}
