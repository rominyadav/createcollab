import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { videoId, hlsUrls, originalResolution } = await request.json();

    // Call Convex HTTP API directly
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/mutation`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "videoFeeds:completeTranscoding",
          args: {
            videoId,
            hlsUrls,
            originalResolution,
          },
        }),
      }
    );

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Complete transcoding error:", error);
    return NextResponse.json(
      { error: "Failed to complete transcoding" },
      { status: 500 }
    );
  }
}
