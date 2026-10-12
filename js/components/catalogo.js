// Área principal do catálogo: vitrines da página inicial e listagem
// (categoria, busca ou favoritos).
T7.Catalogo = {
  init() {
    // "scroll" não propaga: escuta na fase de captura para pegar os carrosséis.
    document.addEventListener("scroll", (e) => e.target.classList?.contains("shelf__row") && this.updateArrows(e.target), true);
    window.addEventListener("resize", () => this.refreshArrows());
  },

  render() {
    const { view, filter, search } = T7.store.state;
    const { esc, pecas, setHTML } = T7.utils;
    const cards = (list) => list.map(T7.ProdutoCard).join("");
    const busca = search.trim();
    const home = view === "catalogo" && filter === "Destaques" && !busca;

    $("#destaques").hidden = !home;
    $("#lista").hidden = home;

    if (home) {
      $$(".shelf").forEach((shelf) => {
        const items = T7.store.byDestaque(shelf.dataset.shelf);
        shelf.hidden = !items.length;
        setHTML($(".shelf__row", shelf), cards(items));
      });
      this.refreshArrows();
      return;
    }

    const favoritos = view === "favoritos";
    const items = favoritos ? T7.store.favorites() : T7.store.filtered();
    $("#lista-titulo").innerHTML = favoritos ? "Meus favoritos" : busca ? `Resultados: “${esc(busca)}”` : esc(filter);
    $("#lista-total").textContent = pecas(items.length);
    $("#lista-grid").hidden = !items.length;
    setHTML($("#lista-grid"), cards(items));
    $("#vazio-busca").hidden = favoritos || items.length > 0;
    $("#vazio-favoritos").hidden = !favoritos || items.length > 0;
  },

  // Desativa a seta quando não há mais o que rolar naquela direção.
  updateArrows(row) {
    const wrap = row.parentElement;
    const max = row.scrollWidth - row.clientWidth;
    $(".shelf__arrow--prev", wrap).disabled = row.scrollLeft <= 1;
    $(".shelf__arrow--next", wrap).disabled = row.scrollLeft >= max - 1;
  },

  refreshArrows() {
    $$(".shelf__row").forEach((row) => this.updateArrows(row));
  },
};

T7.actions["scroll-row"] = (el) => {
  const row = $(".shelf__row", el.parentElement);
  row.scrollBy({ left: Number(el.dataset.dir) * row.clientWidth * 0.8, behavior: "smooth" });
};
