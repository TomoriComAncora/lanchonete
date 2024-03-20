const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const adressInput = document.getElementById("adress");
const adressWarn = document.getElementById("adress-warn");

// carrinho começando sozinho
const cart = [];

// Abrir modal do carrinho
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "flex";
});

// Fechar modal do carrinho clicando fora
cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
  }
});

// Fechar modal do carrinho clicando no botão "fechar"
closeModalBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// Pegar onde foi clicado
menu.addEventListener("click", (e) => {
  let parentButton = e.target.closest(".add-cart-btn");

  if (parentButton) {
    let name = parentButton.getAttribute("data-name");
    let price = parseFloat(parentButton.getAttribute("data-price"));

    // Adicionar ao carrinho
    addToCart(name, price);
  }
});

// Função adicionar ao carrinho
const addToCart = (name, price) => {
  // verificando se existe um item repetido
  const existItem = cart.find((item) => item.name === name);

  // Se exite adiciona mais 1 em quantidade do item
  if (existItem) {
    existItem.qntd += 1;
  } else {
    // Adiciona itens novos
    cart.push({
      name,
      price,
      qntd: 1,
    });
  }

  updateCartModal();
};

const updateCartModal = () => {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.map((item) => {
    const cartItemsElement = document.createElement("div");

    cartItemsElement.innerHTML = `
        <div>
            <div>
                <p>${item.name}</p>
                <p>${item.qntd}</p>
                <p>R$ ${item.price}</p>
            </div>
            <div>
                <button>Remover</button>
            </div>
        </div>
    `

    cartItemsContainer.appendChild(cartItemsElement);

  });
};
