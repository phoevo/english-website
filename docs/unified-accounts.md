# Unified accounts

The active application uses one account experience. The Appwrite `isTeacher` field remains a compatibility field, not a choice presented to users.

- Email and OAuth signup create profiles with `isTeacher: true` and `onboardingComplete: true`, then open `/home`.
- Existing stored roles, subscriptions, dictionaries, colors, recents, and completed conversations remain unchanged. In unified mode the client presents the tutor-compatible flag for every signed-in account, so existing billing code continues to receive the same supported account type.
- Every signed-in account can open every conversation, use all highlight types, save dictionary entries, and save highlight colors. Audio uses the existing subscription flag, without a tutor or assignment bypass.
- `/onboarding` redirects to `/home`; `/home/assignments` redirects to `/home/conversations`.
- Assignment controls, assignment queries, and background connection loading are inactive.
- The old onboarding and assignments implementations remain in `src/components/legacy/LegacyOnboarding.tsx` and `src/app/(dashboard)/home/assignments/LegacyAssignmentsPage.tsx`. Other legacy branches use `legacyAccountFeaturesEnabled` in `src/lib/accountFeatures.ts`. Restoring the old experience would also require deliberately restoring its routes.
- Stripe functions, checkout plan identifiers, payment actions, cancellation logic, and subscription persistence are unchanged. Pricing descriptions reflect the current feature access.

## Live Appwrite settings to review

Read-only inspection on 2026-10-29 confirmed the current schema already contains `isTeacher` and `onboardingComplete`. No schema migration or bulk user conversion is required for these code changes. No production account data or permissions were changed during implementation.

The existing audio bucket grants public read/create/update/delete access, with file security disabled. Conversation and Users collections also grant broad public access; document security is disabled. In particular, Users records include the existing subscription flag, so a client-side subscription check is not a secure entitlement boundary with these settings.

Before relying on paid audio or exposing this configuration in production, review Appwrite console permissions and implement server-verified audio delivery. Keep conversation reading available to the intended audience, restrict content/audio writes to administration, and isolate each profile's private data. Protect subscription fields through server-owned billing state rather than permitting profile clients to update them. Changing these live rules needs a coordinated pass over billing and profile APIs; it was deliberately left outside this request to leave Stripe unchanged and avoid breaking current accounts.

## Verification

Local checks cover new/existing profile bootstrap, concurrent creation, bootstrap failures, preservation of subscription and saved data, full catalog pagination, disabled legacy queries, reader tools, and subscription-based audio UI. UI checks use isolated fixtures and perform no production writes. Live registration and payment flows were not exercised.
