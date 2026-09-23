/**
 * ==============================================================================
 * CONTACT JAVASCRIPT (contact.js)
 * ==============================================================================
 * Form validation, URL query parameter prefilling, contact info population,
 * and direct WhatsApp/Email dispatch workflows.
 */

document.addEventListener("DOMContentLoaded", () => {
  initContactInfo();
  initContactForm();
  checkProductParam();
});

/**
 * Injects address, phone, email, operating hours, and map from SITE_CONFIG
 */
function initContactInfo() {
  if (typeof SITE_CONFIG === "undefined") return;

  // Google Maps Embed Handling
  const mapContainer = document.getElementById("map-embed-container");
  const mapSection = document.getElementById("contact-map-section");

  if (mapContainer && mapSection) {
    if (SITE_CONFIG.features?.showGoogleMap && SITE_CONFIG.contact.mapEmbedUrl) {
      mapContainer.innerHTML = `
        <iframe
          src="${SITE_CONFIG.contact.mapEmbedUrl}"
          width="100%"
          height="400"
          style="border:0; border-radius: var(--radius-lg);"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Business Location Map">
        </iframe>
      `;
      mapSection.style.display = "block";
    } else {
      mapSection.style.display = "none";
    }
  }
}

/**
 * Pre-fills the 'Product of Interest' input if user came from a 'Contact Form' button on a product
 */
function checkProductParam() {
  const urlParams = new URLSearchParams(window.location.search);
  const productName = urlParams.get("product");
  const productInput = document.getElementById("contact-product");
  const inquiryTypeSelect = document.getElementById("contact-inquiry-type");

  if (productName && productInput) {
    productInput.value = decodeURIComponent(productName);
    if (inquiryTypeSelect) inquiryTypeSelect.value = "product-inquiry";
  }
}

/**
 * Form Validation and Direct Dispatch Workflow (WhatsApp & Mailto)
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const phoneInput = document.getElementById("contact-phone");
    const inquiryType = document.getElementById("contact-inquiry-type");
    const productInput = document.getElementById("contact-product");
    const messageInput = document.getElementById("contact-message");

    let isValid = true;

    // Reset error states
    [nameInput, emailInput, phoneInput, messageInput].forEach((input) => {
      input?.classList.remove("is-invalid");
    });

    // Validate Name
    if (!nameInput.value.trim()) {
      nameInput.classList.add("is-invalid");
      isValid = false;
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
      emailInput.classList.add("is-invalid");
      isValid = false;
    }

    // Validate Phone (At least 10 digits)
    const phoneDigits = phoneInput.value.replace(/\D/g, "");
    if (!phoneInput.value.trim() || phoneDigits.length < 10) {
      phoneInput.classList.add("is-invalid");
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageInput.classList.add("is-invalid");
      isValid = false;
    }

    if (!isValid) {
      showToast("Please correct the highlighted fields before proceeding.");
      return;
    }

    // Prepare message payload
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      inquiryType: inquiryType ? inquiryType.options[inquiryType.selectedIndex].text : "General Inquiry",
      product: productInput.value.trim() || "Not specified",
      message: messageInput.value.trim()
    };

    showSubmissionSuccessModal(formData);
  });
}

/**
 * Shows interactive completion modal with direct WhatsApp & Email launch actions
 */
function showSubmissionSuccessModal(data) {
  const whatsappNumber = SITE_CONFIG?.contact?.whatsapp || "919876543210";
  const businessEmail = SITE_CONFIG?.contact?.email || "contact@devinfotech.example.com";
  const bName = SITE_CONFIG?.businessName || "DevInfoTech";

  // Formatted WhatsApp message
  const waMessage = 
`*New Website Inquiry for ${bName}*
----------------------------------------
*Name:* ${data.name}
*Phone:* ${data.phone}
*Email:* ${data.email}
*Inquiry Type:* ${data.inquiryType}
*Product:* ${data.product}

*Message:*
${data.message}
----------------------------------------`;

  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

  // Formatted Mailto link
  const mailtoSubject = encodeURIComponent(`Website Inquiry from ${data.name} - ${data.inquiryType}`);
  const mailtoBody = encodeURIComponent(
    `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nInquiry Type: ${data.inquiryType}\nProduct: ${data.product}\n\nMessage:\n${data.message}`
  );
  const mailtoUrl = `mailto:${businessEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

  let successModal = document.getElementById("contact-success-modal");
  if (!successModal) {
    successModal = document.createElement("div");
    successModal.id = "contact-success-modal";
    successModal.className = "modal-backdrop";
    document.body.appendChild(successModal);
  }

  successModal.innerHTML = `
    <div class="modal-window" style="max-width: 580px; padding: 2.5rem; text-align: center;">
      <div style="width: 64px; height: 64px; border-radius: 50%; background: #ECFDF5; color: #10B981; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      </div>

      <h2 style="font-size: 1.65rem; color: var(--color-primary); margin-bottom: 0.75rem;">Inquiry Ready to Dispatch</h2>
      <p style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 1.75rem;">
        Your inquiry has been compiled. Since this website runs directly in your browser without requiring a backend server, you can instantly dispatch your message to our team via <strong>WhatsApp</strong> or open your default <strong>Email application</strong>.
      </p>

      <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.5rem;">
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
          Send via WhatsApp (Instant Reply)
        </a>
        <a href="${mailtoUrl}" class="btn btn-secondary btn-lg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Send via Email App
        </a>
      </div>

      <button class="btn btn-outline btn-sm" id="btn-close-success-modal" style="width: 100%;">
        Close & Edit Form
      </button>
    </div>
  `;

  successModal.classList.add("active");
  document.body.style.overflow = "hidden";

  document.getElementById("btn-close-success-modal")?.addEventListener("click", () => {
    successModal.classList.remove("active");
    document.body.style.overflow = "";
  });
}
