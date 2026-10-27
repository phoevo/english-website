# Deployment and cutover runbook

## Inspected state (27 October 2026)

Repository: `phoevo/english-website`. Appwrite project: `67f8ef4d001bf840a8a4`, Frankfurt. Existing Site: `68d90d5b000201726054` (`english-website`). Configured production branch: `early-access`; root `./`; Node 22, Next.js SSR; install `npm install`; build `npm run build`; output `./.next`. Builds use `s-2vcpu-2gb`; SSR uses `s-1vcpu-512mb`.

The domain rules for `synomilo.com` and `www.synomilo.com` point at deployment `6a9eee7b94725ab58086`. The Site reports `live: false`; its latest ready deployment differs from the domain-pinned deployment. Do not assume latest/active/deployed-to-domain are the same when rolling back.

The split starts from `e9f3822` (`codex/synomilo-gsap-landing`), preserving newer library and landing work. `early-access` is its ancestor. A PR against `early-access` also includes the prior library/landing changes; review those before merging. This migration adds no database schema, data, permission, user or storage changes.

## App boundaries

| Public web | Platform |
| --- | --- |
| `/`, `/about`, `/pricing`, `/guides/**`, `/privacy`, `/refund`, `/ToS` | `/home/**`, `/profile/**`, `/login`, `/register`, `/onboarding`, `/oauth-callback`, `/forgot-password`, `/reset-password` |
| `/api/guides/publish`, `/sitemap.xml` | `/api/delete-account`, `/pricing`, `/pricing/success`, `/pricing/canceled` |

Public pricing is an unauthenticated overview of the existing rates; the platform retains the original checkout, account detection and billing components. Existing application paths are unchanged on the new host. Web redirects legacy application URLs to platform with temporary method-preserving 307s. Next.js carries their query strings through, including recovery/OAuth secrets and Stripe session IDs. Platform redirects public guides/legal/about paths to web. Unknown URLs remain 404s.

Platform `/` opens `/home/conversations`. Platform sends `X-Robots-Tag: noindex, nofollow`, has disallow-all robots.txt and no sitemap. Web previews default to noindex/disallow-all. Set web `SITE_INDEXABLE=true` only for the final public deployment; canonical guide URLs and sitemap URLs remain on `https://synomilo.com`.

## Two Site build settings

Use two new Sites initially, leaving the existing domain-pinned Site intact for rollback. Both preview Sites use `codex/separate-web-platform` while testing. After review/merge, both must track the single production branch `early-access`.

| Setting | web | platform |
| --- | --- | --- |
| Repository root | `apps/web` | `apps/platform` |
| Framework / adapter | Next.js / SSR | Next.js / SSR |
| Build runtime | Node 22 | Node 22 |
| Install | `npm ci` | `npm ci` |
| Build | `npm run build` | `npm run build` |
| Output | `./.next` | `./.next` |
| Start command | leave empty | leave empty |
| `NEXT_PUBLIC_PLATFORM_URL` | platform preview origin, later `https://app.synomilo.com` | unnecessary |
| `NEXT_PUBLIC_WEB_URL` | unnecessary | web preview origin, later `https://synomilo.com` |
| `SITE_INDEXABLE` | `false` in previews; `true` at cutover | unnecessary |

Do not point either Site at repository root. Do not run a global Appwrite push: `appwrite.json` still describes the existing Stripe function only. Site configuration is separate. Git-based deployment settings follow [Appwrite's Next.js setup](https://appwrite.io/docs/products/sites/quick-start/nextjs).

## Environment variables

App-local `.env.example` files contain names only. Keep credentials out of Git. Rebuild after changing cross-site origins or any `NEXT_PUBLIC_*` variable, because Next.js compiles them into browser bundles.

Platform needs the existing public Appwrite endpoint, project/database IDs, collection IDs, storage IDs, function ID and optional analytics ID. Preserve IDs so conversations, users, completion and dictionaries use the same data. Its `APPWRITE_API_KEY` remains server-only for account deletion; use a key with only the existing required permissions. There is no need to copy Stripe secrets or Mailgun secrets into either Site. Unused `NEXT_PUBLIC_STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET` references have been removed.

Web needs server-side `APPWRITE_ENDPOINT`, `APPWRITE_PROJECT_ID`, `APPWRITE_DATABASE_ID`, `APPWRITE_GUIDES_COLLECTION_ID`, `APPWRITE_API_KEY` (guide read/write permissions), and `AVERI_WEBHOOK_SECRET`. It can also use the existing public-name fallbacks for the first four. It needs no user/account collections or browser auth SDK. Preserve the publisher payload, authentication, collection and URLs. Keep `/api/guides/publish` on the marketing domain so the publisher webhook URL need not change.

The existing Site stores several server credentials with `secret: false`. Mark credentials secret on new Sites. Review/rotate the original keys separately and audit access; this migration does not change or revoke production credentials.

## Auth, sessions and external callbacks

The project currently lists only localhost web platforms. Add the exact platform preview hostname and, before cutover, `app.synomilo.com` under Appwrite project Platforms. Check existing wildcard/automatic network-domain behavior in the Console rather than assuming production hosts are already allowed.

Google login/register already use `${window.location.origin}/oauth-callback`, with failures returning to the same origin's login/register. Password recovery already uses `${window.location.origin}/reset-password`. Keep the Appwrite endpoint and project unchanged. Verify the Google provider configuration and its Appwrite `/account/sessions/oauth2/callback/google/<projectId>` URI in the provider console; moving the frontend does not itself change that server callback URI. Check allowed frontend success/failure origins in Appwrite.

Appwrite sessions and Zustand/localStorage persistence are origin-sensitive. Users may need to sign in again at the new subdomain. Browser localStorage dictionaries/user caches do not migrate automatically; persisted Appwrite vocabulary/completion remain intact. Do not copy recovery/OAuth tokens into logs or broaden cookie scope as a migration shortcut.

Old recovery/email links on `synomilo.com` keep working through redirects after cutover. Test a recovery email created before the switch. `functions/stripe` stays on its current endpoint. At cutover, set its `FRONTEND_URL=https://app.synomilo.com` and redeploy only if its environment handling requires it. Verify checkout success/cancel paths and billing portal return URLs in sandbox mode. Existing `send-email.js` links to `https://synomilo.com/home`; the legacy redirect handles these without an immediate function-code change.

## Required acceptance checks before domains move

1. Both isolated Appwrite builds must be ready with the correct root and variables. Run `WEB_URL=<web-origin> PLATFORM_URL=<platform-origin> node scripts/smoke.mjs` against the paired deployments.
2. In a real browser using a test account: register/email login, Google login, sign out/in, forgot/reset password, onboarding and account deletion on a disposable account. Check console/network for CORS/cookie failures.
3. Open an existing conversation by ID; confirm audio, optional teaching guide, completion, recents, saved words/phrases, dictionary/decks and persisted state after reload and re-login. Compare the same account before/after; avoid mutating real user data.
4. Check public guide slugs, dynamic published guides, publisher webhook authentication/revalidation, sitemap/canonical URLs, legal URLs, desktop/mobile appearance and marketing-to-app links. Preview web is noindex; final public web must be indexable.
5. Test Stripe sandbox checkout success/cancel and portal return URLs. Do not change production function `FRONTEND_URL` during previews.
6. Confirm callback URLs with query parameters survive old-host redirects; redirects do not loop; `/pricing` remains public on web and checkout remains on platform.

Builds and HTTP checks cannot establish authenticated data continuity by themselves. Complete the browser/account/payment checks before approving cutover.

## Manual Appwrite Console / DNS cutover (after acceptance)

1. Review and merge into `early-access`. Freeze deployment activation on the old Site first: it still expects a single app at repository root. Keep its currently pinned deployment available. Configure both new Sites to track `early-access` and verify both builds again.
2. Register `app.synomilo.com` as an auth platform, set the final cross-site origins and web `SITE_INDEXABLE=true`, then rebuild both. Avoid exposing these final-origin builds on preview URLs as the accepted preview pair, because their redirects now target production.
3. Add `app.synomilo.com` to platform Site domains. Add the DNS record Appwrite supplies (usually a CNAME to its exact network hostname); wait for verification and TLS. Do not guess DNS targets. Check whether an existing `app` record must be replaced and preserve unrelated DNS/MX/TXT records.
4. Reassign `synomilo.com` and `www.synomilo.com` from the old Site/domain-pinned deployment to the tested web deployment. Use the Console's exact apex/www instructions; existing Appwrite DNS records may remain valid if only the internal domain mapping changes. Keep `www` canonicalization consistent with apex SEO URLs.
5. Update the Stripe function `FRONTEND_URL` and any external app return URLs. Run final auth/library/dictionary/completion/checkout/SEO checks. Verify noindex is absent from final web and present on platform.
6. Retain the old Site/deployment during the rollback window. If anything fails, restore both apex and www rules to `6a9eee7b94725ab58086`, revert function return URLs and leave the new Sites isolated. Do not reverse data: both apps use the same database and no migration ran.

No production domain movement is authorized until both deployments pass acceptance.
