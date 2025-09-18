import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const storageId = searchParams.get("id");

  console.log("HLS API called with ID:", storageId);

  if (!storageId) {
    console.log("No storage ID provided");
    return NextResponse.json({ error: "Storage ID required" }, { status: 400 });
  }

  try {
    // Get the proper file URL using our API
    const fileUrlResponse = await fetch(
      `${request.nextUrl.origin}/api/getFileUrl`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId: storageId }),
      }
    );

    if (!fileUrlResponse.ok) {
      console.log("Failed to get file URL:", fileUrlResponse.statusText);
      return NextResponse.json(
        { error: "Failed to get file URL" },
        { status: 500 }
      );
    }

    const fileUrl = await fileUrlResponse.json();
    console.log("Got file URL:", fileUrl);

    // Fetch the file from the proper URL
    const response = await fetch(fileUrl);
    console.log("File fetch response status:", response.status);

    if (!response.ok) {
      console.log("File fetch failed:", response.statusText);
      return NextResponse.json(
        { error: "Failed to fetch file" },
        { status: 500 }
      );
    }

    const fileBuffer = await response.arrayBuffer();
    console.log("File buffer size:", fileBuffer.byteLength);

    // Always serve as HLS playlist for now
    const contentType = "application/vnd.apple.mpegurl";

    console.log("Serving file with content-type:", contentType);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("HLS API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
