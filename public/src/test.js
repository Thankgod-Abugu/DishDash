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
