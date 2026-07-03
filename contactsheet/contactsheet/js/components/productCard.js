import { frameSVG } from "./filmFrame.js";

const STATUS_LABEL = { in: "In stock", low: "Low stock", out: "Sold out" };

/**
 * Render one product as a numbered contact-sheet frame.
 * @param {object} product
 * @param {number} frameIndex 1-based position in the current view — the
 *   number printed on the card is literally that product's position in
 *   the sequence, mirroring real contact-sheet frame numbers.
 */
export function productCard(product, frameIndex){
  const num = String(frameIndex).padStart(2, "0");
  const a = document.createElement("a");
  a.href = `/catalog/${product.id}`;
  a.dataset.link = "";
  a.className = "frame-card route-fade";
  a.innerHTML = `
    <span class="frame-number">Fr. ${num}</span>
    <span class="frame-status ${product.stock}">${STATUS_LABEL[product.stock]}</span>
    <div class="frame-visual">${frameSVG(product)}<div class="light-leak" aria-hidden="true"></div></div>
    <div class="frame-body">
      <span class="frame-cat">${product.category}</span>
      <h3 class="frame-title">${product.name}</h3>
      <div class="frame-meta">
        <span>${product.specs.Format || product.specs.Type || ""}</span>
        <span class="frame-price">$${product.price}</span>
      </div>
    </div>
  `;
  return a;
}
