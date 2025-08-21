import { serve } from "@hono/node-server";
import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { auth } from "./lib/auth";

const app = new Hono();

// Add CORS middleware
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "http://localhost:3002"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Auth routes with OpenAPI
app.all("/api/auth/*", async (c) => {
  try {
    console.log("Auth request received:", c.req.method, c.req.url);
    const response = await auth.handler(c.req.raw);
    console.log("Auth response status:", response.status);
    return response;
  } catch (error) {
    console.error("Auth handler error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return c.json(
      { error: "Internal server error", details: errorMessage },
      500
    );
  }
});

// Root route
app.get("/", (c) => {
  return c.text(
    "Hello Hono! Auth OpenAPI docs available at /api/auth/reference"
  );
});

// Health check route (under /api for proxy)
app.get("/api/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start server - this will run when the script is executed
const port = 3002; // Running on 3002, Next.js will proxy to this
console.log(`🚀 Hono API Server is running on http://localhost:${port}`);
console.log(
  `📚 Auth OpenAPI docs: http://localhost:3000/api/auth/reference (via Next.js proxy)`
);
console.log("Environment check:");
console.log("- DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "Not set");
console.log(
  "- BETTER_AUTH_SECRET:",
  process.env.BETTER_AUTH_SECRET ? "Set" : "Not set"
);
console.log(
  "- BETTER_AUTH_URL:",
  process.env.BETTER_AUTH_URL ? "Set" : "Not set"
);

serve({
  fetch: app.fetch,
  port,
});

export default app;
