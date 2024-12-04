const contentSections = document.querySelectorAll(".section-content");
const images = document.querySelectorAll(".image-stack img");
let currentSection = 0;
let isScrolling = false;
let isScrollingUp = false;

const initializeImages = () => {
  images.forEach((image, index) => {
    image.classList.remove("active");
    if (index === 0) {
      image.style.transform =
        "scale(1) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg)";
      image.style.opacity = "1";
      image.classList.add("active");
    } else {
      image.style.transform = `translateY(${index * 60}px) translateZ(-${
        index * 250
      }px) rotateX(${index * 3}deg) rotateY(${index * 0.5}deg)`;
      image.style.opacity = "0.95";
    }
    image.style.zIndex = images.length - index;
  });
};

const updateImages = (currentSection, isScrollingUp) => {
  const totalSections = images.length;

  images.forEach((image, index) => {
    image.classList.remove("active");
    if (!isScrollingUp) {
      if (index === currentSection) {
        // Active image
        image.style.transform =
          "scale(1) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg)";
        image.style.opacity = "1";
        image.style.zIndex = totalSections;
        image.classList.add("active");
      } else if (index < currentSection) {
        // Images above the current section
        const distance = currentSection - index;
        image.style.transform = `translateY(-${distance * 60}px) translateZ(-${
          distance * 250
        }px) rotateX(-${distance * 3}deg) rotateY(-${distance * 0.5}deg)`;
        image.style.opacity = "0"; // Fade out
        image.style.zIndex = index;
      } else {
        // Images below the current section
        const distance = index - currentSection;
        image.style.opacity = 1;
        image.style.zIndex = totalSections - distance;
      }
    } else {
      if (index === currentSection) {
        // Active image
        image.style.transform =
          "scale(1) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg)";
        image.style.opacity = "1";
        image.style.zIndex = totalSections;
        image.classList.add("active");
      } else if (index < currentSection) {
        // Images above the current section
        const distance = currentSection - index;
        image.style.transform = `translateY(-${distance * 60}px) translateZ(-${
          distance * 250
        }px) rotateX(-${distance * 3}deg) rotateY(-${distance * 0.5}deg)`;
        image.style.opacity = "0"; // Fade out
        image.style.zIndex = index;
      } else {
        // Images below the current section
        const distance = index - currentSection;
        image.style.transform = `translateY(${distance * 60}px) translateZ(-${
          distance * 250
        }px) rotateX(${distance * 3}deg) rotateY(${distance * 0.5}deg)`;
        image.style.opacity = 1; //`${Math.max(0.95 - (distance * 0.1), 0.7)}`; // Gradually fade in
        image.style.zIndex = totalSections - distance;
      }
    }
  });
};

// const updateImages = (currentSection) => {
//   const totalSections = images.length;

//   images.forEach((image, index) => {
//     image.classList.remove('active');

//     if (index === currentSection) {
//       // Active image
//       image.style.transform = 'scale(1) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg)';
//       image.style.opacity = '1';
//       image.style.zIndex = totalSections;
//       image.classList.add('active');
//     } else if (index < currentSection) {
//       // Images above current section
//       const distance = currentSection - index;
//       image.style.transform = `translateY(-${distance * 60}px) translateZ(-${distance * 250}px) rotateX(-${distance * 3}deg) rotateY(-${distance * 0.5}deg)`;
//       image.style.opacity = '0';
//       image.style.zIndex = index;
//     } else {
//       // Images below current section
//       const distance = index - currentSection;
//       image.style.opacity = 1 // Math.max(0.95 - (distance * 0.1), 0.7).toString();
//       image.style.zIndex = totalSections - distance;
//     }
//   });
// };

const handleScroll = () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      const content = document.querySelector(".content");
      const scrollPosition = content.scrollTop;
      const windowHeight = window.innerHeight;

      // Calculate which section is currently in view
      const nextSection = Math.round(scrollPosition / windowHeight);
      if (nextSection > currentSection) {
        isScrollingUp = false;
      } else {
        isScrollingUp = true;
      }
      if (nextSection !== currentSection && nextSection < images.length) {
        currentSection = nextSection;
        updateImages(currentSection, isScrollingUp);
      }

      isScrolling = false;
    });
  }
  isScrolling = true;
};

const typeText = (elementId, text, delay = 100, callback = null) => {
  const element = document.getElementById(elementId);
  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
      setTimeout(type, delay);
    } else if (callback) {
      callback();
    }
  }

  element.textContent = "";
  type();
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.className.includes("web-arkabuilds-section")) {
          const line1 = document.getElementById("Arkabuilds");
          const line2 = document.getElementById("DeAI");

          line1.classList.remove("hideLine");

          typeText("Arkabuilds", "Arka builds the", 50, () => {
            line2.classList.remove("hideLine");
            typeText("DeAI", " DeAI Stack.", 50);
          });
        } else if (
          entry.target.className.includes("interchain-agent-section")
        ) {
          const line1 = document.getElementById("Interchain");
          const line2 = document.getElementById("Agent");

          line1.classList.remove("hideLine");

          typeText("Interchain", "Interchain", 50, () => {
            line2.classList.remove("hideLine");
            typeText("Agent", "Agent", 50);
          });
        } else if (
          entry.target.className.includes("FAQs-section")
        ) {
          const line1 = document.getElementById("faqs");
          line1.classList.remove("hideLine");

          typeText("faqs", "FAQs", 100);
        } else if (
          entry.target.className.includes("whats-New-section")
        ) {
          const line1 = document.getElementById("whatsnew");
          line1.classList.remove("hideLine");

          typeText("whatsnew", "Whats new?",50);
        } else if (
          entry.target.className.includes("community-section")
        ) {
          const line1 = document.getElementById("join");
          const line2 = document.getElementById("community");

          line1.classList.remove("hideLine");

          typeText("join", "Join our ", 50, () => {
            line2.classList.remove("hideLine");
            typeText("community", "Community", 50);
          });
        }

        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

const sectionOneTyping = () => {
  const line1 = document.getElementById("Liberating");
  const line2 = document.getElementById("Sovereignty");
  line1.classList.remove("hideLine");
  typeText("Liberating", "Liberating AI", 50, () => {
    line2.classList.remove("hideLine");
    typeText("Sovereignty", "Sovereignty", 50);
  });
};

const sectionTwoTyping = () => {
  //
};

const sectionThreeTyping = () => {
  const arkaBuildSection = document.querySelector(".web-arkabuilds-section");
  if (arkaBuildSection) {
    observer.observe(arkaBuildSection);
  }
};

const sectionFourthTyping = () => {
  const interchainAgent = document.querySelector(".interchain-agent-section");
  if (interchainAgent) {
    observer.observe(interchainAgent);
  }
};
const sectionFifthTyping = () => {
  const FAQs = document.querySelector(".FAQs-section");
  if (FAQs) {
    observer.observe(FAQs);
  }
};
const sectionSixthTyping = () => {
  const whatsNew = document.querySelector(".whats-New-section");
  if (whatsNew) {
    observer.observe(whatsNew);
  }
}
const sectionSeventhTyping = () => {
  const JoinCommunity = document.querySelector(".community-section");
  if (JoinCommunity) {
    observer.observe(JoinCommunity);
  }
}

// Scroll event listener with throttling
document
  .querySelector(".content")
  .addEventListener("scroll", handleScroll, { passive: true });

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  initializeImages();

  sectionOneTyping();

  sectionTwoTyping();
  sectionThreeTyping();
  sectionFourthTyping();
  sectionFifthTyping();
  sectionSixthTyping();
  sectionSeventhTyping();
});

// Optional: Add resize handler
window.addEventListener("resize", initializeImages, { passive: true });
