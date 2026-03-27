// Checkout and Payment Handling

let currentOrderDetails = {};

function processCheckout() {
    const customerNameInput = document.getElementById('customer-name').value.trim();
    const customerName = customerNameInput ? customerNameInput : 'Tamu';
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    const totals = calculateTotals();
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const date = new Date().toLocaleString('id-ID');

    currentOrderDetails = { orderId, date, totals, selectedPayment, customerName };

    document.getElementById('payment-modal').classList.remove('active');

    if (selectedPayment === 'QRIS') {
        document.getElementById('qris-modal').classList.add('active');
        document.getElementById('qris-amount').textContent = formatRupiah(totals.total);
        const qrContainer = document.getElementById('qris-container');
        qrContainer.innerHTML = '';
        new QRCode(qrContainer, {
            text: `QRIS-PAYMENT-${orderId}-${totals.total}`,
            width: 200,
            height: 200,
            colorDark : "#000000",
            colorLight : "#ffffff"
        });
    } else {
        generateThermalReceipt(orderId, date, totals, selectedPayment, customerName);
        document.getElementById('receipt-modal').classList.add('active');
    }
}

function closeQrisModal() {
    document.getElementById('qris-modal').classList.remove('active');
}

function processAfterQris() {
    closeQrisModal();
    generateThermalReceipt(
        currentOrderDetails.orderId, 
        currentOrderDetails.date, 
        currentOrderDetails.totals, 
        currentOrderDetails.selectedPayment, 
        currentOrderDetails.customerName
    );
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
                <img src="assets/img/vintage_logo.png" alt="Logo" style="width:60px; height:60px; border:2px solid #000; object-fit:cover; margin:0 auto 10px auto; filter:grayscale(100%);">
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
                <br>
                ${instructionLine}<br><br>
                Terima Kasih atas kunjungan Anda
            </div>
        </div>
    `;
}

function finishOrder() {
    cart = [];
    updateCartBadge();
    renderCart();
    document.getElementById('receipt-modal').classList.remove('active');
    switchView('view-menu');
}

function downloadReceiptPDF() {
    const element = document.getElementById('receipt-container');
    
    // Calculate dynamic height for an 80mm thermal receipt
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;
    const widthMm = 80;
    // Add a small buffer to height
    const heightMm = (elementHeight * widthMm) / elementWidth + 5; 

    const opt = {
        margin:       0, // No margin for thermal receipt look
        filename:     `Struk_${currentOrderDetails.orderId || 'BrewBites'}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 3 }, // High scale for crisp text
        jsPDF:        { unit: 'mm', format: [widthMm, heightMm], orientation: 'portrait' }
    };
    
    // Auto-download PDF tailored for mobile screens (like a real digital struct)
    html2pdf().set(opt).from(element).save();
}
