const contentSections = document.querySelectorAll(".section-content");
const images = document.querySelectorAll(".image-stack img");
let currentSection = 0;

const initializeImages = () => {
  images.forEach((image, index) => {
    image.style.opacity = 1;
    if (index === 0) {
      image.style.transform = "scale(2,2)";
      image.style.transform = "translateY(0px)";
    } else {
      image.style.zIndex = images.length - index;
      image.style.transform = `translateY(${index * 50}px)`;
    }
  });
};

// Update images during scroll
const updateImages = (currentSection) => {
  images.forEach((image, index) => {
    if (currentSection === 0) {
      image.style.opacity = 1;
      image.style.transform = `translateY(${index * 50}px)`;
    } else if (currentSection === 1) {
      if (index === 0) {
        image.style.opacity = 0;
      } else if (index > 1) {
        image.style.opacity = 1;
      } else {
        image.style.transform = "scale(1.5)";
        image.style.opacity = 1;
        image.style.transform = "translateY(-10px)";
      }
    } else if (currentSection === 2) {
      if (index < 2) {
        image.style.opacity = 0;
      } else if (index > 2) {
        image.style.opacity = 1;
      } else {
        image.style.transform = "scale(1.5)";
        image.style.opacity = 1;
        image.style.transform = "translateY(-10px)";
      }
    } else if (currentSection === 3) {
      if (index < 3) {
        image.style.opacity = 0;
      } else {
        image.style.transform = "scale(1.5)";
        image.style.opacity = 1;
        image.style.transform = "translateY(-10px)";
      }
    }
  });
};

// Scroll event listener
document.querySelector(".content").addEventListener("scroll", () => {
  const content = document.querySelector(".content");
  const scrollPosition = content.scrollTop;
  const sectionHeight = contentSections[0].offsetHeight;
  const nextSection = Math.floor(scrollPosition / sectionHeight);

  if (nextSection !== currentSection) {
    currentSection = nextSection;
    updateImages(currentSection);
  }
});

// Initialize on load
initializeImages();
