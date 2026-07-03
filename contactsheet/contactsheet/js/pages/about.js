export default async function renderAbout(container){
  container.innerHTML = `
    <section class="container manifesto route-fade">
      <span class="hero-eyebrow">About</span>
      <h1 style="font-family:var(--font-display);font-size:var(--step-3);margin:0 0 var(--sp-4);">The case for waiting a week.</h1>
      <p><strong>Contact Sheet</strong> started as a supply closet for a two-person darkroom in a converted garage. We kept a short list of film stocks we trusted and a longer list of cameras we'd fix rather than replace.</p>
      <p>Everything we carry gets tested by hand: a roll shot, a tank mixed, a sheet contact-printed and held up to the light. If we wouldn't reload it ourselves, we don't stock it.</p>
      <p>We're not against convenience. We just think some pictures are better for having made you wait.</p>
    </section>
  `;
}
