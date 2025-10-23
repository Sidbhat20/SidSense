import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
  let isMobile = window.innerWidth <= 900;

  const scrollSettings = isMobile
    ? {
        duration: 1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: true,
        touchMultiplier: 1.5,
        infinite: false,
        lerp: 0.08, // Slightly increased for smoother mobile
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: true,
        syncTouch: true,
      }
    : {
        duration: 1,  // Reduced from 1.2 for snappier feel
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
        lerp: 0.12, // Increased from 0.1 for smoother animations
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: true,
        syncTouch: true,
      };

  let lenis = new Lenis(scrollSettings);

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const handleResize = () => {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 900;

    if (wasMobile !== isMobile) {
      lenis.destroy();

      const newScrollSettings = isMobile
        ? {
            duration: 1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            smoothTouch: true,
            touchMultiplier: 1.5,
            infinite: false,
            lerp: 0.08,
            wheelMultiplier: 1,
            orientation: "vertical",
            smoothWheel: true,
            syncTouch: true,
          }
        : {
            duration: 1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
            lerp: 0.12,
            wheelMultiplier: 1,
            orientation: "vertical",
            smoothWheel: true,
            syncTouch: true,
          };

      lenis = new Lenis(newScrollSettings);
      lenis.on("scroll", ScrollTrigger.update);
    }
  };

  // Debounce resize events
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 150);
  });
});
