// Estado da aplicação, persistência em localStorage e consultas ao catálogo.
T7.store = {
  state: {
    mode: "cliente", // cliente | login | admin
    view: "catalogo", // catalogo | favoritos
    filter: "Destaques",
    search: "",
    selectedId: null,
    heroIndex: 0,
    menuOpen: false,
    adminTab: "produtos",
    adminSearch: "",
    products: [],
    favs: [],
    banners: [],
  },

  // Chaves do estado que são salvas no navegador.
  STORAGE: { products: "t7_products", favs: "t7_favs", banners: "t7_banners" },

  load() {
    const { read } = T7.utils;
    const products = read(this.STORAGE.products);
    const favs = read(this.STORAGE.favs);
    const banners = read(this.STORAGE.banners);
    Object.assign(this.state, {
      products: Array.isArray(products) && products.length ? products : T7.SEED,
      favs: Array.isArray(favs) ? favs : [],
      banners: Array.isArray(banners) && banners.length ? banners : T7.HERO.map((h, i) => ({ id: "b" + i, ...h })),
    });
  },

  // Atualiza o estado, salva o que for persistente e redesenha a tela.
  // `silent` pula o redesenho (quem chamou atualiza só o que precisa).
  set(patch, silent = false) {
    Object.assign(this.state, patch);
    for (const key in this.STORAGE) if (key in patch) T7.utils.write(this.STORAGE[key], patch[key]);
    if (!silent) T7.render();
  },

  isFav(id) {
    return this.state.favs.includes(id);
  },

  byId(id) {
    return this.state.products.find((p) => p.id === id) || null;
  },

  byDestaque(key) {
    return this.state.products.filter((p) => (p.destaques || []).includes(key));
  },

  favorites() {
    return this.state.products.filter((p) => this.isFav(p.id));
  },

  // Peças da listagem: a busca tem prioridade sobre o filtro de categoria.
  filtered() {
    const { products, filter, search } = this.state;
    const q = search.trim().toLowerCase();
    if (q) return products.filter((p) => `${p.nome} ${p.tipo} ${p.genero}`.toLowerCase().includes(q));
    if (filter === "Destaques") return products;
    if (T7.GENEROS.includes(filter)) return products.filter((p) => p.genero === filter || p.genero === "Unissex");
    return products.filter((p) => p.tipo === filter);
  },

  related(product) {
    return this.state.products.filter((p) => p.tipo === product.tipo && p.id !== product.id).slice(0, 4);
  },

  badge(product) {
    const d = product.destaques || [];
    if (d.includes("lancamentos")) return "Lançamento";
    if (d.includes("novidades")) return "Novo";
    return "";
  },
};
