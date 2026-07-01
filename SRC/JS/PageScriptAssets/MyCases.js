/* ══════════════════════════════════════════════════════
  ADVANCED CASE DATA - [A script for the {My Cases} page to
  create a few fake example cases]
══════════════════════════════════════════════════════ */

export function initCases() {
  const CASES = [
    {
      caseNumber: "5576",
      accessKey: "survivor",

      // ───────── CORE DATA (fully customizable) ─────────
      banner: "/SRC/Assets/Images/StarWarsIcons/Jedi Survivor.webp",
      type: "Missing Content",
      status: "Investigating",
      game: "Star Wars Jedi: Survivor",
      updated: "2 hours ago",
      title: "Case Found",
      text: "Your EA support case has been successfully located and is currently active.",

      activity: [
        {
          title: "EA Support reviewed your appeal",
          time: "Today • 3:42 PM",
        },
        {
          title: "Appeal submitted successfully",
          time: "Yesterday • 11:18 AM",
        },
      ],

      // optional UI overrides
      statusIcon: "fa-circle-check",
      statusClass: "success",
    },
  ];

  const caseInput = document.getElementById("caseNumber");
  const keyInput = document.getElementById("accessKey");
  const viewCaseBtn = document.querySelector(".viewCases");
  const modal = document.getElementById("case-modal");

  if (!caseInput || !keyInput || !viewCaseBtn || !modal) return;

function openModal() {
  modal.classList.add("open");

  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");

  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}
  function setText(id, value, fallback = "") {
    const el = document.getElementById(id);
    if (el) el.textContent = value ?? fallback;
  }

  function setHTML(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = value;
  }

  function validateCase() {
    const enteredCase = caseInput.value.trim();
    const enteredKey = keyInput.value.trim();

    const matched = CASES.find(
      (c) =>
        c.caseNumber === enteredCase &&
        c.accessKey === enteredKey
    );

    const actions = document.getElementById("case-modal-actions");
    const modalIcon = document.getElementById("case-modal-icon");

    // ───────────────────────── SUCCESS ─────────────────────────
    if (matched) {
      setText("case-modal-title", matched.title || "Case Found");
      setText("case-modal-text", matched.text || "");
      setText("case-type-label", matched.type);
      setText("case-number-detail", matched.caseNumber);
      setText("case-status-detail", matched.status);
      setText("case-game-detail", matched.game);
      setText("case-updated-detail", matched.updated);

      const banner = document.getElementById("case-banner-img");
      if (banner && matched.banner) banner.src = matched.banner;

      // timeline (fully dynamic per case)
      setHTML(
        "case-modal-actions", // optional reuse if needed elsewhere
        ""
      );

      const timeline = document.querySelector(".case-timeline");
      if (timeline && matched.activity) {
        timeline.innerHTML = `
          <div class="timeline-title">Recent Activity</div>
          ${matched.activity
            .map(
              (item) => `
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <div class="timeline-heading">${item.title}</div>
                  <div class="timeline-time">${item.time}</div>
                </div>
              </div>
            `
            )
            .join("")}
        `;
      }

      // status pill (dynamic icon support)
      const icon = matched.statusIcon || "fa-circle-check";
      document.getElementById("case-status-pill").innerHTML = `
        <i class="fa-solid ${icon}"></i>
        ${matched.status}
      `;

      if (modalIcon) {
        modalIcon.className = `case-modal-icon ${matched.statusClass || "success"}`;
        modalIcon.innerHTML = `<i class="fa-solid ${icon}"></i>`;
      }

      actions.innerHTML = `
        <button class="siteBtn btnSecondary" id="case-modal-close">
          Close
        </button>
      `;
    }

    // ───────────────────────── FAIL (UNCHANGED LOGIC STYLE) ─────────────────────────
    else {
       document.getElementById("case-banner-img").src ="/SRC/Assets/Images/SiteIcons/ErrorBanner.webp";
      setText("case-modal-title", "Case Not Found");
      setText("case-modal-text", "We couldn’t find a matching support case.");
      setText("case-number-detail", "Unavailable");
      setText("case-status-detail", "Unknown");
      setText("case-game-detail", "Unknown");
      setText("case-updated-detail", "—");

      const timeline = document.querySelector(".case-timeline");
      if (timeline) {
        timeline.innerHTML = `
          <div class="timeline-title">Suggestions</div>

          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-heading">Verify your case number</div>
              <div class="timeline-time">Ensure it matches your support email</div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-heading">Check your access key</div>
              <div class="timeline-time">Access keys are case-sensitive</div>
            </div>
          </div>
        `;
      }

      document.getElementById("case-status-pill").innerHTML = `
        <i class="fa-solid fa-circle-question"></i>
        Unknown
      `;

      if (modalIcon) {
        modalIcon.className = "case-modal-icon fail";
        modalIcon.innerHTML = `<i class="fa-solid fa-circle-question"></i>`;
      }

      actions.innerHTML = `
        <button class="siteBtn btnSecondary" id="case-modal-close">
          Close
        </button>
      `;
    }

    document
      .getElementById("case-modal-close")
      .addEventListener("click", closeModal);

    openModal();
  }

  viewCaseBtn.addEventListener("click", validateCase);

  [caseInput, keyInput].forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") validateCase();
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}
