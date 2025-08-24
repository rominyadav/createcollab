import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No more proxy needed - Hono is now integrated directly
  // All /api/* routes will be handled by the Hono app
};

export default nextConfig;
