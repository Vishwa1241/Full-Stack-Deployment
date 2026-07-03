import { PRODUCTS, CATEGORIES } from "../data/products.js";
import { productCard } from "../components/productCard.js";

export default async function renderCatalog(container, { query }){
  const activeCat = query.get("cat") || "All";

  container.innerHTML = `
    <section class="section container route-fade">
      <div class="section-head">
        <div>
          <span class="kicker">The full roll</span>
          <h2>Catalog</h2>
        </div>
      </div>
      <div class="filter-bar" id="filters"></div>
      <div class="contact-sheet" id="grid"></div>
      <p id="empty-msg" style="display:none;color:var(--ink-dim);padding-block:var(--sp-6);">
        No frames in this category yet. Check back after the next development run.
      </p>
    </section>
  `;

  const filters = container.querySelector("#filters");
  const grid = container.querySelector("#grid");
  const emptyMsg = container.querySelector("#empty-msg");

  const allCats = ["All", ...CATEGORIES];
  filters.innerHTML = allCats.map(c =>
    `<button class="chip ${c === activeCat ? "active" : ""}" data-cat="${c}">${c}</button>`
  ).join("");

  function paint(cat){
    grid.innerHTML = "";
    const list = cat === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
    emptyMsg.style.display = list.length ? "none" : "block";
    list.forEach((p, i) => grid.appendChild(productCard(p, i + 1)));
    filters.querySelectorAll(".chip").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.cat === cat);
    });
  }

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if(!btn) return;
    const cat = btn.dataset.cat;
    const url = cat === "All" ? "/catalog" : `/catalog?cat=${encodeURIComponent(cat)}`;
    history.replaceState({}, "", url);
    paint(cat);
  });

  paint(activeCat);
}
