/**
 * ==============================================================================
 * MAIN JAVASCRIPT (main.js)
 * ==============================================================================
 * Central initialization, branding application, DOM injection, navigation,
 * modal controller, and shared utility functions.
 */

document.addEventListener("DOMContentLoaded", () => {
  initBranding();
  initNavigation();
  initDynamicContent();
  initFeaturedProducts();
  initModal();
  initFloatingWhatsApp();
  initImageFallbacks();
});

/**
 * Applies brand colors from SITE_CONFIG directly into CSS custom properties
 */
function initBranding() {
  if (typeof SITE_CONFIG === "undefined") return;

  const root = document.documentElement;
  const branding = SITE_CONFIG.branding || {};

  if (branding.primaryColor) root.style.setProperty("--color-primary", branding.primaryColor);
  if (branding.primaryHover) root.style.setProperty("--color-primary-hover", branding.primaryHover);
  if (branding.secondaryColor) root.style.setProperty("--color-secondary", branding.secondaryColor);
  if (branding.secondaryHover) root.style.setProperty("--color-secondary-hover", branding.secondaryHover);
  if (branding.accentColor) root.style.setProperty("--color-accent", branding.accentColor);
  if (branding.accentHover) root.style.setProperty("--color-accent-hover", branding.accentHover);
  if (branding.backgroundColor) root.style.setProperty("--color-bg", branding.backgroundColor);
  if (branding.surfaceColor) root.style.setProperty("--color-surface", branding.surfaceColor);
  if (branding.textColor) root.style.setProperty("--color-text", branding.textColor);
  if (branding.textMuted) root.style.setProperty("--color-text-muted", branding.textMuted);
  if (branding.borderColor) root.style.setProperty("--color-border", branding.borderColor);
  if (branding.successColor) root.style.setProperty("--color-success", branding.successColor);

  // Apply Document Page Title if not already set specifically
  const pageTitleElement = document.querySelector("title");
  if (pageTitleElement && !pageTitleElement.dataset.customized) {
    const currentTitle = pageTitleElement.textContent;
    if (currentTitle.includes("DevInfoTech") && SITE_CONFIG.businessName !== "DevInfoTech") {
      pageTitleElement.textContent = currentTitle.replace("DevInfoTech", SITE_CONFIG.businessName);
    }
  }
}

/**
 * Initializes mobile hamburger menu drawer and sticky header behavior
 */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".mobile-nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  let backdrop = document.querySelector(".nav-backdrop");

  // Ensure single global backdrop appended to body
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    document.body.appendChild(backdrop);
  }

  // Inject Drawer Header & Close Button into mainNav if not already present
  if (mainNav && !mainNav.querySelector(".drawer-header")) {
    const bName = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG.businessName : "Dev Infotech";
    const drawerHeader = document.createElement("div");
    drawerHeader.className = "drawer-header";
    drawerHeader.innerHTML = `
      <div class="drawer-brand">
        <span class="drawer-brand-name">${bName}</span>
      </div>
      <button class="drawer-close-btn" aria-label="Close navigation menu">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;
    mainNav.insertBefore(drawerHeader, mainNav.firstChild);
  }

  // Sticky header shadow on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  // Toggle mobile drawer
  if (mainNav) {
    const toggleMenu = (open) => {
      const isOpen = typeof open === "boolean" ? open : !mainNav.classList.contains("is-open");
      mainNav.classList.toggle("is-open", isOpen);
      backdrop.classList.toggle("active", isOpen);
      navToggle?.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    };

    navToggle?.addEventListener("click", () => toggleMenu());
    backdrop.addEventListener("click", () => toggleMenu(false));

    const drawerCloseBtn = mainNav.querySelector(".drawer-close-btn");
    drawerCloseBtn?.addEventListener("click", () => toggleMenu(false));

    // Close on navigation link click
    mainNav.querySelectorAll(".nav-link, .mobile-nav-cta a").forEach((link) => {
      link.addEventListener("click", () => toggleMenu(false));
    });

    // Close on Escape key press
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
        toggleMenu(false);
      }
    });
  }

  // Set active class on current navigation link
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * Populates all DOM elements marked for dynamic configuration injection
 */
function initDynamicContent() {
  if (typeof SITE_CONFIG === "undefined") return;

  // 1. Logo Injection
  document.querySelectorAll(".brand-logo-slot").forEach((container) => {
    container.innerHTML = "";
    const isFooter = container.classList.contains("footer-brand-name") || container.closest(".footer-brand");

    if (SITE_CONFIG.logo.type === "image" && SITE_CONFIG.logo.image) {
      const combo = document.createElement("div");
      combo.className = isFooter ? "footer-brand-logo-combo" : "brand-logo-combo";

      const img = document.createElement("img");
      img.src = SITE_CONFIG.logo.image;
      img.alt = SITE_CONFIG.logo.altText || SITE_CONFIG.businessName;
      img.className = isFooter ? "footer-logo-img" : "brand-logo-img";

      const wrapper = document.createElement("div");
      wrapper.className = "brand-text-wrapper";
      wrapper.innerHTML = `
        <span class="${isFooter ? 'footer-brand-name' : 'brand-name'}">Dev <span>Infotech</span></span>
        ${SITE_CONFIG.logo.tagline ? `<span class="brand-tagline" ${isFooter ? 'style="color: #94A3B8;"' : ''}>${SITE_CONFIG.logo.tagline}</span>` : ""}
      `;

      combo.appendChild(img);
      combo.appendChild(wrapper);
      container.appendChild(combo);
    } else {
      const wrapper = document.createElement("div");
      wrapper.className = "brand-text-wrapper";
      wrapper.innerHTML = `
        <span class="${isFooter ? 'footer-brand-name' : 'brand-name'}">Dev <span>Infotech</span></span>
        ${SITE_CONFIG.logo.tagline ? `<span class="brand-tagline" ${isFooter ? 'style="color: #94A3B8;"' : ''}>${SITE_CONFIG.logo.tagline}</span>` : ""}
      `;
      container.appendChild(wrapper);
    }
  });

  // 2. Business Name & Manager
  document.querySelectorAll("[data-config='businessName']").forEach((el) => {
    el.textContent = SITE_CONFIG.businessName;
  });

  document.querySelectorAll("[data-config='managerName']").forEach((el) => {
    el.textContent = SITE_CONFIG.contact?.managerName || "Manisha Saini";
  });

  // 3. Contact Details
  document.querySelectorAll("[data-config='phone']").forEach((el) => {
    el.textContent = SITE_CONFIG.contact.phone;
    if (el.tagName === "A") el.href = `tel:${SITE_CONFIG.contact.phoneRaw || SITE_CONFIG.contact.phone}`;
  });

  document.querySelectorAll("[data-config='email']").forEach((el) => {
    el.textContent = SITE_CONFIG.contact.email;
    if (el.tagName === "A") el.href = `mailto:${SITE_CONFIG.contact.email}`;
  });

  document.querySelectorAll("[data-config='address']").forEach((el) => {
    el.textContent = SITE_CONFIG.contact.address;
  });

  document.querySelectorAll("[data-config='operatingHours']").forEach((el) => {
    el.textContent = SITE_CONFIG.contact.operatingHours;
  });

  // 4. Hero & Content Copy
  document.querySelectorAll("[data-config='tagline']").forEach((el) => {
    el.textContent = SITE_CONFIG.content.tagline;
  });

  document.querySelectorAll("[data-config='heroTitle']").forEach((el) => {
    el.innerHTML = SITE_CONFIG.content.heroTitle;
  });

  document.querySelectorAll("[data-config='heroSubtitle']").forEach((el) => {
    el.textContent = SITE_CONFIG.content.heroSubtitle;
  });

  document.querySelectorAll("[data-config='aboutShort']").forEach((el) => {
    el.textContent = SITE_CONFIG.content.aboutShort;
  });

  document.querySelectorAll("[data-config='footerDescription']").forEach((el) => {
    el.textContent = SITE_CONFIG.content.footerDescription;
  });

  // 5. Dynamic Footer Year & Copyright
  document.querySelectorAll("[data-config='copyright']").forEach((el) => {
    const currentYear = new Date().getFullYear();
    el.innerHTML = `&copy; ${currentYear} <strong>${SITE_CONFIG.businessName}</strong>. All rights reserved.`;
  });

  // 6. Social Links Injection
  const socialContainer = document.querySelector(".footer-social-links");
  if (socialContainer && SITE_CONFIG.social) {
    socialContainer.innerHTML = "";
    const socialPlatforms = [
      { name: "facebook", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z"/></svg>' },
      { name: "instagram", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>' },
      { name: "linkedin", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/></svg>' },
      { name: "twitter", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' }
    ];

    socialPlatforms.forEach((p) => {
      const url = SITE_CONFIG.social[p.name];
      if (url && url.trim() !== "") {
        const btn = document.createElement("a");
        btn.href = url;
        btn.target = "_blank";
        btn.rel = "noopener noreferrer";
        btn.className = "social-icon-btn";
        btn.setAttribute("aria-label", p.name);
        btn.innerHTML = p.icon;
        socialContainer.appendChild(btn);
      }
    });
  }
}

/**
 * Currency Formatter Utility for Indian Rupees (₹)
 */
function formatCurrency(amount) {
  if (typeof amount !== "number") return amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Generates WhatsApp click-to-chat inquiry link with prefilled inquiry message
 */
function generateWhatsAppInquiryUrl(product) {
  const whatsappNumber = SITE_CONFIG?.contact?.whatsapp || "917835907661";
  const bName = SITE_CONFIG?.businessName || "Dev Infotech";
  
  let msg = `Hello ${bName}! I am interested in inquiring about:\n\n`;
  msg += `*Product:* ${product.name}\n`;
  if (product.id) msg += `*Item ID:* ${product.id}\n`;
  if (product.price) msg += `*Price:* ${formatCurrency(product.price)}\n`;
  if (product.condition) msg += `*Condition:* ${product.condition}\n`;
  if (product.processor && product.processor !== "N/A") msg += `*Processor:* ${product.processor}\n`;
  if (product.ram && product.ram !== "N/A") msg += `*RAM:* ${product.ram}\n`;
  if (product.storage && product.storage !== "N/A") msg += `*Storage:* ${product.storage}\n`;
  msg += `\nPlease let me know if this product is currently available and how to proceed with the purchase. Thank you!`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

/**
 * Renders product card HTML
 */
function renderProductCard(product) {
  const isLaptop = product.category === "laptop";
  const formattedPrice = formatCurrency(product.price);
  const formattedOriginal = product.originalPrice ? formatCurrency(product.originalPrice) : "";
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const whatsappUrl = generateWhatsAppInquiryUrl(product);

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-badge-group">
        ${product.featured ? '<span class="product-badge badge-featured">Featured</span>' : ''}
        ${product.condition ? `<span class="product-badge badge-condition">${product.condition}</span>` : ''}
      </div>

      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy" onerror="this.src='assets/images/fallback.svg'">
      </div>

      <div class="product-body">
        <span class="product-brand">${product.brand}</span>
        <h3 class="product-title">${product.name}</h3>

        <ul class="product-specs-list">
          ${isLaptop ? `
            ${product.processor && product.processor !== 'N/A' ? `<li class="spec-pill">${product.processor}</li>` : ''}
            ${product.ram && product.ram !== 'N/A' ? `<li class="spec-pill">${product.ram}</li>` : ''}
            ${product.storage && product.storage !== 'N/A' ? `<li class="spec-pill">${product.storage}</li>` : ''}
          ` : `
            ${product.os && product.os !== 'N/A' ? `<li class="spec-pill">${product.os}</li>` : ''}
            ${product.condition ? `<li class="spec-pill">${product.condition}</li>` : ''}
          `}
        </ul>

        <div class="product-price-row">
          <span class="price-current">${formattedPrice}</span>
          ${formattedOriginal ? `<span class="price-original">${formattedOriginal}</span>` : ''}
          ${discountPercent > 0 ? `<span class="price-discount">(${discountPercent}% OFF)</span>` : ''}
        </div>

        <div class="product-actions-grid">
          <button class="btn btn-outline btn-sm btn-view-details" data-id="${product.id}">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            <span>Details</span>
          </button>
          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
            <span>Inquire</span>
          </a>
        </div>
      </div>
    </article>
  `;
}

/**
 * Renders Featured Products on the Homepage
 */
function initFeaturedProducts() {
  const container = document.getElementById("featured-products-container");
  if (!container || typeof PRODUCTS === "undefined") return;

  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4);
  if (featured.length === 0) {
    container.innerHTML = "<p>No featured products available at this time.</p>";
    return;
  }

  container.innerHTML = featured.map(renderProductCard).join("");
  bindDetailButtons();
}

/**
 * Initializes and manages the Product Details Modal
 */
let modalBackdrop = null;

function initModal() {
  modalBackdrop = document.querySelector(".modal-backdrop");
  if (!modalBackdrop) {
    modalBackdrop = document.createElement("div");
    modalBackdrop.className = "modal-backdrop";
    modalBackdrop.setAttribute("role", "dialog");
    modalBackdrop.setAttribute("aria-modal", "true");
    modalBackdrop.setAttribute("aria-hidden", "true");
    modalBackdrop.innerHTML = `
      <div class="modal-window">
        <button class="modal-close-btn" aria-label="Close modal">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="modal-body-slot"></div>
      </div>
    `;
    document.body.appendChild(modalBackdrop);
  }

  const closeBtn = modalBackdrop.querySelector(".modal-close-btn");
  closeBtn?.addEventListener("click", closeModal);

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("active")) {
      closeModal();
    }
  });

  bindDetailButtons();
}

function bindDetailButtons() {
  document.querySelectorAll(".btn-view-details").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = btn.dataset.id;
      openProductModal(productId);
    });
  });
}

function openProductModal(productId) {
  if (typeof PRODUCTS === "undefined") return;
  const product = PRODUCTS.find((p) => String(p.id) === String(productId));
  if (!product || !modalBackdrop) return;

  const slot = modalBackdrop.querySelector(".modal-body-slot");
  const isLaptop = product.category === "laptop";
  const formattedPrice = formatCurrency(product.price);
  const formattedOriginal = product.originalPrice ? formatCurrency(product.originalPrice) : "";
  const whatsappUrl = generateWhatsAppInquiryUrl(product);

  slot.innerHTML = `
    <div class="modal-content-grid">
      <div class="modal-img-container">
        <img src="${product.image}" alt="${product.name}" class="modal-img" onerror="this.src='assets/images/fallback.svg'">
      </div>
      <div class="modal-info-col">
        <span class="modal-info-brand">${product.brand} • ${product.category.toUpperCase()}</span>
        <h2 class="modal-info-title">${product.name}</h2>
        
        <div class="modal-info-price-row">
          <span class="price-current">${formattedPrice}</span>
          ${formattedOriginal ? `<span class="price-original">${formattedOriginal}</span>` : ''}
          <span class="spec-pill" style="background:#ECFDF5; color:#065F46;">${product.condition || 'Certified'}</span>
        </div>

        <p class="modal-description">${product.description || 'Enterprise grade certified device.'}</p>

        <table class="modal-specs-table">
          <tbody>
            ${isLaptop ? `
              <tr><th>Processor</th><td>${product.processor || 'N/A'}</td></tr>
              <tr><th>Memory (RAM)</th><td>${product.ram || 'N/A'}</td></tr>
              <tr><th>Storage</th><td>${product.storage || 'N/A'}</td></tr>
              <tr><th>Display</th><td>${product.display || 'N/A'}</td></tr>
              <tr><th>Graphics</th><td>${product.graphics || 'Integrated'}</td></tr>
              <tr><th>Battery Backup</th><td>${product.battery || 'Tested healthy'}</td></tr>
              <tr><th>Operating System</th><td>${product.os || 'Windows 11 Pro'}</td></tr>
              <tr><th>Warranty</th><td>${product.warranty || 'Testing Warranty Included'}</td></tr>
            ` : `
              <tr><th>License Type</th><td>${product.condition || 'Digital License'}</td></tr>
              <tr><th>Compatibility</th><td>${product.os || 'Windows / Mac'}</td></tr>
              <tr><th>Activation Guarantee</th><td>${product.warranty || 'Lifetime Official Activation'}</td></tr>
            `}
          </tbody>
        </table>

        <div class="modal-actions">
          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-block">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
            Inquire on WhatsApp
          </a>
          <a href="contact.html?product=${encodeURIComponent(product.name)}" class="btn btn-outline">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Contact Form
          </a>
        </div>
      </div>
    </div>
  `;

  modalBackdrop.classList.add("active");
  modalBackdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modalBackdrop) return;
  modalBackdrop.classList.remove("active");
  modalBackdrop.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/**
 * Initializes floating WhatsApp button if enabled in SITE_CONFIG
 */
function initFloatingWhatsApp() {
  if (typeof SITE_CONFIG === "undefined" || !SITE_CONFIG.features?.showWhatsAppFloatingButton) return;
  if (document.querySelector(".floating-whatsapp")) return;

  const whatsappNumber = SITE_CONFIG.contact.whatsapp || "919876543210";
  const defaultMsg = encodeURIComponent(`Hello ${SITE_CONFIG.businessName}! I am visiting your website and would like to inquire about your refurbished laptops.`);

  const floatBtn = document.createElement("a");
  floatBtn.href = `https://wa.me/${whatsappNumber}?text=${defaultMsg}`;
  floatBtn.target = "_blank";
  floatBtn.rel = "noopener noreferrer";
  floatBtn.className = "floating-whatsapp";
  floatBtn.setAttribute("aria-label", "Chat with us on WhatsApp");
  floatBtn.innerHTML = `
    <svg viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
    <span>Chat with Us</span>
  `;

  document.body.appendChild(floatBtn);
}

/**
 * Handles missing images by attaching automatic SVG fallback
 */
function initImageFallbacks() {
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      this.src = "assets/images/fallback.svg";
    });
  });
}

/**
 * Shows temporary toast notification message
 */
function showToast(message, duration = 4000) {
  let toast = document.querySelector(".toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast-notification";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("active");

  setTimeout(() => {
    toast.classList.remove("active");
  }, duration);
}
