# Contact Sheet

A film, camera, and darkroom-supply catalog built as a capstone demo. Dark,
sprocket-hole "contact sheet" visual identity; every product frame is
generated as inline SVG, so there are zero image downloads on the page.

## Architecture

```
index.html            single HTML shell, loads js/app.js as a native ES module
css/
  tokens.css           design tokens: color, type scale, spacing
  global.css           all component + layout styles
js/
  app.js               entry point — mounts header, footer, router outlet
  router.js            History API router; each route is a dynamic import()
  data/products.js      product catalog (swap for a real API later)
  state/cart.js         pub/sub cart store, persisted to localStorage
  components/           header, footer, product card, SVG frame art, toast
  pages/                one module per route: home, catalog, product, cart, about, 404
```

**No build step, and that's a deliberate choice, not a shortcut.** Every page
is loaded via `import()` from `router.js`, which the browser treats as its
own network chunk — you get route-based code splitting for free, without a
bundler in the loop. Open `index.html` through any static file server and
the whole thing runs.

If you outgrow this (TypeScript, JSX, a component library, thousands of
products), the file boundaries here map cleanly onto a Vite + React/Vue
project — `pages/` becomes routed components, `state/cart.js` becomes a
store, `data/products.js` becomes a fetch call. Nothing here fights that
migration.

### Performance choices
- Product art is generated inline SVG (gradient + icon), not photography —
  zero image requests, infinitely sharp, on-brand.
- Fonts are loaded once via `<link rel=preconnect>` + a single Google
  Fonts request with only the weights actually used.
- CSS is one file, cached aggressively (see `netlify.toml` / `vercel.json`).
- JS ships as native ES modules with per-route `import()`, so a visitor to
  `/` never downloads the cart or product-detail code.

### Routing
Client-side, via the History API (`js/router.js`). Internal links use
`data-link`, which the router intercepts; everything else falls through to
a normal browser navigation. A 404 ("Blank frame") is shown for unmatched
paths. Because this is a single-page app, the *host* also needs to be told
to serve `index.html` for any path — that's what the redirect/rewrite rules
in `netlify.toml` and `vercel.json` do.

## Run it locally

No install required:

```bash
python3 -m http.server 5173
# or: npx serve .
```

Then open `http://localhost:5173`.

## Deploy it

This is a static site — deployment is "give the host these files."

**Netlify**
1. Drag the project folder onto https://app.netlify.com/drop, **or**
2. `npx netlify-cli deploy --prod` from inside the project folder.
`netlify.toml` already contains the SPA redirect rule and cache headers.

**Vercel**
1. `npx vercel --prod` from inside the project folder, **or**
2. Push to a GitHub repo and import it at https://vercel.com/new.
`vercel.json` already contains the SPA rewrite rule and cache headers.

**Render** (Static Site)
1. Push to a GitHub repo, create a new Static Site on Render pointing at it.
2. Build command: none. Publish directory: `.`
3. Add a rewrite rule `/* → /index.html` (200) in the Render dashboard,
   equivalent to the Netlify/Vercel config above.

Once deployed you'll have a public HTTPS URL from the host — Claude can't
create that URL for you (this sandbox has no outbound network access), but
every file needed to go live is in this folder already.

## Extending the data layer
Replace the contents of `js/data/products.js` with a `fetch()` to a real
API — every page already imports from that module by name (`PRODUCTS`,
`getProduct`, `getRelated`), so nothing else needs to change as long as the
shape of a product object stays the same.
