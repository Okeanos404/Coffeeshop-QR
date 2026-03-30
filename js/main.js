// Initialization and Event Listeners

document.addEventListener('DOMContentLoaded', () => {

    // ── Init ───────────────────────────────────────────
    if (!document.getElementById('landing-page').classList.contains('active')) {
        renderProducts('All');
        updateCartBadge();
    }

    // ── Search Bar ─────────────────────────────────────
    let searchDebounce = null;
    let activeCategory = 'All';

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(searchDebounce);
            searchDebounce = setTimeout(() => {
                renderProducts(activeCategory, searchInput.value);
            }, 280); // debounce 280ms
        });
    }

    // ── Category Tabs ──────────────────────────────────
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            e.currentTarget.classList.add('active');
            e.currentTarget.setAttribute('aria-pressed', 'true');
            activeCategory = e.currentTarget.dataset.category;
            // Clear search when switching category
            if (searchInput) searchInput.value = '';
            renderProducts(activeCategory);
        });
    });

    // ── Customization Chips toggle ─────────────────────
    document.querySelectorAll('#quick-chips .chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const pressed = chip.getAttribute('aria-pressed') === 'true';
            chip.classList.toggle('selected', !pressed);
            chip.setAttribute('aria-pressed', String(!pressed));
        });
    });

    // ── Add to Cart from Modal ─────────────────────────
    document.getElementById('btn-add-to-cart').addEventListener('click', () => {
        if (!currentCustomizationProduct) return;

        const notes  = document.getElementById('custom-notes').value;
        const chips  = Array.from(document.querySelectorAll('#quick-chips .chip.selected'))
                            .map(c => c.textContent.trim());

        addToCart(currentCustomizationProduct, 1, notes, chips);
        closeCustomizationModal();

        // Toast feedback
        showToast('Pesanan sudah ditambahkan keranjang');
    });

    // ── Close modals via backdrop click ───────────────
    // Customization modal
    document.getElementById('customization-modal').addEventListener('click', (e) => {
        if (e.target.id === 'customization-modal') closeCustomizationModal();
    });
    document.getElementById('btn-close-modal').addEventListener('click', closeCustomizationModal);

    // Payment modal
    document.getElementById('payment-modal').addEventListener('click', (e) => {
        if (e.target.id === 'payment-modal') {
            document.getElementById('payment-modal').classList.remove('active');
        }
    });
    document.getElementById('btn-close-payment').addEventListener('click', () => {
        document.getElementById('payment-modal').classList.remove('active');
    });

    // ── Pax Modal Controls ─────────────────────────────
    let paxTempValue = 0;
    const paxDisplay  = document.getElementById('pax-count-display');
    const btnPaxMinus = document.getElementById('btn-pax-minus');
    const btnPaxPlus  = document.getElementById('btn-pax-plus');

    if (btnPaxMinus && btnPaxPlus && paxDisplay) {
        btnPaxMinus.addEventListener('click', () => {
            if (paxTempValue > 0) {
                paxTempValue--;
                paxDisplay.textContent = paxTempValue;
                paxDisplay.setAttribute('aria-label', `Jumlah pengunjung: ${paxTempValue}`);
            }
        });
        btnPaxPlus.addEventListener('click', () => {
            if (paxTempValue < 20) {
                paxTempValue++;
                paxDisplay.textContent = paxTempValue;
                paxDisplay.setAttribute('aria-label', `Jumlah pengunjung: ${paxTempValue}`);
            }
        });
    }

    // ── Pax Modal Submission ───────────────────────────
    const btnSubmitPax = document.getElementById('btn-submit-pax');
    if (btnSubmitPax) {
        btnSubmitPax.addEventListener('click', () => {
            if (paxTempValue > 0) {
                window.paxCount = paxTempValue;
                document.getElementById('pax-modal').classList.remove('active');
            } else {
                showToast('Masukkan jumlah pengunjung (min. 1)', 'fa-exclamation-circle');
            }
        });
    }

    // ── Bottom Navigation ──────────────────────────────
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            if (target) switchView(target);
        });
    });

    // ── Checkout ───────────────────────────────────────
    document.getElementById('btn-checkout').addEventListener('click', () => {
        const name = document.getElementById('customer-name').value.trim();
        if (!name) {
            showToast('Masukkan nama pemesan terlebih dahulu', 'fa-exclamation-circle');
            document.getElementById('customer-name').focus();
            return;
        }
        document.getElementById('payment-modal').classList.add('active');
    });

    // ── Confirm Payment ────────────────────────────────
    document.getElementById('btn-confirm-payment').addEventListener('click', () => {
        processCheckout();
    });

    // ── Close Receipt ──────────────────────────────────
    document.getElementById('btn-close-receipt').addEventListener('click', finishOrder);
    document.getElementById('btn-finish-order').addEventListener('click', finishOrder);

    // ── Keyboard: Escape closes any open modal ─────────
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
            });
            currentCustomizationProduct = null;
        }
    });
});
