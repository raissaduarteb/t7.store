// Formulário (modal) para criar ou editar uma peça no painel administrativo.
T7.ProdutoForm = {
  init() {
    const form = (this.form = $("#produto-form"));
    const options = (list) => list.map((v) => `<option>${v}</option>`).join("");

    form.elements.genero.innerHTML = options(T7.GENEROS);
    form.elements.tipo.innerHTML = options(T7.TIPOS);
    $("[data-thumbs]", form).innerHTML = T7.Admin.thumbs("pick-form-img");
    $("#form-destaques").innerHTML = T7.DESTAQUES.map(
      (d) => `<button class="chip chip--check" type="button" data-action="toggle-chip" data-key="${d.key}" aria-pressed="false">${d.label}</button>`,
    ).join("");

    form.elements.img.addEventListener("input", () => this.setImage(form.elements.img.value));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.save();
    });
  },

  // Abre o formulário preenchido com `product`, ou vazio para uma peça nova.
  open(product) {
    const p = product || { nome: "", preco: "", genero: T7.GENEROS[0], tipo: T7.TIPOS[0], img: T7.IMAGES[0], descricao: "", tamanhos: ["P", "M", "G", "GG"], destaques: [] };
    const el = this.form.elements;

    this.editingId = product ? product.id : null;
    $("#form-titulo").textContent = product ? "Editar peça" : "Nova peça";
    el.nome.value = p.nome;
    el.preco.value = p.preco;
    el.genero.value = p.genero;
    el.tipo.value = p.tipo;
    el.descricao.value = p.descricao || "";
    el.tamanhos.value = (p.tamanhos || []).join(", ");
    this.setImage(p.img);
    $$(".chip", this.form).forEach((chip) => this.setChip(chip, (p.destaques || []).includes(chip.dataset.key)));

    $("#form-modal").hidden = false;
    T7.syncScrollLock();
    el.nome.focus();
  },

  close() {
    $("#form-modal").hidden = true;
    T7.syncScrollLock();
  },

  isOpen() {
    return !$("#form-modal").hidden;
  },

  setImage(src) {
    const input = this.form.elements.img;
    if (input.value !== src) input.value = src;
    $("#form-preview").src = src || T7.IMAGES[0];
  },

  setChip(chip, on) {
    chip.classList.toggle("is-on", on);
    chip.setAttribute("aria-pressed", on);
  },

  save() {
    const el = this.form.elements;
    const nome = el.nome.value.trim();
    if (!nome) return;

    const produto = {
      id: this.editingId || "p" + Date.now(),
      nome,
      preco: parseFloat(el.preco.value.replace(",", ".")) || 0,
      genero: el.genero.value,
      tipo: el.tipo.value,
      img: el.img.value.trim() || T7.IMAGES[0],
      descricao: el.descricao.value.trim(),
      tamanhos: el.tamanhos.value.split(",").map((t) => t.trim()).filter(Boolean),
      destaques: $$(".chip.is-on", this.form).map((chip) => chip.dataset.key),
    };

    const { products } = T7.store.state;
    this.close();
    T7.store.set({
      products: this.editingId ? products.map((p) => (p.id === produto.id ? produto : p)) : [produto, ...products],
    });
  },
};

Object.assign(T7.actions, {
  "add-product": () => T7.ProdutoForm.open(),
  "edit-product": (el) => T7.ProdutoForm.open(T7.store.byId(el.dataset.id)),
  "close-form": () => T7.ProdutoForm.close(),
  "pick-form-img": (el) => T7.ProdutoForm.setImage(el.dataset.img),
  "toggle-chip": (el) => T7.ProdutoForm.setChip(el, !el.classList.contains("is-on")),
});
