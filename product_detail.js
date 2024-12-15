import PROD_LIST from './products.js';

const PROD_JSON = JSON.parse(PROD_LIST);  

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/* PRODUCT DETAILS */

// Get query parameter from the URL.
function getUrlParameter(param){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param)
}

// Get product ID from the URL.
const productID = getUrlParameter('id');

// Find the product based on the ID.
const product = PROD_JSON.find(p => p.id == parseInt(productID));

// Display the product on the page.
if (product){
    const productContainer = document.getElementById("product-detail-container");
    productContainer.innerHTML += `
        <div class="product-main-details">
            <img class="prod-detail-img" src="${product.img}" alt="${product.name}">
            <div class="product-info">
                <div class="prod-info">
                    <h1 class="prod-name">${product.name}</h1>
                    <p class="prod-descript">${product.description}</p>
                </div>
                <div class="prod-purchase-info">
                    <h2 class="prod-price">$${product.price}</h2>
                    <button type="button" class="prod-btn">BUY</button>
                </div>
            </div> 
        </div>
    `;
} 
// If product is not found, shows error message.
else{ 
    const productContainer = document.getElementById("product-detail-container");
    productContainer.innerHTML = '<h2>Product is not found.</h2>';
}

