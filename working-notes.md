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
- Spam protection for forms. Hook up to resend
- remove phone number
- call out over whatsapp
- admin section
  - uploads
- show cars from admin section
  - caching
- emailing

Fleet admin scoped 2026-07-29 → `docs/plans/2026-07-29-001-feat-fleet-admin-plan.md`. Covers the admin section, uploads, cars-from-DB, caching, emailing and form spam TODOs above.

Watch out for:

- `cacheComponents: true` is a project-wide flag — flipping it changes prerender semantics for all four pages, not just home. `unstable_cache` is superseded in Next 16. See `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`
- `middleware.ts` is `proxy.ts` in Next 16, and the docs are explicit that it must not be the only auth check
- the UploadThing route needs the same session guard as the admin pages — otherwise it's an open public upload endpoint
- `section-cars.tsx:20` hardcodes "Five cars, all local, all yours from $69 a day" — derive it once the fleet is editable
