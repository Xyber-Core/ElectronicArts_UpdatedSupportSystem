import { itemDataPromise } from "../ImportedScripts.js";

export function initPlatformScripts() {

let PLATFORM_DATA = null;


function renderPlatformArticles() {
  const list = document.getElementById("platform-trendingCard__list");

  if (!list || !PLATFORM_DATA) return;

  list.innerHTML = PLATFORM_DATA.articles.map(a => `
    <a href="${a.url}" target="_blank" rel="noopener" class="trendingCard__item">
      <span class="trendingCard__num">${a.num}</span>
      <span class="trendingCard__itemText">${a.text}</span>
      <i class="fa-solid fa-chevron-right trendingCard__itemArrow"></i>
    </a>
  `).join("");
}

async function initPlatformItems() {
  try {
    const response = await itemDataPromise;

    if (!response.ok) {
      throw new Error(`Failed to load JSON (${response.status})`);
    }

    const data = await response.json();

    PLATFORM_DATA = data.platformItems;

    renderPlatformSections();
    renderPlatformArticles();

  } catch (err) {
    console.error("Platform JSON error:", err);
  }
}

function renderPlatformSections() {
  const container = document.getElementById("platform-sections");

  if (!container || !PLATFORM_DATA) return;

  container.innerHTML = PLATFORM_DATA.sections.map((section, idx) => {

    const topicsHTML = section.topics.map(topic => `
      <a href="${topic.url}" target="_blank" rel="noopener" class="topic-link">
        <div class="topic-left">
          <i class="fa-solid fa-circle-info"></i>
          <span class="topic-text">${topic.text}</span>
        </div>
        <i class="fa-solid fa-chevron-right topic-arrow"></i>
      </a>
    `).join("");

const mobileOptions = section.topics
  .map(
    topic => `
      <option value="${topic.url}">
        ${topic.text}
      </option>
    `
  )
  .join("");

    const isFirst = idx === 0;
    const isLast = idx === PLATFORM_DATA.sections.length - 1;

    return `
      <div class="platform-section${isFirst ? " first" : ""}${isLast ? " last" : ""}">
        <div class="platform-header">
          <div class="platform-icon-wrap">
            <i class="fa-solid ${section.icon}"></i>
          </div>

          <span class="platform-name">${section.name}</span>

          <span class="platform-count">
            ${section.topics.length} topic${section.topics.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div class="topic-grid">
          ${topicsHTML}
        </div>
      </div>

    <div class="mobile-topic-menu">
  <h5>
    Browse Topics
    <i class="fa-solid fa-chevron-down"></i>
  </h5>

  <ul>
    ${section.topics.map(topic => `
      <li>
        <a href="${topic.url}" target="_blank" rel="noopener">
          ${topic.text}
        </a>
      </li>
    `).join("")}
  </ul>
</div>

    `;
  }).join("");
}

function initMobileTopicMenus() {
  document.addEventListener("click", (e) => {
    const header = e.target.closest(".mobile-topic-menu h5");
    if (!header) return;

    const menu = header.parentElement;
    menu.classList.toggle("open");
  });
}
initMobileTopicMenus();
initPlatformItems();
}


