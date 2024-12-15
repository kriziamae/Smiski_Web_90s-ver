import PROD_LIST from './products.js';

const PROD_JSON = JSON.parse(PROD_LIST);  

/* -------- RUN ONLY ON SPECIFIC PAGES CMD -------- */
document.addEventListener("DOMContentLoaded", () => {
    const pageType = document.documentElement.getAttribute('data-page');  // Get the value of 'data-page'

    if (pageType === 'products') {
        addProductsToPage(PROD_JSON);
    } else if (pageType === 'landing') {
        addWhatsHotToPage(PROD_JSON);
    } else if (pageType === 'cart') {
        displayCartItems();
    }
});

/* -------- ADD PRODUCTS INTO PAGE -------- */
const productContainer = document.getElementById("products-container");

function addProductsToPage(PROD_JSON) {
    let prodHTML = '';

    if (Array.isArray(PROD_JSON) && PROD_JSON.length > 0) {
        for (let element of PROD_JSON) {
            prodHTML += `
            <div class="prod-card">
                <a href="product_detail.html?id=${element.id}">
                    <img class="prod-img" src="${element.img}" alt="${element.name}">
                    <h1>${element.name}</h1>
                    <h2>$${element.price}</h2>
                </a>
            </div>
            `;
        }
        productContainer.innerHTML = prodHTML; 
    } else {
        console.log("No products available or failed to load product data.");
    }
}

/* -------- ADD ONLY 3 PRODUCTS INTO PAGE -------- */
const whatsHotContainer = document.getElementById("whats-hot-content-container");

function addWhatsHotToPage(PROD_JSON) {
    let whatsHotHTML = '';

    // Limit to only 3 products by slicing the array
    const limitedProducts = PROD_JSON.slice(0, 3);  // Get only the first 3 products

    if (Array.isArray(limitedProducts) && limitedProducts.length > 0) {
        for (let element of limitedProducts) {
            whatsHotHTML += `
            <div class="hot-card">
                <a href="product_detail.html?id=${element.id}"><img class="hot-img" src="${element.img}" alt="${element.name}"></a>
                <a href="product_detail.html?id=${element.id}"><h2>${element.name}</h2></a>
            </div>
            `;
        }
        whatsHotContainer.innerHTML = whatsHotHTML; 
    } else {
        console.log("No products available or failed to load product data.");
    }
}

/* -------- ADD TO CART FUNCTION -------- */
function addToCart(event) {
    const productId = event.target.getAttribute('data-id');
    const product = PROD_JSON.find(item => item.id === productId);
    
    if (product) {
        cartItems.push(product);
        alert(`${product.name} added to your cart!`);
        updateCartDisplay();
    }
}

/* -------- UPDATE CART DISPLAY FUNCTION -------- */
function updateCartDisplay() {
    const cartItemCount = document.getElementById('cart-item-count');
    const cartContainer = document.getElementById('cart-items');

    // Update cart item count
    cartItemCount.textContent = cartItems.length;

    // Clear the cart container
    cartContainer.innerHTML = '';

    // Show the cart items
    cartItems.forEach(item => {
        const cartItemHTML = `
            <div class="cart-item">
                <img class="cart-item-img" src="${item.img}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                    <button class="remove-from-cart" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        cartContainer.innerHTML += cartItemHTML;
    });

    // Attach event listeners to Remove buttons
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

/* -------- REMOVE FROM CART FUNCTION -------- */
function removeFromCart(event) {
    const productId = event.target.getAttribute('data-id');
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCartDisplay();
}

/* -------- DISPLAY CART ITEMS -------- */
function displayCartItems() {
    const cartContainer = document.getElementById('cart-items');
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
    } else {
        updateCartDisplay();
    }
}