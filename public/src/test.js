// SELECTORS (Grab elements at the very top)
let cartCount = document.querySelector(".cart-count");
let cartSideBar = document.querySelector(".cart-side-bar");
let pageOverlay = document.querySelector(".page-overlay");
let cartErrMsg = document.querySelector(".cart-err-msg");

let listDishes = document.querySelector(".list-dishes");
let dishes = [];
// const shoppedItemsContainer = document.querySelector(
//   ".shopped-items-container",
// );

// check if cart is empty and display error message
function isCartEmpty() {
    const currentCount = parseInt(cartCount.textContent);

    if (currentCount === 0) {
        cartErrMsg.textContent = "No items added to cart...";
        // shoppedItemsContainer.style.display = "none";
    } else {
        cartErrMsg.textContent = "";
        // shoppedItemsContainer.style.display = "block";
    }
}

// Opens/Closes the cart sidebar and displays overlay
function toggleCartSideBar() {
    cartSideBar.classList.toggle("toggle-display");
    pageOverlay.classList.toggle("overlay-active");

    if (cartSideBar.classList.contains("toggle-display")) {
        document.body.style.overflow = "hidden";
        // Check if empty every time the cart is opened
        isCartEmpty();
    } else {
        document.body.style.overflow = "auto";
    }
}

// Handles clicking "Add to Cart"
function addToCart() {
    // INCREMENTING CART ICON NUMBER
    let newCartCount = parseInt(cartCount.textContent) + 1;
    cartCount.textContent = newCartCount;
    // Check if empty every time an item is added to cart to remove text "No items added to cart..."
    isCartEmpty();
}

// addDishesToHTML fn
const addDishesToHTML = () => {
    listDishes.innerHTML = "";

    if (dishes.length > 0) {
        dishes.forEach(dish => {
            let newDish = document.createElement("div");
            newDish.classList.add("dish");
            newDish.innerHTML = `
                <img class="dish-img" src=${dish.image} alt="" />
                <div class="dish-details">
                    <p class="dish-name">${dish.name}</p>
                    <p class="dish-price">&#8358;${dish.price}</p>
                    <button class="add-to-cart-btn" onclick="addToCart()">
                        add to cart
                    </button>
                </div>`;
            listDishes.appendChild(newDish);
        });
    }
};

// getDishes fn
const getDishes = () => {
    // get data from dishes.json
    fetch("/dishes.json")
        .then((response) => response.json())
        .then((data) => {
            dishes = data;
            // console.log(dishes);
            // calling this fn to add the dishes to the html
            addDishesToHTML();
        });
};

getDishes();
// 3. INITIALIZATION (Run once when page loads)
isCartEmpty();



// SELECTORS (Grab elements at the very top)
let cartCount = document.querySelector(".cart-count");
let cartSideBar = document.querySelector(".cart-side-bar");
let pageOverlay = document.querySelector(".page-overlay");
let cartErrMsg = document.querySelector(".cart-err-msg");

let listDishes = document.querySelector(".list-dishes");
let dishes = [];
// const shoppedItemsContainer = document.querySelector(
//   ".shopped-items-container",
// );

// check if cart is empty and display error message
function isCartEmpty() {
    const currentCount = parseInt(cartCount.textContent);

    if (currentCount === 0) {
        cartErrMsg.textContent = "No items added to cart...";
        // shoppedItemsContainer.style.display = "none";
    } else {
        cartErrMsg.textContent = "";
        // shoppedItemsContainer.style.display = "block";
    }
}

// Opens/Closes the cart sidebar and displays overlay
function toggleCartSideBar() {
    cartSideBar.classList.toggle("toggle-display");
    pageOverlay.classList.toggle("overlay-active");

    if (cartSideBar.classList.contains("toggle-display")) {
        document.body.style.overflow = "hidden";
        // Check if empty every time the cart is opened
        isCartEmpty();
    } else {
        document.body.style.overflow = "auto";
    }
}

// Handles clicking "Add to Cart"
function addToCart() {

    let newCartCount = parseInt(cartCount.textContent) + 1;
    cartCount.textContent = newCartCount;
    // Check if empty every time an item is added to cart to remove text "No items added to cart..."
    isCartEmpty();
}

// addDishesToHTML fn
const addDishesToHTML = () => {
    listDishes.innerHTML = "";

    if (dishes.length > 0) {
        dishes.forEach(dish => {
            let newDish = document.createElement("div");
            newDish.classList.add("dish");
            newDish.innerHTML = `
                <img class="dish-img" src=${dish.image} alt="" />
                <div class="dish-details">
                    <p class="dish-name">${dish.name}</p>
                    <p class="dish-price">&#8358;${dish.price}</p>
                    <button class="add-to-cart-btn" onclick="addToCart()">
                        add to cart
                    </button>
                </div>`;
            listDishes.appendChild(newDish);
        });
    }
};

// getDishes fn
const getDishes = () => {
    // get data from dishes.json
    fetch("dishes.json")
        .then((response) => response.json())
        .then((data) => {
            dishes = data;
            // console.log(dishes);
            // calling this fn to add the dishes to the html
            addDishesToHTML();
        });
};

getDishes();
// 3. INITIALIZATION (Run once when page loads)
isCartEmpty();




// SELECTORS
let cartSideBar = document.querySelector(".cart-side-bar");
let pageOverlay = document.querySelector(".page-overlay");

// let cartCount = document.querySelector(".cart-count");
let cartErrMsg = document.querySelector(".cart-err-msg");
let checkOutContainer = document.querySelector(".checkout-btn-container");

// Category Specific Containers
let localList = document.querySelector("#local-list");
let foreignList = document.querySelector("#foreign-list");
let dessertList = document.querySelector("#dessert-list");
// general Containers
// let listDishes_HTML = document.querySelector(".list-dishes");
let listCart_HTML = document.querySelector(".list-cart-items");
let cartIconSpan = document.querySelector(".cart-icon span");

let dishes = [];
let carts = [];

// Opens/Closes the cart sidebar and displays overlay
function toggleCartSideBar() {
    cartSideBar.classList.toggle("toggle-display");
    pageOverlay.classList.toggle("overlay-active");
    if (cartSideBar.classList.contains("toggle-display")) {
        document.body.style.overflow = "hidden";
        // isCartEmpty();
    } else {
        document.body.style.overflow = "auto";
    }
}

// addDishesToHTML fn
const addDishesToHTML = () => {
    // Clear containers before adding, incase !!!
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
                    <button class="add-to-cart-btn">
                        add to cart
                    </button>
                </div>`;

            // Logical routing to containers based on your JSON categories
            if (dish.category === "local" && localList) {
                localList.appendChild(newDish);
            } else if (dish.category === "foreign" && foreignList) {
                foreignList.appendChild(newDish);
            } else if (dish.category === "dessert" && dessertList) {
                dessertList.appendChild(newDish);
            }
        });
    }
}

// processing add to cart when user clicks "add-to-cart" btn
const handleAddToCartClick = (event) => {
    let positionClicked = event.target;
    if (positionClicked.classList.contains("add-to-cart-btn")) {
        let dish_id = positionClicked.closest(".dish").dataset.id;
        addToCart(dish_id);
    }
}

// addToCart fn
const addToCart = (dish_id) => {
    let positionThisDishInCart = carts.findIndex((value) => value.dish_id == dish_id,);
    if (carts.length <= 0) {
        carts = [
            {
                dish_id: dish_id,
                quantity: 1,
            },
        ];
    } else if (positionThisDishInCart < 0) {
        carts.push({
            dish_id: dish_id,
            quantity: 1
        });
    } else {
        carts[positionThisDishInCart].quantity = carts[positionThisDishInCart].quantity + 1;
    }
    // console.log(carts);
    addCartToHTML();
    // addCartToMemory();
}
// const addCartToMemory = () => {
//     localStorage.setItem("cart", JSON.stringify(carts));
// }

const addCartToHTML = () => {
    listCart_HTML.innerHTML = "";
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement("div");
            newCart.classList.add("cart-item");
            newCart.dataset.id = cart.dish_id;
            let positionProduct = dishes.findIndex((value) => value.id == cart.dish_id);
            let info = dishes[positionProduct];
            // 
            newCart.innerHTML = `
                <div class="cart-item-details">
                    <img class="cart-item-img" src="${info.image}" alt="" />
                    <!-- name and price -->
                    <div class="name-and-price">
                        <p class="dish-name">${info.name}</p>
                        <p class="dish-price">&#8358;${info.price * cart.quantity}.00</p>
                    </div>
                </div>
                <!-- quantity -->
                <div class="quantity">
                    <span class="minus">-</span>
                    <span class="number">${cart.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;
            listCart_HTML.appendChild(newCart);
        })
    }
    cartIconSpan.innerText = totalQuantity;
    isCartEmpty();
}
listCart_HTML.addEventListener("click", (event) => {
    let positionClicked = event.target;
    if (positionClicked.classList.contains("minus") || positionClicked.classList.contains("plus")) {
        let dish_id = positionClicked.parentElement.parentElement.dataset.id;
        // console.log(dish_id);
        let type = "minus";
        if (positionClicked.classList.contains("plus")) {
            type = "plus";
        }
        changeQuantity(dish_id, type);
    }
})
const changeQuantity = (dish_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.dish_id == dish_id);
    if (positionItemInCart >= 0) {
        switch (type) {
            case "plus":
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;

            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                } else {
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
}

// Apply the same function to all three
localList.addEventListener("click", handleAddToCartClick);
foreignList.addEventListener("click", handleAddToCartClick);
dessertList.addEventListener("click", handleAddToCartClick);

// getDishes fn
const getDishes = () => {
    // Using relative path for better server compatibility
    // get data from dishes.json
    fetch("dishes.json")
        .then((response) => response.json())
        .then((data) => {
            dishes = data;
            // console.log(dishes);
            // calling this fn to add the dishes to the html
            addDishesToHTML();

            // get cart from memory
            // if(localStorage.getItem("cart")) {
            //     carts = JSON.parse(localStorage.getItem("cart"));
            //     addCartToHTML();
            // }
        });

    isCartEmpty();
}

// check if cart is empty
function isCartEmpty() {
    // const currentCount = parseInt(cartCount.textContent);
    if (carts.length === 0) {
        cartErrMsg.textContent = "cart is empty...";
        checkOutContainer.style.display = "none";
    } else {
        cartErrMsg.textContent = "";
        checkOutContainer.style.display = "block";
    }
}

// 3. INITIALIZATION (Run once when page loads)
getDishes();
isCartEmpty();
