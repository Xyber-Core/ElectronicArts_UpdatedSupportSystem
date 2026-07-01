export function initMiscellaneousScripts() {
  /* ═══════════════════════════════════════════════════════
  ORB CANVAS - [A script to load an animated canvas logo
  for the navigation]
═══════════════════════════════════════════════════════ */

  function initOrb() {
    const canvas = document.getElementById('orb-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const W = 500;
    const H = 500;

    canvas.width = W;
    canvas.height = H;

    const cx = W / 2;
    const cy = H / 2;

    let t = 0;

    const shards = [];

    // ─────────────────────────────────────────────
    // LOGO IMAGE
    // ─────────────────────────────────────────────
    const logo = new Image();
    logo.src = '/SRC/Assets/Images/SiteIcons/OrbIcon.webp';

    // ─────────────────────────────────────────────
    // SHARDS
    // ─────────────────────────────────────────────
    for (let i = 0; i < 42; i++) {
      shards.push({
        angle: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.7,
        dist: 80 + Math.random() * 160,
        size: 0.8 + Math.random() * 2.8,
        a: 0.35 + Math.random() * 0.55,
        drift: (Math.random() - 0.5) * 0.007,
      });
    }

    // ─────────────────────────────────────────────
    // DRAW LOOP
    // ─────────────────────────────────────────────
    function drawOrb() {
      ctx.clearRect(0, 0, W, H);

      t += 0.012;

      const pulse = 0.85 + 0.15 * Math.sin(t * 0.8);

      // ═══════════════════════════════════════
      // OUTER HAZE
      // ═══════════════════════════════════════
      for (let r = 230; r >= 130; r -= 20) {
        const g = ctx.createRadialGradient(cx, cy, r - 20, cx, cy, r);
        g.addColorStop(0, 'transparent');
        g.addColorStop(1, `rgba(41,98,255,${((230 - r) / 230) * 0.06})`);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // ═══════════════════════════════════════
      // MAIN GLOW
      // ═══════════════════════════════════════
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 125);
      glow.addColorStop(0, `rgba(120,180,255,${0.22 * pulse})`);
      glow.addColorStop(0.3, `rgba(59,130,246,${0.55 * pulse})`);
      glow.addColorStop(0.65, `rgba(41,98,255,${0.38 * pulse})`);
      glow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 125, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // ═══════════════════════════════════════
      // CORE SPHERE
      // ═══════════════════════════════════════
      const core = ctx.createRadialGradient(cx - 16, cy - 16, 0, cx, cy, 84);
      core.addColorStop(0, `rgba(200,230,255,${0.9 * pulse})`);
      core.addColorStop(0.2, `rgba(120,180,255,${0.85 * pulse})`);
      core.addColorStop(0.55, `rgba(59,130,246,${0.7 * pulse})`);
      core.addColorStop(0.85, `rgba(20,50,180,${0.55 * pulse})`);
      core.addColorStop(1, `rgba(10,20,80,${0.4 * pulse})`);
      ctx.beginPath();
      ctx.arc(cx, cy, 84, 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.fill();

      // ═══════════════════════════════════════
      // LIGHT RAYS
      // ═══════════════════════════════════════
      for (let i = 0; i < 8; i++) {
        const a = t * 0.28 + (i / 8) * Math.PI * 2;
        const len = 110 + 38 * Math.sin(t * 0.5 + i);
        const gr = ctx.createLinearGradient(cx, cy, cx + Math.cos(a) * (84 + len), cy + Math.sin(a) * (84 + len));
        gr.addColorStop(0, `rgba(59,130,246,${0.26 * pulse})`);
        gr.addColorStop(0.4, `rgba(59,130,246,${0.1 * pulse})`);
        gr.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * 76, cy + Math.sin(a) * 76);
        ctx.lineTo(cx + Math.cos(a) * (84 + len), cy + Math.sin(a) * (84 + len));
        ctx.strokeStyle = gr;
        ctx.lineWidth = 2 + Math.sin(t + i);
        ctx.stroke();
      }

      // ═══════════════════════════════════════
      // LOGO IMAGE
      // ═══════════════════════════════════════
      if (logo.complete) {
        ctx.save();
        ctx.globalAlpha = 0.95 * pulse;
        ctx.shadowColor = 'rgba(150,200,255,0.95)';
        ctx.shadowBlur = 24;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // MAX SIZE
        const maxWidth = 140;
        const maxHeight = 140;

        // ORIGINAL IMAGE SIZE
        const imgW = logo.width;
        const imgH = logo.height;

        // SCALE PRESERVING ASPECT RATIO
        const scale = Math.min(maxWidth / imgW, maxHeight / imgH);

        const drawW = imgW * scale;
        const drawH = imgH * scale;

        ctx.drawImage(logo, cx - drawW / 1.95, cy - drawH / 2, drawW, drawH);

        ctx.restore();
      }

      // ═══════════════════════════════════════
      // ORBITING SHARDS
      // ═══════════════════════════════════════
      for (const s of shards) {
        s.angle += s.drift;

        const sx = cx + Math.cos(s.angle + t * s.speed * 0.04) * s.dist;

        const sy = cy + Math.sin(s.angle + t * s.speed * 0.04) * s.dist * 0.58;

        ctx.beginPath();

        ctx.arc(sx, sy, s.size, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(120,190,255,${s.a * (0.5 + 0.5 * Math.sin(t * 0.9 + s.angle))})`;

        ctx.fill();
      }

      requestAnimationFrame(drawOrb);
    }

    // ─────────────────────────────────────────────
    // START ANIMATION
    // ─────────────────────────────────────────────
    const start = () => drawOrb();

    if (logo.complete) {
      start();
    } else {
      logo.onload = start;
    }
  }

  /* ═══════════════════════════════════════════════════════
  Background Particles - [This script creates a animated 
  wallpaper that has consistent moving particles]
═══════════════════════════════════════════════════════ */
  function initBackground() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let W,
      H,
      particles = [],
      streaks = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 110; i++) {
      particles.push({
        x: Math.random() * 1800,
        y: Math.random() * 1100,
        r: Math.random() * 1.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        a: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        ps: 0.012 + Math.random() * 0.018,
      });
    }

    function newStreak() {
      return {
        x: Math.random() * 1800,
        y: Math.random() * 1000,
        len: 70 + Math.random() * 200,
        angle: -0.35 + Math.random() * 0.25,
        vx: 0.4 + Math.random() * 0.6,
        vy: -0.1 + Math.random() * 0.2,
        a: 0.04 + Math.random() * 0.11,
        w: 0.7 + Math.random() * 1.3,
      };
    }
    for (let i = 0; i < 14; i++) streaks.push(newStreak());

    (function draw() {
      ctx.clearRect(0, 0, W, H);

      // nebula glow
      const g1 = ctx.createRadialGradient(W * 0.78, H * 0.18, 0, W * 0.78, H * 0.18, W * 0.65);
      g1.addColorStop(0, 'rgba(17,28,104,0.28)');
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(W * 0.1, H * 0.85, 0, W * 0.1, H * 0.85, W * 0.4);
      g2.addColorStop(0, 'rgba(6,11,47,0.22)');
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // streaks
      for (const s of streaks) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x > W + 250) Object.assign(s, newStreak(), { x: -250 });
        const sg = ctx.createLinearGradient(s.x, s.y, s.x + Math.cos(s.angle) * s.len, s.y + Math.sin(s.angle) * s.len);
        sg.addColorStop(0, 'transparent');
        sg.addColorStop(0.5, `rgba(59,130,246,${s.a})`);
        sg.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + Math.cos(s.angle) * s.len, s.y + Math.sin(s.angle) * s.len);
        ctx.strokeStyle = sg;
        ctx.lineWidth = s.w;
        ctx.stroke();
      }

      // particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.ps;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,160,255,${p.a * (0.6 + 0.4 * Math.sin(p.pulse))})`;
        ctx.fill();
      }

      requestAnimationFrame(draw);
    })();
  }

  /* ═══════════════════════════════════════
COOKIE MODAL
═══════════════════════════════════════ */

function isMobile() {
  return window.matchMedia("(max-width: 639px)").matches;
}

  function initCookieModal() {
    if (document.getElementById('cookie-modal')) return;

    document.body.insertAdjacentHTML(
      'beforeend',
      `
<div class="cookie-modal-backdrop siteModal" id="cookie-modal">

  <div class="cookie-modal">

    <div class="cookie-modal-header">

      <div class="cookie-modal-title-wrap">

        <img src="https://help.ea.com/_images/seegk6e7ypwi/1oOwiLvCsh6G19wJmFCOjD/2074ade58bf8abcd6b99ef711a7a53c0/privacyChoices.svg" alt="" loading="lazy"/>

        <div>
          <span class="cookie-label">Privacy Settings</span>
          <h3>Your Privacy Choices</h3>
        </div>

      </div>

      <button class="siteBtn close" id="cookie-close">
        <i class="fa-solid fa-xmark"></i>
      </button>

    </div>

    <div class="cookie-modal-body">

      <p class="cookie-description">
        Manage how your information is collected and used across the platform.
      </p>

      <div class="cookie-option">
        <div>
          <h4>Essential Cookies</h4>
          <p>Required for security and functionality.</p>
        </div>

        <label class="switch">
          <input type="checkbox" checked disabled />
          <span class="slider"></span>
        </label>
      </div>

      <div class="cookie-option">
        <div>
          <h4>Analytics Cookies</h4>
          <p>Help improve site performance.</p>
        </div>

        <label class="switch">
          <input type="checkbox" />
          <span class="slider"></span>
        </label>
      </div>

      <div class="cookie-option">
        <div>
          <h4>Personalization</h4>
          <p>Personalized recommendations and content.</p>
        </div>

        <label class="switch">
          <input type="checkbox" />
          <span class="slider"></span>
        </label>
      </div>

    </div>

    <div class="cookie-modal-footer">

      <button class="siteBtn btnSecondary" id="cookie-cancel">
        Cancel
      </button>

      <button class="siteBtn btnPrimary" id="cookie-save">
        Save Preferences <i class="fa-solid fa-floppy-disk"></i>
      </button>

    </div>

  </div>

</div>
`,
    );

    // ─────────────────────────────────────
    // STORAGE
    // ─────────────────────────────────────
    const COOKIE_KEY = 'cookie-preferences';

    const DEFAULTS = {
      analytics: true,
      personalization: false,
    };

    function loadPreferences() {
      const saved = localStorage.getItem(COOKIE_KEY);
      return saved ? JSON.parse(saved) : { ...DEFAULTS };
    }

    function savePreferences(state) {
      localStorage.setItem(COOKIE_KEY, JSON.stringify(state));
    }

    function applyPreferences(state, modal) {
      const inputs = modal.querySelectorAll("input[type='checkbox']");

      inputs[0].checked = true; // essential (locked)
      inputs[1].checked = state.analytics;
      inputs[2].checked = state.personalization;
    }

    function readPreferences(modal) {
      const inputs = modal.querySelectorAll("input[type='checkbox']");

      return {
        analytics: inputs[1].checked,
        personalization: inputs[2].checked,
      };
    }

    // ─────────────────────────────────────
    // ELEMENTS
    // ─────────────────────────────────────
    const cookieBtn = document.querySelector('.footer__cookie-preferences');
    const cookieModal = document.getElementById('cookie-modal');
    const cookieClose = document.getElementById('cookie-close');
    const cookieCancel = document.getElementById('cookie-cancel');
    const cookieSave = document.getElementById('cookie-save');

    let lastSavedState = loadPreferences();

    cookieModal.classList.remove('open');

    // ─────────────────────────────────────
    // OPEN (load saved state each time)
    // ─────────────────────────────────────
cookieBtn?.addEventListener('click', () => {
  if (isMobile()) {
    window.location.href = "/SRC/HTML/Pages/Placeholder.html";
    return;
  }

  applyPreferences(lastSavedState, cookieModal);
  cookieModal.classList.add('open');
});
    // ─────────────────────────────────────
    // CLOSE HELPERS
    // ─────────────────────────────────────
    function closeModal() {
      cookieModal.classList.remove('open');
    }

    function closeWithoutSaving() {
      applyPreferences(lastSavedState, cookieModal);
      closeModal();
    }

    // ─────────────────────────────────────
    // SAVE
    // ─────────────────────────────────────
    cookieSave?.addEventListener('click', () => {
      const newState = readPreferences(cookieModal);

      lastSavedState = newState;
      savePreferences(newState);

      closeModal();
    });

    // ─────────────────────────────────────
    // CANCEL (revert changes)
    // ─────────────────────────────────────
    cookieCancel?.addEventListener('click', closeWithoutSaving);
    cookieClose?.addEventListener('click', closeWithoutSaving);

    cookieModal?.addEventListener('click', (e) => {
      if (e.target === cookieModal) {
        closeWithoutSaving();
      }
    });
  }

  /* ═══════════════════════════════════════
   Language System
═══════════════════════════════════════ */

  const translations = {
    en: {
      hero_title: 'Welcome Back',
      hero_sub: 'Find help for your EA experience',
      nav_cases: 'My Cases',
    },

    aurebesh: {
      hero_title: 'WELCOME BACK',
      hero_sub: 'FIND HELP FOR YOUR EA EXPERIENCE',
      nav_cases: 'MY CASES',
    },
  };

  function initLanguageSystem() {
    /* ───────────────────────────────────
     Mobile Modal
  ─────────────────────────────────── */

    if (!document.getElementById('language-modal')) {
      document.body.insertAdjacentHTML(
        'beforeend',
        `
      <div class="siteModal language-modal-backdrop" id="language-modal">
        <div class="language-modal">
          <div class="language-modal-header">
            <h3>Language & Region</h3>

            <button class="siteBtn close">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div class="language-modal-body">
            <button class="language-option" data-language="en">
              English
            </button>

            <button class="language-option" data-language="aurebesh">
              Aurebesh
            </button>
          </div>
        </div>
      </div>
      `,
      );
    }

    const modal = document.getElementById('language-modal');
    const trigger = document.getElementById('language-modal-trigger');
    const close = modal?.querySelector('.close');

    trigger?.addEventListener('click', () => {
      modal?.classList.add('open');
    });

    close?.addEventListener('click', () => {
      modal?.classList.remove('open');
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });

    /* ───────────────────────────────────
     Load Saved Language
  ─────────────────────────────────── */

    const savedLang = localStorage.getItem('ea-language') || 'en';

    /* ───────────────────────────────────
     Desktop Custom Dropdown
  ─────────────────────────────────── */

    const select = document.getElementById('language-select');
    const langWrapper = document.querySelector('.langSelectWrapper');
    const customSelect = langWrapper?.querySelector('.langCustomSelect');
    const customTrigger = langWrapper?.querySelector('.langCustomSelectTrigger');
    const selectedText = langWrapper?.querySelector('.langSelectedText');
    const customOptions = langWrapper?.querySelectorAll('.langCustomOption');

    if (select) {
      select.value = savedLang;
    }

    if (selectedText && customOptions?.length) {
      const activeOption = [...customOptions].find((option) => option.dataset.value === savedLang);

      if (activeOption) {
        selectedText.textContent = activeOption.textContent.trim();

        customOptions.forEach((option) => option.classList.remove('selected'));
        activeOption.classList.add('selected');
      }
    }

    applyLanguage(savedLang);

    customTrigger?.addEventListener('click', (e) => {
      e.stopPropagation();

      document.querySelectorAll('.langCustomSelect.open').forEach((dropdown) => {
        if (dropdown !== customSelect) {
          dropdown.classList.remove('open');
        }
      });

      customSelect?.classList.toggle('open');
    });

    customOptions?.forEach((option) => {
      option.addEventListener('click', () => {
        const lang = option.dataset.value;
        const label = option.textContent.trim();

        if (!lang) return;

        localStorage.setItem('ea-language', lang);

        if (select) {
          select.value = lang;

          select.dispatchEvent(new Event('change', { bubbles: true }));
        }

        if (selectedText) {
          selectedText.textContent = label;
        }

        customOptions.forEach((opt) => opt.classList.remove('selected'));
        option.classList.add('selected');

        customSelect?.classList.remove('open');
      });
    });

    // keep hidden select functional if changed elsewhere in JS
    if (select) {
      select.addEventListener('change', () => {
        const lang = select.value;
        localStorage.setItem('ea-language', lang);
        applyLanguage(lang);

        if (selectedText && customOptions?.length) {
          const activeOption = [...customOptions].find((option) => option.dataset.value === lang);

          if (activeOption) {
            selectedText.textContent = activeOption.textContent.trim();

            customOptions.forEach((option) => option.classList.remove('selected'));
            activeOption.classList.add('selected');
          }
        }

        customSelect?.classList.remove('open');
      });
    }

    // close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (customSelect && !customSelect.contains(e.target)) {
        customSelect.classList.remove('open');
      }
    });

    // keyboard accessibility
    customTrigger?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        customSelect?.classList.add('open');
      }

      if (e.key === 'Escape') {
        customSelect?.classList.remove('open');
      }
    });

    /* ───────────────────────────────────
     Mobile Modal Options
  ─────────────────────────────────── */

    document.querySelectorAll('.language-option').forEach((button) => {
      button.addEventListener('click', () => {
        const lang = button.dataset.language;
        if (!lang) return;

        localStorage.setItem('ea-language', lang);

        if (select) {
          select.value = lang;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        } else {
          applyLanguage(lang);
        }

        modal?.classList.remove('open');
      });
    });
  }

  /* ═══════════════════════════════════════
   Apply Language
═══════════════════════════════════════ */

  function applyLanguage(lang) {
    const data = translations[lang];
    if (!data) return;

    document.querySelectorAll('[data-lang]').forEach((el) => {
      const key = el.dataset.lang;

      if (data[key]) {
        el.textContent = data[key];
      }
    });

    document.body.classList.toggle('aurebesh-mode', lang === 'aurebesh');
  }
  /* ═══════════════════════════════════════
   SelectMenu Listeners for Mobile
═══════════════════════════════════════ */
  function initSelectmenuLoader() {
    document.addEventListener('click', (e) => {
      const footerHeader = e.target.closest('.footer-col p');
      if (footerHeader) {
        footerHeader.parentElement.classList.toggle('open');
        return;
      }

      const topicHeader = e.target.closest('.mobile-topic-menu p');
      if (topicHeader) {
        topicHeader.parentElement.classList.toggle('open');
      }
    });
  }

  function initPrimarySearch() {
    let ITEM_DATA = null;
    const searchIndex = [];

    const content = document.querySelector('.content');
    const catNav = document.querySelector('.cat-nav');
    const subNav = document.querySelector('.sub-nav-wrap');
    const footer = document.querySelector('footer');
    const input = document.getElementById('searchInput');
    const box = document.getElementById('search-results');

    if (!input || !box) return;

    fetch('/SRC/JSON/ItemData.json')
      .then((r) => r.json())
      .then((data) => {
        ITEM_DATA = data;
        buildIndex();
      });

    function buildIndex() {
      searchIndex.length = 0;

      ITEM_DATA?.gameSupportItems?.gameItems?.forEach((game) => {
        game.games?.forEach((game) => {
          searchIndex.push({
            type: 'games',
            title: game.name,
            content: game.tags?.join(' ') || '',
            data: game,
          });
        });
      });

      ITEM_DATA.gameSupportItems?.franchiseItems?.forEach((franchise) => {
        franchise.games?.forEach((game) => {
          searchIndex.push({
            type: 'games',
            title: game.name,
            content: game.tags?.join(' ') || '',
            data: game,
          });
        });
      });

      ITEM_DATA.accountItems?.sections?.forEach((section) => {
        section.topics?.forEach((topic) => {
          searchIndex.push({
            type: 'account',
            title: topic.text,
            content: section.name || '',
            data: topic,
          });
        });
      });

      ITEM_DATA.platformItems?.sections?.forEach((section) => {
        section.topics?.forEach((topic) => {
          searchIndex.push({
            type: 'platform',
            title: topic.text,
            content: section.name || '',
            data: topic,
          });
        });
      });

      ITEM_DATA.accountItems?.articles?.forEach((article) => {
        searchIndex.push({
          type: 'articles',
          title: article.text,
          content: '',
          data: article,
        });
      });

      ITEM_DATA.platformItems?.articles?.forEach((article) => {
        searchIndex.push({
          type: 'articles',
          title: article.text,
          content: '',
          data: article,
        });
      });
    }

    function search(query) {
      query = (query || '').toLowerCase();
      return searchIndex.filter((item) => item.title?.toLowerCase().includes(query) || item.content?.toLowerCase().includes(query));
    }

    function render(results, query) {
      const sections = {
        games: box.querySelector('[data-type="games"] ul'),
        account: box.querySelector('[data-type="account"] ul'),
        platform: box.querySelector('[data-type="platform"] ul'),
        articles: box.querySelector('[data-type="articles"] ul'),
      };

      Object.values(sections).forEach((ul) => {
        if (ul) ul.innerHTML = '';
      });

      const grouped = {
        games: [],
        account: [],
        platform: [],
        articles: [],
      };

      results.forEach((r) => grouped[r.type]?.push(r));

      Object.entries(grouped).forEach(([type, items]) => {
        const ul = sections[type];
        if (!ul) return;

        if (!items.length) {
          ul.innerHTML = `<li class="no-results-item">No results</li>`;
          return;
        }

        items.forEach((item) => {
          const li = document.createElement('li');
          li.innerHTML = `
  <a class="result-link" href="${item.data.url || '#'}">

    <span class="result-icon">
      ${item.data.img ? `<img src="${item.data.img}" alt="" loading="lazy"/>` : getIcon(item.type)}
    </span>

    <div class="result-main">
      <div class="result-title">
        ${item.title}
      </div>
    </div>

  </a>
`;
          ul.appendChild(li);
        });
      });
    }

    function getIcon(type) {
      switch (type) {
        case 'games':
          return '🎮';
        case 'account':
          return '👤';
        case 'platform':
          return '🧩';
        case 'articles':
          return '📄';
        default:
          return '🔎';
      }
    }

    input.addEventListener('input', () => {
      const q = input.value.trim();
      const results = search(q);

      const active = q.length > 0;

      document.body.classList.toggle('search-active', active);

      content?.classList.toggle('hidden', active);
      catNav?.classList.toggle('hidden', active);
      subNav?.classList.toggle('hidden', active);
      footer?.classList.toggle('hidden', active);

      box.classList.toggle('hidden', !active);

      if (!active) return;

      render(results, q);
    });
  }

  function initIssuesCard() {
    const issuesCard = document.querySelector('.issuesCard');
    if (!issuesCard) return;

    issuesCard.innerHTML = `
      <div class="issuesCard__icon">
    <i class="fa-solid fa-headset"></i>
  </div>

  <h2 class="issuesCard__title">
    Still Having Issues?
  </h2>

  <p class="issuesCard__subtitle">
    Get in touch with our customer support team for more help.
  </p>

  <div class="issuesCard__actions">
    <a href="/SRC/HTML/Pages/Placeholder.html" class="siteBtn btnPrimary">
    <i class="fa-solid fa-comment-dots"></i>
      Contact Us
    </a>

    <a href="/SRC/HTML/Pages/MyCases.html" class=" siteBtn btnSecondary">
    <i class="fa-solid fa-briefcase"></i>
      View My Cases
    </a>
  </div>
    `;
  }

  (function () {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07 },
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  })();
  initIssuesCard();
  initPrimarySearch();
  initSelectmenuLoader();
  initOrb();
  initBackground();
  initCookieModal();
  initLanguageSystem();
}

/* ═══════════════════════════════════════
   Mosaic Hero
═══════════════════════════════════════ */

const EA_LOGO = `<svg fill="currentColor" viewBox="0 0 41 40"
  xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
  height="44" width="44" style="fill:currentColor">
  <path clip-rule="evenodd" fill-rule="evenodd"
    d="M20.5 40C31.5457 40 40.5 31.0457 40.5 20C40.5 8.9543 31.5457 0 20.5
       0C9.4543 0 0.5 8.9543 0.5 20C0.5 31.0457 9.4543 40 20.5 40ZM8.36931
       18.583H20.017L18.2273 21.4453H12.6307L10.8693 24.1377H19.0795L26.3807
       13L35.5 27H32.0625L30.2443 24.1377H24.9318L26.6932 21.4453H28.3977L26.3807
       18.583L20.6989 27H5.5L9.10796 21.4453H6.49432L8.36931 18.583ZM12.0909
       13H23.9943L22.233 15.9474H10.2727L12.0909 13Z"/>
</svg>`;

export function initMosaicHero({ containerId, title = 'EA Help', showLogo = true, logoSvg = EA_LOGO, subtitle = '', placeholder = 'SEARCH', images = [], cellCount = 16, debounceMs = 200, onSearch } = {}) {
  /* ── Validate container ───────────────────────────────────── */
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`[MosaicHero] No element with id="${containerId}" found.`);
    return null;
  }

  /* ── Scoped element IDs  (safe on pages with multiple heroes) */
  const uid = containerId.replace(/[^a-z0-9]/gi, '-');
  const ID = {
    mosaic: `mh-${uid}-mosaic`,
    input: `mh-${uid}-input`,
    clear: `mh-${uid}-clear`,
  };
  /* ── Inject HTML ──────────────────────────────────────────── */
  container.innerHTML = `
    <div class="mosaicHeadMain" id="${ID.mosaic}"></div>
    <div class="mosaicHead-overlay"></div>
    <div class="mosaicHead-content">
      <div class="mosaicHead-brand">
        <div class="mosaicHead-title">
          ${showLogo ? logoSvg : ''}${title}
        </div>
      </div>
      ${subtitle ? `<p class="mosaicHead-sub">${subtitle}</p>` : ''}
      <div class="mosaicSearchWrap">
        <div class="mosaicSearchBar">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            id="${ID.input}"
            placeholder="${placeholder.toUpperCase()}"
            autocomplete="off"
            aria-label="${placeholder}"
          />
          <button class="search-clear-btn" id="${ID.clear}" aria-label="Clear search">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  /* ── Mosaic tiles ─────────────────────────────────────────── */
  const mosaicEl = document.getElementById(ID.mosaic);
  if (mosaicEl && images.length) {
    mosaicEl.innerHTML = Array.from({ length: cellCount }, (_, i) => {
      const src = images[i % images.length];
      return `<div class="mosaic-cell">
        <img src="${src}" alt="" loading="lazy">
      </div>`;
    }).join('');
  }
  /* ── Search handling ──────────────────────────────────────── */
  const inputEl = document.getElementById(ID.input);
  const clearEl = document.getElementById(ID.clear);

  if (!inputEl) return null;

  /**
   * Normalize and fire the search callback.
   * query is ALWAYS lowercased — comparisons are never case-sensitive.
   */
  const fire = () => {
    const raw = inputEl.value;
    const query = raw.trim().toLowerCase();
    clearEl.classList.toggle('visible', query.length > 0);
    onSearch?.(query, raw.trim());
  };

  let debounceTimer;
  inputEl.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(fire, debounceMs);
  });

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      clearTimeout(debounceTimer);
      fire();
    }
  });

  clearEl.addEventListener('click', () => {
    inputEl.value = '';
    clearEl.classList.remove('visible');
    onSearch?.('', '');
  });

  /* ── Public API ───────────────────────────────────────────── */
  return {
    /** Trimmed + lowercase — use for comparisons */
    getQuery: () => inputEl.value.trim().toLowerCase(),
    /** Trimmed, original casing — use for display */
    getRaw: () => inputEl.value.trim(),
    /** Clear input and fire onSearch('', '') */
    clear: () => {
      inputEl.value = '';
      clearEl.classList.remove('visible');
      onSearch?.('', '');
    },
  };
}
