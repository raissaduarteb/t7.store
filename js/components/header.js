// Cabeçalho do catálogo: busca, categorias e menu lateral (mobile).
T7.Header = {
  init() {
    // Buscar sempre leva à listagem, mesmo estando em "Favoritos".
    $("#busca").addEventListener("input", (e) => T7.store.set({ search: e.target.value, view: "catalogo" }));
  },

  render() {
    const { filter, search, menuOpen } = T7.store.state;
    const links = (cls) =>
      T7.FILTROS.map((f) => `<button class="${cls}${f === filter ? " is-active" : ""}" data-action="set-filter" data-filter="${f}">${f}</button>`).join("");

    T7.utils.setHTML($("#nav-filtros"), links("category-nav__link"));
    T7.utils.setHTML($("#menu-filtros"), links("drawer__link"));
    $("#menu").hidden = !menuOpen;

    const busca = $("#busca");
    if (busca.value !== search) busca.value = search;
  },
};

Object.assign(T7.actions, {
  "set-filter": (el) => T7.store.set({ filter: el.dataset.filter, view: "catalogo", search: "", menuOpen: false }),
  "go-home": () => T7.store.set({ filter: "Destaques", view: "catalogo", search: "" }),
  "go-favoritos": () => T7.store.set({ view: "favoritos", search: "", selectedId: null, menuOpen: false }),
  "toggle-menu": () => T7.store.set({ menuOpen: !T7.store.state.menuOpen }),
  "close-menu": () => T7.store.set({ menuOpen: false }),
});
