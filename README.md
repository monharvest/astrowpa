# Astro PWA Starter — Offline Blog

Offline-ready Astro starter that ships with Tailwind UI, SEO metadata, searchable content collections, pagination, categories, and Cloudflare deployment support. Everything is pre-configured for `@vite-pwa/astro`, so the entire site (HTML, CSS, JS, JSON, and images) works after the first visit.

## ✨ Features

- **Full-site caching** via `@vite-pwa/astro` with Workbox runtime rules for navigation and rich media.
- **Tailwind CSS + dark mode** UI with hero, cards, pagination, and responsive typography.
- **Content collections** powering 10 Markdown sample posts, categories, and dynamic `[slug]` routes.
- **Offline search** using a statically generated JSON index (`/search.json`).
- **SEO + sitemap + social cards** through a reusable `<SEO>` component and `@astrojs/sitemap`.
- **Cloudflare ready** (`output: 'server'`, `@astrojs/cloudflare`, and `wrangler.toml`).

## 📁 Project Structure

```
├── public/
│   ├── favicon.ico
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── posts/post-1.jpg … post-10.jpg
├── src/
│   ├── components/ (Layout, Header, DarkMode, Search, SEO)
│   ├── content/blog/post-*.md
│   ├── pages/
│   │   ├── index.astro, posts.astro, search.astro, search.json.js
│   │   ├── posts/[slug].astro, posts/page/[page].astro
│   │   └── categories/[category].astro
│   └── search/createIndex.js
├── astro.config.mjs (Cloudflare adapter + PWA plugin)
├── tailwind.config.cjs / postcss.config.cjs
├── wrangler.toml
└── package.json
```

## 🧪 Local Development

```bash
npm install       # install dependencies
npm run dev       # start dev server on http://localhost:4321
npm run build     # build for production (Cloudflare server output)
npm run preview   # preview production build locally
```

## 🌐 Deployment (Cloudflare Workers)

```bash
npm run build
npx wrangler deploy
```

The build outputs a dual bundle (`dist/client` + `dist/server`) ready for the Worker specified in `wrangler.toml`.

Set `SESSION_SECRET` in your environment (or Wrangler secrets) to secure the cookie-based session driver that keeps the Cloudflare adapter happy without KV bindings.

## 🔎 Offline Search & Sync

- `src/search/createIndex.js` generates a static index consumed by `/search.json`.
- Both the JSON endpoint and the `/search` page are cached by the service worker, so searches keep working offline once fetched.

## 🧰 Customization Ideas

- Add more collections (e.g., docs, changelogs) and reuse the layout.
- Wire up form submissions with background sync APIs.
- Swap `site` URL and manifest metadata to match your deployment.

Enjoy building! 🧑‍🚀
