export async function initXyberOverlay() {
  /* ══════════════════════════════════════════════════════
  Configuration - [Json structure to hold all content for 
  the overlay.]
══════════════════════════════════════════════════════ */
  const CONFIG = {
    badge: {
      image: "/SRC/Assets/Images/SiteIcons/XyberLogo.webp",
      label: "xybercore",
      version: "v1.0",
    },

    credits: [
      {
        category: "Electronic Arts",
        items: [
          {
            name: "EA — Electronic Arts",
            role: "The homepage was made and used by EA and only serves as the front for the main support feature. Since this is only an assignment for our education this page will not be used for any purpose beyond a simulation of what could or may be....",
            badge: "Reference",
            logo: "https://i.redd.it/made-an-ea-app-icon-for-the-new-design-v0-9x4rt5guxecf1.png?width=1158&format=png&auto=webp&s=f1476b0f56efcbaa93f2cd4a06ad544eaa4bd722",
            color: "rgba(30,30,40,.6)",
          },
        ],
      },
      {
        category: "Education",
        items: [
          {
            name: "Whitecliffe",
            role: "Academic institution — This is the company behind the educational insight for this project",
            badge: "Institution",
            logo: "https://www.google.com/s2/favicons?domain=whitecliffe.ac.nz&sz=64",
            color: "rgba(0,120,212,.18)",
          },
        ],
      },
      {
        category: "Tooling",
        items: [
          {
            name: "Visual Studio Code",
            role: "Primary development environment used for HTML, CSS and JavaScript implementation",
            badge: "Editor",
            logo: "https://www.google.com/s2/favicons?domain=code.visualstudio.com&sz=64",
            color: "rgba(0,122,204,.18)",
          },
          {
            name: "Prettier",
            role: "Code formatting and consistency across JavaScript, CSS and HTML files",
            badge: "Formatter",
            logo: "https://www.google.com/s2/favicons?domain=prettier.io&sz=64",
            color: "rgba(242,153,74,.18)",
          },
          {
            name: "Figma",
            role: "Wireframing, layout planning and UI/UX design inspiration",
            badge: "Design",
            logo: "https://www.google.com/s2/favicons?domain=figma.com&sz=64",
            color: "rgba(162,89,255,.18)",
          },
          {
            name: "Claude",
            role: "Assisted with brainstorming, debugging and code refinement during development",
            badge: "AI Assistant",
            logo: "https://www.google.com/s2/favicons?domain=claude.ai&sz=64",
            color: "rgba(217,119,6,.18)",
          },
          {
            name: "ChatGPT",
            role: "Used for troubleshooting, feature planning, documentation and development support",
            badge: "AI Assistant",
            logo: "https://www.google.com/s2/favicons?domain=openai.com&sz=64",
            color: "rgba(16,163,127,.18)",
          },
        ],
      },
      {
        category: "Fonts",
        items: [
          {
            name: "Google Fonts",
            role: "Cormorant Garamond (headings) & Outfit (body) via CDN",
            badge: "Free / OFL",
            logo: "https://www.google.com/s2/favicons?domain=fonts.google.com&sz=64",
            color: "rgba(66,133,244,.15)",
          },
          {
            name: "Aurebesh",
            role: "Fictional language from the star wars franchise used in the translation function",
            badge: "Free / OTF",
            logo: "https://play-lh.googleusercontent.com/EJESwvkiUcUV1MklDSFBY7QGbOzhXSKVJX_ffFgYUUqaKXDuostvqzsCa15FBf1FDgU=w240-h480-rw",
            color: "rgba(66,133,244,.15)",
          },
        ],
      },
    ],

    developers: [
      {
        section: "Developer",
        items: [
          {
            name: "Riker Hoch",
            role: "Lead Developer · Front-End Engineer",
            badge: "Developer",
            logo: "/SRC/Assets/Images/SiteIcons/riker.webp",
            color: "rgba(124,77,255,.18)",
            description: "Responsible for the website architecture, JavaScript systems, responsive layouts, animations, navigation, JSON integration, support workflows, modals and interactive functionality across the project.",
          },
        ],
      },

      {
        section: "Lecturer",
        items: [
          {
            name: "Bilal Ishfaq",
            role: "Course Lecturer / Supervisor",
            badge: "Academic",
            logo: "/SRC/Assets/Images/SiteIcons/Profile.webp",
            color: "rgba(80,120,255,.18)",
            description: "Academic supervisor overseeing project requirements, evaluation criteria and guidance.",
          },
        ],
      },
    ],

    features: [
      {
        section: "Core Mechanics",
        color: "green",
        items: [
          {
            title: "Fake Case Management",
            desc: "Simulated support cases with generated case numbers, statuses and updates. For a successful case use - [case number: 5576, Access key: survivor]",
          },
          {
            title: "Primary Search",
            desc: "Search through everything on all pages related to any searchable topic.",
          },
          {
            title: "Hero Mosaic Search",
            desc: "Interactive search system that directs users to support content and help resources.",
          },
          {
            title: "Privacy Choices",
            desc: "Simulated privacy preferences panel allowing users to manage tracking settings.",
          },
          {
            title: "Language Translation",
            desc: "A simple language translation system to demonstrate simple language function.",
          },
        ],
      },

      {
        section: "Support Mechanics",
        color: "cyan",
        items: [
          {
            title: "Modals",
            desc: "Dynamic modal system providing troubleshooting information.",
          },
          {
            title: "SelectMenus",
            desc: "Interactive dropdown menus to make the design more accessible for mobile devices",
          },
        ],
      },

      {
        section: "User Experience",
        color: "purple",
        items: [
          {
            title: "Responsive Design",
            desc: "Optimized layouts across desktop, tablet and mobile devices.",
          },
          {
            title: "Dynamic Components",
            desc: "Reusable navigation, footer and page systems loaded across the website.",
          },
          {
            title: "XyberCore Overlay",
            desc: "Developer badge overlay displaying project information, credits and system details.",
          },
        ],
      },
    ],

    socials: [
      {
        name: "GitHub: Xyber",
        username: "RikerHoch",
        url: "https://github.com/Xyber-Core",
        badge: "Code",
        logo: "https://www.google.com/s2/favicons?domain=github.com&sz=64",
        color: "rgba(255,255,255,.12)",
      },
      {
        name: "LinkedIn: Riker",
        username: "Riker Hoch",
        url: "https://www.linkedin.com/in/riker-hoch-4219b22aa/",
        badge: "Professional",
        logo: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=64",
        color: "rgba(0,119,181,.18)",
      },
      {
        name: "Discord Server: XyberCore",
        username: "rikerhoch",
        url: "https://discord.gg/brkbSE9QzY",
        badge: "Community",
        logo: "https://www.google.com/s2/favicons?domain=discord.com&sz=64",
        color: "rgba(88,101,242,.18)",
      },
    ],
    pages: [
      { file: "Homepage", desc: "Landing page — hero, featured drinks, brand story", color: "green" },
      { file: "Platform Support", desc: "Full drink menu with category filtering", color: "purple" },
      { file: "My Cases", desc: "Interactive drink recommendation quiz", color: "cyan" },
      { file: "Game Support", desc: "Cart review & order submission", color: "cyan" },
      { file: "Forum Support", desc: "Coming soon fallback for unbuilt pages", color: "green" },
    ],
  };
  /* ════════ END CONFIG ════════ */

/* ══════════════════════════════════════════════════════
  Overlay Styling - [To style the overlay elements.]
══════════════════════════════════════════════════════ */
  const style = document.createElement("style");
  style.textContent = `
  /* ── Trigger ── */
  #xc-trigger {
    position: fixed;
    bottom: 24px; left: 24px;
    z-index: 99998;
    width: 52px; height: 52px;
    border-radius: 50%;
    cursor: pointer;
    background: #08080e;
    display: flex; align-items: center; justify-content: center;
    transition: transform .2s cubic-bezier(.34,1.5,.64,1);
  }
  /* spinning gradient ring */
  #xc-trigger::before {
    content: "";
    position: absolute; inset: -3px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      #7c4dff, #00e5ff, #00e5a0, #7c4dff
    );
    animation: xc-spin 3s linear infinite;
    z-index: -1;
  }
  /* inner mask */
  #xc-trigger::after {
    content: "";
    position: absolute; inset: 2px;
    border-radius: 50%;
    background: #08080e;
    z-index: 0;
  }
  @keyframes xc-spin { to { transform: rotate(360deg); } }

  #xc-trigger:hover { transform: scale(1.12); }
  #xc-trigger:hover::before { animation-duration: 1s; }

  #xc-trigger img, #xc-trigger .xc-fallback {
    width: 38px; height: 38px; border-radius: 50%;
    object-fit: cover; position: relative; z-index: 1;
    display: block;
  }
  #xc-trigger .xc-fallback {
    display: none;
    align-items: center; justify-content: center;
    font-size: .54rem; font-weight: 900; letter-spacing: .05em;
    background: linear-gradient(135deg,#7c4dff,#00e5ff);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    text-transform: uppercase;
  }

  /* tooltip label on hover */
  #xc-tip {
    position: fixed;
    bottom: 34px; left: 84px;
    z-index: 99997;
    background: #0a0a0f;
    border: 1px solid rgba(124,77,255,.5);
    color: #e0dff8;
    font-family: 'Outfit','Segoe UI',sans-serif;
    font-size: .68rem; font-weight: 700;
    letter-spacing: .08em; text-transform: uppercase;
    padding: 6px 12px; border-radius: 8px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0; transform: translateX(-6px);
    transition: opacity .18s ease, transform .18s ease;
    box-shadow: 0 0 16px rgba(124,77,255,.35);
  }
  #xc-tip::before {
    content: "";
    position: absolute; left: -6px; top: 50%; transform: translateY(-50%);
    width: 6px; height: 6px; background: #0a0a0f;
    border-left: 1px solid rgba(124,77,255,.5);
    border-bottom: 1px solid rgba(124,77,255,.5);
    transform: translateY(-50%) rotate(45deg);
  }
  #xc-trigger:hover ~ #xc-tip { opacity: 1; transform: translateX(0); }

  /* ── Backdrop ── */
  #xc-backdrop {
    position: fixed; inset: 0;
    z-index: 99999;
    background: rgba(0,0,0,.75);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    opacity: 0; pointer-events: none;
    transition: opacity .25s ease;
    display: flex; align-items: center; justify-content: center;
  }
  #xc-backdrop.open { opacity: 1; pointer-events: all; }

  /* ── Modal ── */
  #xc-modal {
    font-family: 'Outfit','Segoe UI',sans-serif;
    --xc-bg:      #07070d;
    --xc-border:  rgba(124,77,255,.38);
    --xc-accent:  #7c4dff;
    --xc-accent2: #00e5ff;
    --xc-text:    #eceaf8;
    --xc-muted:   #706e98;
    --xc-good:    #00e5a0;
    width: min(500px, 95vw);
    max-height: 90vh;
    display: flex; flex-direction: column;
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    /* gradient border via box-shadow layering */
    box-shadow:
      0 0 0 1.5px rgba(124,77,255,.55),
      0 0 0 3px rgba(0,229,255,.12),
      0 40px 100px rgba(0,0,0,.95),
      0 0 80px rgba(124,77,255,.2),
      inset 0 1px 0 rgba(255,255,255,.06);
    transform: scale(.9) translateY(24px);
    transition: transform .3s cubic-bezier(.34,1.22,.64,1);
    background: var(--xc-bg);
  }
  #xc-backdrop.open #xc-modal { transform: scale(1) translateY(0); }

  /* noise grain overlay */
  #xc-modal::before {
    content:""; position:absolute; inset:0; pointer-events:none; z-index:0; border-radius:18px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-size: 180px;
    opacity: .6;
  }

  /* ── Modal Header ── */
  .xc-mhead {
    position: relative; z-index: 2; flex-shrink: 0;
    padding: 0;
    overflow: hidden;
  }
  /* animated mesh gradient background */
  .xc-mhead-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 120% at 10% 50%, rgba(124,77,255,.35) 0%, transparent 60%),
      radial-gradient(ellipse 60% 100% at 90% 0%,  rgba(0,229,255,.2)   0%, transparent 60%),
      radial-gradient(ellipse 50% 80% at 50% 100%, rgba(0,229,160,.1)   0%, transparent 60%),
      #0d0d18;
    animation: xc-mesh 8s ease-in-out infinite alternate;
  }
  @keyframes xc-mesh {
    0%   { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(25deg); }
  }
  .xc-mhead-inner {
    position: relative; z-index: 1;
    display: flex; align-items: center; gap: 14px;
    padding: 18px 18px 16px;
  }
  /* ring image */
  .xc-head-ring {
    width: 46px; height: 46px; border-radius: 50%;
    flex-shrink: 0; position: relative;
  }
  .xc-head-ring::before {
    content:""; position:absolute; inset:-2px; border-radius:50%;
    background: conic-gradient(from 180deg, var(--xc-accent), var(--xc-accent2), var(--xc-good), var(--xc-accent));
    animation: xc-spin 4s linear infinite;
  }
  .xc-head-ring::after { content:""; position:absolute; inset:2px; border-radius:50%; background:#0d0d18; }
  .xc-head-ring img {
    position: absolute; inset: 3px; border-radius: 50%;
    width: calc(100% - 6px); height: calc(100% - 6px);
    object-fit: cover; z-index: 1;
  }
  .xc-head-ring .xc-hfb {
    position:absolute; inset:3px; border-radius:50%; z-index:1;
    background: linear-gradient(135deg,rgba(124,77,255,.4),rgba(0,229,255,.3));
    display:flex; align-items:center; justify-content:center;
    font-size:.55rem; font-weight:900; color:var(--xc-accent2); letter-spacing:.06em;
    display:none;
  }
  .xc-head-text { flex:1; }
  .xc-head-name {
    font-size: .9rem; font-weight: 900; letter-spacing: .12em; text-transform: uppercase;
    background: linear-gradient(90deg, #fff 0%, var(--xc-accent2) 50%, var(--xc-accent) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: xc-shimmer 4s linear infinite;
    background-size: 200%;
  }
  @keyframes xc-shimmer { 0%{background-position:0%} 100%{background-position:200%} }
  .xc-head-sub { font-size:.62rem; color:rgba(255,255,255,.45); margin-top:3px; letter-spacing:.04em; }
  .xc-head-pills { display:flex; gap:6px; margin-top:6px; }
  .xc-head-pill {
    font-size:.55rem; font-weight:700; letter-spacing:.07em; text-transform:uppercase;
    padding:3px 9px; border-radius:50px;
    border:1px solid; display:flex; align-items:center; gap:4px;
  }
  .xc-head-pill.ver  { background:rgba(124,77,255,.15); border-color:rgba(124,77,255,.4); color:var(--xc-accent); }
  .xc-head-pill.live { background:rgba(0,229,160,.12);  border-color:rgba(0,229,160,.35); color:var(--xc-good); }
  .xc-head-pill.live::before { content:""; width:5px; height:5px; border-radius:50%; background:var(--xc-good); box-shadow:0 0 6px var(--xc-good); animation:xc-blink 2s infinite; }
  @keyframes xc-blink { 0%,100%{opacity:1} 50%{opacity:.2} }
  .xc-mbtn-close {
    width:30px; height:30px; border-radius:8px;
    background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
    color:rgba(255,255,255,.5); font-size:.85rem; line-height:1;
    cursor:pointer; display:flex; align-items:center; justify-content:center;
    transition:all .15s; flex-shrink:0;
  }
  .xc-mbtn-close:hover { background:rgba(255,60,60,.18); border-color:rgba(255,60,60,.4); color:#ff6060; transform:scale(1.1); }
  /* bottom border with glow */
  .xc-mhead-border {
    height:1px;
    background: linear-gradient(90deg, transparent, var(--xc-accent), var(--xc-accent2), var(--xc-good), transparent);
    opacity:.6; position:relative; z-index:2;
  }

  /* ── Tabs ── */
  .xc-mtabs {
    display:flex; flex-shrink:0;
    background: rgba(0,0,0,.35);
    border-bottom:1px solid rgba(124,77,255,.12);
    position:relative; z-index:2;
    padding: 0 4px;
    gap: 2px;
  }
  .xc-mtab {
    flex:1; padding:10px 4px;
    background:none; border:none; cursor:pointer;
    font-family:inherit; font-size:.65rem; font-weight:700;
    color:var(--xc-muted); letter-spacing:.07em; text-transform:uppercase;
    transition:color .15s; position:relative;
  }
  .xc-mtab::after {
    content:""; position:absolute; bottom:-1px; left:10%; right:10%; height:2px;
    background:linear-gradient(90deg,var(--xc-accent),var(--xc-accent2));
    border-radius:2px; transform:scaleX(0);
    transition:transform .22s cubic-bezier(.34,1.5,.64,1);
    box-shadow: 0 0 8px var(--xc-accent);
  }
  .xc-mtab.active { color:var(--xc-text); }
  .xc-mtab.active::after { transform:scaleX(1); }
  .xc-mtab:hover:not(.active) { color: rgba(224,223,248,.6); }

  /* ── Panes ── */
  .xc-mpane { display:none; position:relative; z-index:1; flex:1; overflow:hidden; }
  .xc-mpane.active { display:flex; flex-direction:column; }

  .xc-mscroll {
    flex:1; overflow-y:auto;
    padding:14px 16px 18px;
  }
  .xc-mscroll::-webkit-scrollbar { width:3px; }
  .xc-mscroll::-webkit-scrollbar-track { background:transparent; }
  .xc-mscroll::-webkit-scrollbar-thumb {
    background:linear-gradient(to bottom,var(--xc-accent),var(--xc-accent2));
    border-radius:2px;
  }

  /* section label */
  .xc-sec {
    font-size:.57rem; font-weight:800; letter-spacing:.16em; text-transform:uppercase;
    color:var(--xc-accent2); margin:16px 0 8px;
    display:flex; align-items:center; gap:8px;
  }
  .xc-sec:first-child { margin-top:0; }
  .xc-sec::before { content:""; width:3px; height:10px; border-radius:2px; background:var(--xc-accent2); box-shadow:0 0 6px var(--xc-accent2); flex-shrink:0; }
  .xc-sec::after  { content:""; flex:1; height:1px; background:linear-gradient(90deg,rgba(0,229,255,.25),transparent); }

  /* ── Cards ── */
  .xc-card {
    display:flex; align-items:center; gap:12px;
    padding:10px 12px; border-radius:11px;
    background:rgba(255,255,255,.03);
    border:1px solid rgba(255,255,255,.07);
    margin-bottom:6px; transition:all .18s;
    position:relative; overflow:hidden;
  }
  .xc-card::before {
    content:""; position:absolute; inset:0; border-radius:11px;
    background:linear-gradient(135deg,rgba(124,77,255,.08),transparent);
    opacity:0; transition:opacity .18s;
  }
  .xc-card:last-child { margin-bottom:0; }
  .xc-card:hover { border-color:rgba(124,77,255,.35); transform:translateX(3px); }
  .xc-card:hover::before { opacity:1; }
  .xc-card-logo {
    width:34px; height:34px; border-radius:9px; flex-shrink:0;
    display:flex; align-items:center; justify-content:center;
    font-size:1.05rem; overflow:hidden;
  }
  .xc-card-logo img { width:100%; height:100%; object-fit:contain; display:block; border-radius:7px; }
  .xc-card-body { flex:1; min-width:0; }
  .xc-card-name { font-size:.73rem; font-weight:700; color:var(--xc-text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .xc-card-desc { font-size:.62rem; color:var(--xc-muted); margin-top:2px; line-height:1.45; }
  .xc-badge {
    font-size:.52rem; font-weight:700; letter-spacing:.07em; text-transform:uppercase;
    padding:2px 7px; border-radius:4px; margin-top:5px; display:inline-block;
    background:rgba(0,229,160,.1); color:var(--xc-good); border:1px solid rgba(0,229,160,.25);
  }

  /* dev card variant */
  .xc-devcard {
    display:flex; gap:13px;
    padding:12px 13px; border-radius:12px;
    background:rgba(255,255,255,.03);
    border:1px solid rgba(255,255,255,.07);
    margin-bottom:8px; transition:all .18s; position:relative; overflow:hidden;
  }
  .xc-devcard:hover { border-color:rgba(124,77,255,.4); background:rgba(124,77,255,.06); }
  .xc-devcard-img {
    width:40px; height:40px; border-radius:50%; flex-shrink:0;
    position:relative; overflow:hidden;
    background:rgba(124,77,255,.2);
    display:flex; align-items:center; justify-content:center;
    font-size:.7rem; font-weight:900; color:var(--xc-accent2);
  }
  .xc-devcard-img img { width:100%; height:100%; object-fit:cover; position:absolute; inset:0; }
  .xc-devcard-body { flex:1; min-width:0; }
  .xc-devcard-name { font-size:.77rem; font-weight:800; color:var(--xc-text); }
  .xc-devcard-role { font-size:.62rem; color:var(--xc-accent); margin-top:2px; font-weight:600; }
  .xc-devcard-desc { font-size:.61rem; color:var(--xc-muted); margin-top:5px; line-height:1.5; }

  /* ── Feature rows ── */
  .xc-feat {
    display:flex; align-items:center; gap:11px;
    padding:8px 12px; border-radius:10px;
    background:rgba(255,255,255,.028);
    border:1px solid rgba(255,255,255,.06);
    margin-bottom:5px; transition:all .15s; position:relative;
  }
  .xc-feat:last-child { margin-bottom:0; }
  .xc-feat:hover { background:rgba(124,77,255,.07); border-color:rgba(124,77,255,.2); transform:translateX(3px); }
  .xc-fdot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
  .xc-fdot.green  { background:var(--xc-good);   box-shadow:0 0 7px rgba(0,229,160,.7); }
  .xc-fdot.purple { background:var(--xc-accent);  box-shadow:0 0 7px rgba(124,77,255,.7); }
  .xc-fdot.cyan   { background:var(--xc-accent2); box-shadow:0 0 7px rgba(0,229,255,.7); }
  .xc-ftxt { flex:1; }
  .xc-ftitle { font-size:.7rem; font-weight:700; color:var(--xc-text); }
  .xc-fdesc  { font-size:.61rem; color:var(--xc-muted); margin-top:1px; line-height:1.4; }
  .xc-fkey {
    font-size:.57rem; font-weight:700; padding:2px 7px; border-radius:4px;
    background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
    color:var(--xc-muted); font-family:monospace; flex-shrink:0;
  }

  /* ── Footer ── */
  .xc-mfoot {
    padding:10px 16px; flex-shrink:0;
    border-top:1px solid rgba(124,77,255,.14);
    display:flex; align-items:center; justify-content:space-between;
    background:rgba(0,0,0,.4); position:relative; z-index:2;
  }
  .xc-mfoot::before {
    content:""; position:absolute; top:0; left:10%; right:10%; height:1px;
    background:linear-gradient(90deg,transparent,rgba(124,77,255,.5),rgba(0,229,255,.4),transparent);
  }
  .xc-mfoot-sig { font-size:.61rem; color:var(--xc-muted); letter-spacing:.05em; }
  .xc-mfoot-sig strong { color:var(--xc-accent); font-weight:800; }
  .xc-mstatus { display:flex; align-items:center; gap:6px; font-size:.61rem; color:var(--xc-good); font-weight:700; letter-spacing:.05em; }
  .xc-sdot { width:7px; height:7px; border-radius:50%; background:var(--xc-good); box-shadow:0 0 8px var(--xc-good); animation:xc-blink 2s infinite; }
`;
  document.head.appendChild(style);

/* ══════════════════════════════════════════════════════
  Section Builders - [To build each section in the overlay.]
══════════════════════════════════════════════════════ */
  function buildCredits() {
    return CONFIG.credits
      .map(
        (g) => `
    <div class="xc-sec">${g.category}</div>
    ${g.items
      .map(
        (c) => `
      <div class="xc-card">
        <div class="xc-card-logo" style="background:${c.color}">
          ${c.logo ? `<img src="${c.logo}" alt="${c.name}" loading="lazy" onerror="this.parentElement.textContent='${c.emoji || "⚙️"}'"/>` : c.emoji || "⚙️"}
        </div>
        <div class="xc-card-body">
          <div class="xc-card-name">${c.name}</div>
          <div class="xc-card-desc">${c.role}</div>
          <span class="xc-badge">${c.badge}</span>
        </div>
      </div>`,
      )
      .join("")}
  `,
      )
      .join("");
  }

  function buildSocials() {
    return `
    <div class="xc-sec">Connect</div>

    ${CONFIG.socials
      .map(
        (s) => `
        <a
          href="${s.url}"
          target="_blank"
          rel="noopener noreferrer"
          class="xc-card xc-social"
        >
          <div class="xc-card-logo" style="background:${s.color}">
            <img src="${s.logo}" loading="lazy" alt="${s.name}">
          </div>

          <div class="xc-card-body">
            <div class="xc-card-name">${s.name}</div>
            <div class="xc-card-desc">${s.username}</div>
            <span class="xc-badge">${s.badge}</span>
          </div>
        </a>
      `,
      )
      .join("")}
  `;
  }

  function buildFeatures() {
    return CONFIG.features
      .map(
        (g) => `
    <div class="xc-sec">${g.section}</div>
    ${g.items
      .map(
        (f) => `
      <div class="xc-feat">
        <div class="xc-fdot ${g.color}"></div>
        <div class="xc-ftxt">
          <div class="xc-ftitle">${f.title}</div>
          <div class="xc-fdesc">${f.desc}</div>
        </div>
        ${f.key ? `<span class="xc-fkey">${f.key}</span>` : ""}
      </div>`,
      )
      .join("")}
  `,
      )
      .join("");
  }

  function buildDevelopers() {
    return CONFIG.developers
      .map(
        (group) => `
        <div class="xc-sec">${group.section}</div>

        ${group.items
          .map(
            (d) => `
            <div class="xc-devcard">
              <div class="xc-devcard-img" style="border:2px solid ${d.color.replace("rgba", "rgba").replace(".18", ".6")}">
                ${d.logo ? `<img src="${d.logo}" alt="${d.name}" loading="lazy" onerror="this.remove()"/>` : ""}
                ${d.name.charAt(0)}
              </div>

              <div class="xc-devcard-body">
                <div class="xc-devcard-name">${d.name}</div>
                <div class="xc-devcard-role">${d.role}</div>
                <div class="xc-devcard-desc">${d.description}</div>
                <span class="xc-badge" style="margin-top:6px">${d.badge}</span>
              </div>
            </div>
          `,
          )
          .join("")}
      `,
      )
      .join("");
  }

  function buildAbout() {
    return `
    <div class="xc-sec">Project</div>
    <div class="xc-card">
  <div class="xc-card-logo" style="background:rgba(41,98,255,.15)">🎮</div>
  <div class="xc-card-body">
    <div class="xc-card-name">EA Help Redesign Concept</div>
    <div class="xc-card-desc">
      A modern recreation of the EA Help experience built as an academic project.
      The website demonstrates responsive design, interactive support systems,
      simulated case management and dynamic content loading.
    </div>
  </div>
</div>

<div class="xc-sec">Getting Started</div>

<div class="xc-feat">
  <div class="xc-fdot green"></div>
  <div class="xc-ftxt">
    <div class="xc-ftitle">Search For Support</div>
    <div class="xc-fdesc">
      Use the homepage search section to quickly locate support dropdown located in the navigation bar to access the main project.
    </div>
  </div>
</div>

<div class="xc-feat">
  <div class="xc-fdot cyan"></div>
  <div class="xc-ftxt">
    <div class="xc-ftitle">Browse Support Categories</div>
    <div class="xc-fdesc">
      Visit Game Support, Platform Support or Forum Support for detailed assistance.
    </div>
  </div>
</div>

<div class="xc-feat">
  <div class="xc-fdot purple"></div>
  <div class="xc-ftxt">
    <div class="xc-ftitle">Track Cases</div>
    <div class="xc-fdesc">
      Use the My Cases page to view simulated support cases and updates.
    </div>
  </div>
</div>

<div class="xc-feat">
  <div class="xc-fdot green"></div>
  <div class="xc-ftxt">
    <div class="xc-ftitle">Community Discussions</div>
    <div class="xc-fdesc">
      Browse forum posts and community troubleshooting guides.
    </div>
  </div>
</div>`;
  }

  /* ══════════════════════════════════════════════════════
  Inject DOM - [To inject the overlay trigger, backdrop and 
  modal elements into the page.]
══════════════════════════════════════════════════════ */
  const trigger = document.createElement("div");
  trigger.id = "xc-trigger";
  const tip = document.createElement("div");
  tip.id = "xc-tip";
  tip.textContent = "Site Info & Credits";
  trigger.innerHTML = `<img src="${CONFIG.badge.image}" alt="xc" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/><span class="xc-fallback">XC</span>`;
  document.body.appendChild(trigger);
  document.body.appendChild(tip);

  const backdrop = document.createElement("div");
  backdrop.id = "xc-backdrop";
  backdrop.innerHTML = `
  <div id="xc-modal">
    <div class="xc-mhead">
      <div class="xc-mhead-bg"></div>
      <div class="xc-mhead-inner">
        <div class="xc-head-ring">
          <img src="${CONFIG.badge.image}" alt="xc" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
          <div class="xc-hfb">XC</div>
        </div>
        <div class="xc-head-text">
          <div class="xc-head-name">${CONFIG.badge.label}</div>
          <div class="xc-head-sub">EA Help Redesign · Academic Project</div>
          <div class="xc-head-pills">
            <span class="xc-head-pill ver">${CONFIG.badge.version}</span>
            <span class="xc-head-pill live">Live</span>
          </div>
        </div>
        <button class="xc-mbtn-close" id="xc-close">✕</button>
      </div>
      <div class="xc-mhead-border"></div>
    </div>

    <div class="xc-mtabs">
      <button class="xc-mtab active" data-tab="features">Features</button>
      <button class="xc-mtab" data-tab="credits">Credits</button>
      <button class="xc-mtab" data-tab="developers">Team</button>
      <button class="xc-mtab" data-tab="about">About</button>
      <button class="xc-mtab" data-tab="socials">Socials</button>
    </div>

    <div class="xc-mpane active" id="xc-pane-features"><div class="xc-mscroll">${buildFeatures()}</div></div>
    <div class="xc-mpane"        id="xc-pane-credits"><div class="xc-mscroll">${buildCredits()}</div></div>
    <div class="xc-mpane"        id="xc-pane-developers"><div class="xc-mscroll">${buildDevelopers()}</div></div>
    <div class="xc-mpane"        id="xc-pane-about"><div class="xc-mscroll">${buildAbout()}</div></div>
    <div class="xc-mpane"        id="xc-pane-socials"><div class="xc-mscroll">${buildSocials()}</div></div>
    <div class="xc-mfoot">
      <span class="xc-mfoot-sig">Built by <strong>Riker Hoch</strong></span>
      <div class="xc-mstatus"><div class="xc-sdot"></div>All systems live</div>
    </div>
  </div>`;
  document.body.appendChild(backdrop);

  let isOpen = false;
  const open = () => {
    isOpen = true;
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    isOpen = false;
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  };

  trigger.addEventListener("click", () => (isOpen ? close() : open()));
  document.getElementById("xc-close").addEventListener("click", close);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) close();
  });

  backdrop.querySelectorAll(".xc-mtab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const t = tab.dataset.tab;
      backdrop.querySelectorAll(".xc-mtab").forEach((x) => x.classList.toggle("active", x === tab));
      backdrop.querySelectorAll(".xc-mpane").forEach((x) => x.classList.toggle("active", x.id === `xc-pane-${t}`));
    });
  });
}
