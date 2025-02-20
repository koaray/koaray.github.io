// Current year in footer
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  });
  
  // Smooth scroll for CTA button
  function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  }
  
  // Easter Egg: Reveal 'secret-section' when clicking the tiny link in footer
  document.addEventListener("click", (e) => {
    if (e.target.matches(".secret-link")) {
      e.preventDefault();
      document.getElementById("secret").style.display = "block";
      document.getElementById("secret").scrollIntoView({ behavior: "smooth" });
    }
  });
  
  // Easter Egg: Konami Code
  // Key sequence: ↑ ↑ ↓ ↓ ← → ← → B A
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
    // Optionally change the website background or reveal something extra
    document.body.style.backgroundColor = "#e6ffe6";
  }
  