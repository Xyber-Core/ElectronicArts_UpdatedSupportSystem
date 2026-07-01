// ══════════════════════════════════════════════════════
// COMPONENT LOADER
// ══════════════════════════════════════════════════════

async function loadComponent(id, path) {
  const element = document.querySelector(id);

  if (!element) return;

  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}`);
    }
    element.innerHTML = await response.text();
  } catch (error) {
    console.error(`Component Error (${id}):`, error);
  }
}

// ══════════════════════════════════════════════════════
// INIT ALL COMPONENTS
// ══════════════════════════════════════════════════════
async function initComponents() {
  await Promise.all([
    loadComponent(".Navigation", "/SRC/HTML/Components/Nav.html"), 
    loadComponent(".Footer", "/SRC/HTML/Components/Footer.html")
  ]);
  document.dispatchEvent(new Event("components:ready"));
}

document.addEventListener("DOMContentLoaded", initComponents);
