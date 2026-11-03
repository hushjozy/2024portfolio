import { useEffect, useRef, useState } from "react";
import { profile, socials } from "../data";
import { gsap, getLenis, scrollTo, ScrollTrigger } from "../lib/motion";
import ShinobiFx from "../fx/ShinobiFx";
import { mountRain } from "../fx/rain";
import Split from "./Split";

// Button that leans toward the pointer.
const Magnetic = ({ children, className, ...rest }) => {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - r.left - r.width / 2) * 0.35,
      y: (e.clientY - r.top - r.height / 2) * 0.35,
      duration: 0.6,
      ease: "power3.out",
    });
  };
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
  return (
    <a ref={ref} className={className} onPointerMove={move} onPointerLeave={leave} {...rest}>
      {children}
    </a>
  );
};

// Copying the address is the site's "send": on success the ripple eye opens and fires one
// shockwave as a receipt. It never plays when the copy fails.
const CopyEmail = () => {
  const ripple = useRef(null);
  const [state, setState] = useState({ status: "idle", n: 0 });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setState((s) => ({ status: "copied", n: s.n + 1 }));
    } catch {
      setState((s) => ({ status: "failed", n: s.n }));
    }
  };

  // Runs after the eye has mounted, so the first shockwave isn't lost.
  useEffect(() => {
    if (state.status !== "copied") return;
    ripple.current?.trigger();
    if (state.n === 1) ScrollTrigger.refresh();
  }, [state]);

  return (
    <div className="contact__mail">
      <div className="contact__mail-row">
        <a className="contact__email" href={`mailto:${profile.email}`}>{profile.email}</a>
        <button className="contact__copy" onClick={copy}>
          <i className="star" aria-hidden="true" /> {state.status === "copied" ? "Copy again" : "Copy"}
        </button>
      </div>
      {state.status === "copied" && (
        <div className="contact__receipt">
          <ShinobiFx ref={ripple} kind="ripple" clickable={false} label="Ripple eye: email copied" />
        </div>
      )}
      <p className="contact__status" aria-live="polite">
        {state.status === "copied" && "Copied. Paste it into any mail app."}
        {state.status === "failed" && "Couldn't reach your clipboard. The address is right above."}
      </p>
    </div>
  );
};

// Rain over the dusk sky. It quickens with scroll velocity and leans with the pointer.
const Rain = () => {
  const ref = useRef(null);
  useEffect(() => {
    const rain = mountRain(ref.current, {
      speed: () => getLenis()?.velocity || 0,
      interactTarget: ref.current.parentElement,
    });
    return rain.destroy;
  }, []);
  return <canvas ref={ref} className="contact__rain" aria-hidden="true" />;
};

const horizon = ["Research", "Design", "Prototype", "Build", "Ship", "Iterate"];

const Contact = () => (
  <section className="contact" id="contact">
    {/* Closing scene: rain at dusk over the headline, a slow ticker on the horizon. */}
    <div className="contact__scene">
      <Rain />
      <span className="chapter__no">Chapter 06 · Let's talk</span>
      <Split as="h2" className="contact__title" text="Let's make it *real.*" />
      <p className="contact__note" data-rise>
        Open to senior fullstack and AI-native engineering roles, contracts and the occasional
        ambitious side project. Remote, hybrid or on-site in Lagos.
      </p>

      <div className="contact__actions" data-rise>
        <Magnetic className="btn btn--accent btn--big" href={`mailto:${profile.email}`} data-cursor="Write">
          Email me <span>→</span>
        </Magnetic>
        <Magnetic className="btn btn--ghost btn--big" href={profile.cv} target="_blank" rel="noreferrer">
          See my CV <span>↗</span>
        </Magnetic>
      </div>

      <CopyEmail />

      <div className="contact__horizon" aria-hidden="true">
        <div className="contact__horizon-track">
          {[0, 1].map((k) => (
            <span key={k}>{horizon.map((w) => `${w} · `).join("")}</span>
          ))}
        </div>
      </div>
    </div>

    <footer className="relative mx-auto mt-16 max-w-[var(--max)] text-left md:mt-24">
      <ul className="grid grid-cols-2 border-t border-line md:grid-cols-4">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="block py-6 font-serif text-[clamp(1.4rem,2.6vw,2.2rem)] transition duration-500 ease-expo hover:translate-x-2 hover:text-ochre"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted">
        <span>© {new Date().getFullYear()} Joseph Osho · Lagos, Nigeria</span>
        <span className="hidden gap-5 sm:flex">
          {["AI native", "Ship → test → ship", "Prompt loaded"].map((t) => (
            <span key={t} className="inline-flex items-center gap-2">
              <i className="star text-ember" aria-hidden="true" />{t}
            </span>
          ))}
        </span>
        <button className="uppercase text-ink hover:text-ochre" onClick={() => scrollTo(0)}>
          Back to top ↑
        </button>
      </div>
    </footer>
  </section>
);

export default Contact;
