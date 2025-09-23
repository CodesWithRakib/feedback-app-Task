import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Turbopack configuration options go here
    // For example:
    rules: {
      // Custom rules if needed
    },
  },
  // Configure webpack for file system access
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
};

export default nextConfig;
