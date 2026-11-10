import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Guides used to live under /blog.
  async redirects() {
    return [
      // www serves the deployment; send it to the bare domain, keeping the path.
      { source: "/:path*", has: [{ type: "host", value: "www.synomilo.com" }], destination: "https://synomilo.com/:path*", permanent: true },
      { source: "/blog", destination: "/guides", permanent: true },
      { source: "/blog/:slug", destination: "/guides/:slug", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
