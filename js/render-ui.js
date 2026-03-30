// Render Products & View Navigation

let currentCustomizationProduct = null;

/* ─── Toast Notification ──────────────────────────────── */
function showToast(message, icon = 'fa-check-circle') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas ${icon}" aria-hidden="true"></i>${message}`;
    container.appendChild(toast);

    // Auto-remove after 2.2s
    setTimeout(() => {
        toast.classList.add('toast-out');
        toast.addEventListener('animationend', () => toast.remove());
    }, 2200);
}


/* ─── Render Products ─────────────────────────────────── */
function renderProducts(category = 'All', searchQuery = '') {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    let filtered = category === 'All' ? products : products.filter(p => p.category === category);

    if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
    }

    // Skeleton Rendering
    const skeletonCount = filtered.length || 6;
    for (let i = 0; i < skeletonCount; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'product-card skeleton-card';
        skeleton.setAttribute('aria-hidden', 'true');
        skeleton.innerHTML = `
            <div class="skeleton-img skeleton"></div>
            <div class="product-info">
                <div class="skeleton-text skeleton" style="width:70%;margin-bottom:8px"></div>
                <div class="skeleton-text skeleton" style="width:100%;margin-bottom:4px"></div>
                <div class="skeleton-text skeleton" style="width:50%;margin-bottom:12px;height:8px"></div>
                <div class="product-bottom" style="margin-top:auto">
                    <div class="skeleton-text skeleton" style="width:40%;height:20px"></div>
                    <div class="skeleton" style="width:32px;height:32px;border-radius:50%"></div>
                </div>
            </div>
        `;
        grid.appendChild(skeleton);
    }

    setTimeout(() => {
        grid.innerHTML = '';

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div style="grid-column:1/-1;text-align:center;padding:40px 20px;color:var(--text-secondary);">
                    <i class="fas fa-search" style="font-size:2rem;margin-bottom:10px;opacity:0.4;display:block"></i>
                    <p style="font-weight:700;font-size:0.85rem">Menu tidak ditemukan</p>
                </div>`;
            return;
        }

        filtered.forEach((product, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('role', 'listitem');
            card.style.animationDelay = `${index * 0.07}s`;
            card.innerHTML = `
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-img"
                    loading="lazy"
                >
                <div class="product-info">
                    <div class="product-title">${product.name}</div>
                    <div class="product-desc">${product.description}</div>
                    <div class="product-bottom">
                        <span class="product-price">${formatRupiah(product.price)}</span>
                        <button
                            class="btn-add"
                            data-id="${product.id}"
                            onclick="openCustomizationModal('${product.id}')"
                            aria-label="Tambah ${product.name} ke keranjang"
                        >
                            <i class="fas fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }, 600);
}

/* ─── Render Cart ─────────────────────────────────────── */
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

    cart.forEach((item) => {
        const el = document.createElement('div');
        el.className = 'cart-item';
        el.setAttribute('role', 'listitem');

        let notesHTML = '';
        if (item.notes) {
            notesHTML = `<div class="cart-item-notes"><i class="fas fa-comment-dots" aria-hidden="true"></i> ${item.notes}</div>`;
        }

        el.innerHTML = `
            <img class="cart-item-img" src="${item.product.image}" alt="${item.product.name}" loading="lazy">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.product.name}</div>
                <div class="cart-item-price">${formatRupiah(item.product.price)}</div>
                ${notesHTML}
                <div class="cart-qty-ctrl">
                    <button class="btn-qty" onclick="updateQuantity('${item.id}', -1)" aria-label="Kurangi ${item.product.name}">
                        <i class="fas fa-minus" aria-hidden="true"></i>
                    </button>
                    <span class="qty-value" aria-label="Jumlah: ${item.quantity}">${item.quantity}</span>
                    <button class="btn-qty" onclick="updateQuantity('${item.id}', 1)" aria-label="Tambah ${item.product.name}">
                        <i class="fas fa-plus" aria-hidden="true"></i>
                    </button>
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

/* ─── Customization Modal ─────────────────────────────── */
function openCustomizationModal(productId) {
    currentCustomizationProduct = products.find(p => p.id === productId);
    if (!currentCustomizationProduct) return;

    // Reset fields
    document.getElementById('custom-notes').value = '';
    document.querySelectorAll('#quick-chips .chip').forEach(c => {
        c.classList.remove('selected');
        c.setAttribute('aria-pressed', 'false');
    });

    // Populate info
    const infoContainer = document.getElementById('modal-product-info');
    infoContainer.innerHTML = `
        <img src="${currentCustomizationProduct.image}" alt="${currentCustomizationProduct.name}" class="modal-product-img" loading="lazy">
        <div class="modal-product-details">
            <h4>${currentCustomizationProduct.name}</h4>
            <p>${formatRupiah(currentCustomizationProduct.price)}</p>
        </div>
    `;

    // Hide quick options for non-beverage categories
    const chipSection = document.getElementById('quick-chips').closest('.customization-section');
    const isNoBeverageCategory =
        currentCustomizationProduct.category === 'Snack' ||
        currentCustomizationProduct.category === 'Camilan' ||
        currentCustomizationProduct.category === 'Rice Bowls';
    if (chipSection) {
        chipSection.style.display = isNoBeverageCategory ? 'none' : 'block';
    }

    document.getElementById('customization-modal').classList.add('active');
}

function closeCustomizationModal() {
    document.getElementById('customization-modal').classList.remove('active');
    currentCustomizationProduct = null;
}

/* ─── View Switching ──────────────────────────────────── */
function switchView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(btn => {
        const isActive = btn.dataset.target === viewId;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-current', isActive ? 'page' : 'false');
    });

    // Re-play entrance animations when returning to menu
    if (viewId === 'view-menu') {
        ['.anim-banner', '.anim-tabs'].forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                const cls = sel.replace('.', '');
                el.classList.remove(cls);
                void el.offsetWidth; // force reflow
                el.classList.add(cls);
            });
        });
    }
}
