/**
 * ==============================================================================
 * SHOP JAVASCRIPT (shop.js)
 * ==============================================================================
 * Interactive product catalog: category filters, brand pills, live search,
 * price sorting, and dynamic grid rendering.
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof PRODUCTS === "undefined") return;

  const catalogGrid = document.getElementById("shop-products-grid");
  const searchInput = document.getElementById("shop-search-input");
  const sortSelect = document.getElementById("shop-sort-select");
  const categoryTabs = document.querySelectorAll(".category-tab-btn");
  const brandPillsContainer = document.getElementById("brand-pills-container");
  const resultsCountEl = document.getElementById("results-count-text");

  let currentCategory = "all";
  let currentBrand = "all";
  let searchQuery = "";
  let sortBy = "featured";

  // Check URL query parameters on initial page load (e.g., ?category=software or ?search=thinkpad)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("category")) {
    currentCategory = urlParams.get("category").toLowerCase();
  }
  if (urlParams.has("brand")) {
    currentBrand = urlParams.get("brand");
  }
  if (urlParams.has("search")) {
    searchQuery = urlParams.get("search");
    if (searchInput) searchInput.value = searchQuery;
  }

  // Populate dynamic Brand Filter pills based on available products
  function initBrandFilters() {
    if (!brandPillsContainer) return;

    const brands = ["All", ...new Set(PRODUCTS.map((p) => p.brand).filter(Boolean))];
    brandPillsContainer.innerHTML = brands
      .map((brand) => {
        const isActive = (brand === "All" && currentBrand === "all") || brand.toLowerCase() === currentBrand.toLowerCase();
        return `<button class="brand-pill ${isActive ? 'active' : ''}" data-brand="${brand.toLowerCase()}">${brand}</button>`;
      })
      .join("");

    brandPillsContainer.querySelectorAll(".brand-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        brandPillsContainer.querySelectorAll(".brand-pill").forEach((b) => b.classList.remove("active"));
        pill.classList.add("active");
        currentBrand = pill.dataset.brand;
        applyFiltersAndRender();
      });
    });
  }

  // Set active category tab state
  function updateCategoryTabUI() {
    categoryTabs.forEach((tab) => {
      if (tab.dataset.category === currentCategory) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
  }

  // Core filter, sort, and render logic
  function applyFiltersAndRender() {
    let filtered = [...PRODUCTS];

    // 1. Filter by Category
    if (currentCategory !== "all") {
      filtered = filtered.filter((p) => p.category.toLowerCase() === currentCategory);
    }

    // 2. Filter by Brand
    if (currentBrand !== "all") {
      filtered = filtered.filter((p) => p.brand.toLowerCase() === currentBrand.toLowerCase());
    }

    // 3. Search Query Match
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((p) => {
        const nameMatch = p.name?.toLowerCase().includes(q);
        const brandMatch = p.brand?.toLowerCase().includes(q);
        const procMatch = p.processor?.toLowerCase().includes(q);
        const ramMatch = p.ram?.toLowerCase().includes(q);
        const storageMatch = p.storage?.toLowerCase().includes(q);
        const descMatch = p.description?.toLowerCase().includes(q);
        const tagsMatch = p.tags?.some((t) => t.toLowerCase().includes(q));

        return nameMatch || brandMatch || procMatch || ramMatch || storageMatch || descMatch || tagsMatch;
      });
    }

    // 4. Sort Products
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-az") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Default: Featured first, then inStock
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    // 5. Update Results Count
    if (resultsCountEl) {
      resultsCountEl.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
    }

    // 6. Render Grid
    if (!catalogGrid) return;

    if (filtered.length === 0) {
      catalogGrid.innerHTML = `
        <div class="empty-results">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
          <h3 class="empty-results-title">No matching products found</h3>
          <p class="empty-results-desc">Try adjusting your category filter, brand selection, or search keywords.</p>
          <button class="btn btn-outline btn-sm" id="btn-reset-filters">Reset All Filters</button>
        </div>
      `;

      document.getElementById("btn-reset-filters")?.addEventListener("click", resetAllFilters);
    } else {
      catalogGrid.innerHTML = filtered.map(renderProductCard).join("");
      bindDetailButtons();
    }
  }

  function resetAllFilters() {
    currentCategory = "all";
    currentBrand = "all";
    searchQuery = "";
    sortBy = "featured";

    if (searchInput) searchInput.value = "";
    if (sortSelect) sortSelect.value = "featured";

    updateCategoryTabUI();
    initBrandFilters();
    applyFiltersAndRender();
  }

  // Event Listeners
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      categoryTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentCategory = tab.dataset.category;
      applyFiltersAndRender();
    });
  });

  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value;
        applyFiltersAndRender();
      }, 250);
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Initial Load
  initBrandFilters();
  updateCategoryTabUI();
  applyFiltersAndRender();
});
