// Modal com os detalhes de um produto.
T7.ProdutoModal = {
  render() {
    const { esc, preco, icon, whatsapp, setHTML } = T7.utils;
    const p = T7.store.byId(T7.store.state.selectedId);
    const overlay = $("#produto-modal");
    overlay.hidden = !p;
    if (!p) return;

    const badge = T7.store.badge(p);
    const tamanhos = p.tamanhos || [];
    const relacionados = T7.store.related(p);

    const changed = setHTML(
      $("#produto-detalhe"),
      `<div class="product">
        <div class="product__media">
          <img src="${esc(p.img)}" alt="${esc(p.nome)}" />
          ${badge ? `<span class="tag">${badge}</span>` : ""}
        </div>
        <div class="product__info">
          <button class="close-btn" data-action="close-product" aria-label="Fechar">✕</button>
          <span class="card__meta">${esc(p.genero)} · ${esc(p.tipo)}</span>
          <h2 class="product__name">${esc(p.nome)}</h2>
          ${T7.CONFIG.mostrarPreco ? `<span class="price price--lg">${preco(p.preco)}</span>` : ""}
          <p class="product__desc">${esc(p.descricao)}</p>
          ${
            tamanhos.length
              ? `<div>
                  <div class="product__label">Tamanhos</div>
                  <div class="chips">${tamanhos.map((t) => `<span class="size">${esc(t)}</span>`).join("")}</div>
                </div>`
              : ""
          }
          <div class="product__actions">
            <a class="btn btn--accent" href="${whatsapp("Olá! Tenho interesse na peça: " + p.nome)}" target="_blank" rel="noopener">Tenho interesse</a>
            <button class="btn btn--outline fav-toggle" data-action="toggle-fav" data-fav="${esc(p.id)}">
              ${icon("heart", "icon--fill")}<span data-fav-label></span>
            </button>
          </div>
        </div>
      </div>
      ${
        relacionados.length
          ? `<div class="product__related">
              <h3>Você também pode gostar</h3>
              <div class="product-grid">${relacionados.map(T7.ProdutoCard).join("")}</div>
            </div>`
          : ""
      }`,
    );
    if (changed) overlay.scrollTop = 0;
  },
};

Object.assign(T7.actions, {
  "open-product": (el) => T7.store.set({ selectedId: el.dataset.id }),
  "close-product": () => T7.store.set({ selectedId: null }),
});
