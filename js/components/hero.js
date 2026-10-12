// Banner rotativo da página inicial.
T7.Hero = {
  INTERVAL: 5500,

  init() {
    this.start();
  },

  // (Re)inicia a troca automática; chamado também após troca manual.
  start() {
    clearInterval(this._timer);
    this._timer = setInterval(() => this.go(T7.store.state.heroIndex + 1), this.INTERVAL);
  },

  go(index) {
    const total = T7.store.state.banners.length;
    T7.store.set({ heroIndex: total ? index % total : 0 }, true);
    this.render();
  },

  render() {
    const { esc, icon, setHTML } = T7.utils;
    const { banners, heroIndex } = T7.store.state;
    const el = $("#hero");
    const b = banners[heroIndex] || banners[0];
    el.hidden = !b;
    if (!b) return;

    const dots = banners
      .map((x, i) => `<button class="hero__dot${x === b ? " is-active" : ""}" data-action="set-hero" data-i="${i}" aria-label="Banner ${i + 1}"></button>`)
      .join("");

    setHTML(
      el,
      `<div class="hero__content">
        <span class="hero__eyebrow">${esc(b.eyebrow)}</span>
        <h1 class="hero__title">${esc(b.title)}</h1>
        <p class="hero__sub">${esc(b.sub)}</p>
        <div class="hero__actions">
          <button class="btn btn--dark" data-action="hero-cta">${esc(b.cta)} ${icon("arrow")}</button>
          <div class="hero__dots">${banners.length > 1 ? dots : ""}</div>
        </div>
      </div>
      <div class="hero__media"><img src="${esc(b.img)}" alt="" /></div>`,
    );
  },
};

Object.assign(T7.actions, {
  "set-hero": (el) => {
    T7.Hero.go(Number(el.dataset.i));
    T7.Hero.start();
  },
  // Leva à primeira vitrine de produtos.
  "hero-cta": () => $(".shelf:not([hidden])")?.scrollIntoView({ behavior: "smooth" }),
});
