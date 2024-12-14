import PROD_LIST from './products.js';

const PROD_JSON = JSON.parse(PROD_LIST);  

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
/* ADD PRODUCTS INTO PAGE */
const productContainer = document.getElementById("products-container");

function addProductsToPage(PROD_JSON) {
    let prodHTML = '';

    if (Array.isArray(PROD_JSON) && PROD_JSON.length > 0) {
        for (let element of PROD_JSON) {
            prodHTML += `
            <div class="prod-card">
                <img class="prod-img" src="${element.img}" alt="${element.name}">
                <h1>${element.name}</h1>
                <h2>$${element.price}</h2>
            </div>
            `;
        }
        productContainer.innerHTML = prodHTML; 
    } else {
        console.log("No products available or failed to load product data.");
    }
}

addProductsToPage(PROD_JSON);

/* PRODUCT DETAILS */

function getUrlParameter(PROD_JSON){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(${element.name});
}