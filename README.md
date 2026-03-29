# ☕ Brew & Bites - QR Dine-In Ordering SPA

<div align="center">
  <img src="assets/img/vintage_logo.png" alt="Brew & Bites Logo" width="150" style="border-radius: 50%; border: 3px solid #1e592f; margin-bottom: 10px;">
  
  <p>
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License">
    <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
    <img src="https://img.shields.io/badge/HTML5-Semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
    <img src="https://img.shields.io/badge/CSS3-Native_Variables-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
    <img src="https://img.shields.io/badge/Status-Production_Ready_SPA-brightgreen?style=for-the-badge" alt="Status">
  </p>

  <p><strong>"Sip, Chill, & Vibe"</strong></p>
  
  <p>A modern, lightweight, and mobile-first Single-Page Application (SPA) designed specifically for coffee shops featuring a distinctive <strong>Street Vintage 1999-2000</strong> aesthetic. Customers can scan a QR code mapped to their table, fill in visitor (pax) details, browse an interactive visual menu, customize orders with special notes, and seamlessly checkout—all directly from their smartphones.</p>

  <p>Built entirely with <strong>Vanilla HTML5, CSS3, and JavaScript (ES6+)</strong>. No heavy frameworks (like React or Vue) are required, making it blazing fast and 100% ready for effortless deployment on GitHub Pages or any static hosting service.</p>
</div>

---

## ✨ Key Features

- **📱 Mobile-First Retro UI/UX:** A pristine *Street Vintage 1999-2000* design optimized for seamless mobile viewing, complete with muted cream backgrounds, forest green accents, and blocky shadow elements.
- **🔳 Intelligent Table QR Session Locking:** Dynamically generated unique QR codes for each table. The app securely locks the customer's ordering session to their scanned table, prompting them for the number of visitors before browsing.
- **📸 High-Quality Aesthetic Catalog:** A robust categorization engine (Coffee, Non-Coffee, Snacks, and Rice Bowls) featuring high-quality, concept-accurate, vintage product photography.
- **⚙️ Advanced Order Customization:** Quick-select requirement chips (e.g., *Less Sugar, Extra Ice, Hot*) and custom text notes allow customers to personalize every single item in their order.
- **🛒 Smart Cart Engine:** Automatically groups identical items with matching customization notes, calculates accurate subtotals, and dynamically applies PB1 Tax (10%).
- **💳 Multi-Payment Integration UI:** Sleek UI support for standard payment modalities such as QRIS (GoPay, OVO, ShopeePay, M-Banking) and Cash at the Cashier.
- **🧾 Thermal Digital Receipt & PDF Export:** Generates a dynamic, print-ready virtual thermal receipt containing the Order ID, customized item lines, table number, and calculating the exact grand total. Customers can also instantly download this receipt as a PDF!
- **🎮 Procedural Background:** Includes an authentic, procedural 8-bit PlayStation background animation running on a hardware-accelerated `<canvas>`.

## 🛠️ Tech Stack & Architecture

We believe in keeping things fast, simple, and dependency-free for local F&B businesses.

- **HTML5:** Semantic tag architecture combined with highly structured modal overlays.
- **CSS3:** Native CSS variables, Flexbox/Grid layouts, and custom retro animations.
- **Vanilla JavaScript:** Pure, modular architectural pattern for state management and DOM manipulation. No Node.js or `npm` build steps required.
- **html2pdf.js:** Client-side PDF generation for downloading digital receipts.
- **QRCode.js:** A robust and lightweight client-side QR generation library.

## 🚀 Getting Started

Deploying or running this application locally is incredibly straightforward since it contains zero build-step dependencies.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/coffeeshop-qr.git
   ```
2. **Launch the App:**
   Simply open `index.html` in your favorite web browser on your desktop, or launch it with a local development server like VS Code's *Live Server* extension.
3. **Simulate a Table Scan:**
   Opening the `index.html` base URL redirects you to the "QR Simulator" Landing Page. Clicking any of the simulated Table QR Codes will inject the `?table=tx` URL parameter and drop you directly into the active ordering flow.

## 🎨 Theme & Design System

The application utilizes a *Street Vintage 1999-2000* aesthetic that feels premium yet nostalgic. It implements thick solid borders, deep shadow offsets, and legible contrast.

- **Background Base (Muted Cream):** `#f4edde`
- **Cards/Surface (White):** `#ffffff`
- **Primary Borders & Text (Forest Green):** `#1e592f`
- **Call-to-Action Accent (Burnt Orange):** `#d45d25`
- **Global Typography:** *Poppins* & *FontAwesome*

## 👨‍💻 Author

**Developed by Riyan**  
Designed with a focus on seamless user experience, responsive web design, and retro aesthetics for modern coffee shop ecosystems.

## 📝 License

This project is open-source and freely available under the terms of the MIT License. Feel free to fork, customize, and deploy for your own cafe.
