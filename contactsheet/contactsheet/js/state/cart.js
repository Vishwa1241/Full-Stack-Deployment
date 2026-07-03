// Cart state — a tiny pub/sub store backed by localStorage.
// Kept dependency-free on purpose: this is real state management
// scaled to the size of the app, not a framework stand-in.

const STORAGE_KEY = "contactsheet:cart";
const listeners = new Set();

function read(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(err){
    console.warn("Cart storage unreadable, starting empty.", err);
    return [];
  }
}

function write(items){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }catch(err){
    console.warn("Could not persist cart.", err);
  }
  listeners.forEach(fn => fn(items));
}

let items = read();

export function getItems(){
  return items;
}

export function getCount(){
  return items.reduce((sum, i) => sum + i.qty, 0);
}

export function getTotal(){
  return items.reduce((sum, i) => sum + i.qty * i.price, 0);
}

export function addItem(product, qty = 1){
  const existing = items.find(i => i.id === product.id);
  if(existing){
    existing.qty += qty;
  }else{
    items = [...items, { id: product.id, name: product.name, price: product.price, hue: product.hue, qty }];
  }
  write(items);
}

export function updateQty(id, qty){
  if(qty <= 0){ return removeItem(id); }
  items = items.map(i => i.id === id ? { ...i, qty } : i);
  write(items);
}

export function removeItem(id){
  items = items.filter(i => i.id !== id);
  write(items);
}

export function clearCart(){
  items = [];
  write(items);
}

/** Subscribe to cart changes. Returns an unsubscribe function. */
export function subscribe(fn){
  listeners.add(fn);
  return () => listeners.delete(fn);
}
