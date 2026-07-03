export default async function renderNotFound(container){
  container.innerHTML = `
    <section class="container not-found route-fade">
      <h1>Blank frame</h1>
      <p style="color:var(--ink-dim);margin-bottom:var(--sp-5);">Nothing was exposed at this address.</p>
      <a href="/" data-link class="btn btn-primary">Back to the roll</a>
    </section>
  `;
}
