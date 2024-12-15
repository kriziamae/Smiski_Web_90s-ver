// Load the cart from localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalItems = document.getElementById("total-items");
    const totalPrice = document.getElementById("total-price");

    // Clear the cart items
    cartItemsContainer.innerHTML = '';

    let totalItemCount = 0;
    let totalCartPrice = 0;

    if (cart.length > 0) {
        cart.forEach(item => {
            totalItemCount += item.quantity;
            totalCartPrice += item.quantity * item.price;

            // Create the HTML for each cart item
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-price">$${item.price} x ${item.quantity}</p>
                </div>
                <button class="remove-item-btn" data-id="${item.id}">Remove</button>
            `;

            // Append the cart item to the cart container
            cartItemsContainer.appendChild(cartItemDiv);
        });
    } else {
        // If the cart is empty
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    }

    // Update the total items and price
    totalItems.textContent = totalItemCount;
    totalPrice.textContent = totalCartPrice.toFixed(2);
}

// Remove item from the cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Filter out the item with the given productId
    cart = cart.filter(item => item.id !== productId);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Event listener for the "Remove" buttons
document.addEventListener("DOMContentLoaded", () => {
    loadCart();

    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item-btn")) {
            const productId = parseInt(event.target.getAttribute("data-id"));
            removeFromCart(productId);
        }
    });
});
