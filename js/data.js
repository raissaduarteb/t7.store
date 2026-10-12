// Configuração da loja e dados iniciais do catálogo.
// `T7` é o único nome global do projeto: cada arquivo acrescenta a sua parte.
const T7 = {
  actions: {}, // handlers de clique, registrados pelos componentes (data-action="nome")

  CONFIG: {
    nome: "T7 Store",
    endereco: "Av. José de Borba Vasconcelos, 20 — Centro, Pentecoste - CE",
    telefone: "(85) 9 9999-9999",
    whatsapp: "5585999999999",
    instagram: "@t7store",
    mostrarPreco: true,
    // Login de demonstração: fica visível no código, não protege dados reais.
    adminEmail: "admin@t7store.com",
    adminSenha: "t7store",
  },

  GENEROS: ["Masculino", "Feminino", "Unissex"],
  TIPOS: ["Camisetas", "Calças", "Bermudas", "Saias", "Calçados", "Bonés", "Bolsas", "Relógios", "Perfumes"],
  DESTAQUES: [
    { key: "mais-vendidos", label: "Mais vendidos" },
    { key: "novidades", label: "Novidades" },
    { key: "lancamentos", label: "Lançamento" },
  ],

  IMAGES: [
    "assets/p-camisa-branca.png",
    "assets/p-polo-caramelo.png",
    "assets/p-bone.png",
    "assets/p-saia-cargo.png",
    "assets/p-camiseta-verde.png",
    "assets/p-camiseta-marrom.png",
    "assets/p-bermuda.png",
    "assets/p-look-1.png",
    "assets/p-look-2.png",
    "assets/p-look-3.png",
    "assets/p-look-4.png",
  ],

  HERO: [
    { img: "assets/p-look-2.png", eyebrow: "Coleção Cartoon 2.0", title: "Lançamento que veste atitude", sub: "Peças exclusivas Baruk Brand acabaram de chegar na T7 Store.", cta: "Ver lançamentos" },
    { img: "assets/p-look-1.png", eyebrow: "Moda masculina e feminina", title: "Seu estilo começa aqui", sub: "Descubra as novidades da estação no centro de Pentecoste.", cta: "Explorar novidades" },
  ],

  SEED: [
    { id: "p1", nome: "Camiseta Basic Branca", preco: 99.9, genero: "Masculino", tipo: "Camisetas", img: "assets/p-camisa-branca.png", descricao: "Camiseta básica em algodão premium, corte regular e toque macio. Peça coringa para o dia a dia.", tamanhos: ["P", "M", "G", "GG"], destaques: ["mais-vendidos"] },
    { id: "p2", nome: "Polo Baruk Caramelo", preco: 129.9, genero: "Masculino", tipo: "Camisetas", img: "assets/p-polo-caramelo.png", descricao: "Camisa polo em piquê com acabamento diferenciado e gola estruturada.", tamanhos: ["P", "M", "G", "GG"], destaques: ["mais-vendidos"] },
    { id: "p3", nome: "Boné Lucky Angel", preco: 79.9, genero: "Unissex", tipo: "Bonés", img: "assets/p-bone.png", descricao: "Boné aba curva com logo bordado. Ajuste traseiro para caimento perfeito.", tamanhos: ["Único"], destaques: ["mais-vendidos", "novidades"] },
    { id: "p4", nome: "Saia Cargo Baruk", preco: 139.9, genero: "Feminino", tipo: "Saias", img: "assets/p-saia-cargo.png", descricao: "Saia cargo em sarja com bolsos utilitários. Streetwear com atitude.", tamanhos: ["36", "38", "40", "42"], destaques: ["mais-vendidos"] },
    { id: "p5", nome: "Camiseta Coleção Cartoon", preco: 99.9, genero: "Masculino", tipo: "Camisetas", img: "assets/p-camiseta-verde.png", descricao: "Estampa exclusiva da Coleção Cartoon 2.0 em malha de alta gramatura.", tamanhos: ["P", "M", "G", "GG"], destaques: ["novidades", "lancamentos"] },
    { id: "p6", nome: "Camiseta Urban Style Marrom", preco: 99.9, genero: "Masculino", tipo: "Camisetas", img: "assets/p-camiseta-marrom.png", descricao: "Modelagem oversized com toque premium. Coleção Urban Style.", tamanhos: ["P", "M", "G", "GG"], destaques: ["novidades", "lancamentos"] },
    { id: "p7", nome: "Bermuda Baruk Urban Style", preco: 119.9, genero: "Masculino", tipo: "Bermudas", img: "assets/p-bermuda.png", descricao: "Bermuda cargo com bolsos laterais e cordão ajustável. Conforto e estilo.", tamanhos: ["38", "40", "42", "44"], destaques: ["novidades"] },
    { id: "p8", nome: "Look Street Feminino", preco: 149.9, genero: "Feminino", tipo: "Camisetas", img: "assets/p-look-1.png", descricao: "Conjunto casual feminino com pegada urbana e caimento moderno.", tamanhos: ["P", "M", "G"], destaques: ["novidades"] },
    { id: "p9", nome: "Conjunto Urban Preto", preco: 189.9, genero: "Masculino", tipo: "Camisetas", img: "assets/p-look-2.png", descricao: "Conjunto completo em preto com identidade streetwear. Edição limitada.", tamanhos: ["P", "M", "G", "GG"], destaques: ["lancamentos"] },
    { id: "p10", nome: "Camiseta Oversized Baruk", preco: 89.9, genero: "Masculino", tipo: "Camisetas", img: "assets/p-look-3.png", descricao: "Camiseta oversized com estampa costas e caimento amplo.", tamanhos: ["M", "G", "GG"], destaques: ["novidades", "lancamentos"] },
    { id: "p11", nome: "Look Casual Baruk", preco: 159.9, genero: "Masculino", tipo: "Camisetas", img: "assets/p-look-4.png", descricao: "Look casual completo com peças combinando. Pronto para usar.", tamanhos: ["P", "M", "G", "GG"], destaques: [] },
  ],
};

// Filtros do menu: página inicial, gêneros e todos os tipos de peça.
T7.FILTROS = ["Destaques", "Masculino", "Feminino", ...T7.TIPOS];
