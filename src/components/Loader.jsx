import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/motion";

const Loader = ({ onDone }) => {
  const ref = useRef(null);
  const countRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const n = { v: 0 };
      const tl = gsap.timeline({ onComplete: onDone });
      tl.from(".loader__word .w__i", { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.08 })
        .to(n, {
          v: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => (countRef.current.textContent = String(Math.round(n.v)).padStart(3, "0")),
        }, 0)
        .to(".loader__bar i", { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)
        .to(".loader__word .w__i", { yPercent: -110, duration: 0.7, ease: "expo.in", stagger: 0.04 })
        .to(ref.current, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.inOut" }, "-=0.2");
    }, ref);
    return () => ctx.revert();
  }, [onDone]);

  return (
    <div className="loader" ref={ref} aria-hidden="true">
      <div className="loader__word">
        <span className="w"><span className="w__i">Joseph</span></span>{" "}
        <span className="w"><span className="w__i em">Osho</span></span>
      </div>
      <div className="loader__foot">
        <span>Fullstack · AI native</span>
        <span className="loader__bar"><i /></span>
        <span ref={countRef}>000</span>
      </div>
    </div>
  );
};

export default Loader;
