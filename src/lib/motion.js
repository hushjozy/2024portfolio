import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

export const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const tick = (time) => lenis && lenis.raf(time * 1000);

// Lenis drives the native scroll position, so ScrollTrigger and position:sticky keep working.
export const initSmoothScroll = () => {
  if (lenis || reducedMotion()) return () => {};
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    lenis = null;
  };
};

export const getLenis = () => lenis;

export const scrollTo = (target, opts = {}) => {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, ...opts });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
};

export const lockScroll = (locked) => {
  if (!lenis) {
    document.documentElement.style.overflow = locked ? "hidden" : "";
    return;
  }
  locked ? lenis.stop() : lenis.start();
};

// Page-wide scroll effects, wired by data attributes so sections stay declarative.
export const initScrollEffects = (scope) => {
  const q = gsap.utils.selector(scope);
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    // Generic parallax: data-speed="0.2" moves an element against the scroll.
    q("[data-speed]").forEach((el) => {
      const speed = parseFloat(el.dataset.speed);
      gsap.fromTo(
        el,
        { yPercent: -speed * 100 },
        {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });

    // Images that drift inside their frame.
    q("[data-parallax-img]").forEach((img) => {
      gsap.fromTo(
        img,
        { yPercent: -9, scale: 1.18 },
        {
          yPercent: 9,
          scale: 1.08,
          ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });

    // Masked word reveals for headings.
    q("[data-split]").forEach((el) => {
      gsap.from(el.querySelectorAll(".w__i"), {
        yPercent: 115,
        rotate: 4,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.045,
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });

    // Paragraphs whose words light up as you read.
    q("[data-read]").forEach((el) => {
      gsap.fromTo(
        el.querySelectorAll(".w__i"),
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );
    });

    // Simple fade-up for everything else.
    q("[data-rise]").forEach((el) => {
      gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: parseFloat(el.dataset.rise) || 0,
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
    });

    // Hairlines that draw themselves.
    q("[data-line]").forEach((el) => {
      gsap.from(el, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.4,
        ease: "expo.inOut",
        scrollTrigger: { trigger: el, start: "top 92%" },
      });
    });

    // Counters.
    q("[data-count]").forEach((el) => {
      const end = parseFloat(el.dataset.count);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: end,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => (el.textContent = Math.round(obj.v)),
      });
    });
  });

  return mm;
};

export { gsap, ScrollTrigger };
