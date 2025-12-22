import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: true,
  },
  serverExternalPackages: ["mongoose", "better-auth", "inngest", "nodemailer"],
};

export default nextConfig;
