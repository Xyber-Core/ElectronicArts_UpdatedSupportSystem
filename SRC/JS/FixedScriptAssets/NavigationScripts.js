export async function initNavigationScripts(currentPage) {
  await initPrimaryNavigation(currentPage);
  await initSecondaryNavigation(currentPage);

  initActiveCategory(currentPage);
  initMobileNav(currentPage);
  /* ══════════════════════════════════════════════════════
 Primary-Navigation Script - [The primary script to load
 all navigation pages]
 ══════════════════════════════════════════════════════ */

  async function initPrimaryNavigation(currentPage) {
    try {
      const response = await fetch("/SRC/JSON/NavigationData.json");
      if (!response.ok) {
        throw new Error("Failed to load hero content");
      }

      const data = await response.json();
      const pageData = data.navigationPages.find((page) => page.page === currentPage);
      const heroTitle = document.getElementById("hero-title");
      const heroSub = document.getElementById("hero-sub");

      if (!pageData) return;
      if (heroTitle) {
        heroTitle.textContent = pageData.title;
      }
      if (heroSub) {
        heroSub.textContent = pageData.subtitle;
      }
    } catch (error) {
      console.error("Hero JSON Error:", error);
    }
  }

  /* ══════════════════════════════════════════════════════
 Secondary-Navigation Script - [A small script to initialize 
 small sub navigation menus for each help topic]
 ══════════════════════════════════════════════════════ */

  async function initSecondaryNavigation(currentPage) {
    try {
      const response = await fetch("/SRC/JSON/NavigationData.json");

      if (!response.ok) {
        throw new Error("Failed to load sub nav");
      }

      const data = await response.json();
      const subNavData = data.subNavigation;
      const nav = document.getElementById("sub-nav-links");

      if (!nav) return;

      nav.innerHTML = "";

      let relevantItems = [];

      for (const group in subNavData) {
        const items = subNavData[group];

        const hasMatch = items.some((item) => item.page === currentPage);

        if (hasMatch) {
          relevantItems = items;
          break;
        }
      }

      if (!relevantItems.length) {
        document.querySelector(".sub-nav-wrap")?.remove();
        return;
      }

      relevantItems.forEach((item) => {
        nav.innerHTML += `
        <a href="${item.link}" class="sub-nav-item ${item.page === currentPage ? "active" : ""}">
          <i class="${item.icon}"></i>${item.title}
        </a>
      `;
      });
    } catch (error) {
      console.error("Sub Nav Error:", error);
    }
  }

  /* ══════════════════════════════════════════════════════
   Active Category Script - [The script to show which page
   is the active one to make it easier for the user.]
═══════════════════════════════════════════════════════ */

  function initActiveCategory(currentPage) {
    const navItems = document.querySelectorAll(".cat-item");

    navItems.forEach((item) => {
      item.classList.remove("active");

      if (item.dataset.page === currentPage) {
        item.classList.add("active");
      }
    });
  }

  const navItems = [
    { id: "forums", icon: "fa-comments", label: "Support Forums", href: "/SRC/HTML/Pages/ForumSupport.html" },
    { id: "game", icon: "fa-gamepad", label: "Game Support", href: "/SRC/HTML/Pages/GameSupport.html" },
    { id: "account", icon: "fa-user", label: "EA Account", href: "/SRC/HTML/Pages/MyAccount.html" },
    { id: "platform", icon: "fa-desktop", label: "Platform Support", href: "/SRC/HTML/Pages/PlatformSupport.html" },
    { id: "cases", icon: "fa-briefcase", label: "My Cases", href: "/SRC/HTML/Pages/MyCases.html" },
  ];

  /* ══════════════════════════════════════════════════════════
   PUBLIC — HAMBURGER SIDEBAR
══════════════════════════════════════════════════════════ */
  function initMobileNav(currentPage = "") {
    if (window.innerWidth >= 640) return;

    /* Wait one frame so NavigationScripts has finished injecting */
    requestAnimationFrame(() => {
      _buildSidebar(currentPage);
      _patchTopNav(currentPage);
      _hideDesktopNavElements();
    });
  }

  /* ══════════════════════════════════════════════════════════
   PRIVATE HELPERS
══════════════════════════════════════════════════════════ */

  /* ── 1. Inject hamburger button into .topnav ─────────────── */
  function _patchTopNav(currentPage) {
    const topnav = document.querySelector(".topnav");
    if (!topnav || topnav.querySelector(".mobileHamBtn")) return;

    /* Current active page label shown in topnav */
    const active = navItems.find((n) => n.id === currentPage);
    const pageLabel = active ? active.label : "EA Help";

    const hamBtn = document.createElement("button");
    hamBtn.className = "mobileHamBtn";
    hamBtn.setAttribute("aria-label", "Open navigation");
    hamBtn.setAttribute("aria-expanded", "false");
    hamBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;

    const pageTitle = document.createElement("span");
    pageTitle.className = "mobileTopnavLabel";
    pageTitle.textContent = pageLabel;

    topnav.insertAdjacentElement("afterbegin", pageTitle);
    topnav.insertAdjacentElement("afterbegin", hamBtn);

    hamBtn.addEventListener("click", _openSidebar);
  }

  /* ── 2. Hide desktop-only nav elements on mobile ─────────── */
  function _hideDesktopNavElements() {
    const toHide = [".cat-nav", ".sub-nav-wrap", ".sub-nav-trigger"];
    toHide.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        el.style.display = "none";
      });
    });
  }

  /* ── 3. Build sidebar HTML and inject into body ──────────── */
  function _buildSidebar(currentPage) {
    if (document.getElementById("mobileSidebar")) return;

    /* Collect sub-nav items from existing DOM */
    const subItems = _collectSubNavItems();

    /* ── Backdrop ── */
    const backdrop = document.createElement("div");
    backdrop.id = "mobileNavBackdrop";
    backdrop.className = "mobile-nav-backdrop";
    backdrop.addEventListener("click", _closeSidebar);
    document.body.appendChild(backdrop);

    /* ── Sidebar ── */
    const sidebar = document.createElement("aside");
    sidebar.id = "mobileSidebar";
    sidebar.className = "mobile-sidebar";
    sidebar.setAttribute("aria-label", "Navigation sidebar");
    sidebar.innerHTML = _sidebarHTML(currentPage, subItems);
    document.body.appendChild(sidebar);

    /* ── Close button ── */
    sidebar.querySelector(".close")?.addEventListener("click", _closeSidebar);

    /* ── Search in sidebar ── */
    const searchInput = sidebar.querySelector("#msb-search-input");
    searchInput?.addEventListener("input", () => {
      const q = searchInput.value.toLowerCase();
      sidebar.querySelectorAll(".msb-cat-item").forEach((item) => {
        const label = item.querySelector(".msb-cat-label")?.textContent.toLowerCase() ?? "";
        item.style.display = label.includes(q) ? "" : "none";
      });
    });

    /* ── Sub-nav items in sidebar ── */
    sidebar.querySelectorAll(".msb-sub-item").forEach((item) => {
      item.addEventListener("click", () => {
        _closeSidebar();
      });
    });

    sidebar.querySelector("#mobileXyberBtn")?.addEventListener("click", () => {
      _closeSidebar();

      const trigger = document.getElementById("xc-trigger");
      trigger?.click();
    });
  }

  /* ── 4. Collect current-page sub-nav items ───────────────── */
  function _collectSubNavItems() {
    const subNav = document.querySelector(".sub-nav");
    if (!subNav) return [];

    return [...subNav.querySelectorAll(".sub-nav-item")].map((el) => ({
      label: el.textContent.trim(),
      icon: el.querySelector("i")?.className ?? "fa-solid fa-circle-dot",
      href: el.getAttribute("href") || "#",
      active: el.classList.contains("active"),
    }));
  }

  /* ── 5. Build sidebar inner HTML string ──────────────────── */
  function _sidebarHTML(currentPage, subItems) {
    const catItemsHTML = navItems.map(
      (item) => `
    <a href="${item.href}"
       class="msb-cat-item${item.id === currentPage ? " active" : ""}"
       aria-current="${item.id === currentPage ? "page" : "false"}">
      <div class="msb-cat-icon">
        <i class="fa-solid ${item.icon}"></i>
      </div>
      <span class="msb-cat-label">${item.label}</span>
      ${item.id === currentPage ? '<span class="msb-active-dot"></span>' : '<i class="fa-solid fa-chevron-right msb-arrow"></i>'}
    </a>
  `,
    ).join("");

    const subHTML = subItems.length
      ? `
    <div class="msb-divider"></div>
    <div class="msb-section-label">
      <i class="fa-solid fa-layer-group"></i>
      Sub-Navigation
    </div>
    <nav class="msb-sub-nav" aria-label="Page sections">
      ${subItems
        .map(
          (s) => `
        <a href="${s.href}" class="msb-sub-item${s.active ? " active" : ""}">
          <i class="${s.icon}"></i>
          <span>${s.label}</span>
        </a>
      `,
        )
        .join("")}

      <div class="msb-divider"></div>

<div class="msb-section-label">
  <i class="fa-solid fa-circle-info"></i>
  Project
</div>

<nav class="msb-sub-nav">
 <button class="msb-xyber-btn" id="mobileXyberBtn">
  <div class="msb-xyber-icon">
    <img src="/SRC/Assets/Images/SiteIcons/XyberLogo.webp" loading="lazy" alt="Xybercore">
  </div>

  <div class="msb-xyber-body">
    <span class="msb-xyber-title">Xybercore</span>
    <span class="msb-xyber-sub">
      Site Information & Credits
    </span>
  </div>

  <i class="fa-solid fa-chevron-right"></i>
</button>
</nav>
</nav>
  `
      : "";

    return `
    <!-- Header -->
    <div class="msb-header">
      <div class="msb-logo">
        <svg fill="white" viewBox="0 0 41 40" width="28" height="28">
          <path clip-rule="evenodd" fill-rule="evenodd"
            d="M20.5 40C31.5457 40 40.5 31.0457 40.5 20C40.5 8.9543 31.5457 0 20.5 0C9.4543 0 0.5 8.9543 0.5 20C0.5 31.0457 9.4543 40 20.5 40ZM8.36931 18.583H20.017L18.2273 21.4453H12.6307L10.8693 24.1377H19.0795L26.3807 13L35.5 27H32.0625L30.2443 24.1377H24.9318L26.6932 21.4453H28.3977L26.3807 18.583L20.6989 27H5.5L9.10796 21.4453H6.49432L8.36931 18.583ZM12.0909 13H23.9943L22.233 15.9474H10.2727L12.0909 13Z"/>
        </svg>
        <span>EA Help</span>
      </div>
      <button class="siteBtn close" id="mobileSidebarClose" aria-label="Close navigation">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <!-- Search -->
    <div id="msb-search">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input id="msb-search-input" type="search" placeholder="Search EA Help…" aria-label="Search navigation"/>
    </div>

    <!-- Primary nav -->
    <div class="msb-section-label">
      <i class="fa-solid fa-grid-2"></i>
      Navigation
    </div>
    <nav class="msb-cat-nav" aria-label="Main navigation">
      ${catItemsHTML}
    </nav>

    ${subHTML}

  `;
  }

  /* ── 6. Open / close sidebar ─────────────────────────────── */
  function _openSidebar() {
    const sidebar = document.getElementById("mobileSidebar");
    const backdrop = document.getElementById("mobileNavBackdrop");
    const hamBtn = document.querySelector(".mobileHamBtn");
    document.getElementById("xc-trigger")?.classList.add("hidden-by-nav");
    document.getElementById("xc-tip")?.classList.add("hidden-by-nav");

    sidebar?.classList.add("open");
    backdrop?.classList.add("open");
    document.body.style.overflow = "hidden";
    hamBtn?.setAttribute("aria-expanded", "true");
  }

  function _closeSidebar() {
    const sidebar = document.getElementById("mobileSidebar");
    const backdrop = document.getElementById("mobileNavBackdrop");
    const hamBtn = document.querySelector(".mobileHamBtn");
    document.getElementById("xc-trigger")?.classList.remove("hidden-by-nav");
    document.getElementById("xc-tip")?.classList.remove("hidden-by-nav");

    sidebar?.classList.remove("open");
    backdrop?.classList.remove("open");
    document.body.style.overflow = "";
    hamBtn?.setAttribute("aria-expanded", "false");
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") _closeSidebar();
  });
}
