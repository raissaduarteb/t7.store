// Card de produto usado nas vitrines, listagens e relacionados.
// O estado de favorito não entra no HTML: é aplicado depois por T7.syncFavs().
T7.ProdutoCard = (p) => {
  const { esc, preco, icon } = T7.utils;
  const badge = T7.store.badge(p);
  return `
    <article class="card" role="button" tabindex="0" data-action="open-product" data-id="${esc(p.id)}">
      <div class="card__media">
        <img src="${esc(p.img)}" alt="${esc(p.nome)}" loading="lazy" />
        ${badge ? `<span class="tag">${badge}</span>` : ""}
        <button class="fav-btn" data-action="toggle-fav" data-fav="${esc(p.id)}" aria-label="Favoritar ${esc(p.nome)}">
          ${icon("heart", "icon--fill")}
        </button>
      </div>
      <div class="card__info">
        <span class="card__name">${esc(p.nome)}</span>
        <span class="card__meta">${esc(p.genero)} · ${esc(p.tipo)}</span>
        ${T7.CONFIG.mostrarPreco ? `<span class="price">${preco(p.preco)}</span>` : ""}
      </div>
    </article>`;
};

T7.actions["toggle-fav"] = (el) => {
  const id = el.dataset.fav;
  const { favs } = T7.store.state;
  T7.store.set({ favs: favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id] });
};

// Reflete os favoritos em todos os botões de coração e contadores da página.
T7.syncFavs = () => {
  $$("[data-fav]").forEach((btn) => {
    const on = T7.store.isFav(btn.dataset.fav);
    btn.classList.toggle("is-fav", on);
    btn.setAttribute("aria-pressed", on);
    const label = $("[data-fav-label]", btn);
    if (label) label.textContent = on ? "Favoritado" : "Favoritar";
  });
  const total = T7.store.favorites().length;
  $$("[data-fav-count]").forEach((el) => {
    el.textContent = total;
    el.hidden = !total;
  });
};
