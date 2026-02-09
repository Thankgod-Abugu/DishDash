

1. SYSTEM PLANNING:
    1. Planned to build a food delivery web application.

2. SYSTEM ANALYSIS:
    1. Anaylised the web app requirements/resources and tools needed for implementation.

3. SYSTEM DESIGN:
    1. Design a sketch for the web app with the results from the analysis.

4. SYSTEM IMPLEMENTATION:
    1. Started implementation of design created with tools needed for implementation.

5. SYSTEM TESTING/DEBUGGING:
    1.  

6. SYSTEM DEPLOYMENT/DOCUMENTATION:
    1. 

7. SYSTEM MAINTENANCE:
    1. 



let cartSideBar = document.querySelector(".cart-side-bar");
let pageOverlay = document.querySelector(".page-overlay");
let cartErrMsg = document.querySelector(".cart-err-msg");
let checkOutContainer = document.querySelector(".checkout-btn-container");
let localList = document.querySelector("#local-list");
let foreignList = document.querySelector("#foreign-list");
let dessertList = document.querySelector("#dessert-list");
let listCart_HTML = document.querySelector(".list-cart-items");
let cartIconSpan = document.querySelector(".cart-icon span");
let checkoutOverlay = document.querySelector(".checkout-overlay");
let checkoutBtn = document.querySelector("#open-checkout");

let dishes = [];
let carts = [];

function toggleCartSideBar() {
  if (!cartSideBar || !pageOverlay) return;
  cartSideBar.classList.toggle("toggle-display");
  pageOverlay.classList.toggle("overlay-active");
  document.body.style.overflow = cartSideBar.classList.contains(
    "toggle-display",
  )
    ? "hidden"
    : "auto";
}

const addDishesToHTML = () => {
  if (localList) localList.innerHTML = "";
  if (foreignList) foreignList.innerHTML = "";
  if (dessertList) dessertList.innerHTML = "";

  if (dishes.length > 0) {
    dishes.forEach((dish) => {
      let newDish = document.createElement("div");
      newDish.classList.add("dish");
      newDish.dataset.id = dish.id;
      newDish.innerHTML = `
                <img class="dish-img" src="${dish.image}" alt="${dish.name}" />
                <div class="dish-details">
                    <p class="dish-name">${dish.name}</p>
                    <p class="dish-price">&#8358;${dish.price.toLocaleString()}.00</p>
                    <button class="add-to-cart-btn">add to cart</button>
                </div>`;

      if (dish.category === "local" && localList)
        localList.appendChild(newDish);
      else if (dish.category === "foreign" && foreignList)
        foreignList.appendChild(newDish);
      else if (dish.category === "dessert" && dessertList)
        dessertList.appendChild(newDish);
    });
  }
};

const handleAddToCartClick = (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    let dish_id = event.target.closest(".dish").dataset.id;
    addToCart(dish_id);
  }
};

const addToCart = (dish_id) => {
  let positionThisDishInCart = carts.findIndex(
    (value) => value.dish_id == dish_id,
  );
  if (carts.length <= 0) {
    carts = [{ dish_id: dish_id, quantity: 1 }];
  } else if (positionThisDishInCart < 0) {
    carts.push({ dish_id: dish_id, quantity: 1 });
  } else {
    carts[positionThisDishInCart].quantity += 1;
  }
  addCartToHTML();
};

const addCartToHTML = () => {
  if (!listCart_HTML) return;
  listCart_HTML.innerHTML = "";
  let totalQuantity = 0;

  carts.forEach((cart) => {
    totalQuantity += cart.quantity;
    let positionProduct = dishes.findIndex((value) => value.id == cart.dish_id);
    let info = dishes[positionProduct];
    if (info) {
      let newCart = document.createElement("div");
      newCart.classList.add("cart-item");
      newCart.dataset.id = cart.dish_id;
      newCart.innerHTML = `
                <div class="cart-item-details">
                    <img class="cart-item-img" src="${info.image}" alt="" />
                    <div class="name-and-price">
                        <p class="dish-name">${info.name}</p>
                        <p class="dish-price">&#8358;${(info.price * cart.quantity).toLocaleString()}.00</p>
                    </div>
                </div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span class="number">${cart.quantity}</span>
                    <span class="plus">+</span>
                </div>`;
      listCart_HTML.appendChild(newCart);
    }
  });
  if (cartIconSpan) cartIconSpan.innerText = totalQuantity;
  isCartEmpty();
};

const getTotalPrice = () => {
  let total = 0;
  carts.forEach((cart) => {
    let dish = dishes.find((d) => d.id == cart.dish_id);
    if (dish) total += dish.price * cart.quantity;
  });
  return total;
};

// CHECKOUT & SUCCESS MESSAGE LOGIC
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    let totalPrice = getTotalPrice();
    let formattedPrice = totalPrice.toLocaleString();

    checkoutOverlay.innerHTML = `
            <div class="checkout-cover">
                <button class="close-checkout" onclick="closeCheckout()">X</button>
                <div class="checkout-info">
                    <h2>Dish<span>Dash!</span> checkout</h2>
                    <P>Total Amount&nbsp;&nbsp;&nbsp;<span>&#8358;${formattedPrice}</span></P>
                </div>
                <form action="" class="form" id="checkout-form">
                    <p>Enter customer details</p>
                    <input type="text" placeholder="Enter your full name" required>
                    <input type="text" placeholder="Enter your phone number" required>
                    <input type="text" placeholder="Enter your full address" required>
                    <div class="card-title">
                        <p>Enter your card details</p>
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.4 12.6h1l-.3-1.4v-.4l-.2.4-.5 1.4Z" /><path fill-rule="evenodd" d="M2 6.3c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-12Zm12.5 3.2c.4 0 .8 0 1.1.2l-.1 1h-.1a2 2 0 0 0-1-.3c-.5 0-.7.3-.7.5s.2.3.7.5c.7.4 1 .8 1 1.3 0 1-.8 1.7-2.2 1.7-.6 0-1.1-.2-1.4-.3l.2-1h.1c.4.2.7.3 1.2.3.4 0 .8-.2.8-.5 0-.2-.2-.3-.7-.6-.5-.2-1.1-.6-1.1-1.3 0-.9 1-1.5 2.2-1.5Zm3.5 0h1l1 4.8h-1.2l-.2-.7H17l-.3.7h-1.3l1.9-4.4c.1-.3.3-.3.7-.3Zm-6.2 0h-1.3l-.8 4.8H11l.8-4.8Zm-4.5 3.3-.1-.7-.5-2.2c0-.3-.3-.3-.6-.4h-2v.1l1.2.5.1.2 1.1 4H8l2-4.7H8.7l-1.3 3.2Z" clip-rule="evenodd" /></svg>
                    </div>
                    <div class="card-number">
                        <input type="text" name="card-number" size="16" placeholder="0000 0000 0000 0000" required>
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clip-rule="evenodd" /></svg>
                    </div>
                    <div class="card-codes">
                        <input type="text" size="5" placeholder="MM/YY" required>
                        <input type="text" size="5" placeholder="cvv" required>
                    </div>
                    <input id="pay-btn" type="submit" value="Pay &#8358;${formattedPrice}" />
                </form>
            </div>`;

            toggleCartSideBar();

    checkoutOverlay.classList.add("checkout-overlay-active");

    const form = document.getElementById("checkout-form");
    const checkoutCover = document.querySelector(".checkout-cover");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const payBtn = document.getElementById("pay-btn");
      payBtn.value = "Processing...";
      payBtn.disabled = true;

      setTimeout(() => {
        checkoutCover.innerHTML = `
                    <div class="success-message">
                        <div style="font-size: 50px; margin-bottom: 10px;">✅</div>
                        <h2>Payment Received!</h2>
                        <p>pay has been receievd and order is on its way</p>
                    </div>`;
        setTimeout(() => {
          location.reload();
        }, 2500);
      }, 1500);
    });
  });
}

function closeCheckout() {
  if (checkoutOverlay)
    checkoutOverlay.classList.remove("checkout-overlay-active");
}

if (listCart_HTML) {
  listCart_HTML.addEventListener("click", (event) => {
    let positionClicked = event.target;
    if (
      positionClicked.classList.contains("minus") ||
      positionClicked.classList.contains("plus")
    ) {
      let dish_id = positionClicked.parentElement.parentElement.dataset.id;
      let type = positionClicked.classList.contains("plus") ? "plus" : "minus";
      changeQuantity(dish_id, type);
    }
  });
}

const changeQuantity = (dish_id, type) => {
  let positionItemInCart = carts.findIndex((value) => value.dish_id == dish_id);
  if (positionItemInCart >= 0) {
    if (type === "plus") {
      carts[positionItemInCart].quantity += 1;
    } else {
      let valueChange = carts[positionItemInCart].quantity - 1;
      if (valueChange > 0) carts[positionItemInCart].quantity = valueChange;
      else carts.splice(positionItemInCart, 1);
    }
  }
  addCartToHTML();
};

if (localList) localList.addEventListener("click", handleAddToCartClick);
if (foreignList) foreignList.addEventListener("click", handleAddToCartClick);
if (dessertList) dessertList.addEventListener("click", handleAddToCartClick);

const getDishes = () => {
  fetch("dishes.json")
    .then((response) => response.json())
    .then((data) => {
      dishes = data;
      addDishesToHTML();
    });
  isCartEmpty();
};

function isCartEmpty() {
  if (!cartErrMsg || !checkOutContainer) return;
  if (carts.length === 0) {
    cartErrMsg.textContent = "cart is empty...";
    checkOutContainer.style.display = "none";
  } else {
    cartErrMsg.textContent = "";
    checkOutContainer.style.display = "block";
  }
}

getDishes();
