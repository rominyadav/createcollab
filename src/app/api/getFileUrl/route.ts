import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { fileId } = await request.json();

    console.log("Getting file URL for:", fileId);

    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 }
      );
    }

    // Call Convex HTTP API directly
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    const response = await fetch(`${convexUrl}/api/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: "videoFeeds:getFileUrl",
        args: { fileId },
      }),
    });

    if (!response.ok) {
      throw new Error(`Convex API error: ${response.status}`);
    }

    const result = await response.json();
    const fileUrl = result.value;

    console.log("Got file URL:", fileUrl);

    return NextResponse.json(fileUrl);
  } catch (error) {
    console.error("Get file URL error:", error);
    return NextResponse.json(
      { error: "Failed to get file URL", details: error.message },
      { status: 500 }
    );
  }
}
