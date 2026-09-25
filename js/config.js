/**
 * ==============================================================================
 * CENTRALIZED BRANDING & SITE CONFIGURATION
 * ==============================================================================
 * Edit this single file to update the business name, logo, colors, contact
 * details, social links, hero text, and feature toggles across the entire website.
 */

const SITE_CONFIG = {
  // Business Identity
  businessName: "Dev Infotech",
  shortName: "Dev Infotech",

  // Logo Configuration
  logo: {
    // "image" or "text"
    type: "image",
    text: "Dev Infotech",
    tagline: "Technology For Every Need",
    image: "assets/images/logo.png", // Shared logo in asset
    svgLogo: "assets/images/logo.svg",
    altText: "Dev Infotech Logo"
  },

  // Color Branding - Injected dynamically as CSS Custom Properties (from Business Card)
  branding: {
    primaryColor: "#06213D",      // Deep Corporate Navy (Card Background & Headings)
    primaryHover: "#031427",      // Darker Navy
    secondaryColor: "#0084D6",    // Brand Tech Cyan/Blue (Logo & Accents)
    secondaryHover: "#006cb3",    // Darker Blue
    accentColor: "#62A108",       // Brand Eco Green (Logo Sprout & Badges)
    accentHover: "#4e8306",       // Darker Green
    backgroundColor: "#F4F8FA",   // Crisp Light Slate Background
    surfaceColor: "#FFFFFF",      // Pure White Surface
    textColor: "#0A1C2E",         // Deep Navy-Black Text
    textMuted: "#556B82",         // Muted Slate Text
    borderColor: "#E1EBF2",       // Soft Slate Border
    successColor: "#62A108"       // Brand Green
  },

  // Contact Information (Directly from Business Card)
  contact: {
    managerName: "Manisha Saini",
    phone: "+91-7835907661",
    phoneRaw: "+917835907661",
    whatsapp: "917835907661", // International format without + or spaces
    email: "contact@devinfotech.com",
    address: "E 20 B, 1st Floor, Gali No 25, Madhu Vihar, I.P Extension, Delhi - 110092",
    shortAddress: "Madhu Vihar, I.P Extension, Delhi - 110092",
    operatingHours: "Monday – Saturday: 10:00 AM – 8:00 PM (Sunday On Appointment)",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.264669894747!2d77.2974!3d28.6218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb5212345678%3A0x1234567890abcdef!2sMadhu%20Vihar%2C%20I.P.%20Extension%2C%20Delhi%2C%20110092!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  },

  // Social Media Links (leave empty "" to hide)
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    youtube: ""
  },

  // Text & Copy Content (Matching Business Card)
  content: {
    tagline: "Technology For Every Need",
    heroTitle: "Technology For <span class=\"highlight\">Every Need</span>",
    heroSubtitle: "Wide range of certified refurbished laptops & desktops and genuine computer accessories from Dell, HP, Apple, Acer & Lenovo. Tested quality products with warranty and best sales & service support.",
    aboutShort: "At Dev Infotech, managed by Manisha Saini, we deliver certified refurbished corporate laptops, desktops, and all types of computer accessories in Delhi NCR with complete warranty assurance and trusted after-sales service.",
    footerDescription: "Dev Infotech — Technology For Every Need. Wide range of certified refurbished laptops & desktops, all computer accessories, tested quality with warranty and reliable after-sales service support."
  },

  // Deals In & Value Highlights (Directly from Business Card)
  trustBadges: [
    {
      title: "Laptops & Desktops",
      desc: "Wide range of certified refurbished laptops & desktops from Dell, HP, Apple, Acer & Lenovo."
    },
    {
      title: "Accessories",
      desc: "All types of computer accessories & genuine peripherals readily available."
    },
    {
      title: "Sales & Service",
      desc: "Best sales guidance and dedicated after-sales service and troubleshooting support."
    },
    {
      title: "Quality Assured",
      desc: "Tested quality products thoroughly inspected and backed by warranty."
    }
  ],

  // Localization
  currency: {
    symbol: "₹",
    code: "INR",
    locale: "en-IN"
  },

  // Feature Toggles
  features: {
    showWhatsAppFloatingButton: true,
    showSoftwareCategory: true,
    showGoogleMap: true,
    showTrustBadges: true,
    showFeaturedSection: true
  }
};
