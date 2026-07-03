// Generates a lightweight inline SVG "frame" for a product instead of a
// raster photo. This is a deliberate performance choice for the capstone:
// zero image requests, zero image weight, infinitely resolution-independent,
// while still giving every product a distinct, on-brand visual identity
// derived from its category + hue.

const ICONS = {
  Film: `<rect x="34" y="20" width="12" height="60" rx="2"/><circle cx="40" cy="30" r="3"/><circle cx="40" cy="70" r="3"/>`,
  Cameras: `<rect x="22" y="34" width="56" height="36" rx="4"/><circle cx="50" cy="52" r="13"/><circle cx="50" cy="52" r="7"/><rect x="30" y="26" width="14" height="10" rx="2"/>`,
  Darkroom: `<path d="M50 22 L68 66 L32 66 Z"/><circle cx="50" cy="50" r="3" fill="var(--base-black)"/>`,
  Accessories: `<circle cx="50" cy="50" r="22" fill="none" stroke-width="4"/><circle cx="50" cy="50" r="6"/>`
};

export function frameSVG(product, { withIcon = true } = {}){
  const hue = product.hue ?? 30;
  const id = `g-${product.id}`;
  const icon = withIcon ? (ICONS[product.category] || ICONS.Accessories) : "";
  return `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${product.name}">
      <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="hsl(${hue} 45% 16%)"/>
          <stop offset="55%" stop-color="hsl(${hue} 35% 10%)"/>
          <stop offset="100%" stop-color="hsl(${(hue+30)%360} 40% 8%)"/>
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#${id})"/>
      <g fill="none" stroke="hsl(${hue} 55% 62%)" stroke-width="2.5" opacity="0.85">
        ${icon}
      </g>
    </svg>
  `;
}

/** Mount a frame visual (with hover light-leak layer) inside a container element. */
export function renderFrameVisual(product){
  const wrap = document.createElement("div");
  wrap.className = "frame-visual";
  wrap.innerHTML = `${frameSVG(product)}<div class="light-leak" aria-hidden="true"></div>`;
  return wrap;
}
