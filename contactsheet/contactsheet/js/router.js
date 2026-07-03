// Minimal client-side router.
//
// Design notes:
// - Routes are dynamic import()s, so each page is its own network-loaded
//   chunk — the browser gives us route-based code splitting natively,
//   without a bundler in the loop.
// - Route modules export a default async function: (container, ctx) => cleanup?
//   ctx = { params, query }. The optional returned cleanup runs before the
//   next route mounts (unsubscribe listeners, clear intervals, etc).

const routes = [
  { pattern: "/", load: () => import("./pages/home.js") },
  { pattern: "/catalog", load: () => import("./pages/catalog.js") },
  { pattern: "/catalog/:id", load: () => import("./pages/product.js") },
  { pattern: "/cart", load: () => import("./pages/cart.js") },
  { pattern: "/about", load: () => import("./pages/about.js") }
];

function matchRoute(path){
  for(const route of routes){
    const partsA = route.pattern.split("/").filter(Boolean);
    const partsB = path.split("/").filter(Boolean);
    if(partsA.length !== partsB.length) continue;
    const params = {};
    const ok = partsA.every((seg, i) => {
      if(seg.startsWith(":")){ params[seg.slice(1)] = decodeURIComponent(partsB[i]); return true; }
      return seg === partsB[i];
    });
    if(ok) return { route, params };
  }
  return null;
}

let currentCleanup = null;
let outlet = null;
let onNavigate = null;

export function initRouter(outletEl, { afterRender } = {}){
  outlet = outletEl;
  onNavigate = afterRender;

  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if(!link) return;
    const url = new URL(link.href);
    if(url.origin !== location.origin) return;
    e.preventDefault();
    navigate(url.pathname + url.search);
  });

  window.addEventListener("popstate", () => render(location.pathname + location.search));

  render(location.pathname + location.search);
}

export function navigate(path){
  if(path === location.pathname + location.search){ return; }
  history.pushState({}, "", path);
  render(path);
}

async function render(fullPath){
  const [path, search] = fullPath.split("?");
  const match = matchRoute(path) || null;

  if(typeof currentCleanup === "function"){
    try{ currentCleanup(); }catch(err){ console.warn("Route cleanup error", err); }
    currentCleanup = null;
  }

  outlet.setAttribute("aria-busy", "true");

  if(!match){
    const mod = await import("./pages/notFound.js");
    outlet.innerHTML = "";
    currentCleanup = await mod.default(outlet, { params: {}, query: new URLSearchParams(search) });
  }else{
    try{
      const mod = await match.route.load();
      outlet.innerHTML = "";
      currentCleanup = await mod.default(outlet, { params: match.params, query: new URLSearchParams(search) });
    }catch(err){
      console.error("Failed to load route", path, err);
      outlet.innerHTML = `<div class="container section"><p>This page couldn't be loaded. Please check your connection and try again.</p></div>`;
    }
  }

  outlet.removeAttribute("aria-busy");
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  if(typeof onNavigate === "function") onNavigate(path);
}
