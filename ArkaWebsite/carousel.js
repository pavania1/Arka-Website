document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("layerCarousel");
  const slides = document.querySelectorAll(".layer-slide");
  const dots = document.querySelectorAll(".carousel-dot");
  let currentSlide = 0;

  // Initialize slide widths
  function initializeSlides() {
    const slideWidth = carousel.clientWidth;
    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
    });
    // carousel.style.width = `${slideWidth * slides.length}px`;
    updateSlidePosition();
  }

  // Update slide position
  function updateSlidePosition() {
    const slideWidth = carousel.clientWidth;
    carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

    // Update active dot
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    isSwiping = true;
  }

  function handleTouchMove(e) {
    if (!isSwiping) return;
    const touchX = e.touches[0].clientX;
    const difference = startX - touchX;
    carousel.style.transform = `translateX(${
      -currentSlide * carousel.clientWidth - difference
    }px)`;
  }

  function handleTouchEnd(e) {
    isSwiping = false;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50 && currentSlide < slides.length - 1) {
      currentSlide++;
    } else if (diff < -50 && currentSlide > 0) {
      currentSlide--;
    }

    updateSlidePosition();
  }

  // Add event listeners for touch gestures
  carousel.addEventListener("touchstart", handleTouchStart);
  carousel.addEventListener("touchmove", handleTouchMove);
  carousel.addEventListener("touchend", handleTouchEnd);

  // Add click handlers to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlidePosition();
    });
  });

  // Handle window resize
  window.addEventListener("resize", initializeSlides);

  // Initialize on load
  initializeSlides();
});
