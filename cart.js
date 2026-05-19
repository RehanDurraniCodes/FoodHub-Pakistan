// FoodHub Pakistan - Shopping Cart Management

class ShoppingCart {
    constructor() {
        this.items = this.loadFromStorage();
        this.favorites = this.loadFavoritesFromStorage();
    }

    // Load cart from localStorage
    loadFromStorage() {
        const stored = localStorage.getItem('foodhub_cart');
        return stored ? JSON.parse(stored) : [];
    }

    // Save cart to localStorage
    saveToStorage() {
        localStorage.setItem('foodhub_cart', JSON.stringify(this.items));
        this.updateCartUI();
    }

    // Load favorites from localStorage
    loadFavoritesFromStorage() {
        const stored = localStorage.getItem('foodhub_favorites');
        return stored ? JSON.parse(stored) : [];
    }

    // Save favorites to localStorage
    saveFavoritesToStorage() {
        localStorage.setItem('foodhub_favorites', JSON.stringify(this.favorites));
    }

    // Add item to cart
    addItem(item) {
        const existingItem = this.items.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...item,
                quantity: 1
            });
        }

        this.saveToStorage();
        this.showNotification(`${item.name} added to cart!`);
    }

    // Remove item from cart
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveToStorage();
    }

    // Update item quantity
    updateQuantity(itemId, quantity) {
        const item = this.items.find(cartItem => cartItem.id === itemId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(itemId);
            } else {
                item.quantity = quantity;
                this.saveToStorage();
            }
        }
    }

    // Get cart subtotal
    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get cart total (with delivery fee)
    getTotal() {
        const subtotal = this.getSubtotal();
        const deliveryFee = subtotal > 0 ? 100 : 0;
        return subtotal + deliveryFee;
    }

    // Get cart item count
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveToStorage();
    }

    // Add to favorites
    addToFavorites(item) {
        const exists = this.favorites.find(fav => fav.id === item.id);
        if (!exists) {
            this.favorites.push(item);
            this.saveFavoritesToStorage();
            this.showNotification(`${item.name} added to favorites!`);
        }
    }

    // Remove from favorites
    removeFromFavorites(itemId) {
        this.favorites = this.favorites.filter(fav => fav.id !== itemId);
        this.saveFavoritesToStorage();
    }

    // Check if item is in favorites
    isFavorite(itemId) {
        return this.favorites.some(fav => fav.id === itemId);
    }

    // Update cart UI
    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const count = this.getItemCount();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'block' : 'none';
        }
    }

    // Show notification
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Cart modal functions
function openCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'block';
        renderCartItems();
    }
}

function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');

    if (!cartItems || !cartSummary) return;

    if (cart.items.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 20px; color: #666;">Your cart is empty</p>';
        cartSummary.innerHTML = '';
        return;
    }

    cartItems.innerHTML = cart.items.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Rs. ${item.price}</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <input type="number" value="${item.quantity}" readonly>
                <button onclick="updateItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <div class="cart-item-total">
                <p>Rs. ${(item.price * item.quantity).toLocaleString('en-PK')}</p>
            </div>
            <button class="cart-item-remove" onclick="removeCartItem(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    const subtotal = cart.getSubtotal();
    const deliveryFee = subtotal > 0 ? 100 : 0;
    const total = cart.getTotal();

    cartSummary.innerHTML = `
        <div class="cart-summary-details">
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>Rs. ${subtotal.toLocaleString('en-PK')}</span>
            </div>
            <div class="summary-row">
                <span>Delivery Fee:</span>
                <span>Rs. ${deliveryFee}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>Rs. ${total.toLocaleString('en-PK')}</span>
            </div>
        </div>
        <button class="checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
        <button class="clear-cart-btn" onclick="clearCartItems()">Clear Cart</button>
    `;
}

function updateItemQuantity(itemId, quantity) {
    cart.updateQuantity(itemId, quantity);
    renderCartItems();
}

function removeCartItem(itemId) {
    cart.removeItem(itemId);
    renderCartItems();
}

function clearCartItems() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart.clearCart();
        renderCartItems();
    }
}

function proceedToCheckout() {
    if (cart.items.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Show checkout modal
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.style.display = 'block';
        scrollToElement('checkoutModal');
    }
}

function completeOrder() {
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();

    if (!name || !email || !phone || !address) {
        alert('Please fill all required fields!');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address!');
        return;
    }

    // Show confirmation
    const confirmation = `
    Order Confirmation

Order Details:
- Items: ${cart.items.length}
- Total: Rs. ${cart.getTotal().toLocaleString('en-PK')}
- Name: ${name}
- Phone: ${phone}
- Address: ${address}

Your order has been placed successfully!
You will receive an email confirmation shortly.
Estimated delivery time: 30-45 minutes
    `;

    alert(confirmation);

    // Clear cart and close modals
    cart.clearCart();
    closeCartModal();
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.style.display = 'none';
    }

    // Clear form
    document.getElementById('checkoutForm').reset();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
