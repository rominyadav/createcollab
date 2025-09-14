import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    domains: ["images.unsplash.com", "img.clerk.com"],
  },
};

export default nextConfig;
