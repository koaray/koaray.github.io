// On DOM load, set the footer year
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
});

// Smooth scroll for the "Let's Connect" button
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

// Easter Egg: Reveal #secret section when the tiny link is clicked
document.addEventListener("click", (e) => {
  if (e.target.matches(".secret-link")) {
    e.preventDefault();
    const secretSection = document.getElementById("secret");
    // Toggle display
    if (secretSection.style.display === "block") {
      secretSection.style.display = "none";
    } else {
      secretSection.style.display = "block";
      secretSection.scrollIntoView({ behavior: "smooth" });
    }
  }
});

// Easter Egg: Konami Code
// ↑ ↑ ↓ ↓ ← → ← → B A
let konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiPosition = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === konamiSequence[konamiPosition]) {
    konamiPosition++;
    if (konamiPosition === konamiSequence.length) {
      activateKonamiEasterEgg();
      konamiPosition = 0;
    }
  } else {
    konamiPosition = 0;
  }
});

function activateKonamiEasterEgg() {
  alert("You discovered the hidden Konami Code! Let’s build something extraordinary together.");
  const secretSection = document.getElementById("secret");
  secretSection.style.display = "block";
  secretSection.scrollIntoView({ behavior: "smooth" });
  // Optionally change background or styling
  document.body.style.backgroundColor = "#dcfce7"; // A subtle green background
}
