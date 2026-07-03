let toastEl = null;
let hideTimer = null;

export function showToast(message){
  if(!toastEl){
    toastEl = document.createElement("div");
    toastEl.className = "toast";
    toastEl.setAttribute("role", "status");
    toastEl.setAttribute("aria-live", "polite");
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = message;
  requestAnimationFrame(() => toastEl.classList.add("show"));
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
}
