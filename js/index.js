const track = document.querySelector(".carousel-track");
const nextBtn = document.querySelector(".arrow.right");
const prevBtn = document.querySelector(".arrow.left");

let index = 0;

function getCardWidth() {
  return track.querySelector(".card").offsetWidth + 15; // inkl gap
}

nextBtn.addEventListener("click", () => {
  index++;
  if (index > track.children.length - 1) {
    index = 0;
  }
  track.style.transform = `translateX(-${index * getCardWidth()}px)`;
});

prevBtn.addEventListener("click", () => {
  index--;
  if (index < 0) {
    index = track.children.length - 1;
  }
  track.style.transform = `translateX(-${index * getCardWidth()}px)`;
});
