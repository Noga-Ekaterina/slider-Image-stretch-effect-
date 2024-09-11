const slides = document.querySelectorAll(".slide");

slides.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeActiveClasses();
    panel.classList.add("active");
  });
});

const removeActiveClasses = () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
};
