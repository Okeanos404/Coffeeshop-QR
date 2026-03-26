// Cart Array & Logic
let cart = [];

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
}

function addToCart(product, quantity, notes, chips) {
    const fullNotes = [notes, ...chips].filter(n => n.trim() !== '').join(', ');
    
    // Check if identical item + notes exists
    const existingIndex = cart.findIndex(item => 
        item.product.id === product.id && 
        item.notes === fullNotes
    );

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            product: product,
            quantity: quantity,
            notes: fullNotes
        });
    }

    updateCartBadge();
    renderCart();
}

function updateQuantity(cartItemId, delta) {
    const itemIndex = cart.findIndex(item => item.id === cartItemId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += delta;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
    }
    updateCartBadge();
    renderCart();
}

function calculateTotals() {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.product.price * item.quantity;
    });
    
    const tax = subtotal * 0.10; // 10% PB1
    const total = subtotal + tax;

    return { subtotal, tax, total };
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    badge.textContent = totalItems;
    
    if(totalItems > 0) {
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}
