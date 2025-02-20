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
  
  // Easter Egg: Display 'secret-section' when secret link is clicked
  document.addEventListener("click", (e) => {
    if (e.target.matches(".secret-link")) {
      e.preventDefault();
      const secretSection = document.getElementById("secret");
      // Toggle 'hidden' class
      secretSection.classList.toggle("hidden");
      secretSection.scrollIntoView({ behavior: "smooth" });
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
    // Reveal the secret section if hidden
    const secretSection = document.getElementById("secret");
    if (secretSection.classList.contains("hidden")) {
      secretSection.classList.remove("hidden");
      secretSection.scrollIntoView({ behavior: "smooth" });
    }
    // Optionally, add more style changes
    document.body.classList.add("bg-green-50");
  }
  