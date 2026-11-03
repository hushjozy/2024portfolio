import { useLayoutEffect, useRef } from "react";
import { marquee } from "../data";
import { gsap, getLenis, reducedMotion } from "../lib/motion";

// Two parallel bands drifting in opposite directions; they speed up with scroll velocity
// and stop under the pointer so the names can be read.
const Band = ({ items, tone }) => (
  <div className={`marquee__band marquee__band--${tone}`}>
    {[0, 1].map((k) => (
      <div className="marquee__run" key={k}>
        {items.map((word) => (
          <span key={word}>
            {word} <i className="star" />
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
          { xPercent: i ? 0 : -100, duration: i ? 24 : 32, ease: "none", repeat: -1 }
        )
      );
      let held = false;
      const boost = () => {
        const v = Math.abs(getLenis()?.velocity || 0);
        const s = held ? 0 : 1 + Math.min(v / 6, 5);
        tweens.forEach((t) => gsap.to(t, { timeScale: s, duration: 0.4, overwrite: true }));
      };
      gsap.ticker.add(boost);
      const hold = (on) => () => (held = on);
      const el = ref.current;
      const enter = hold(true);
      const leave = hold(false);
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      return () => {
        gsap.ticker.remove(boost);
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
      };
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className="marquee" ref={ref}>
      <ul className="sr-only">
        {[...marquee.dark, ...marquee.orange].map((w) => <li key={w}>{w}</li>)}
      </ul>
      <div className="marquee__inner" aria-hidden="true">
        <Band items={marquee.dark} tone="dark" />
        <Band items={marquee.orange} tone="orange" />
      </div>
    </div>
  );
};

export default Marquee;
