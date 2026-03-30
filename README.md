# ☕ Brew & Bites - QR Dine-In Ordering SPA

<div align="center">
  <img src="assets/img/vintage_logo.png" alt="Brew & Bites Logo" width="150" style="border-radius: 50%; border: 3px solid #1e592f; margin-bottom: 20px; box-shadow: 8px 8px 0px #1e592f;">
  
  <p>
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License">
    <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
    <img src="https://img.shields.io/badge/HTML5-Semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
    <img src="https://img.shields.io/badge/CSS3-Native_Variables-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
    <img src="https://img.shields.io/badge/Status-Production_Ready_SPA-brightgreen?style=for-the-badge" alt="Status">
  </p>

  <p><strong>"Sip, Chill, & Vibe"</strong></p>
  
  <p>A professional, high-performance, and mobile-first Single-Page Application (SPA) designed for modern coffee shops with a <strong>Street Vintage 1999-2000</strong> aesthetic. It combines nostalgic retro vibes with sleek, premium UI interactions—all built on pure vanilla technologies.</p>

  <p>🚀 <strong>Fast. Lightweight. Framework-Free.</strong> 🚀</p>
</div>

---

## ✨ Pro Features & Polish

- **📱 Mobile-First Design Excellence:** Optimized layout with responsive padding (92% width on mobile) to ensure procedural background animations remain visible and the UI feels spacious.
- **🔍 Live Debounced Search:** Instantly find your favorite coffee or snacks with a built-in search engine that filters through the catalog in real-time.
- **🔳 Intelligent Table QR Locking:** Securely maps orders to specific tables. Table initialization requires a mandatory visitor (pax) count modal for accurate order management.
- **🦴 Skeleton Loading Screens:** Eliminates "content jumping" by displaying progressive skeleton placeholders before the menu cards snap into view.
- **✨ Springy "Pop-In" Animations:** Uses custom `cubic-bezier` timing for bouncy, premium entrance animations on product cards, category tabs, and welcome banners.
- **📸 High-Resolution Food Photography:** Features larger menu images (**160px**) with automatic lazy loading support for a punchy, visual-first ordering experience.
- **⚙️ Deep Product Customization:** Intelligent conditional logic (e.g., hiding sugar/ice options for Rice Bowls) combined with custom notes for every dish.
- **🔔 Top-Floating Notifications:** Professional-grade toast notifications positioned at the top-center to provide clear feedback without obstructing the main UI interactions.
- **🧾 Thermal Digital Receipt & PDF:** Generates a virtual 80mm thermal receipt with instant PDF download functionality for digital bookkeeping.
- **🎮 PS1-Era Procedural Background:** Hardware-accelerated `<canvas>` animation featuring floating 8-bit icons for an authentic retro feel.

## 🛠️ Architecture & Accessibility

Developed with a focus on clean code and long-term maintainability:

- **Semantic HTML5:** Full ARIA role support (`role="list"`, `aria-modal`, `aria-live`) and keyboard accessibility (ESC key to close modals).
- **Modern CSS Boilerplate:** 100% clean CSS system with zero inline styles. Uses CSS custom properties for effortless theme swapping.
- **Modular JavaScript (ES6+):** Organized into domain-specific modules (`cart-engine.js`, `render-ui.js`, `payment-handler.js`) for a robust state management flow.
- **Zero Dependencies:** Runs entirely client-side. No `npm install`, no build steps, no complexity. Just open and serve.

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/coffeeshop-qr.git
   ```
2. **Launch with Live Server:**
   Open `index.html` via VS Code's *Live Server* or any static server for the best experience.
3. **Simulate a Table Scan:**
   Click any of the Table QR cards on the landing page to inject the `?table=tx` session parameter.

## 🔳 QR Table Codes

Scan these previews with your smartphone camera to simulate a live customer session:

<div align="center">

| Table 01 | Table 02 | Table 03 |
|:---:|:---:|:---:|
| ![QR Table 01](assets/QR/Meja_01_t1.png) | ![QR Table 02](assets/QR/Meja_02_t2.png) | ![QR Table 03](assets/QR/Meja_03_t3.png) |
| `?table=t1` | `?table=t2` | `?table=t3` |

</div>

---

## 🎨 Design Tokens

- **Background (Muted Cream):** `#f4edde`
- **Primary Text (Forest Green):** `#1e592f`
- **Accent (Burnt Orange):** `#d45d25`
- **Shadow Offset:** `4px 4px 0px` (Street Vintage Style)
- **Typography:** *Poppins*

## 👨‍💻 Author

**Developed by Riyan**  
Dedicated to creating beautiful, fast, and accessible web experiences for the F&B industry.

## 📝 License

Distributed under the MIT License. Feel free to use this as a boilerplate for your next project!
