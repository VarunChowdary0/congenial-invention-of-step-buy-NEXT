import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Optional: Add specific domains if you know them
    domains: [
      'images.unsplash.com',
      'example.com',
      // Add other domains you want to allow
    ],
  },};

export default nextConfig;
