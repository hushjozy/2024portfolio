import { useRef } from "react";
import { profile, socials } from "../data";
import { gsap, scrollTo } from "../lib/motion";
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

const Contact = () => (
  <section className="contact" id="contact">
    <div className="contact__orb" data-speed="0.5" aria-hidden="true" />
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

    <a className="contact__email" href={`mailto:${profile.email}`}>{profile.email}</a>

    <footer className="relative mx-auto mt-24 max-w-[var(--max)] text-left md:mt-40">
      <ul className="grid grid-cols-2 border-t border-line md:grid-cols-4">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="block py-6 font-serif text-[clamp(1.4rem,2.6vw,2.2rem)] transition duration-500 ease-expo hover:translate-x-2 hover:italic hover:text-ochre"
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
            <span key={t} className="before:text-ember before:content-['✺_']">{t}</span>
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
