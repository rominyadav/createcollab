import { Hono } from "hono";
import { cors } from "hono/cors";

// Create a Hono app for API handling
export const apiApp = new Hono();

// Add CORS middleware
apiApp.use(
  "*",
  cors({
    origin: process.env.VERCEL_URL
      ? [`https://${process.env.VERCEL_URL}`]
      : ["http://localhost:3000", "http://localhost:3002"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Health check route
apiApp.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Add other API routes here as needed
apiApp.get("/test", (c) => {
  return c.json({ message: "Hono API is working!" });
});

// Export the app for use in Next.js
export default apiApp;
