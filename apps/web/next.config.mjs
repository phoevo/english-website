import { origin, redirectsTo } from "./routing.mjs";
const target = origin(process.env.NEXT_PUBLIC_PLATFORM_URL, "http://localhost:3001");
export default {
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] },
  async redirects() { return redirectsTo(target); },
  async headers() {
    return process.env.SITE_INDEXABLE === "true" ? [] : [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};
