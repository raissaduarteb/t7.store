// Tela de login do painel administrativo.
T7.AdminLogin = {
  init() {
    $("#login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const { email, senha } = e.target.elements;
      const ok = email.value.trim().toLowerCase() === T7.CONFIG.adminEmail && senha.value === T7.CONFIG.adminSenha;
      $("#login-erro").hidden = ok;
      if (ok) T7.store.set({ mode: "admin" });
    });
  },
};

Object.assign(T7.actions, {
  "go-admin-login": () => {
    $("#login-form").reset();
    $("#login-erro").hidden = true;
    T7.store.set({ mode: "login", menuOpen: false, selectedId: null });
    $("#login-form").elements.email.focus();
  },
  "go-cliente": () => T7.store.set({ mode: "cliente" }),
});
