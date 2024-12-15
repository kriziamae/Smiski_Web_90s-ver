import PROD_LIST from './products.js';

const PROD_JSON = JSON.parse(PROD_LIST);  

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/* PRODUCT DETAILS */
function getUrlParameter(param){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param)
}

const productID = getUrlParameter('id');

// Find the product based on the ID.
const product = PROD_JSON.find(p => p.id == parseInt(productID));


if (product){
    const productContainer = document.getElementById("product-detail-container");
    productContainer.innerHTML = `
        <div class="product-main-details">
            <img class="prod-detail-img" src="${product.img}" alt="${product.name}">
            <div class="product-info">
                <div class="prod-info">
                    <h1 class="prod-name">${product.name}</h1>
                    <p class="prod-descript">${product.description}</p>
                </div>
                <div class="prod-purchase-info">
                    <h2 class="prod-price">$${product.price}</h2>
                    <button type="button" class="prod-btn" id="buy-button">BUY</button>
                </div>
            </div> 
        </div>
    `;

    const buyButton = document.getElementById("buy-button");
    buyButton.addEventListener("click", function() {
        addToCart(product.id); 
    });

} else { 
    const productContainer = document.getElementById("product-detail-container");
    productContainer.innerHTML = '<h2>Product is not found.</h2>';
}

// Add product to the shopping cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Cart checker (to see if item is in cart)
    const productInCart = cart.find(item => item.id === productId);

    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        const productToAdd = PROD_JSON.find(p => p.id === productId);
        cart.push({ ...productToAdd, quantity: 1 });
    }

    // Update new cart in localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
}
