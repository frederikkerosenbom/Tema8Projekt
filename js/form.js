// DONOR TABS (skift mellem sæddonor / ægdonor)

// Henter alle relevante elementer
const tabs = document.querySelectorAll(".tab");
const donorTypeInput = document.querySelector("#donorType");
const selectedDonorText = document.querySelector("#selectedDonorText");
const submitBtn = document.querySelector("#submitBtn");

// Loop gennem alle tabs (Sæddonor / Ægdonor)
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Fjern active state fra alle tabs
    tabs.forEach((btn) => btn.classList.remove("active"));

    // Tilføj active til den klikkede tab
    tab.classList.add("active");

    // Hent hvilken type donor der er valgt (data-type)
    const donorType = tab.dataset.type;

    // Opdater hidden input (bruges ved submit)
    donorTypeInput.value = donorType;

    // Opdater tekst i UI
    if (donorType === "saeddonor") {
      selectedDonorText.textContent = "sæddonor";
    } else if (donorType === "aegdonor") {
      selectedDonorText.textContent = "ægdonor";
    }

    // (knaptekst er samme – men beholdt for fleksibilitet)
    submitBtn.textContent = "Send ansøgning";
  });
});

// =========================
// FAQ ACCORDION (åbn/luk spørgsmål)
// =========================

// Hent alle spørgsmål
const faqQuestions = document.querySelectorAll(".faq-question");

// Loop gennem hvert spørgsmål
faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    // Den FAQ-item der blev klikket på
    const currentItem = question.parentElement;

    // Ikonet (+ / -)
    const currentIcon = question.querySelector(".faq-icon");

    // Luk alle andre spørgsmål
    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== currentItem) {
        item.classList.remove("active");
        item.querySelector(".faq-icon").textContent = "+";
      }
    });

    // Toggle (åbn/luk) det aktuelle spørgsmål
    currentItem.classList.toggle("active");

    // Skift ikon afhængigt af state
    if (currentItem.classList.contains("active")) {
      currentIcon.textContent = "−"; // åbnet
    } else {
      currentIcon.textContent = "+"; // lukket
    }
  });
});
