// Ponto de entrada: liga os componentes, os eventos globais e o render.

// Redesenha a tela a partir do estado. Chamado por T7.store.set().
T7.render = () => {
  const { mode } = T7.store.state;
  $("#view-cliente").hidden = mode !== "cliente";
  $("#view-login").hidden = mode !== "login";
  $("#view-admin").hidden = mode !== "admin";

  T7.Header.render();
  T7.Hero.render();
  T7.Catalogo.render();
  T7.ProdutoModal.render();
  T7.Admin.render();
  T7.syncFavs();
  T7.syncScrollLock();
};

// Trava a rolagem da página enquanto houver um modal ou menu aberto.
T7.syncScrollLock = () => {
  document.body.classList.toggle("no-scroll", $$(".overlay:not([hidden])").some((el) => el.getClientRects().length > 0));
};

// Um único listener de clique para a página toda:
// data-action="nome" chama T7.actions[nome]; clicar no fundo escuro
// de um modal (data-overlay="nome") chama a ação de fechar.
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (el) T7.actions[el.dataset.action]?.(el, e);
  else if (e.target.dataset.overlay) T7.actions[e.target.dataset.overlay]();
});

document.addEventListener("keydown", (e) => {
  // Cards são <article role="button">: Enter funciona como clique.
  if (e.key === "Enter" && e.target.matches('[role="button"]')) e.target.click();

  if (e.key !== "Escape") return;
  const { selectedId, menuOpen } = T7.store.state;
  if (T7.ProdutoForm.isOpen()) T7.ProdutoForm.close();
  else if (selectedId) T7.actions["close-product"]();
  else if (menuOpen) T7.actions["close-menu"]();
});

// Dados da loja no HTML: textos (data-config) e links do WhatsApp.
$$("[data-config]").forEach((el) => (el.textContent = T7.CONFIG[el.dataset.config]));
$$("[data-whatsapp]").forEach((a) => (a.href = T7.utils.whatsapp()));

T7.store.load();
[T7.Header, T7.Hero, T7.Catalogo, T7.AdminLogin, T7.Admin, T7.ProdutoForm].forEach((c) => c.init());
T7.render();
