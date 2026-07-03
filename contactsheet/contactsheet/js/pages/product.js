import { getProduct, getRelated } from "../data/products.js";
import { frameSVG } from "../components/filmFrame.js";
import { productCard } from "../components/productCard.js";
import { addItem } from "../state/cart.js";
import { showToast } from "../components/toast.js";

const STATUS_LABEL = { in: "In stock", low: "Low stock — order soon", out: "Sold out" };

export default async function renderProduct(container, { params }){
  const product = getProduct(params.id);

  if(!product){
    const mod = await import("./notFound.js");
    return mod.default(container);
  }

  const related = getRelated(product);
  let qty = 1;

  container.innerHTML = `
    <section class="container loupe route-fade">
      <div class="loupe-visual">
        <div class="frame-visual" style="border-radius:var(--radius-md);">
          ${frameSVG(product)}
        </div>
      </div>
      <div class="loupe-info">
        <span class="frame-cat">${product.category}</span>
        <h1>${product.name}</h1>
        <div class="loupe-price">$${product.price.toFixed(2)}</div>
        <p class="loupe-desc">${product.blurb}</p>

        <span class="spec-label">Specifications</span>
        <dl class="spec-list">
          ${Object.entries(product.specs).map(([k,v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}
        </dl>

        <p style="font-family:var(--font-mono);font-size:0.8rem;color:${product.stock==='out' ? 'var(--sold)' : 'var(--accent-2)'};margin-bottom:var(--sp-3);">
          ${STATUS_LABEL[product.stock]}
        </p>

        <div class="qty-row">
          <div class="qty-control">
            <button type="button" id="qty-dec" aria-label="Decrease quantity">&minus;</button>
            <span id="qty-val">1</span>
            <button type="button" id="qty-inc" aria-label="Increase quantity">+</button>
          </div>
          <button class="btn btn-primary" id="add-btn" ${product.stock === "out" ? "disabled" : ""}>
            ${product.stock === "out" ? "Sold out" : "Add to cart"}
          </button>
        </div>
      </div>
    </section>

    <section class="container section" ${related.length ? "" : "hidden"}>
      <div class="section-head">
        <div><span class="kicker">You might also like</span><h2>More in ${product.category}</h2></div>
      </div>
      <div class="contact-sheet" id="related-grid"></div>
    </section>
  `;

  const qtyVal = container.querySelector("#qty-val");
  container.querySelector("#qty-dec").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    qtyVal.textContent = qty;
  });
  container.querySelector("#qty-inc").addEventListener("click", () => {
    qty = Math.min(99, qty + 1);
    qtyVal.textContent = qty;
  });
  container.querySelector("#add-btn").addEventListener("click", () => {
    addItem(product, qty);
    showToast(`Added ${qty} × ${product.name} to cart`);
  });

  const relatedGrid = container.querySelector("#related-grid");
  if(relatedGrid){
    related.forEach((p, i) => relatedGrid.appendChild(productCard(p, i + 1)));
  }
}
