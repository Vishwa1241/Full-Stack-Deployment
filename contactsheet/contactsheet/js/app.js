import { renderHeader, markActiveNav } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { initRouter } from "./router.js";

const root = document.getElementById("app");

const header = renderHeader();
const outlet = document.createElement("main");
outlet.id = "outlet";
outlet.setAttribute("tabindex", "-1");
const footer = renderFooter();

root.append(header, outlet, footer);

initRouter(outlet, {
  afterRender(path){
    markActiveNav(path);
    outlet.focus({ preventScroll: true });
  }
});

// Register a no-op service worker only in production-like (https) contexts,
// left commented out so it's a drop-in for teams that want offline caching:
//
// if("serviceWorker" in navigator && location.protocol === "https:"){
//   navigator.serviceWorker.register("/sw.js");
// }
