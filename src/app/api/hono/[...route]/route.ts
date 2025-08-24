import apiApp from "../../../../lib/hono-middleware";

// Handle all routes under /api/hono/*
export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname.replace("/api/hono", "");

  // Create a new request with the modified path
  const modifiedRequest = new Request(`http://localhost:3000${path}`, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });

  return apiApp.fetch(modifiedRequest);
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname.replace("/api/hono", "");

  const modifiedRequest = new Request(`http://localhost:3000${path}`, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });

  return apiApp.fetch(modifiedRequest);
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname.replace("/api/hono", "");

  const modifiedRequest = new Request(`http://localhost:3000${path}`, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });

  return apiApp.fetch(modifiedRequest);
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname.replace("/api/hono", "");

  const modifiedRequest = new Request(`http://localhost:3000${path}`, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });

  return apiApp.fetch(modifiedRequest);
}

export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname.replace("/api/hono", "");

  const modifiedRequest = new Request(`http://localhost:3000${path}`, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });

  return apiApp.fetch(modifiedRequest);
}

export async function OPTIONS(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname.replace("/api/hono", "");

  const modifiedRequest = new Request(`http://localhost:3000${path}`, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });

  return apiApp.fetch(modifiedRequest);
}
