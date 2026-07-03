export function renderFooter(){
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  const year = new Date().getFullYear();
  footer.innerHTML = `
    <div class="container">
      <div class="cols">
        <div>
          <h4>Contact Sheet</h4>
          <p style="max-width:32ch;">Film, cameras, and darkroom supply for people who still like waiting for a picture.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li><a href="/catalog" data-link>All products</a></li>
            <li><a href="/catalog?cat=Film" data-link>Film</a></li>
            <li><a href="/catalog?cat=Cameras" data-link>Cameras</a></li>
          </ul>
        </div>
        <div>
          <h4>Studio</h4>
          <ul>
            <li><a href="/about" data-link>About</a></li>
            <li><a href="/cart" data-link>Cart</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${year} Contact Sheet Supply Co.</span>
        <span>Frame by frame.</span>
      </div>
    </div>
  `;
  return footer;
}
