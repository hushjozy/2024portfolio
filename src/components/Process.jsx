import { useLayoutEffect, useRef } from "react";
import { ways } from "../data";
import { gsap, ScrollTrigger } from "../lib/motion";
import ShinobiFx from "../fx/ShinobiFx";
import Chapter from "./Chapter";

// The eye pins beside the stacking cards; each habit that arrives morphs it to the next pattern,
// so the way the problem is seen changes as the work matures.
const Process = () => {
  const ref = useRef(null);
  const eye = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".way");

      // Scroll, not clicks, drives the eye; this runs with reduced motion too (it still swaps patterns).
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 60%",
          onEnter: () => eye.current?.setPattern(i),
          onLeaveBack: () => eye.current?.setPattern(Math.max(0, i - 1)),
        });
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          // Dim rather than fade: a see-through card would show the one beneath it.
          gsap.to(card.querySelector(".way__inner"), {
            scale: 0.9,
            filter: "brightness(0.4)",
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
      <div className="process__grid">
        <div className="process__eye">
          <ShinobiFx ref={eye} kind="kaleidoscope" clickable={false} label="An eye whose pattern changes with each habit" />
        </div>
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
      </div>
    </section>
  );
};

export default Process;
