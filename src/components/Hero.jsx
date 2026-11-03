import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import hero from "../media/hero.jpg?w=420;840;1100&format=avif;webp;jpg&as=picture";
import Picture from "./Picture";
import ShinobiFx from "../fx/ShinobiFx";
import { profile } from "../data";
import { gsap, scrollTo } from "../lib/motion";
import Split from "./Split";

// A letter replaced by a rasengan. The letter stays (transparent) so width and baseline are exact,
// and the slot rather than the larger canvas takes the pointer: hover charges, click boosts.
const RasenganLetter = forwardRef(function RasenganLetter({ letter, tint, label, className = "" }, ref) {
  const [slot, setSlot] = useState(null);
  return (
    <span className={`hero__o ${className}`} ref={setSlot} data-cursor="Boost">
      {letter}
      <ShinobiFx ref={ref} kind="sphere" tint={tint} className="hero__o-fx" interactTarget={slot ?? undefined} label={label} />
    </span>
  );
});

const Hero = ({ ready }) => {
  const ref = useRef(null);
  const blue = useRef(null);
  const gold = useRef(null);
  const orbs = (fn) => [blue, gold].forEach((o) => o.current && fn(o.current));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero__title .w__i, .hero__name .w__i", { yPercent: 115 });
      gsap.set(".hero__frame", { clipPath: "inset(100% 0 0 0)" });
      gsap.set(".hero__fade", { opacity: 0, y: 24 });
      // Fade and rise only: scaling a canvas would make it re-measure every frame.
      gsap.set(".hero__o-fx", { opacity: 0, y: 40 });

      // Scroll-out: the portrait sinks, the name slides and the headline lifts.
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero__frame img", { yPercent: 18, scale: 1.15, ease: "none", scrollTrigger: st });
        gsap.to(".hero__title", { yPercent: -40, opacity: 0.2, ease: "none", scrollTrigger: st });
        // The rasengans ride the sliding name and charges while the page is moving.
        let settle;
        gsap.to(".hero__name", {
          xPercent: -14,
          ease: "none",
          scrollTrigger: {
            ...st,
            onUpdate: (self) => {
              if (Math.abs(self.getVelocity()) < 400) return;
              orbs((o) => o.setCharged(true));
              clearTimeout(settle);
              settle = setTimeout(() => orbs((o) => o.setCharged(false)), 220);
            },
          },
        });
        gsap.to(".hero__blob", { yPercent: 60, ease: "none", scrollTrigger: st });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(".hero__frame", { clipPath: "inset(0% 0 0 0)", duration: 1.6, ease: "expo.inOut" })
        .to(".hero__title .w__i", { yPercent: 0, duration: 1.2, stagger: 0.06 }, "-=0.9")
        // The brush lands on the verb once the headline has settled.
        .call(() => ref.current.querySelector(".brush")?.classList.add("is-in"), null, "-=0.5")
        .to(".hero__name .w__i", { yPercent: 0, duration: 1.4, stagger: 0.1 }, "-=1")
        .to(".hero__o-fx", { opacity: 1, y: 0, duration: 1.4, stagger: 0.25, onStart: () => orbs((o) => o.trigger()) }, "-=1.3")
        .to(".hero__fade", { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, "-=1.1");
    }, ref);
    return () => ctx.kill();
  }, [ready]);

  const charge = (on) => () => orbs((o) => o.setCharged(on));

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__blob" aria-hidden="true" />
      <div className="hero__top hero__fade">
        <span>{profile.location}</span>
        <span className="pill"><i className="dot" /> Open to work</span>
      </div>

      <div className="hero__grid">
        <h1 className="hero__title">
          <Split text="I architect products, then ~ship~ them with *AI agents.*" mode="none" />
        </h1>

        <div className="hero__side">
          <figure className="hero__frame" data-cursor="Hi!">
            <Picture src={hero} alt="Portrait of Joseph Osho" sizes="(max-width: 899px) min(92vw, 420px), 420px" priority />
          </figure>
          <a
            href="#contact"
            className="hero__cta hero__fade"
            onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
            onPointerEnter={charge(true)}
            onPointerLeave={charge(false)}
            onFocus={charge(true)}
            onBlur={charge(false)}
          >
            Get in touch <span>→</span>
          </a>
        </div>
      </div>

      <div className="hero__bottom">
        <p className="hero__intro hero__fade">
          {profile.role} with 8+ years building scalable web and mobile products in React,
          Node.js, NestJS, ASP.NET Core and Python. Currently at TeKnowledge.
        </p>
        <button className="hero__scroll hero__fade" onClick={() => scrollTo("#about")}>
          Scroll <span>↓</span>
        </button>
      </div>

      <div className="hero__name" aria-hidden="true">
        <span className="w"><span className="w__i">Joseph</span></span>
        <span className="hero__osho">
          <RasenganLetter ref={blue} letter="O" label="Rasengan" />
          <span className="w"><span className="w__i em">sh</span></span>
          <RasenganLetter ref={gold} letter="o" tint="gold" className="is-lower" label="Golden rasengan" />
        </span>
      </div>
    </section>
  );
};

export default Hero;
