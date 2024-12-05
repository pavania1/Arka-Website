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

          typeText("Arkabuilds", "Arka builds the", 1, () => {
            line2.classList.remove("hideLine");
            typeText("DeAI", " DeAI Stack.", 1);
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
        } else if (entry.target.className.includes("FAQs-section")) {
          const line1 = document.getElementById("faqs");
          line1.classList.remove("hideLine");

          typeText("faqs", "FAQs", 100);
        } else if (entry.target.className.includes("whats-New-section")) {
          const line1 = document.getElementById("whatsnew");
          line1.classList.remove("hideLine");

          typeText("whatsnew", "Whats new?", 50);
        } else if (entry.target.className.includes("community-section")) {
          const line1 = document.getElementById("join");
          const line2 = document.getElementById("community");

          line1.classList.remove("hideLine");

          typeText("join", "Join our ", 50, () => {
            line2.classList.remove("hideLine");
            typeText("community", "Community", 50);
          });
        } else if (entry.target.className.includes("arka-network-section")) {
          const line1 = document.getElementById("the");
          const line2 = document.getElementById("arka");
          const line3 = document.getElementById("network");

          line1.classList.remove("hideLine");
          typeText("the", "The", 50, () => {
            line2.classList.remove("hideLine");
            typeText("arka", "Arka", 50, () => {
              line3.classList.remove("hideLine");
              typeText("network", "Network", 50);
            });
          });
        } else if (entry.target.className.includes("open-secure")) {
          const line1 = document.getElementById("open");
          const line2 = document.getElementById("secure");
          const line3 = document.getElementById("sovereign");
          const line4 = document.getElementById("decentralize");

          line1.classList.remove("hideLine");
          typeText("open", "Open", 50, () => {
            line2.classList.remove("hideLine");
            typeText("secure", "Secure", 50, () => {
              line3.classList.remove("hideLine");
              typeText("sovereign", "Sovereign", 50, () => {
                line4.classList.remove("hideLine");
                typeText("decentralize", "Decentralized", 50)
              })
            })
          })
        } else if (entry.target.className.includes("why-exist")) {
          const line1 = document.getElementById("centralized");
          const line2 = document.getElementById("sover");
          const line3 = document.getElementById("border");

          line1.classList.remove("hideLine");
          typeText("centralized", "Centralized", 50, () => {
            line2.classList.remove("hideLine");
            typeText("sover", "Sovereign", 50, () => {
              line3.classList.remove("hideLine");
              typeText("border", "Borderless", 50);
            });
          });
          
        } else if (entry.target.className.includes("ai-developer")) {
          const line1 = document.getElementById("build");
          const line2 = document.getElementById("scale");
          const line3 = document.getElementById("monetize");

          line1.classList.remove("hideLine");
          typeText("build", "Build", 50, () => {
            line2.classList.remove("hideLine");
            typeText("scale", "Scale", 50, () => {
              line3.classList.remove("hideLine");
              typeText("monetize", "Monetize", 50);
            });
          });
        }else if (entry.target.className.includes("want-to-build")) {
          const line1 = document.getElementById("wantto");
          line1.classList.remove("hideLine");

          typeText("wantto", "Want to build with us ?", 50);
        } else if (entry.target.className.includes("blog-section")) {
          const line1 = document.getElementById("blog");
          line1.classList.remove("hideLine");

          typeText("blog", "Blog", 50);
        }else if (entry.target.className.includes("Blog-One")) {
          const line1 = document.getElementById("blogOne");
          line1.classList.remove("hideLine");

          typeText("blogOne", "Monthly Summary October", 50);
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
  if(line1 && line2){
    line1.classList.remove("hideLine");
    typeText("Liberating", "Liberating AI", 50, () => {
      line2.classList.remove("hideLine");
      typeText("Sovereignty", "Sovereignty", 50);
    });
  }
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
};
const sectionSeventhTyping = () => {
  const JoinCommunity = document.querySelector(".community-section");
  if (JoinCommunity) {
    observer.observe(JoinCommunity);
  }
};

const sectionOneAboutusTyping = () => {
  const ArkaNetwork = document.querySelector(".arka-network-section");
  if (ArkaNetwork) {
    observer.observe(ArkaNetwork);
  }
};
const sectionTwoAboutusTyping = () => {
  const OpenSecure = document.querySelector(".open-secure");
  if (OpenSecure) {
    observer.observe(OpenSecure);
  }
}
const sectionFourAboutusTyping = () => {
  const WhyweExist = document.querySelector(".why-exist");
  if (WhyweExist) {
    observer.observe(WhyweExist)
  }
}
const sectionOneAiDeveloperTyping = () => {
  const AiDeveloper = document.querySelector(".ai-developer");
  if (AiDeveloper) {
    observer.observe(AiDeveloper)
  }
}
const sectionWantToBuildUs = () => {
  const WantTobuild = document.querySelector(".want-to-build");
  if (WantTobuild) {
    observer.observe(WantTobuild)
  }
}
const sectionBlog = () => {
  const BlogSection = document.querySelector(".blog-section");
  if (BlogSection) {
    observer.observe(BlogSection)
  }
}
const sectionInternalBlogOne = () => {
  const InternalBlogOne = document.querySelector(".Blog-One");
  if (InternalBlogOne) {
    observer.observe(InternalBlogOne)
  }
}

// Scroll event listener with throttling
document
  .querySelector(".content")
  ?.addEventListener("scroll", handleScroll, { passive: true });

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  initializeImages();

  sectionOneTyping();

  
  sectionThreeTyping();
  sectionFourthTyping();
  sectionFifthTyping();
  sectionSixthTyping();
  sectionSeventhTyping();
  sectionOneAboutusTyping();
  sectionTwoAboutusTyping();
  sectionFourAboutusTyping();
  sectionOneAiDeveloperTyping();
  sectionWantToBuildUs();
  sectionBlog();
  sectionInternalBlogOne();
});

// Optional: Add resize handler
window.addEventListener("resize", initializeImages, { passive: true });
