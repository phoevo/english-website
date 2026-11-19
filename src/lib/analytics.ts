// Funnel events for Google Analytics. Nothing is sent unless the visitor
// accepted analytics cookies (GA is only loaded in that case).

export type FunnelEvent =
  | "guide_view"
  | "conversation_open"
  | "sign_up"
  | "view_pricing"
  | "begin_checkout"
  | "purchase";

type Params = Record<string, string | number | boolean>;
type Gtag = (command: "event", name: string, params?: Params) => void;

const CONSENT_KEY = "cookie-consent";
const PREVIOUS_PATH_KEY = "analytics-previous-path";
const CURRENT_PATH_KEY = "analytics-current-path";

function hasConsent() {
  try { return localStorage.getItem(CONSENT_KEY) === "granted"; } catch { return false; }
}

export function trackEvent(name: FunnelEvent, params: Params = {}) {
  if (typeof window === "undefined" || !hasConsent()) return;
  // GA may still be loading right after consent or on first paint; wait briefly.
  let attempts = 0;
  const send = () => {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (gtag) gtag("event", name, params);
    else if (++attempts < 25) setTimeout(send, 200);
  };
  send();
}

/** Called on every route change so the next page knows where the visitor came from. */
export function rememberPath(pathname: string) {
  try {
    const current = sessionStorage.getItem(CURRENT_PATH_KEY);
    if (current === pathname) return;
    if (current) sessionStorage.setItem(PREVIOUS_PATH_KEY, current);
    sessionStorage.setItem(CURRENT_PATH_KEY, pathname);
  } catch { /* storage unavailable: sources show as "direct" */ }
}

/** Where the visitor was before the current page, grouped for reports. */
export function previousPageSource() {
  let previous: string | null = null;
  try { previous = sessionStorage.getItem(PREVIOUS_PATH_KEY); } catch {}
  if (!previous) return "direct";
  if (previous.startsWith("/guides")) return "guide";
  if (previous.startsWith("/home/conversations")) return "library";
  if (previous.startsWith("/home")) return "home";
  if (previous === "/") return "landing";
  return "other";
}
