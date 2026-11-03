import { useEffect, useLayoutEffect, useRef } from "react";
import ShinobiFx from "../fx/ShinobiFx";
import { gsap } from "../lib/motion";

const SEEN = "jo-intro-seen";
const CAP = 2000;

// Only first visits in a session get the intro; storage can throw in private modes.
export const introSeen = () => {
  try {
    return sessionStorage.getItem(SEEN) === "1";
  } catch {
    return false;
  }
};

// What the page actually waits on: webfonts and the hero portrait.
const loadTasks = () => {
  const img = document.querySelector(".hero__frame img");
  const imgReady = img && !img.complete
    ? new Promise((r) => { img.addEventListener("load", r, { once: true }); img.addEventListener("error", r, { once: true }); })
    : Promise.resolve();
  return [document.fonts?.ready ?? Promise.resolve(), imgReady];
};

// The sphere charges while real assets load, then flashes white with the hero already underneath.
const Loader = ({ onDone }) => {
  const ref = useRef(null);
  const sphere = useRef(null);
  const countRef = useRef(null);
  const finished = useRef(false);
  const shown = useRef({ v: 0 });

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    try { sessionStorage.setItem(SEEN, "1"); } catch { /* fine, it just plays again */ }
    sphere.current?.trigger();
    gsap
      .timeline({ onComplete: onDone })
      .to(shown.current, { v: 100, duration: 0.25, onUpdate: paint })
      .to(".loader__flash", { opacity: 1, duration: 0.08 })
      .set(ref.current, { backgroundColor: "transparent" })
      .set(".loader__inner", { autoAlpha: 0 })
      .to(".loader__flash", { opacity: 0, duration: 0.15 });
  };

  const paint = () => {
    if (countRef.current) countRef.current.textContent = String(Math.round(shown.current.v)).padStart(3, "0");
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".loader__inner", { opacity: 0, duration: 0.4 });
    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    sphere.current?.setCharged(true);
    const tasks = loadTasks();
    let done = 0;
    tasks.forEach((t) =>
      t.then(() => {
        done += 1;
        gsap.to(shown.current, { v: (done / tasks.length) * 100, duration: 0.4, onUpdate: paint });
      })
    );
    const cap = setTimeout(finish, CAP);
    Promise.all(tasks).then(() => setTimeout(finish, 350));
    return () => clearTimeout(cap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="loader" ref={ref}>
      <div className="loader__inner">
        <div className="loader__sphere" aria-hidden="true">
          <ShinobiFx ref={sphere} kind="sphere" clickable={false} />
        </div>
        <div className="loader__foot">
          <span>Joseph Osho · charging</span>
          <span ref={countRef} aria-hidden="true">000</span>
        </div>
        <button className="loader__skip" onClick={finish}>Skip <span>»</span></button>
      </div>
      <div className="loader__flash" aria-hidden="true" />
    </div>
  );
};

export default Loader;
