import { itemDataPromise } from "../ImportedScripts.js";

export async function initAccountScripts() {
  let ACCOUNT_DATA = null;

  async function initAccountItems() {
    try {
      const response = await itemDataPromise;

      if (!response.ok) {
        throw new Error(`Failed to load JSON (${response.status})`);
      }

      const data = await response.json();

      ACCOUNT_DATA = data.accountItems;

      renderAccountSections();
      renderAccountArticles();
    } catch (err) {
      console.error("Account JSON error:", err);
    }
  }

  function renderAccountArticles() {
    const list = document.getElementById("trendingCard__list");

    if (!list || !ACCOUNT_DATA) return;

    list.innerHTML = ACCOUNT_DATA.articles
      .map(
        (a) => `
    <a href="${a.url}" target="_blank" rel="noopener" class="trendingCard__item">
      <span class="trendingCard__num">${a.num}</span>
      <span class="trendingCard__itemText">${a.text}</span>
      <i class="fa-solid fa-chevron-right trendingCard__itemArrow"></i>
    </a>
  `,
      )
      .join("");
  }

  function renderAccountSections() {
    const container = document.getElementById("account-sections");

    if (!container || !ACCOUNT_DATA) return;

    container.innerHTML = ACCOUNT_DATA.sections
      .map((section, idx) => {
        const topicsHTML = section.topics
          .map(
            (t) => `
      <a href="${t.url}" target="_blank" rel="noopener" class="topic-link">
        <div class="topic-left">
          <i class="fa-solid fa-circle-chevron-right"></i>
          <span class="topic-text">${t.text}</span>
        </div>
        <i class="fa-solid fa-chevron-right topic-arrow"></i>
      </a>
    `,
          )
          .join("");

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
        const isLast = idx === ACCOUNT_DATA.sections.length - 1;

        return `
      <div class="account-section${isFirst ? " first" : ""}${isLast ? " last" : ""}">
        <div class="account-header">
          <div class="account-icon-wrap">
            <i class="fa-solid ${section.icon}"></i>
          </div>

          <span class="account-name">${section.name}</span>

          <span class="account-count">
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
      })
      .join("");
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
  await initAccountItems();
}
