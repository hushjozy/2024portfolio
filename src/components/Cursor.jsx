import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/motion";

// A soft blend-mode cursor that swells over anything with data-cursor="Label".
const Cursor = () => {
  const ref = useRef(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

    const move = (e) => {
      el.classList.add("is-on");
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e) => {
      const target = e.target.closest("[data-cursor], a, button");
      el.classList.toggle("is-hover", !!target);
      el.classList.toggle("is-label", !!target?.dataset.cursor);
      setLabel(target?.dataset.cursor || "");
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cursor__label">{label}</span>
    </div>
  );
};

export default Cursor;
