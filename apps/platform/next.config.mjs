import { origin, redirectsTo } from "./routing.mjs";
const target = origin(process.env.NEXT_PUBLIC_WEB_URL, "http://localhost:3000");
export default {
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] },
  async redirects() { return redirectsTo(target); },
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};
