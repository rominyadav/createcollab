import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Call Convex HTTP API directly
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/mutation`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "videoFeeds:generateUploadUrl",
          args: {},
        }),
      }
    );

    const result = await response.json();
    const uploadUrl = result.value || result;
    return NextResponse.json(uploadUrl);
  } catch (error) {
    console.error("Generate upload URL error:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
