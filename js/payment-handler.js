// Checkout and Payment Handling

function processCheckout() {
    const customerNameInput = document.getElementById('customer-name').value.trim();
    const customerName = customerNameInput ? customerNameInput : 'Tamu';
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    const totals = calculateTotals();
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const date = new Date().toLocaleString('id-ID');

    document.getElementById('payment-modal').classList.remove('active');

    generateThermalReceipt(orderId, date, totals, selectedPayment, customerName);
    document.getElementById('receipt-modal').classList.add('active');
}

function generateThermalReceipt(orderId, date, totals, paymentMethod, customerName = 'Tamu') {
    const container = document.getElementById('receipt-container');
    const tableId = window.activeTable ? window.activeTable.name : "Takeaway";
    
    let itemsHTML = '';
    cart.forEach(item => {
        const itemTotal = item.product.price * item.quantity;
        let noteLine = item.notes ? `<div class="receipt-item-notes">${item.notes}</div>` : '';
        
        itemsHTML += `
            <div class="receipt-item-row">
                <span>${item.quantity}x ${item.product.name}</span>
                <span>${formatRupiah(itemTotal)}</span>
            </div>
            ${noteLine}
        `;
    });

    let instructionLine = paymentMethod === 'Cash' 
        ? "<b>Tunjukkan resi ini ke kasir untuk melakukan pembayaran.</b>"
        : "<b>Pembayaran via " + paymentMethod + " berhasil/ditunda. Tunjukkan resi ke staf.</b>";

    container.innerHTML = `
        <div class="receipt-content">
            <div class="receipt-header" style="text-align:center;">
                <img src="img/logo.png" alt="Logo" style="width:60px; height:60px; border-radius:50%; object-fit:cover; margin:0 auto 10px auto; filter:grayscale(100%);">
                <h2>Brew & Bites</h2>
                <div style="font-size: 0.8rem; color: #555;">Jl. Kopi No. 1, Jakarta</div>
            </div>
            <div class="receipt-meta">
                <div>Order: ${orderId}</div>
                <div>Tanggal: ${date}</div>
                <div>Pemesan: <b>${customerName}</b></div>
                <div>Meja: <b>${tableId}</b></div>
                <div>Metode: ${paymentMethod}</div>
            </div>
            
            <div class="receipt-items">
                ${itemsHTML}
            </div>
            
            <div class="receipt-totals">
                <div><span>Subtotal:</span> <span>${formatRupiah(totals.subtotal)}</span></div>
                <div><span>PB1 (10%):</span> <span>${formatRupiah(totals.tax)}</span></div>
                <div class="grand-total"><span>Total:</span> <span>${formatRupiah(totals.total)}</span></div>
            </div>
            
            <div class="receipt-footer">
                <div id="qr-receipt" class="qr-receipt-wrapper"></div>
                ${instructionLine}<br><br>
                Terima Kasih atas kunjungan Anda
            </div>
        </div>
    `;

    // Generate small QR Code for the receipt
    setTimeout(() => {
        const qrEl = document.getElementById('qr-receipt');
        if(qrEl) {
            qrEl.innerHTML = '';
            new QRCode(qrEl, {
                text: orderId,
                width: 100,
                height: 100,
                colorDark : "#000000",
                colorLight : "#ffffff"
            });
        }
    }, 100);
}

function finishOrder() {
    cart = [];
    updateCartBadge();
    renderCart();
    document.getElementById('receipt-modal').classList.remove('active');
    switchView('view-menu');
}
