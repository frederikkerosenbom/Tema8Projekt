const tabs = document.querySelectorAll(".tab");
const donorTypeInput = document.querySelector("#donorType");
const selectedDonorText = document.querySelector("#selectedDonorText");
const submitBtn = document.querySelector("#submitBtn");
const donorForm = document.querySelector(".donor-form");
const formMessage = document.querySelector(".form-message");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((btn) => btn.classList.remove("active"));
    tab.classList.add("active");

    const donorType = tab.dataset.type;

    donorTypeInput.value = donorType;

    if (donorType === "saeddonor") {
      selectedDonorText.textContent = "sæddonor";
      submitBtn.textContent = "Send ansøgning";
    } else if (donorType === "aegdonor") {
      selectedDonorText.textContent = "ægdonor";
      submitBtn.textContent = "Send ansøgning";
    }
  });
});

if (donorForm) {
  donorForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const donorType = donorTypeInput.value;
    const donorLabel = donorType === "aegdonor" ? "ægdonor" : "sæddonor";

    formMessage.textContent = `Tak for din ansøgning som ${donorLabel}! Vi kontakter dig hurtigst muligt.`;
    donorForm.reset();

    donorTypeInput.value = donorType;
  });
}

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const currentItem = question.parentElement;
    const currentIcon = question.querySelector(".faq-icon");

    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== currentItem) {
        item.classList.remove("active");
        item.querySelector(".faq-icon").textContent = "+";
      }
    });

    currentItem.classList.toggle("active");

    if (currentItem.classList.contains("active")) {
      currentIcon.textContent = "−";
    } else {
      currentIcon.textContent = "+";
    }
  });
});
