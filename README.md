# Synomilo

One repository, two independently deployable Next.js apps:

- `apps/web`: marketing, pricing overview, guides, legal pages, sitemap and guide publishing API.
- `apps/platform`: authentication, conversation library, completion, recents, dictionary, account management and checkout.
- `functions/stripe`: existing Appwrite function, deployed separately.

Each app has its own package manifest, lockfile, configuration, assets and `.env.example`. Small public UI components are copied intentionally so each Appwrite Site can build from its own root without dependencies outside it. Keep equivalent UI changes synchronized until a shared package is introduced.

## Local development

Use Node 22. Install each app independently:

```sh
npm ci --prefix apps/web
npm ci --prefix apps/platform
```

Copy each app's `.env.example` to its own `.env.local`, then populate its variables. Next.js reads env files from each app directory, not the repository root. Existing root `.env.local` is no longer used.

Run `npm run dev:web` and `npm run dev:platform` in separate terminals. Web uses port 3000; platform uses 3001. Cross-site origins must be HTTP(S) origins without paths, queries or credentials.

## Verification

```sh
npm test
npm run typecheck
npm run build
npm --prefix apps/web run start -- --port 3000
npm --prefix apps/platform run start -- --port 3001
```

With both production servers running, run `node scripts/smoke.mjs`. To check preview deployments set `WEB_URL` and `PLATFORM_URL` to their respective origins. The smoke test only requests pages, verifies redirects, and submits an unauthenticated publishing request; it does not modify account data.

See [deployment and cutover runbook](docs/separate-sites.md) before changing production configuration or domains.
