/* ══════════════════════════════════════════════════════
  ADVANCED SCRIPT HOMEPAGE - [This script is the primary 
  homepage for all other scripts to be imported from other
  external files where html files can use them.]
══════════════════════════════════════════════════════ */

import { initNavigationScripts } from './FixedScriptAssets/NavigationScripts.js';
import { initXyberOverlay } from './FixedScriptAssets/Overlay.js';
import { initMiscellaneousScripts } from './FixedScriptAssets/MiscellaneousScripts.js';

const loadedCSS = new Set();
const itemDataPromise = fetch('/SRC/JSON/ItemData.json');
export { itemDataPromise };

const pages = {
  placeholder: {
    css: '/SRC/CSS/Pages/Placeholder.css',
  },

  mycases: {
    css: '/SRC/CSS/Pages/MyCases.css',
    module: './PageScriptAssets/MyCases.js',
    init: 'initCases',
  },

  gamesupport: {
    css: '/SRC/CSS/Pages/GameSupport.css',
    module: './PageScriptAssets/GameSupport.js',
    init: 'initGameSupportPage',
  },

  platformsupport: {
    css: '/SRC/CSS/Pages/PlatformSupport.css',
    module: './PageScriptAssets/PlatformSupport.js',
    init: 'initPlatformScripts',
  },

  forumsupport: {
    css: '/SRC/CSS/Pages/ForumSupport.css',
    module: './PageScriptAssets/ForumSupport.js',
    init: 'initForumSupport',
  },

  myaccount: {
    css: '/SRC/CSS/Pages/MyAccount.css',
    module: './PageScriptAssets/MyAccount.js',
    init: 'initAccountScripts',
  },
};

async function loadCSS(path) {
  if (loadedCSS.has(path)) return;

  loadedCSS.add(path);

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = path;

  document.head.appendChild(link);

  await new Promise((resolve) => {
    link.onload = resolve;
  });
}

async function initPage() {
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '').toLowerCase();

  initXyberOverlay();
  initMiscellaneousScripts();
  await Promise.all([initNavigationScripts(currentPage)]);

  const page = pages[currentPage];
  if (!page) {
    document.body.classList.remove('preload');
    return;
  }

  await loadCSS(page.css);

  document.body.classList.remove('preload');

  if (page.module) {
    const module = await import(page.module);
    module[page.init]();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('components:ready', initPage);
});
