import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { chapters, profile } from "../data";
import { gsap, lockScroll, scrollTo } from "../lib/motion";

const lagosTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
  }).format(new Date());

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(lagosTime);
  const menuRef = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setTime(lagosTime()), 20000);
    return () => clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(menuRef.current, { visibility: "visible" })
        .fromTo(menuRef.current, { clipPath: "circle(0% at 100% 0%)" }, {
          clipPath: "circle(150% at 100% 0%)",
          duration: 1,
          ease: "expo.inOut",
        })
        .fromTo(".menu__item .w__i", { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.05 }, "-=0.45")
        .fromTo(".menu__sub, .menu__no", { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.03 }, "<0.1")
        .fromTo(".menu__foot", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.6");
    }, menuRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!tl.current) return;
    open ? tl.current.timeScale(1).play() : tl.current.timeScale(1.6).reverse();
    lockScroll(open);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollTo(`#${id}`), open ? 500 : 0);
  };

  return (
    <>
      <header className={`nav${open ? " is-menu-open" : ""}`}>
        <a href="#top" className="nav__logo" onClick={(e) => go(e, "top")} aria-label="Back to top">
          J<span className="em">o</span>
        </a>
        <div className="nav__meta">
          <span>{profile.location}</span>
          <span className="nav__time">{time}</span>
        </div>
        <button
          className={`nav__toggle${open ? " is-open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="menu"
        >
          <span className="nav__toggle-text">{open ? "Close" : "Menu"}</span>
          <span className="nav__burger"><i /><i /></span>
        </button>
      </header>

      <nav className="menu" id="menu" ref={menuRef} aria-hidden={!open}>
        <ol className="menu__list">
          {chapters.map((c) => (
            <li key={c.id} className="menu__item">
              <a href={`#${c.id}`} onClick={(e) => go(e, c.id)} tabIndex={open ? 0 : -1}>
                <span className="menu__no">{c.no}</span>
                <span className="w"><span className="w__i menu__title">{c.title}</span></span>
                <span className="menu__sub">{c.sub}</span>
              </a>
            </li>
          ))}
        </ol>
        <div className="menu__foot">
          <a href={`mailto:${profile.email}`} tabIndex={open ? 0 : -1}>{profile.email}</a>
          <a href={profile.cv} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>See my CV ↗</a>
        </div>
      </nav>
    </>
  );
};

export default Nav;
