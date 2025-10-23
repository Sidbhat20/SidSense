import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
  const isHomePage = document.querySelector(".page.home-page");
  if (!isHomePage) return;

  gsap.registerPlugin(ScrollTrigger);

  const heroImg = document.querySelector(".hero-img img");
  let currentImageIndex = 1;
  const totalImages = 10;
  let scrollTriggerInstance = null;
  let animationFrame = null;
  
  // Preload images for smoother transitions
  const preloadedImages = [];
  for (let i = 1; i <= totalImages; i++) {
    const img = new Image();
    img.src = `/SidSense/images/work-items/work-item-${i}.jpg`;
    preloadedImages.push(img);
  }

  // Use requestAnimationFrame for smoother updates (reduced frequency)
  let lastUpdate = 0;
  const updateInterval = 400; // Reduced frequency for better performance
  
  const updateImage = (timestamp) => {
    if (timestamp - lastUpdate >= updateInterval) {
      currentImageIndex = currentImageIndex >= totalImages ? 1 : currentImageIndex + 1;
      heroImg.src = preloadedImages[currentImageIndex - 1].src;
      lastUpdate = timestamp;
    }
    animationFrame = requestAnimationFrame(updateImage);
  };
  
  animationFrame = requestAnimationFrame(updateImage);

  const initAnimations = () => {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
    }

    scrollTriggerInstance = ScrollTrigger.create({
      trigger: ".hero-img-holder",
      start: "top bottom",
      end: "top top",
      scrub: 0.5, // Add scrub for smoother scroll animations
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(".hero-img", {
          y: `${-110 + 110 * progress}%`,
          scale: 0.25 + 0.75 * progress,
          rotation: -15 + 15 * progress,
          force3D: true, // Hardware acceleration
        });
      },
    });
  };

  initAnimations();

  // Debounce resize events
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initAnimations, 150);
  });
  
  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
  });
});
