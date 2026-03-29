// Initialization and Event Listeners setup

document.addEventListener('DOMContentLoaded', () => {
    // Only initialize UI features if not on landing page
    if (!document.getElementById('landing-page').classList.contains('active')) {
        renderProducts('All');
        updateCartBadge();
    }

    // Pax Modal Controls
    let paxTempValue = 0; // Default start value
    const paxDisplay = document.getElementById('pax-count-display');
    const btnPaxMinus = document.getElementById('btn-pax-minus');
    const btnPaxPlus = document.getElementById('btn-pax-plus');

    if (btnPaxMinus && btnPaxPlus && paxDisplay) {
        btnPaxMinus.addEventListener('click', () => {
            if (paxTempValue > 0) {
                paxTempValue--;
                paxDisplay.textContent = paxTempValue;
            }
        });
        
        btnPaxPlus.addEventListener('click', () => {
            if (paxTempValue < 20) {
                paxTempValue++;
                paxDisplay.textContent = paxTempValue;
            }
        });
    }

    // Pax Modal Submission
    const btnSubmitPax = document.getElementById('btn-submit-pax');
    if (btnSubmitPax) {
        btnSubmitPax.addEventListener('click', () => {
            if (paxTempValue && paxTempValue > 0) {
                window.paxCount = paxTempValue;
                document.getElementById('pax-modal').classList.remove('active');
            } else {
                alert('Silakan masukkan jumlah orang yang valid (minimal 1).');
            }
        });
    }

    // Category Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderProducts(e.target.dataset.category);
        });
    });

    // Customization Chips toggle
    document.querySelectorAll('#quick-chips .chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.target.classList.toggle('selected');
        });
    });

    // Add to Cart from Modal
    document.getElementById('btn-add-to-cart').addEventListener('click', () => {
        if (!currentCustomizationProduct) return;
        
        const notes = document.getElementById('custom-notes').value;
        const chips = Array.from(document.querySelectorAll('#quick-chips .chip.selected')).map(c => c.textContent);
        
        addToCart(currentCustomizationProduct, 1, notes, chips);
        closeCustomizationModal();
    });

    // Modal close buttons
    document.getElementById('btn-close-modal').addEventListener('click', closeCustomizationModal);
    document.getElementById('customization-modal').addEventListener('click', (e) => {
        if(e.target.id === 'customization-modal') closeCustomizationModal();
    });

    // Bottom Navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = btn.closest('.nav-item').dataset.target;
            switchView(target);
        });
    });

    // Checkout Navigation
    document.getElementById('btn-checkout').addEventListener('click', () => {
        document.getElementById('payment-modal').classList.add('active');
    });

    // Close Payment Modal
    document.getElementById('btn-close-payment').addEventListener('click', () => {
        document.getElementById('payment-modal').classList.remove('active');
    });

    // Confirm Payment
    document.getElementById('btn-confirm-payment').addEventListener('click', () => {
        processCheckout();
    });

    // Close Receipt
    document.getElementById('btn-close-receipt').addEventListener('click', () => {
        finishOrder();
    });
    
    document.getElementById('btn-finish-order').addEventListener('click', () => {
        finishOrder();
    });
});
