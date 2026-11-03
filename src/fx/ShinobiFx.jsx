import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { mountFx } from "./shinobi-fx";

// Canvas effect at the board's 520:380 ratio, scaled to its container's width.
// kinds: eye | kaleidoscope | ripple | sphere | shuriken
// ref API: trigger(), setPattern(n) (kaleidoscope), setCharged(bool) (sphere)
// interactTarget: element that feeds the pointer (defaults to the canvas itself).
// tint: sphere colour, "blue" (default) or "gold".
const ShinobiFx = forwardRef(function ShinobiFx(
  { kind = "sphere", tint, clickable = true, interactTarget, label, className = "", ...rest },
  ref
) {
  const canvas = useRef(null);
  const fx = useRef(null);

  useEffect(() => {
    fx.current = mountFx(canvas.current, kind, { tint, clickable, interactTarget });
    return () => fx.current.destroy();
  }, [kind, tint, clickable, interactTarget]);

  useImperativeHandle(ref, () => ({
    trigger: () => fx.current?.trigger(),
    setPattern: (n) => fx.current?.setPattern(n),
    setCharged: (on) => fx.current?.setCharged(on),
  }), []);

  return (
    <canvas
      ref={canvas}
      role="img"
      aria-label={label || `${kind} animation`}
      className={`fx${clickable ? " is-clickable" : ""} ${className}`}
      {...rest}
    />
  );
});

export default ShinobiFx;
