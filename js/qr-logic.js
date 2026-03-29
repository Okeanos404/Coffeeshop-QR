// Render QR Codes on Landing Page and Handle initial routing

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tableId = urlParams.get('table');

    if (tableId) {
        // Find table
        const table = tables.find(t => t.id === tableId);
        if (table) {
            // Valid table, show app, set badge
            document.getElementById('landing-page').classList.remove('active');
            document.getElementById('app-container').classList.add('active');
            document.getElementById('active-table-badge').textContent = table.name;
            // Store active table
            window.activeTable = table;
            
            // Show Pax Modal before letting user interact with the app
            document.getElementById('pax-modal').classList.add('active');
        } else {
            alert('Meja tidak valid!');
            window.location.href = window.location.pathname;
        }
    } else {
        // Show landing page and generate QRs
        generateQRCodes();
    }
});

function generateQRCodes() {
    const container = document.getElementById('qr-container');
    container.innerHTML = '';

    tables.forEach(table => {
        const url = `${window.location.origin}${window.location.pathname}?table=${table.id}`;
        
        const card = document.createElement('div');
        card.className = 'qr-card';
        card.onclick = () => {
            window.location.href = url; // Simulate scanning
        };

        const qrWrapper = document.createElement('div');
        qrWrapper.className = 'qr-wrapper';

        const h3 = document.createElement('h3');
        h3.textContent = table.name;

        card.appendChild(qrWrapper);
        card.appendChild(h3);
        container.appendChild(card);

        // Generate QR code inside wrapper
        new QRCode(qrWrapper, {
            text: url,
            width: 120,
            height: 120,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    });
}
