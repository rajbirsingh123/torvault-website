# Torvault — Next.js

Next.js (App Router, TypeScript) port of the static Torvault site.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Structure

- `app/` — one route per page (`/`, `/about`, `/collections`, `/certified-standard`, `/dealers`, `/faq`, `/manufacturing`), each with its own `metadata` export.
- `components/` — shared UI: `Header`/`Topbar`/`Footer`, `PageHero` (interior page hero/breadcrumb), `HeroVideo` (homepage ambient video + play/pause), `FaqAccordion`, `NewsletterForm`.
- `app/globals.css` — the original `styles.css`, with font-family declarations pointed at `next/font` CSS variables instead of the Google Fonts `<link>` tags.
- `public/` — images and video, copied from the static site root.

Interactive bits that used to live in `main.js` (mobile nav toggle, FAQ accordion, hero video play/pause) are now client components instead of a global script.

## Legacy static site

The original static HTML/CSS/JS site is archived, unmodified, in `legacy-static-site/`.
