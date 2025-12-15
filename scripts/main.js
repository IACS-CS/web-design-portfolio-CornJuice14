/* This code was generated with help from GitHub Copilot
	 in response to the prompt "Make all grid sections the same height matching the tallest" - 12/15/2025 */
console.log("main.js loaded successfully!");

function equalizeGridSections() {
  const sections = Array.from(document.querySelectorAll("main section.grid"));
  if (!sections.length) return;
  // reset previously applied min-heights before measurement
  sections.forEach((s) => (s.style.minHeight = ""));
  let max = 0;
  sections.forEach((s) => {
    const h = s.getBoundingClientRect().height;
    if (h > max) max = h;
  });
  sections.forEach((s) => (s.style.minHeight = `${max}px`));
}

document.addEventListener("DOMContentLoaded", () => {
  equalizeGridSections();
  let timeout;
  window.addEventListener("resize", () => {
    clearTimeout(timeout);
    timeout = setTimeout(equalizeGridSections, 150);
  });
});
