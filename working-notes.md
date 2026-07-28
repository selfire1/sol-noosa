# Working Notes

Design system ported from `design_handoff_sol_noosa_design_system/` on 2026-05-03 — tokens live in `app/globals.css`, fonts in `app/layout.tsx`, kit reference at `ui_kits/marketing-site/`.

Pages:

- Home
- About
- Contact Us
- Noosa specific (or is there a suburb you want to target?)

TODO:

- JSONLD Schema
- Fonts
- Consolidate spacing
- Check responsiveness
- remove phone number
- call out over whatsapp

Fleet admin scoped 2026-07-29 → `docs/plans/2026-07-29-001-feat-fleet-admin-plan.md`. Covers the admin section, uploads, cars-from-DB, caching, emailing and form spam TODOs above.

Fleet admin built 2026-07-29 (all 10 units). Notes from the build:

- `cacheComponents: true` is live. Marketing pages stay prerendered (○ in build output); admin routes are partial-prerender (◐). The footer needed `'use cache'` because of `new Date().getFullYear()` — with the flag on, current-time access outside a cached scope fails the build.
- Marketing pages moved to `app/(marketing)/` so `/admin` doesn't inherit the site Header/Footer; root layout is now just html/body/fonts.
- Fleet reads go through `getPublishedFleet()` (`use cache` + `cacheTag('fleet')` in `lib/fleet.ts`); every mutation in `lib/fleet-actions.ts` calls `updateTag('fleet')`. If an edit ever "doesn't show up", look for a mutation path missing that call.
- `db` is imported lazily inside `getPublishedFleet()` so `bun test` can import `lib/fleet.ts` without booting varlock (KTD-8).
- The noosa page's fleet blurb also derives from data now (it hard-coded "five cars from $69" too).
- Session = HMAC-signed cookie (`lib/auth/session.ts`), secret derived from `ADMIN_PASSWORD`, so rotating the password logs everyone out. `proxy.ts` is optimistic UX only; `requireAdmin()` in every page/action/upload route is the real gate.
- UploadThing: route guarded via `.middleware()` session check (verified by unauthenticated upload attempt). Photos are compressed in-browser (canvas, max 1600px edge, JPEG q0.82) before upload. `imageKey` is stored so replaced/deleted photos are removed from UploadThing — new key is written before the old file is deleted, so a mid-way failure orphans a file rather than breaking a card.
- `next/image` `remotePatterns` is pinned to `fhexqicrem.ufs.sh` (the UploadThing app subdomain). A new UploadThing app means updating that host.
- Spam gates (`lib/spam.ts`): honeypot (silent fake success), 3s minimum submit time (no-JS submissions always fail it — acceptable, the form needs JS anyway), 5-per-10-min per-IP in-memory rate limit (resets on deploy, KTD-10). Turnstile is the upgrade path if this proves insufficient.
- Enquiry email failures are logged and swallowed (`lib/email.ts` never throws) — the DB row is the source of truth (FR-16).
- `bun run lint` now ignores `env.d.ts` (varlock-generated, contains `@ts-nocheck`).

Test data created against live services during the build (2026-07-29), verified state:

- Turso `enquiries`: rows #1 "Test Enquiry Verification" and #2 "Email Pipeline Test" — **delete these two rows before launch**. `cars` is clean (the five real cars; test cars were deleted through the admin as part of verification).
- UploadThing: 0 files (verified via `UTApi.listFiles` after the create-replace-delete cycle — no orphans).
- Resend/inbox: test emails sent to the notification address ("New enquiry from U9 Verification Test" via scratch script, "New enquiry from Email Pipeline Test" via the real form path) — nothing to clean, just ignore/delete them in the inbox.
