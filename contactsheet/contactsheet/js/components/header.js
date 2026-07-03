import { getCount, subscribe } from "../state/cart.js";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/about", label: "About" }
];

export function renderHeader(){
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="container bar">
      <a href="/" data-link class="brand">
        <svg class="brand-mark" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.6">
          <rect x="3" y="3" width="20" height="20" rx="3"/>
          <circle cx="13" cy="13" r="5.5"/>
        </svg>
        Contact <span class="ap">Sheet</span>
      </a>
      <nav class="main-nav" aria-label="Primary">
        <button class="nav-toggle" aria-expanded="false" aria-controls="primary-menu">Menu</button>
        <ul id="primary-menu">
          ${LINKS.map(l => `<li><a href="${l.href}" data-link>${l.label}</a></li>`).join("")}
        </ul>
        <a href="/cart" data-link class="cart-btn" aria-label="View cart">
          Cart <span class="cart-count" id="cart-count">0</span>
        </a>
      </nav>
    </div>
  `;

  const countEl = header.querySelector("#cart-count");
  const setCount = () => { countEl.textContent = getCount(); };
  setCount();
  subscribe(setCount);

  const toggle = header.querySelector(".nav-toggle");
  const menu = header.querySelector("#primary-menu");
  toggle.addEventListener("click", () => {
    const open = menu.style.display === "flex";
    menu.style.display = open ? "none" : "flex";
    menu.style.flexDirection = "column";
    toggle.setAttribute("aria-expanded", String(!open));
  });

  return header;
}

/** Call after routing to highlight the active nav link. */
export function markActiveNav(path){
  document.querySelectorAll(".main-nav a[data-link]").forEach(a => {
    const href = a.getAttribute("href");
    const isActive = href === "/" ? path === "/" : path.startsWith(href);
    a.classList.toggle("active", isActive);
  });
}
