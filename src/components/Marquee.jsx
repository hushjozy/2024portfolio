import { useLayoutEffect, useRef } from "react";
import { marquee } from "../data";
import { gsap, getLenis, reducedMotion } from "../lib/motion";

// Two bands that drift in opposite directions and speed up with scroll velocity.
const Band = ({ reverse }) => (
  <div className={`marquee__band${reverse ? " is-rev" : ""}`}>
    {[0, 1].map((k) => (
      <div className="marquee__run" key={k} aria-hidden={k === 1}>
        {marquee.map((word, i) => (
          <span key={i} className={i % 2 ? "em" : ""}>
            {word} <i>✺</i>
          </span>
        ))}
      </div>
    ))}
  </div>
);

const Marquee = () => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      const tweens = gsap.utils.toArray(".marquee__band").map((band, i) =>
        gsap.fromTo(
          band.querySelectorAll(".marquee__run"),
          { xPercent: i ? -100 : 0 },
          { xPercent: i ? 0 : -100, duration: 28, ease: "none", repeat: -1 }
        )
      );
      const boost = () => {
        const v = Math.abs(getLenis()?.velocity || 0);
        const s = 1 + Math.min(v / 6, 5);
        tweens.forEach((t) => gsap.to(t, { timeScale: s, duration: 0.4, overwrite: true }));
      };
      gsap.ticker.add(boost);
      gsap.to(".marquee__inner", {
        rotate: -2,
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      return () => gsap.ticker.remove(boost);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className="marquee" ref={ref}>
      <div className="marquee__inner">
        <Band />
        <Band reverse />
      </div>
    </div>
  );
};

export default Marquee;
