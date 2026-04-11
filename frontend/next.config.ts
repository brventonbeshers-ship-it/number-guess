import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: path.join(process.cwd(), ".."),
  },
};

export default nextConfig;

// config: 1775828464761

// next: 1775828481513
