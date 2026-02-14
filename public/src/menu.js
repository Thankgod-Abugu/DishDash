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

// 7.0 opens/closes the cart sidebar and displays overlay, called from the html
function toggleCartSideBar() {
    cartSideBar.classList.toggle("toggle-display");
    pageOverlay.classList.toggle("overlay-active");

    // check for overflow and allow
    if (cartSideBar.classList.contains("toggle-display")) {
        document.body.style.overflow = "hidden";
        // isCartEmpty();
    } else {
        document.body.style.overflow = "auto";
    }
}

// 2.1 fn to add dishes to HTML
const addDishesToHTML = () => {
    // cleared containers before adding dishes, incase dishes are updated or new dishes were added
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

            // Logical routing to containers based on JSON categories
            if (dish.category === "local" && localList)
                localList.appendChild(newDish);
            else if (dish.category === "foreign" && foreignList)
                foreignList.appendChild(newDish);
            else if (dish.category === "dessert" && dessertList)
                dessertList.appendChild(newDish);
        });
    }
};

// 4.2 processed add to cart when user clicks "add-to-cart" btn
const handleAddToCartClick = (event) => {
    if (event.target.classList.contains("add-to-cart-btn")) {
        // variable dish_id is declared and given a value of the dataset.id of its container/food
        let dish_id = event.target.closest(".dish").dataset.id;
        // 5.0 called add to cart fn and passes the dish_id
        addToCart(dish_id);
    }
};

// 5.1 fn to add dishes to cart
const addToCart = (dish_id) => {
    let positionThisDishInCart = carts.findIndex((value) => value.dish_id == dish_id,);
    if (carts.length <= 0) {
        carts = [{
            dish_id: dish_id,
            quantity: 1
        }];
    } else if (positionThisDishInCart < 0) {
        carts.push({
            dish_id: dish_id,
            quantity: 1
        });
    } else {
        carts[positionThisDishInCart].quantity += 1;
    }
    // 6.0 called this fn to add cart to html
    addCartToHTML();
};

// 6.1 fn to display cart items visibly in the HTML cart
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
            // added a data set to each food item based on its id from json
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
    // 6.2 called this fn to check if cart is empty and if so display error message
    isCartEmpty();
};

// 10.1 function to get total price
const getTotalPrice = () => {
    let total = 0;
    carts.forEach((cart) => {
        let dish = dishes.find((d) => d.id == cart.dish_id);
        if (dish) total += dish.price * cart.quantity;
    });
    return total;
};

// 9.0 checkout and success message logic
if (checkoutBtn) {
    // 9.1 listened for event of "checkoutBtn" click and run arrow fn
    checkoutBtn.addEventListener("click", () => {
        // 10.0 assigned "getTotalPrice" fn to "totalPrice"
        let totalPrice = getTotalPrice();
        let formattedPrice = totalPrice.toLocaleString();
        // 10.2 display chechout
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
        // 10.3 as it sends the checkout it closes the cart side bar
        toggleCartSideBar();

        checkoutOverlay.classList.add("checkout-overlay-active");

        const form = document.getElementById("checkout-form");
        const checkoutCover = document.querySelector(".checkout-cover");
        // 10.4 listen for form submit
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const payBtn = document.getElementById("pay-btn");
            payBtn.value = "Processing...";
            payBtn.disabled = true;

            // 10.5 Collect Data (excluding card info as requested)
            const orderData = {
                full_name: form.elements[0].value,
                phone_number: form.elements[1].value,
                location: form.elements[2].value,
                // 10.6 Map the IDs to Names so the DB shows actual food names
                carts: carts.map(cartItem => {
                    const dish = dishes.find(d => d.id == cartItem.dish_id);
                    return {
                        name: dish ? dish.name : "Unknown Dish",
                        quantity: cartItem.quantity,
                        price_each: dish ? dish.price : 0
                    };
                }),
                total_price: getTotalPrice()
            };

            // 10.6 Send to Node.js Server
            fetch('/place-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            })
                .then(response => response.json())
                .then(data => {
                    checkoutCover.innerHTML = `
                    <div class="success-message" style="text-align: center; padding: 20px;">
                        <div style="font-size: 50px; margin-bottom: 10px;">✅</div>
                        <h2><b>Payment Received!</b></h2>
                        <p><b>Your order is on its way!</b></p>
                    </div>`;

                    setTimeout(() => { location.reload(); }, 4000);
                })
                .catch(err => {
                    console.error("Error:", err);
                    alert("Something went wrong with the order.");
                    payBtn.disabled = false;
                    payBtn.value = "Retry Payment";
                });
        });
    });
}

// 11.0 function to close checkout
function closeCheckout() {
    if (checkoutOverlay)
        checkoutOverlay.classList.remove("checkout-overlay-active");
}

// 8.0 plus and minus logic to check button type clicked, plus or minus and pass dish_id and type
if (listCart_HTML) {
    listCart_HTML.addEventListener("click", (event) => {
        let positionClicked = event.target;
        if (positionClicked.classList.contains("minus") || positionClicked.classList.contains("plus")) {
            let dish_id = positionClicked.parentElement.parentElement.dataset.id;
            let type = positionClicked.classList.contains("plus") ? "plus" : "minus";
            // 8.1 called this fn, passing dish_id and type(plus or minus)
            changeQuantity(dish_id, type);
        }
    });
}

// 8.2 function to increase or decrease the quantity of a dish or remove it from cart
const changeQuantity = (dish_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.dish_id == dish_id);
    if (positionItemInCart >= 0) {
        if (type === "plus") {
            carts[positionItemInCart].quantity += 1;
        } else {
            let valueChange = carts[positionItemInCart].quantity - 1;
            if (valueChange > 0) {
                carts[positionItemInCart].quantity = valueChange;
            } else {
                carts.splice(positionItemInCart, 1);
            }
        }
    }
    //8.3 calling this function to add/update cart visibly in html
    addCartToHTML();
};

// 4.0 listened for click of "add-to-cart-btn" depending on category of dish
// 4.1 called handleAddToCartClick
if (localList) localList.addEventListener("click", handleAddToCartClick);
if (foreignList) foreignList.addEventListener("click", handleAddToCartClick);
if (dessertList) dessertList.addEventListener("click", handleAddToCartClick);

// 1.1 function to get dishes from json
const getDishes = () => {
    fetch("dish_db.json")
        .then((response) => response.json())
        .then((data) => {
            dishes = data;
            // 2.0 called this fn to add dishes retreived from json to html
            addDishesToHTML();
        });
    // 3.0 called this fn to check if cart is empty and if so display error message
    isCartEmpty();
};

// 3.1 function to check if cart is empty and display error message if so
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
// 1.0 called this fn onload of the page to get dishes from json
getDishes();
