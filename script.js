const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const adressInput = document.getElementById("adress");
const adressWarn = document.getElementById("adress-warn");
const spanItem = document.getElementById("date-span");

// carrinho começando sozinho
const cart = [];

// Abrir modal do carrinho
cartBtn.addEventListener("click", () => {
  updateCartModal();
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
  let quantidade = 0;
  cart.map((item) => {
    const cartItemsElement = document.createElement("div");
    cartItemsElement.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "flex-col"
    );

    cartItemsElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p>Qtd: ${item.qntd}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>
            <div>
                <button class="remove-btn" data-name="${
                  item.name
                }">Remover</button>
            </div>
        </div>
    `;

    total += item.qntd * item.price;
    quantidade += item.qntd;

    cartItemsContainer.appendChild(cartItemsElement);
  });

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  cartCount.innerText = quantidade;
};

// Removendo item do carrinho
cartItemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const name = e.target.getAttribute("data-name");

    removeItemCart(name);
  }
});

// Removendo item do carrinho
const removeItemCart = (name) => {
  const index = cart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const item = cart[index];
    console.log(item);
    if (item.qntd > 1) {
      item.qntd -= 1;
      updateCartModal();
      return;
    } else {
      cart.splice(index, 1);
      updateCartModal();
    }
  }
};

// Finalizando pedido
adressInput.addEventListener("input", (e) => {
  let inputValue = e.target.value;
  if (inputValue !== "") {
    console.log(inputValue);
    adressWarn.classList.add("hidden");
    adressInput.classList.remove("border-red-500");
  }
});

// verificando a finalização / Enviando pedido por whatsapp
checkoutBtn.addEventListener("click", () => {
  const isOpen = checkRestaurantOpen();
  if (!isOpen) {
    Toastify({
      text: "Ops, restaurante fechado :(",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#ef4444",
      },
    }).showToast();
    return
  }

  if (cart.length === 0) return;

  if (adressInput.value === "") {
    adressWarn.classList.remove("hidden");
    adressInput.classList.add("border-red-500");
  }

  const carItems = cart
    .map((item) => {
      return `${item.name} Quantidade: (${item.qntd}) Preço: (${item.price}) |`;
    })
    .join("");

  const message = encodeURIComponent(carItems);
  const phone = "67992791596";

  window.open(
    `https://wa.me/${phone}?text=${message} Endereço: ${adressInput.value}`,
    "_blank"
  );

  cart.length = 0;
  updateCartModal();
  adressInput.value = "";
});

// verificando se o restaurante está aberto
const checkRestaurantOpen = () => {
  const data = new Date();
  const horas = data.getHours();
  return horas >= 18 && horas < 22;
};

const isOpen = checkRestaurantOpen();

if (isOpen) {
  spanItem.classList.remove("bg-red-500");
  spanItem.classList.add("bg-green-500");
} else {
  spanItem.classList.remove("bg-green-500");
  spanItem.classList.add("bg-red-500");
}
