import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: true,
  },
  serverExternalPackages: ["mongoose", "better-auth"],
};

export default nextConfig;
