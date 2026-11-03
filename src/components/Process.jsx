import { useLayoutEffect, useRef } from "react";
import { ways } from "../data";
import { gsap } from "../lib/motion";
import Chapter from "./Chapter";

// Sticky cards that stack; each one recedes as the next slides over it.
const Process = () => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray(".way");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.querySelector(".way__inner"), {
            scale: 0.9,
            opacity: 0.35,
            rotate: i % 2 ? 1.5 : -1.5,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
          });
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section process" id="process" ref={ref}>
      <Chapter no="04" title="How I *work*" aside="Three habits" />
      <div className="ways">
        {ways.map((w, i) => (
          <article className={`way way--${i}`} key={w.title} style={{ "--i": i }}>
            <div className="way__inner">
              <span className="way__no">Way <span className="em">0{i + 1}</span></span>
              <h3 className="way__title">{w.title}</h3>
              <p className="way__body">{w.body}</p>
              <ul className="way__proof">
                {w.proof.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <span className="way__glyph em" aria-hidden="true">{i + 1}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Process;
