document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  let index = 0;
  setInterval(() => {
    slides.forEach((slide) => slide.classList.remove('active'));
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
  }, 6000);
});
