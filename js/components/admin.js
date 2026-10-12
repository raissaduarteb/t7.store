// Painel administrativo: abas de peças, destaques e banners.
T7.Admin = {
  init() {
    $("#admin-busca").addEventListener("input", (e) => T7.store.set({ adminSearch: e.target.value }));

    // Edição dos textos do banner: salva sem redesenhar a lista, para não
    // tirar o foco do campo; atualiza só a prévia e o banner do catálogo.
    $("#admin-banners").addEventListener("input", (e) => {
      const { idx, field } = e.target.dataset;
      if (!field) return;
      this.updateBanner(Number(idx), { [field]: e.target.value }, true);
      if (field === "img") $("img", e.target.closest(".banner-editor")).src = e.target.value;
      T7.Hero.render();
    });
  },

  render() {
    const { mode, adminTab, adminSearch, products, banners } = T7.store.state;
    if (mode !== "admin") return;
    const { pecas, setHTML } = T7.utils;

    $$("[data-tab]").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.tab === adminTab));
    $$("[data-panel]").forEach((panel) => (panel.hidden = panel.dataset.panel !== adminTab));

    const q = adminSearch.trim().toLowerCase();
    const encontrados = q ? products.filter((p) => `${p.nome} ${p.tipo}`.toLowerCase().includes(q)) : products;

    $("#admin-total").textContent = pecas(products.length);
    setHTML($("#admin-pecas"), encontrados.map(this.pecaCard).join("") || `<p class="muted">Nenhuma peça encontrada.</p>`);
    setHTML($("#admin-destaques"), products.map(this.destaqueRow).join(""));
    setHTML($("#admin-banners"), banners.map(this.bannerEditor).join("") || `<p class="muted">Nenhum banner cadastrado.</p>`);
  },

  pecaCard(p) {
    const { esc, preco, icon } = T7.utils;
    const pills = T7.DESTAQUES.filter((d) => (p.destaques || []).includes(d.key))
      .map((d) => `<span class="pill${d.key === "lancamentos" ? " pill--accent" : ""}">${d.label}</span>`)
      .join("");
    return `
      <article class="admin-card">
        <img class="admin-card__img" src="${esc(p.img)}" alt="${esc(p.nome)}" loading="lazy" />
        <div class="admin-card__body">
          <span class="admin-name">${esc(p.nome)}</span>
          <span class="admin-meta">${esc(p.genero)} · ${esc(p.tipo)}</span>
          <span class="admin-card__price">${preco(p.preco)}</span>
          <div class="admin-card__pills">${pills}</div>
          <div class="admin-card__actions">
            <button class="btn btn--outline btn--sm" data-action="edit-product" data-id="${esc(p.id)}">${icon("edit")}Editar</button>
            <button class="btn btn--danger btn--sm" data-action="remove-product" data-id="${esc(p.id)}" aria-label="Remover ${esc(p.nome)}">${icon("trash")}</button>
          </div>
        </div>
      </article>`;
  },

  destaqueRow(p) {
    const { esc } = T7.utils;
    const chips = T7.DESTAQUES.map((d) => {
      const on = (p.destaques || []).includes(d.key);
      const cls = `chip${d.key === "lancamentos" ? " chip--accent" : ""}${on ? " is-on" : ""}`;
      return `<button class="${cls}" data-action="toggle-destaque" data-id="${esc(p.id)}" data-key="${d.key}" aria-pressed="${on}">${d.label}</button>`;
    }).join("");
    return `
      <div class="admin-row">
        <img class="admin-row__img" src="${esc(p.img)}" alt="" loading="lazy" />
        <div class="admin-row__info">
          <span class="admin-name">${esc(p.nome)}</span>
          <span class="admin-meta">${esc(p.genero)} · ${esc(p.tipo)}</span>
        </div>
        <div class="chips">${chips}</div>
      </div>`;
  },

  bannerEditor(b, idx) {
    const { esc, icon } = T7.utils;
    const campo = (field, label, placeholder) => `
      <label class="field">
        ${label}
        <input class="input" value="${esc(b[field])}" data-idx="${idx}" data-field="${field}" placeholder="${placeholder}" />
      </label>`;
    return `
      <article class="banner-editor">
        <div class="banner-editor__media">
          <img src="${esc(b.img)}" alt="" />
          <span class="banner-editor__num">Banner ${idx + 1}</span>
        </div>
        <div class="banner-editor__fields">
          <div class="field">
            Imagem
            <div class="thumbs">${T7.Admin.thumbs("pick-banner-img", idx)}</div>
            <input class="input input--sm" value="${esc(b.img)}" data-idx="${idx}" data-field="img" placeholder="ou cole uma URL de imagem" aria-label="URL da imagem" />
          </div>
          ${campo("eyebrow", "Selo (linha superior)", "Ex: Coleção Cartoon 2.0")}
          ${campo("title", "Título", "Ex: Lançamento que veste atitude")}
          ${campo("sub", "Subtítulo", "Texto de apoio")}
          ${campo("cta", "Texto do botão", "Ex: Ver lançamentos")}
          <button class="btn btn--danger btn--sm" data-action="remove-banner" data-idx="${idx}">${icon("trash")}Remover banner</button>
        </div>
      </article>`;
  },

  // Miniaturas das imagens disponíveis (usadas também no formulário de peça).
  thumbs(action, idx = "") {
    return T7.IMAGES.map(
      (img) => `<button class="thumb" type="button" data-action="${action}" data-idx="${idx}" data-img="${img}" aria-label="Usar esta imagem"><img src="${img}" alt="" loading="lazy" /></button>`,
    ).join("");
  },

  updateBanner(idx, changes, silent) {
    const banners = T7.store.state.banners.map((b, i) => (i === idx ? { ...b, ...changes } : b));
    T7.store.set({ banners }, silent);
  },
};

Object.assign(T7.actions, {
  "set-admin-tab": (el) => T7.store.set({ adminTab: el.dataset.tab }),

  "remove-product": (el) => {
    if (!window.confirm("Remover esta peça do catálogo?")) return;
    const { products, favs } = T7.store.state;
    const id = el.dataset.id;
    T7.store.set({ products: products.filter((p) => p.id !== id), favs: favs.filter((x) => x !== id) });
  },

  "toggle-destaque": (el) => {
    const { id, key } = el.dataset;
    const products = T7.store.state.products.map((p) => {
      if (p.id !== id) return p;
      const atual = p.destaques || [];
      return { ...p, destaques: atual.includes(key) ? atual.filter((x) => x !== key) : [...atual, key] };
    });
    T7.store.set({ products });
  },

  "add-banner": () => {
    const novo = { id: "b" + Date.now(), img: T7.IMAGES[0], eyebrow: "Novo destaque", title: "Título do banner", sub: "Texto de apoio do banner.", cta: "Confira" };
    T7.store.set({ banners: [...T7.store.state.banners, novo] });
  },

  "remove-banner": (el) => {
    if (!window.confirm("Remover este banner?")) return;
    const banners = T7.store.state.banners.filter((_, i) => i !== Number(el.dataset.idx));
    T7.store.set({ banners, heroIndex: 0 });
  },

  "pick-banner-img": (el) => T7.Admin.updateBanner(Number(el.dataset.idx), { img: el.dataset.img }),
});
