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
  /* Flip behavior for the business-card section only
     This code was generated with help from GitHub Copilot
     in response to the prompt "Make the .bc section flip like a double-sided card" - 12/16/2025 */
  const flipCard = document.querySelector(".bc .flip-card");
  if (flipCard) {
    const inner = flipCard.querySelector(".flip-card-inner");
    const toggleFlip = (e) => {
      // toggle class on the outer container for CSS to rotate
      flipCard.classList.toggle("is-flipped");
      inner.classList.toggle("is-flipped");
      // re-calc equal heights when card flips (content size may change)
      equalizeGridSections();
    };

    flipCard.addEventListener("click", toggleFlip);
    flipCard.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        toggleFlip();
      }
    });
  }

  /* Interactive section: show project link when a radio is selected */
  const ipSection = document.querySelector(".ip");
  if (ipSection) {
    const radios = Array.from(
      ipSection.querySelectorAll('input[name="ip-choice"]')
    );
    const linkBox = ipSection.querySelector(".project-link");
    const updateLink = () => {
      // show link only when the 'yes' radio is selected
      const yesSelected = radios.some((r) => r.checked && r.value === "yes");
      if (linkBox) {
        if (yesSelected) linkBox.classList.add("show");
        else linkBox.classList.remove("show");
        equalizeGridSections();
      }
    };
    radios.forEach((r) => r.addEventListener("change", updateLink));
    // If a radio was pre-selected, ensure link is visible on load
    updateLink();
  }
});
