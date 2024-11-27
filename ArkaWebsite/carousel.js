document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('layerCarousel');
    const slides = document.querySelectorAll('.layer-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;

    // Initialize slide widths
    function initializeSlides() {
        const slideWidth = carousel.clientWidth;
        slides.forEach(slide => {
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
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Add click handlers to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlidePosition();
        });
    });

    // Handle window resize
    window.addEventListener('resize', initializeSlides);

    // Initialize on load
    initializeSlides();
});