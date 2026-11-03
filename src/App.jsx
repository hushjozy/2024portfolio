import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Work from "./components/Work";
import Experience from "./components/Experience";
import Process from "./components/Process";
import Stack from "./components/Stack";
import Contact from "./components/Contact";
import { initScrollEffects, initSmoothScroll, lockScroll, reducedMotion, ScrollTrigger } from "./lib/motion";

const App = () => {
  const mainRef = useRef(null);
  const [loading, setLoading] = useState(() => !reducedMotion());
  const [ready, setReady] = useState(() => reducedMotion());

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    return initSmoothScroll();
  }, []);

  useEffect(() => {
    lockScroll(loading);
  }, [loading]);

  useLayoutEffect(() => {
    const mm = initScrollEffects(mainRef.current);
    // Images and fonts change layout after mount; re-measure once they settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  const done = useCallback(() => {
    setLoading(false);
    setReady(true);
  }, []);

  return (
    <>
      {loading && <Loader onDone={done} />}
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main ref={mainRef}>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Process />
        <Stack />
        <Contact />
      </main>
    </>
  );
};

export default App;
