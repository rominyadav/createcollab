import { auth } from "../../../../lib/auth";

// Handle all better-auth routes including OpenAPI docs
export async function GET(request: Request) {
  return auth.handler(request);
}

export async function POST(request: Request) {
  return auth.handler(request);
}

export async function PUT(request: Request) {
  return auth.handler(request);
}

export async function DELETE(request: Request) {
  return auth.handler(request);
}

export async function PATCH(request: Request) {
  return auth.handler(request);
}

export async function OPTIONS(request: Request) {
  return auth.handler(request);
}
