import { PRODUCTS } from "../data/products.js";
import { productCard } from "../components/productCard.js";
import { frameSVG } from "../components/filmFrame.js";

export default async function renderHome(container){
  const featured = PRODUCTS.filter(p => p.stock !== "out").slice(0, 4);
  const strip = [...PRODUCTS, ...PRODUCTS]; // duplicated for seamless scroll loop

  container.innerHTML = `
    <section class="hero container route-fade">
      <p class="hero-eyebrow">New arrivals · developed weekly</p>
      <h1>Supplies for the <em>slow</em> picture.</h1>
      <p>Film, cameras, and darkroom goods for people who'd rather wait a week for a contact sheet than a second for a preview.</p>
      <div class="hero-actions">
        <a href="/catalog" data-link class="btn btn-primary">Browse the catalog</a>
        <a href="/about" data-link class="btn btn-ghost">Our darkroom</a>
      </div>
      <div class="filmstrip" aria-hidden="true">
        <div class="filmstrip-track">
          ${strip.map(p => `<div class="frame">${frameSVG(p, { withIcon:false })}</div>`).join("")}
        </div>
      </div>
    </section>

    <section class="section container">
      <div class="section-head">
        <div>
          <span class="kicker">Frames 01&ndash;04</span>
          <h2>This week's picks</h2>
        </div>
        <a href="/catalog" data-link class="btn btn-ghost">View full sheet</a>
      </div>
      <div class="contact-sheet" id="featured-grid"></div>
    </section>

    <section class="section container">
      <div class="stat-row">
        <div class="stat"><b>${PRODUCTS.length}</b><span>Products in stock</span></div>
        <div class="stat"><b>${new Set(PRODUCTS.map(p=>p.category)).size}</b><span>Categories</span></div>
        <div class="stat"><b>1994</b><span>Since</span></div>
      </div>
    </section>
  `;

  const grid = container.querySelector("#featured-grid");
  featured.forEach((p, i) => grid.appendChild(productCard(p, i + 1)));
}
