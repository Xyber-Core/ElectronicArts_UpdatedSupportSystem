import { itemDataPromise } from '../ImportedScripts.js';
import { initMosaicHero } from '/SRC/JS/FixedScriptAssets/MiscellaneousScripts.js';

/* ── ForumSupport.js ─────────────────────────────────────────── */

export async function initForumSupport() {
  const postsList = document.getElementById('posts-list');
  const filterTabs = document.getElementById('filter-tabs');
  const postsShowMore = document.getElementById('posts-show-more');
  const topicsShowMore = document.getElementById('topics-show-more');
  const modal = document.getElementById('post-modal');
  const modalClose = document.querySelector('.close');

  if (!postsList) return;
  /* ==========================================
     ALL FORUM DATA
  ========================================== */
  const TAG_LABELS = {
    crashing: 'Crashing',
    launching: 'Launching',
    pc: 'PC',
    update: 'Update',
    help: 'Can you help',
    discussion: 'Discussion',
    bug: 'Bug Report',
    guide: 'Guide',
    console: 'Console',
    mac: 'Mac',
    solution: 'Solution',
    mobile: 'Mobile',
    billing: 'Billing',
    account: 'Account',
  };

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

  const tagHTML = (t) => `<span class="post-tag ${t}">${TAG_LABELS[t] || t}</span>`;
  /* ==========================================
     ALL FORUM VARIABLES
  ========================================== */

  let currentSort = 'newest';
  let currentTopic = null;
  let postsVisible = 5;
  let topicsExpanded = false;
  let FORUM_SUPPORT_DATA = null;

  try {
    const res = await itemDataPromise;
    if (!res.ok) throw new Error('Failed to load ItemData.json');

    const data = await res.json();
    FORUM_SUPPORT_DATA = data.forumSupportItems;

    if (!FORUM_SUPPORT_DATA) {
      console.warn('No forumSupportItems found');
      return;
    }
  } catch (err) {
    console.error('Forum Support Init Error:', err);
    return;
  }

  renderTopics(FORUM_SUPPORT_DATA.topicItems || []);
  renderFeatured(FORUM_SUPPORT_DATA.featuredItems || []);
  renderPosts(FORUM_SUPPORT_DATA.postItems || []);

  /* ==========================================
     ALL FORUM FUNCTIONS
  ========================================== */

  function filterByTopic(topicId) {
    currentTopic = topicId;
    postsVisible = 5;
    renderPosts();
    updateTopicFilterLabel();
  }
  function openPostModal(post) {
    const thumbHTML = post.thumb ? `<img src="${post.thumb}" alt="${post.title}" loading="lazy" class="modal-thumb">` : '';

    modal.querySelector('.modal-user').innerHTML = `
    <div class="modal-avatar"
         style="
           background:${post.color}22;
           border-color:${post.color}55;
           color:${post.color};
         ">
      ${post.initials}
    </div>

    <div class="modal-user-details">
      <div class="modal-username">${post.user}</div>
      <div class="modal-role ${post.role}">
        ${post.roleLabel}
      </div>
    </div>
  `;

    modal.querySelector('.modal-image-wrap').innerHTML = thumbHTML;
    modal.querySelector('.modal-title').textContent = post.title;
    modal.querySelector('.modal-tags').innerHTML = post.tags.map(tagHTML).join('');
    modal.querySelector('.modal-content').innerHTML = `<p>${post.content}</p>`;

    modal.querySelector('.modal-stats').innerHTML = `
    ${
      post.hasSolution
        ? `
      <span class="post-stat solved">
        <i class="fa-solid fa-circle-check"></i>
        Solved
      </span>
    `
        : ''
    }

    <span class="post-stat">
      <i class="fa-regular fa-calendar"></i>
      ${post.date}
    </span>

    <span class="post-stat">
      <i class="fa-regular fa-thumbs-up"></i>
      ${post.likes}
    </span>

    <span class="post-stat">
      <i class="fa-regular fa-eye"></i>
      ${post.views.toLocaleString()}
    </span>

    <span class="post-stat">
      <i class="fa-regular fa-comment"></i>
      ${post.replies}
    </span>
  `;

    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    modal.classList.add('open');
  }

  function closeModal() {
    modal.classList.remove('open');
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  }

  function renderFeatured(items = []) {
    const grid = document.getElementById('featured-grid');
    if (!grid) return;

    grid.innerHTML = items
      .map(
        (f) => `
    <a href="${f.url}" target="_blank" class="featured-item">
      <div class="featured-item-title">${f.title}</div>
      <div class="featured-item-author">${f.author}</div>
    </a>
  `,
      )
      .join('');
  }

  function renderTopics(items = []) {
    const grid = document.getElementById('topics-grid');
    const btn = document.getElementById('topics-show-more');
    if (!grid) return;

    const shouldCollapse = !topicsExpanded;

    const visibleItems = shouldCollapse ? items.slice(0, 4) : items;

    grid.innerHTML = visibleItems
      .map(
        (t) => `
      <div class="topic-tile" data-id="${t.id}">
        <img src="${t.img}" alt="${t.name}" loading="lazy" />
        <span class="topic-tile-name">${t.name}</span>
      </div>
    `,
      )
      .join('');

    grid.querySelectorAll('.topic-tile').forEach((card) => {
      card.addEventListener('click', () => {
        grid.querySelectorAll('.topic-tile').forEach((t) => t.classList.remove('active'));
        card.classList.add('active');
        filterByTopic(card.dataset.id);
      });
    });
    // IMPORTANT: button logic (prevents “disappearing” feeling)
    if (btn) {
      const hasMore = items.length > 4;

      btn.style.display = hasMore ? 'flex' : 'none';

      btn.innerHTML = topicsExpanded ? `<i class="fa-solid fa-chevron-up"></i>` : `<i class="fa-solid fa-chevron-down"></i>`;
    }
  }

  function filterForumPosts(query) {
    query = query.trim().toLowerCase();

    const resultsPanel = document.getElementById('forum-search-results');
    const forumsContent = document.getElementById('forum-content');

    if (!resultsPanel || !forumsContent) {
      console.warn('Search containers missing in DOM');
      return;
    }

    if (!query) {
      resultsPanel.innerHTML = '';
      resultsPanel.style.display = 'none';
      forumsContent.style.display = 'flex';
      return;
    }

    const posts = FORUM_SUPPORT_DATA?.postItems || [];
    const matches = posts.filter((post) => {
      const topic = FORUM_SUPPORT_DATA.topicItems.find((t) => t.id === post.topicId);

      return post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query) || post.user.toLowerCase().includes(query) || post.tags.some((tag) => (TAG_LABELS[tag] || tag).toLowerCase().includes(query)) || topic?.name.toLowerCase().includes(query);
    });
    forumsContent.style.display = 'none';
    resultsPanel.style.display = 'block';

    if (matches.length === 0) {
      resultsPanel.innerHTML = `
      <div class="no-results visible">
        <h4>No posts found</h4>
        <p>No results for "<strong>${query}</strong>"</p>
      </div>
    `;
      return;
    }

    resultsPanel.innerHTML = `
    <div class="search-results-label">
      ${matches.length} result(s) for "<strong>${query}</strong>"
    </div>

    <div class="forum-search-grid">
      ${matches
        .map(
          (post) => `
        <div class="post-card-new" data-id="${post.id}">
          <div class="post-avatar-new"
            style="background:${post.color}22;border-color:${post.color}55;color:${post.color}">
            ${post.initials}
          </div>

          <div class="post-body-new">
            <div class="post-title-new">${post.title}</div>
            <div class="post-content-new">
              ${post.content.slice(0, 120)}...
            </div>
          </div>
        </div>
      `,
        )
        .join('')}
    </div>
  `;

    resultsPanel.querySelectorAll('.post-card-new').forEach((card, i) => {
      card.style.animationDelay = `${i * 28}ms`;
      card.addEventListener('click', () => {
        const post = FORUM_SUPPORT_DATA.postItems.find((p) => p.id === card.dataset.id);
        if (post) openPostModal(post);
      });
    });
  }

  function updateTopicFilterLabel() {
    const lbl = document.getElementById('gamesFilterLabel');
    if (!lbl) return;
    lbl.classList.add('fading');
    setTimeout(() => {
      if (currentTopic) {
        const t = FORUM_SUPPORT_DATA.topicItems.find((x) => x.id === currentTopic);
        lbl.innerHTML = `Showing: <span>${t ? t.name : currentTopic}</span>`;
      } else {
        lbl.textContent = 'All Games';
      }
      lbl.classList.remove('fading');
    }, 150);
  }

  function renderPosts(items = FORUM_SUPPORT_DATA.postItems) {
    const list = document.getElementById('posts-list');
    const noRes = document.getElementById('no-results');
    const showMore = document.getElementById('posts-show-more');

    if (!list) return;

    let posts = [...items];

    if (currentTopic) {
      posts = posts.filter((p) => p.topicId === currentTopic);
    }

    if (currentSort === 'likes') posts.sort((a, b) => b.likes - a.likes);
    if (currentSort === 'views') posts.sort((a, b) => b.views - a.views);
    if (currentSort === 'replies') posts.sort((a, b) => b.replies - a.replies);

    const visible = posts.slice(0, postsVisible);

    if (posts.length === 0) {
      list.innerHTML = '';
      noRes.classList.add('visible');
      showMore.style.display = 'none';
      return;
    }

    noRes.classList.remove('visible');
    showMore.style.display = posts.length > postsVisible ? 'flex' : 'none';

    list.innerHTML = visible
      .map(
        (p) => `
    <div class="post-card-new" data-id="${p.id}">
      <div class="post-avatar-new"
        style="background:${p.color}22;border-color:${p.color}55;color:${p.color}">
        ${p.initials}
      </div>

      <div class="post-body-new">
        <div class="post-meta-row">
          <span class="post-username-new">${p.user}</span>
          <span class="post-role-new ${p.role}">${p.roleLabel}</span>
        </div>

        <div class="post-title-new">${p.title}</div>

        <div class="post-content-new">
          ${p.content.slice(0, 140)}...
        </div>

        <div class="post-stats-row">
          <span class="post-stat">
            <i class="fa-regular fa-calendar"></i> ${p.date}
          </span>
          <span class="post-stat">
            <i class="fa-solid fa-thumbs-up"></i> ${p.likes}
          </span>
          <span class="post-stat">
            <i class="fa-solid fa-eye"></i> ${p.views}
          </span>
          <span class="post-stat">
            <i class="fa-solid fa-comment"></i> ${p.replies}
          </span>
        </div>
      </div>
    </div>
  `,
      )
      .join('');

    list.querySelectorAll('.post-card-new').forEach((card, i) => {
      card.style.animationDelay = `${i * 45}ms`;
      card.addEventListener('click', () => {
        const post = FORUM_SUPPORT_DATA.postItems.find((p) => p.id === card.dataset.id);
        if (post) openPostModal(post);
      });
    });
  }

  /* ==========================================
     EVENT LISTENERS
  ========================================== */

  filterTabs?.addEventListener('click', (e) => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;

    filterTabs.querySelectorAll('.filter-tab').forEach((btn) => {
      btn.classList.remove('active');
    });

    tab.classList.add('active');

    currentSort = tab.dataset.sort;
    renderPosts();
  });

  postsShowMore?.addEventListener('click', () => {
    postsVisible += 5;
    renderPosts();
  });

  topicsShowMore?.addEventListener('click', () => {
    topicsExpanded = !topicsExpanded;

    renderTopics(FORUM_SUPPORT_DATA.topicItems || []);
  });

  modalClose?.addEventListener('click', closeModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  /* ==========================================
     MOSAIC HERO
  ========================================== */
  const statusBar = document.getElementById('search-status');
  const statusTerm = document.getElementById('search-term-display');

  initMosaicHero({
    containerId: 'forumMosaic',
    title: ' | FORUMS',
    subtitle: "Welcome to EA Forums, where you can chat about games with other players, help each other out, share feedback, and report issues you're having with EA games.",
    placeholder: 'SEARCH EA FORUMS',
    images: MOSAIC_IMGS,
    onSearch: (query, raw) => {
      statusBar.classList.toggle('visible', query.length > 0);
      statusTerm.textContent = `"${raw}"`;
      filterForumPosts(query);
    },
  });
}
