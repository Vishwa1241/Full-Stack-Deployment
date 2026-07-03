import { getItems, getTotal, updateQty, removeItem, clearCart, subscribe } from "../state/cart.js";
import { frameSVG } from "../components/filmFrame.js";
import { showToast } from "../components/toast.js";

export default async function renderCart(container){
  container.innerHTML = `
    <section class="container cart-layout route-fade">
      <div>
        <div class="section-head" style="margin-bottom:var(--sp-4);">
          <div><span class="kicker">Order</span><h2>Your cart</h2></div>
        </div>
        <div id="lines"></div>
      </div>
      <aside class="receipt" id="receipt"></aside>
    </section>
  `;

  const linesEl = container.querySelector("#lines");
  const receiptEl = container.querySelector("#receipt");

  function paint(){
    const items = getItems();

    if(items.length === 0){
      linesEl.innerHTML = `
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 100 100" fill="none" stroke="var(--ink-dim)" stroke-width="2">
            <rect x="18" y="18" width="64" height="64" rx="6"/>
            <path d="M18 66 L38 46 L54 58 L82 34" />
          </svg>
          <p>Your cart is empty — no exposures loaded yet.</p>
          <a href="/catalog" data-link class="btn btn-primary">Browse the catalog</a>
        </div>
      `;
    }else{
      linesEl.innerHTML = "";
      items.forEach(item => {
        const line = document.createElement("div");
        line.className = "cart-line";
        line.innerHTML = `
          <div class="thumb">${frameSVG(item, { withIcon:false })}</div>
          <div>
            <div class="title">${item.name}</div>
            <div class="sub">$${item.price.toFixed(2)} each</div>
            <button class="remove-line" data-remove="${item.id}">Remove</button>
          </div>
          <div class="qty-control">
            <button type="button" data-dec="${item.id}" aria-label="Decrease quantity">&minus;</button>
            <span>${item.qty}</span>
            <button type="button" data-inc="${item.id}" aria-label="Increase quantity">+</button>
          </div>
          <div class="sub" style="font-family:var(--font-mono);">$${(item.qty * item.price).toFixed(2)}</div>
        `;
        linesEl.appendChild(line);
      });
    }

    const total = getTotal();
    const shipping = items.length === 0 ? 0 : (total > 75 ? 0 : 6.5);
    receiptEl.innerHTML = `
      <h3>Order summary</h3>
      <div class="receipt-row"><span>Subtotal</span><span>$${total.toFixed(2)}</span></div>
      <div class="receipt-row"><span>Shipping</span><span>${shipping === 0 ? "Free" : "$" + shipping.toFixed(2)}</span></div>
      <div class="receipt-row receipt-total"><span>Total</span><span>$${(total + shipping).toFixed(2)}</span></div>
      <button class="btn btn-primary" id="checkout-btn" style="width:100%;margin-top:var(--sp-4);" ${items.length === 0 ? "disabled" : ""}>
        Checkout
      </button>
    `;

    receiptEl.querySelector("#checkout-btn")?.addEventListener("click", () => {
      clearCart();
      showToast("Order placed — thanks! (demo checkout)");
    });
  }

  linesEl.addEventListener("click", (e) => {
    const dec = e.target.closest("[data-dec]");
    const inc = e.target.closest("[data-inc]");
    const rem = e.target.closest("[data-remove]");
    const items = getItems();
    if(dec){ const it = items.find(i=>i.id===dec.dataset.dec); updateQty(it.id, it.qty - 1); }
    if(inc){ const it = items.find(i=>i.id===inc.dataset.inc); updateQty(it.id, it.qty + 1); }
    if(rem){ removeItem(rem.dataset.remove); }
  });

  paint();
  const unsubscribe = subscribe(paint);
  return unsubscribe; // router calls this as cleanup when navigating away
}
