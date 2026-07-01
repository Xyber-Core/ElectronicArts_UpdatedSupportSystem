/* ══════════════════════════════════════════════════════
 Game Support Item loader - [A script to load game support
 data into the cards]
 ══════════════════════════════════════════════════════ */
let initialized = false;
import { itemDataPromise } from '../ImportedScripts.js';
import { initMosaicHero } from '/SRC/JS/FixedScriptAssets/MiscellaneousScripts.js';

export async function initGameSupportPage() {
  let GAME_SUPPORT_DATA = null;
  if (initialized) return;
  initialized = true;
  /* ─────────────────────────────────────────────
     FETCH DATA
  ───────────────────────────────────────────── */
  try {
    const res = await itemDataPromise;
    if (!res.ok) throw new Error('Failed to load ItemData.json');

    const data = await res.json();
    GAME_SUPPORT_DATA = data.gameSupportItems;

    if (!GAME_SUPPORT_DATA) {
      console.warn('No gameSupportItems found in JSON');
      return;
    }
  } catch (err) {
    console.error('Game Support Init Error:', err);
    return;
  }
  let currentSearch = '';
  let currentTopic = null;
  let gamesVisible = 35;
  let isSearching = false;
  const MOSAIC_IMGS = [
    '/SRC/Assets/Images/StarWarsIcons/Jedi Survivor.webp',
    '/SRC/Assets/Images/StarWarsIcons/Jedi Fallen Order.webp',
    '/SRC/Assets/Images/StarWarsIcons/Star Wars Battlefront II.webp',
    '/SRC/Assets/Images/StarWarsIcons/Squadrons.webp',
    'https://cdn2.steamgriddb.com/thumb/ad016a70960849e9ee1e6a286bbba410.jpg',
    'https://cdn2.steamgriddb.com/thumb/5c1d8b6ff107dafb76906e0334e62a87.jpg',
    'https://cdn2.steamgriddb.com/thumb/a0b69c4d2b42a08d0e63facbd4f8ee34.jpg',
    'https://cdn2.steamgriddb.com/thumb/ca897e6a0038f36de238bd81b9ef17f9.jpg',
    'https://cdn2.steamgriddb.com/thumb/ad016a70960849e9ee1e6a286bbba410.jpg',
    'https://cdn2.steamgriddb.com/thumb/9f9a39a966782c30b1cad272678817f4.jpg',
    'https://cdn2.steamgriddb.com/thumb/c8a96ca4620cb058823b76fb3c6aa6e8.jpg',
    'https://cdn2.steamgriddb.com/thumb/07f4dafbc9293fa6c555be969dacf4ef.jpg',
    'https://help.ea.com/_images/seegk6e7ypwi/6gpdzMe7UOYdpLqPRkqZpp/0a543b117f22f4b0abf5c61570db3912/fc-26-box-art-image.webp',
    'https://cdn2.steamgriddb.com/thumb/ed699f1ad2b29cc7163de85ba523e413.jpg',
    'https://cdn2.steamgriddb.com/thumb/886f46b709dbf016d1b3b2b4205264bb.jpg',
    'https://cdn2.steamgriddb.com/thumb/d5f6c58dc97738436e47c9071d36b665.jpg',
  ];

  /* ─────────────────────────────────────────────
     UTILITIES
  ───────────────────────────────────────────── */

  const accentGradient = (accent) => `linear-gradient(160deg, ${accent}28 0%, #060b2f 100%)`;

  const imgWithFallback = (src, alt, cls, icon, accent = '#2962ff') => `
 \
    <img class="${cls}" src="${src}" alt="${alt}" loading="lazy"
         onerror="this.style.display='none'">
  `;

  /* ─────────────────────────────────────────────
     MODAL LOGIC
  ───────────────────────────────────────────── */

  function openModal(id, type) {
    const source = type === 'franchise' ? GAME_SUPPORT_DATA.franchiseItems : GAME_SUPPORT_DATA.platformItems;

    const entry = source?.find((x) => x.id === id);
    if (!entry) return;

    const games = entry.games || [];

    document.getElementById('modal-category-label').textContent = type === 'franchise' ? 'Franchise' : 'Platform';
    document.getElementById('modal-title').textContent = entry.name;
    document.getElementById('modal-count').textContent = `${games.length} game${games.length !== 1 ? 's' : ''} available`;
    document.getElementById('modal-accent').style.background = `linear-gradient(90deg, ${entry.accent || '#2962ff'}, transparent)`;

    const img = document.getElementById('modal-thumb');
    const fb = document.getElementById('modal-thumb-fallback');

    if (entry.img) {
      img.src = entry.img;
      img.style.display = 'block';
      fb.style.display = 'none';
    } else {
      img.style.display = 'none';
      fb.style.display = 'flex';
    }

    fb.style.background = accentGradient(entry.accent || '#2962ff');

    const icon = fb.querySelector('i');
    icon.className = `fa-solid ${entry.icon || 'fa-gamepad'}`;
    icon.style.color = entry.accent || '#2962ff';

    const grid = document.getElementById('modal-game-grid');

    grid.innerHTML = games
      .map(
        (g) => `
      <a 
      href="${g.url}" 
      target="_blank" 
      rel="noopener" 
      class="modal-game-card"
      >
        <div class="modal-game-img-wrap"
             style="background:${accentGradient(entry.accent || '#2962ff')}">
          <img class="modal-game-img" src="${g.img}" alt="${g.name}" loading="lazy">
        </div>
        <div class="modal-game-info">
          <div class="modal-game-title">${g.name}</div>
          <div class="modal-game-link">
            Get help <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </a>
    `,
      )
      .join('');

    document.getElementById('modal-backdrop').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('modal-backdrop').classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ─────────────────────────────────────────────
     RENDER TRENDING
  ───────────────────────────────────────────── */

  function renderTrending(items = []) {
    const grid = document.getElementById('trending-grid');
    if (!grid) return;

    grid.innerHTML = items
      .map(
        (g) => `
      <a 
      href="${g.url}" 
      target="_blank" 
      rel="noopener" 
      class="game-card"
      data-name="${g.name}"
      data-tags="trending"
      >
        ${imgWithFallback(g.img, g.name, 'game-card-img')}
        <span class="game-card-name">${g.name}</span>
        <span class="game-card-arrow">
          <i class="fa-solid fa-arrow-right"></i>
        </span>
      </a>
    `,
      )
      .join('');
  }

  /* ─────────────────────────────────────────────
     RENDER FRANCHISES
  ───────────────────────────────────────────── */

  function renderFranchises(items = []) {
    const grid = document.getElementById('franchise-grid');
    if (!grid) return;

    grid.innerHTML = items
      .map(
        (f) => `
      <div class="game-card franchise-card"
          data-id="${f.id}"
          data-type="franchise">

        ${imgWithFallback(f.img, f.name, 'game-card-img')}

        <span class="game-card-name">${f.name}</span>
      </div>
    `,
      )
      .join('');

    grid.querySelectorAll('.franchise-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal(card.dataset.id, 'franchise');
      });
    });
  }

  /* ─────────────────────────────────────────────
     RENDER PLATFORMS
  ───────────────────────────────────────────── */
  function renderPlatforms(items = []) {
    const grid = document.getElementById('platform-grid');
    if (!grid) return;

    grid.innerHTML = items
      .map(
        (g) => `
      <div class="game-card game-platform-card"
          data-id="${g.id}"
          data-type="platform">

        <div class="game-platform-icon-wrap">
          <i class="${g.icon || ''}"></i>
        </div>

        <span class="game-card-name">${g.name}</span>
      </div>
    `,
      )
      .join('');

    grid.querySelectorAll('.game-platform-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal(card.dataset.id, 'platform');
      });
    });
  }
  /* ─────────────────────────────────────────────
     EVENTS (MODAL)
  ───────────────────────────────────────────── */

  document.getElementById('modal-close').addEventListener('click', closeModal);

  document.getElementById('modal-backdrop').addEventListener('click', (e) => {
    if (e.target.id === 'modal-backdrop') closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ─────────────────────────────────────────────
     INIT RENDER
  ───────────────────────────────────────────── */

  renderTrending(GAME_SUPPORT_DATA.trendingItems || []);
  renderFranchises(GAME_SUPPORT_DATA.franchiseItems || []);
  renderPlatforms(GAME_SUPPORT_DATA.platformItems || []);

  window.EA_ALL_GAMES = [
    ...(GAME_SUPPORT_DATA.trendingItems || []).map((g) => ({
      name: g.name,
      img: g.img,
      url: g.url || '#',
    })),

    ...(GAME_SUPPORT_DATA.franchiseItems || []).flatMap((f) =>
      (f.games || []).map((g) => ({
        name: g.name,
        img: g.img,
        url: g.url || '#',
      })),
    ),

    ...(GAME_SUPPORT_DATA.platformItems || []).flatMap((p) =>
      (p.games || []).map((g) => ({
        name: g.name,
        img: g.img,
        url: g.url || '#',
      })),
    ),
  ];

  let gameSearchIndex = [];

  function buildGameSearchIndex() {
    gameSearchIndex = [];

    const seen = new Set();

    window.EA_ALL_GAMES.forEach((game) => {
      const key = game.name.toLowerCase();

      if (seen.has(key)) return;

      seen.add(key);

      gameSearchIndex.push({
        title: game.name,
        img: game.img,
        url: game.url || '#',
        tags: (game.tags || []).join(' '),
      });
    });

    console.log('Games indexed:', gameSearchIndex.length);
  }

  function searchGames(query = '') {
    query = query.trim().toLowerCase();

    if (!query) return [];

    return gameSearchIndex.filter((game) => 
    game.title.toLowerCase().includes(query) || 
    game.tags.toLowerCase().includes(query));
  }

  function renderGameResults(results) {
    const box = document.getElementById('game-search-results');

    if (!results.length) {
      box.innerHTML = `
      <div class="games-list-wrap">
            <div id="games-list" class="hidden"></div>
            <div class="no-results" id="no-results">
              <i class="fa-solid fa-comment-slash"></i>
              <h4>No games found</h4>
              <p>Try a different search term or clear the filter</p>
            </div>
          </div>
      `;
      return;
    }

    box.innerHTML = results
      .map(
        (game) => `
        <a class="modal-game-card" href="${game.url}">
          <div class="modal-game-img-wrap">
            <img class="modal-game-img" src="${game.img}" alt="${game.title}" loading="lazy">
          </div>
          <div class="modal-game-info">
            <div class="modal-game-title">${game.title}</div>
          </div>
        </a>
      `,
      )
      .join('');
  }

  function enterSearchMode() {
    document.getElementById('glassCard').classList.add('hidden');
    document.querySelector('.issuesCard').classList.add('hidden');
  }

  function exitSearchMode() {
    document.getElementById('glassCard').classList.remove('hidden');
    document.querySelector('.issuesCard').classList.remove('hidden');
    document.getElementById('game-search-results').classList.add('hidden');
  }

  function renderGames(items = GAME_SUPPORT_DATA.gameItems || []) {
    const list = document.getElementById('games-list');
    const noRes = document.getElementById('no-results');

    if (!list || !noRes) return;

    let games = Array.isArray(items) ? [...items] : Object.values(items || {});

    if (currentTopic) {
      games = games.filter((p) => p.topicId === currentTopic);
    }

    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase();
      games = games.filter((p) => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q) || p.user.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)));
    }

    noRes.classList.remove('visible');

    list.innerHTML = games
      .slice(0, gamesVisible)
      .map(
        (game) => `
      <a class="modal-game-card" href="${game.url}" target="_blank" rel="noopener">
        <div class="modal-game-img-wrap"
             style="background:linear-gradient(160deg,#2962ff28 0%,#060b2f 100%)">
          <img class="modal-game-img" src="${game.img}" alt="${game.name}" loading="lazy">
        </div>
        <div class="modal-game-info">
          <div class="modal-game-title">${game.name}</div>
          <div class="modal-game-link">
            Get help <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </a>
    `,
      )
      .join('');
  }

  const resultsPanel = document.createElement('div');
  resultsPanel.id = 'game-search-results';
  resultsPanel.className = 'glassCard game-search-results-card hidden';

  document.getElementById('gameMosaic').insertAdjacentElement('afterend', resultsPanel);

  initMosaicHero({
    containerId: 'gameMosaic',
    title: ' | Game Support',
    subtitle: 'Find help, guides, and known issues for your EA games.',
    placeholder: 'SEARCH EA GAME SUPPORT',
    images: MOSAIC_IMGS,

    onSearch: (query) => {
      const q = query.trim();
      currentSearch = q;
      if (!q) {
        exitSearchMode();
        renderGames(GAME_SUPPORT_DATA.gameItems);
        return;
      }
      enterSearchMode();
      const results = searchGames(q);
      resultsPanel.classList.remove('hidden');
      renderGameResults(results);
    },
  });
  buildGameSearchIndex();
}
