import { useLayoutEffect, useRef } from "react";
import hero from "../media/hero.jpg?w=420;840;1100&format=avif;webp;jpg&as=picture";
import Picture from "./Picture";
import { profile } from "../data";
import { gsap, scrollTo } from "../lib/motion";
import Split from "./Split";

const ringText = "Fullstack · AI native · Real-time · Since 2018 · ";

const Hero = ({ ready }) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero__title .w__i, .hero__name .w__i", { yPercent: 115 });
      gsap.set(".hero__frame", { clipPath: "inset(100% 0 0 0)" });
      gsap.set(".hero__fade", { opacity: 0, y: 24 });

      // Scroll-out: the portrait sinks, the name slides and the headline lifts away.
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero__frame img", { yPercent: 18, scale: 1.15, ease: "none", scrollTrigger: st });
        gsap.to(".hero__title", { yPercent: -40, opacity: 0.2, ease: "none", scrollTrigger: st });
        gsap.to(".hero__name", { xPercent: -14, ease: "none", scrollTrigger: st });
        gsap.to(".hero__ring", { rotate: 300, ease: "none", scrollTrigger: st });
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
        .to(".hero__name .w__i", { yPercent: 0, duration: 1.4, stagger: 0.1 }, "-=1")
        .to(".hero__fade", { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, "-=1.1");
    }, ref);
    return () => ctx.kill();
  }, [ready]);

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__blob" aria-hidden="true" />
      <div className="hero__top hero__fade">
        <span>{profile.location}</span>
        <span className="pill"><i className="dot" /> Open to work</span>
      </div>

      <div className="hero__grid">
        <h1 className="hero__title">
          <Split text="I architect products, then ship them with *AI agents.*" mode="none" />
        </h1>

        <div className="hero__side">
          <figure className="hero__frame" data-cursor="Hi!">
            <Picture src={hero} alt="Portrait of Joseph Osho" sizes="(max-width: 899px) min(92vw, 420px), 420px" priority />
          </figure>
          <svg className="hero__ring" viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <path id="ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
            </defs>
            <text>
              {/* textLength stretches the phrase to exactly one lap (2πr ≈ 490) */}
              <textPath href="#ring" textLength="488" lengthAdjust="spacing">{ringText}</textPath>
            </text>
          </svg>
          <a href="#contact" className="hero__cta hero__fade" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}>
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
        <span className="w"><span className="w__i em">Osho</span></span>
      </div>
    </section>
  );
};

export default Hero;
