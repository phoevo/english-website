# Synomilo authenticated backend

This implements the same boundary used by Synomilo Academy: verify the caller, authorize the operation, validate permitted input, then use a server-only Appwrite client to write.

## Request flow

1. Existing Appwrite email/password and Google sessions remain in place. Sign-in and Stripe checkout are not replaced.
2. `src/data/accountActions.ts` obtains an Appwrite JWT from the current session. Tokens stay in memory, are reused for up to ten minutes, are checked against the current account, and refresh after authentication expiry. Profile mutations are serialized within this browser module.
3. The browser calls a Next.js Server Action in `src/app/actions/account.ts`.
4. `src/lib/server/appwrite.ts` uses a fresh JWT client and `Account.get()` to verify the caller on every request. It constructs the privileged API-key client only after authentication succeeds.
5. `src/lib/server/profiles.ts` derives the profile ID from the verified account. It accepts specific, validated operations rather than arbitrary document patches or caller-supplied ownership.
6. The response contains only the profile fields required by the interface. Stripe customer IDs, permission metadata, API keys and SDK error details are omitted.

Academy uses an HTTP-only session cookie. Synomilo currently uses verified Appwrite JWTs so that existing browser SDK sessions, OAuth flows and the untouched Stripe integration keep working. No browser-provided subscription flag or account ID is trusted by the new server layer.

## Implemented operations

- Profile initialization with `isTeacher: true`, `onboardingComplete: true`, `isSubscribed: false` and owner-read permissions. Existing profile data is retained; concurrent creation is handled.
- Dictionary additions/removals, thirteen word-class colors, recents, completion, guide progress, daily streaks, task counts and checked challenge awards.
- Profile name synchronization from the name reported by authenticated Appwrite Auth. Password changes remain with Appwrite's authenticated Account API.
- Owner-scoped deck creation/listing/deletion, including pagination and foreign-owner checks.
- Authenticated, validated feedback submission with no client read grants.
- Audio authorization against the existing persisted subscription flag, with server-resolved file IDs and ten-minute Appwrite file tokens. Expired links refresh before playback; playback position is retained when a source refreshes. The raw Storage URL path remains only in the disabled legacy branch.
- `/api/delete-account` requires a verified bearer JWT, rejects a different supplied user ID, and deletes only the verified caller. It cleans all pages of that user's configured decks and legacy relationship documents. Failures are returned instead of falsely reporting success. Existing subscription cancellation runs before this route as before.

Current input limits match the existing Appwrite schema. Array edits are serialized in one browser module; they do not provide transaction locking between independent tabs or devices.

## Server environment

Configure a private `APPWRITE_API_KEY` on the Appwrite Site and in local development. It must have the scopes required by these operations: `documents.read`, `documents.write`, `tokens.write`, and `users.write` for account deletion. Do not prefix this key with `NEXT_PUBLIC_`. Use narrower separate server credentials if splitting profile, audio and deletion services later.

The layer accepts `APPWRITE_ENDPOINT`, `APPWRITE_PROJECT_ID`, `APPWRITE_DATABASE_ID`, and collection/bucket ID variables, falling back to their existing `NEXT_PUBLIC_APPWRITE_*` equivalents for non-secret configuration. Optional deck, feedback and audio operations require their corresponding configured IDs.

No new package or Appwrite collection is needed. Run `npm run test:backend` for the isolated regression tests.

## Live permission and billing cutover remains separate

No live permissions, user records, tables, Stripe prices, checkout handlers or webhook code were changed by this implementation. The new layer alone cannot prevent direct requests to Appwrite while broad collection/bucket grants remain enabled.

Before tightening live permissions:

1. Verify server environment/scopes and test registration, profile reads/writes, playback renewal and self-deletion against a disposable test project.
2. Back up existing records and permissions. Assign owner-read permissions to existing Users documents and remove their direct client update/delete grants. Enable Document Security and remove collection-wide client CRUD grants.
3. Review deck/feedback rules and audio bucket/file grants. Make audio private, remove unwanted old file tokens, and verify direct unauthenticated URLs fail.
4. Coordinate the remaining billing paths before removing profile write grants: `getData.subscribeUser/unsubscribeUser`, `useUserStore.setSubscribed`, and the existing profile cancellation fallback still contain the original subscription writes because Stripe logic was explicitly excluded. These must be retired or moved to trusted billing handlers during that pass. Inactive assignment/friend code is also retained.
5. The existing Appwrite Stripe function's public management routes require their own authorization review. Securing the Next.js deletion route does not change that separate deployment.
6. Reconcile existing subscription values with verified billing state, then plan migration to the existing `subscriptions`/`stripe_customers` tables. This code continues reading `Users.isSubscribed` until that coordinated migration.

Unused `NEXT_PUBLIC_STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET` exports were removed from the browser SDK module. Check deployed environments/builds and rotate actual secrets if any were previously exposed.

## Verification performed

Regression tests use the real server/action/client-adapter TypeScript sources with mocked Appwrite transport and no production requests. They cover authentication failures, ownership, billing/permission injection, defaults, creation conflicts, dictionary edits, validation, pagination, paid audio, safe deletion and account switching. An isolated Next.js preview also exercises actual Server Action HTTP requests and confirms private server credentials stay out of browser chunks.

No production signup, payment, record deletion, or permission migration was executed.
