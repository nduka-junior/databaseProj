import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    // Check if it's the client-side bundle
    if (!isServer) {
      // Mock 'tls' module to avoid issues during bundling
      config.resolve.fallback = {
        fs: false,
        tls: false,
        net: false,
        os: false,
      };
    }
    return config;
  },
};

export default nextConfig;
