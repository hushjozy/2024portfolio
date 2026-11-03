// rain.js: "rain at dusk" (board 1y), ported to fill whatever box the canvas is given.
// Usage: const rain = mountRain(canvas, { speed: () => scrollVelocity, interactTarget }); … rain.destroy();
// The rain falls faster while the page scrolls, and its slant follows the pointer across interactTarget.
const DENSITY = 150 / (800 * 300); // the board's drop count per px²
const MAX_DROPS = 520;
const BASE_WIND = 0.18;

const dpr = () => Math.min(window.matchMedia("(pointer: coarse)").matches ? 1 : 1.5, window.devicePixelRatio || 1);

export function mountRain(canvas, { speed = () => 0, interactTarget } = {}) {
  const ctx = canvas.getContext("2d");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w = 0, h = 0, drops = [], raf = 0, last = 0, visible = false;
  let wind = BASE_WIND, windTarget = BASE_WIND;

  // Spawn across the width plus the distance the wind carries a drop on its way down.
  const drop = (y) => ({ x: Math.random() * (w + h * 0.4), y, l: 8 + Math.random() * 16, v: 380 + Math.random() * 280 });

  const draw = (dt) => {
    const boost = 1 + Math.min(1.5, Math.abs(speed()) / 25);
    wind += (windTarget - wind) * Math.min(1, dt * 2);
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(245,234,216,.24)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const d of drops) {
      const v = d.v * boost;
      d.y += v * dt;
      d.x -= v * dt * wind;
      if (d.y > h + 20) Object.assign(d, drop(-24));
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + d.l * wind, d.y - d.l * boost); // streaks stretch as the rain speeds up
    }
    ctx.stroke();
  };

  const frame = (t) => {
    raf = 0;
    const dt = Math.min(50, t - (last || t)) / 1000;
    last = t;
    draw(dt);
    if (visible && !reduced) raf = requestAnimationFrame(frame);
    else last = 0;
  };
  const start = () => { if (!raf) raf = requestAnimationFrame(frame); };

  const resize = () => {
    const r = canvas.getBoundingClientRect(), d = dpr();
    if (!r.width || !r.height) return;
    w = r.width;
    h = r.height;
    canvas.width = Math.round(w * d);
    canvas.height = Math.round(h * d);
    ctx.setTransform(d, 0, 0, d, 0, 0);
    const n = Math.min(MAX_DROPS, Math.round(w * h * DENSITY));
    drops = Array.from({ length: n }, () => drop(Math.random() * h));
    draw(0); // never leave the canvas blank after a resize, even when paused
  };

  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }, { rootMargin: "100px" });
  const ro = new ResizeObserver(resize);
  io.observe(canvas);
  ro.observe(canvas);

  const target = interactTarget || canvas;
  const onMove = (e) => {
    const r = target.getBoundingClientRect();
    windTarget = BASE_WIND - ((e.clientX - r.left) / r.width - 0.5) * 0.4;
  };
  const onLeave = () => (windTarget = BASE_WIND);
  target.addEventListener("pointermove", onMove);
  target.addEventListener("pointerleave", onLeave);

  return {
    destroy() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", onLeave);
    },
  };
}
