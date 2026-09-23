/**
 * ==============================================================================
 * CENTRALIZED BRANDING & SITE CONFIGURATION
 * ==============================================================================
 * Edit this single file to update the business name, logo, colors, contact
 * details, social links, hero text, and feature toggles across the entire website.
 */

const SITE_CONFIG = {
  // Business Identity
  businessName: "DevInfoTech Laptops & Solutions",
  shortName: "DevInfoTech",

  // Logo Configuration
  logo: {
    // "text" or "image"
    type: "text",
    text: "DevInfoTech",
    tagline: "Certified Refurbished",
    image: "assets/images/logo.svg", // Used when type is "image"
    altText: "DevInfoTech Logo"
  },

  // Color Branding - Injected dynamically as CSS Custom Properties
  branding: {
    primaryColor: "#1E3A5F",    // Deep Navy
    primaryHover: "#152a45",    // Darker Navy
    secondaryColor: "#2563EB",  // Vibrant Blue
    secondaryHover: "#1d4ed8",  // Darker Blue
    accentColor: "#F59E0B",     // Warm Amber / Gold
    accentHover: "#d97706",     // Darker Amber
    backgroundColor: "#F8FAFC", // Light Gray Background
    surfaceColor: "#FFFFFF",    // White Surface
    textColor: "#172033",       // Primary Text
    textMuted: "#64748B",       // Secondary Text
    borderColor: "#E2E8F0",     // Light border
    successColor: "#10B981"     // Mint / Green badge
  },

  // Contact Information
  contact: {
    phone: "+91 98765 43210",
    phoneRaw: "+919876543210",
    whatsapp: "919876543210", // International format without + or spaces
    email: "contact@devinfotech.example.com",
    address: "Shop No. 14, Tech Park Commercial Hub, Electronic City, Bengaluru, Karnataka - 560100",
    shortAddress: "Electronic City, Bengaluru",
    operatingHours: "Monday – Saturday: 10:00 AM – 7:30 PM (Sunday Closed)",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.852445100062!2d77.66212137574744!3d12.852829217467618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6c888e28f3bb%3A0x6b4f74d0d0fcaae7!2sElectronic%20City%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  },

  // Social Media Links (leave empty "" to hide)
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    youtube: ""
  },

  // Text & Copy Content
  content: {
    tagline: "Certified Quality Refurbished Laptops & Software at Unbeatable Value",
    heroTitle: "Premium Laptops. Certified Quality. Smart Savings.",
    heroSubtitle: "Get top-tier enterprise laptops tested across 30+ quality checkpoints at up to 60% less than new retail prices. Backed with testing warranty and lifetime support.",
    aboutShort: "At DevInfoTech, we specialize in certified refurbished corporate-grade laptops and authentic software tools. We deliver reliable computing power to students, professionals, and small businesses with complete transparency.",
    footerDescription: "Your trusted destination for rigorously tested refurbished enterprise laptops, warranty-backed hardware, and essential software solutions."
  },

  // Warranty & Trust Highlights
  trustBadges: [
    {
      title: "30+ Point QC Inspection",
      desc: "Every laptop undergoes rigorous hardware, battery, and stress tests."
    },
    {
      title: "Testing Warranty",
      desc: "Peace-of-mind replacement and repair warranty on all certified units."
    },
    {
      title: "Save Up to 60%",
      desc: "Enterprise-grade performance without the heavy brand-new price tag."
    },
    {
      title: "Dedicated After-Sales",
      desc: "Direct WhatsApp and call support for setup, upgrades, and troubleshooting."
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
