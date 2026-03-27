// Render Products & View Navigation

let currentCustomizationProduct = null;

function renderProducts(category = 'All') {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    const filtered = category === 'All' ? products : products.filter(p => p.category === category);

    // Initial Skeleton Rendering
    for(let i = 0; i < (filtered.length || 6); i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'product-card skeleton-card';
        skeleton.innerHTML = `
            <div class="skeleton-img skeleton"></div>
            <div class="product-info">
                <div class="skeleton-text skeleton" style="width: 70%; margin-bottom: 8px;"></div>
                <div class="skeleton-text skeleton" style="width: 100%; margin-bottom: 4px;"></div>
                <div class="skeleton-text skeleton" style="width: 50%; margin-bottom: 12px; height: 8px;"></div>
                <div class="product-bottom" style="margin-top: auto;">
                    <div class="skeleton-text skeleton" style="width: 40%; height: 20px;"></div>
                    <div class="skeleton" style="width: 32px; height: 32px; border-radius: 50%;"></div>
                </div>
            </div>
        `;
        grid.appendChild(skeleton);
    }

    // Simulate short network delay for skeleton effect
    setTimeout(() => {
        grid.innerHTML = '';
        filtered.forEach((product, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.animationDelay = `${index * 0.05}s`;
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <div class="product-info">
                    <div class="product-title">${product.name}</div>
                    <div class="product-desc">${product.description}</div>
                    <div class="product-bottom">
                        <span class="product-price">${formatRupiah(product.price)}</span>
                        <button class="btn-add" data-id="${product.id}" onclick="openCustomizationModal('${product.id}')">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }, 600); // 600ms skeleton
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('empty-cart-msg');
    const summary = document.getElementById('cart-summary');
    
    container.innerHTML = '';

    if (cart.length === 0) {
        emptyState.classList.remove('hide');
        summary.classList.add('hide');
        return;
    }

    emptyState.classList.add('hide');
    summary.classList.remove('hide');

    cart.forEach(item => {
        const el = document.createElement('div');
        el.className = 'cart-item';
        
        let notesHTML = '';
        if (item.notes) {
            notesHTML = `<div class="cart-item-notes"><i class="fas fa-comment-dots"></i> ${item.notes}</div>`;
        }

        el.innerHTML = `
            <img class="cart-item-img" src="${item.product.image}" alt="${item.product.name}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.product.name}</div>
                <div class="cart-item-price">${formatRupiah(item.product.price)}</div>
                ${notesHTML}
                <div class="cart-qty-ctrl">
                    <button class="btn-qty" onclick="updateQuantity('${item.id}', -1)"><i class="fas fa-minus"></i></button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="btn-qty" onclick="updateQuantity('${item.id}', 1)"><i class="fas fa-plus"></i></button>
                </div>
            </div>
        `;
        container.appendChild(el);
    });

    const totals = calculateTotals();
    document.getElementById('summary-subtotal').textContent = formatRupiah(totals.subtotal);
    document.getElementById('summary-tax').textContent = formatRupiah(totals.tax);
    document.getElementById('summary-total').textContent = formatRupiah(totals.total);
}

function openCustomizationModal(productId) {
    currentCustomizationProduct = products.find(p => p.id === productId);
    if(!currentCustomizationProduct) return;

    // Reset fields
    document.getElementById('custom-notes').value = '';
    document.querySelectorAll('#quick-chips .chip').forEach(c => c.classList.remove('selected'));

    // Populate info
    const infoContainer = document.getElementById('modal-product-info');
    infoContainer.innerHTML = `
        <img src="${currentCustomizationProduct.image}" alt="Img" class="modal-product-img">
        <div class="modal-product-details">
            <h4>${currentCustomizationProduct.name}</h4>
            <p>${formatRupiah(currentCustomizationProduct.price)}</p>
        </div>
    `;

    const chipSection = document.getElementById('quick-chips').parentElement;
    if (currentCustomizationProduct.category === 'Snack' || currentCustomizationProduct.category === 'Camilan') {
        chipSection.style.display = 'none';
    } else {
        chipSection.style.display = 'block';
    }

    document.getElementById('modal-price').textContent = formatRupiah(currentCustomizationProduct.price);
    document.getElementById('customization-modal').classList.add('active');
}

function closeCustomizationModal() {
    document.getElementById('customization-modal').classList.remove('active');
    currentCustomizationProduct = null;
}

function switchView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(btn => {
        if(btn.dataset.target === viewId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}
