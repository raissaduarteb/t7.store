// Funções de apoio usadas por todos os componentes.
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

T7.utils = {
  // Escapa texto digitado pelo usuário antes de inseri-lo no HTML.
  esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  },

  preco(n) {
    return "R$ " + Number(n || 0).toFixed(2).replace(".", ",");
  },

  pecas(n) {
    return n + (n === 1 ? " peça" : " peças");
  },

  icon(name, extra = "") {
    return `<svg class="icon ${extra}" aria-hidden="true"><use href="#i-${name}" /></svg>`;
  },

  // Só toca no DOM quando o HTML muda: preserva a rolagem dos carrosséis
  // e evita repetir animações. Retorna true se houve atualização.
  setHTML(el, html) {
    if (el._html === html) return false;
    el.innerHTML = el._html = html;
    return true;
  },

  whatsapp(texto) {
    return "https://wa.me/" + T7.CONFIG.whatsapp + (texto ? "?text=" + encodeURIComponent(texto) : "");
  },

  read(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  },

  write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  },
};
