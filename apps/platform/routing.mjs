export function origin(value, fallback) {
  const url = new URL(value || fallback);
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("Cross-site URL must be an HTTP(S) origin without a path, credentials, query or fragment");
  }
  return url.origin;
}
export function redirectsTo(target) {
  return ["/guides/:path*", "/about", "/privacy", "/refund", "/ToS"].map(source => ({ source, destination: `${target}${source}`, permanent: false }));
}
