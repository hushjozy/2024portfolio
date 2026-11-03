// shinobi-fx.js — framework-agnostic canvas effects from the Portfolio Asset Board.
// Kinds: 'eye' (2a) · 'kaleidoscope' (2b) · 'ripple' (2c) · 'sphere' (2d) · 'shuriken' (2e)
// Usage: const fx = mountFx(canvasEl, 'sphere'); … fx.trigger(); fx.setPattern(2); fx.destroy();
const W = 520, H = 380;
const KEYS = { eye: 'a', kaleidoscope: 'b', ripple: 'c', sphere: 'd', shuriken: 'e' };
// Touch screens draw at 1x; fine pointers get up to 1.5x.
const dpr = () => Math.min(window.matchMedia('(pointer: coarse)').matches ? 1 : 1.5, window.devicePixelRatio || 1);

class Engine {
  constructor(canvas, kind, opts = {}) {
    this.c = canvas; this.k = KEYS[kind];
    if (!this.k) throw new Error('shinobi-fx: unknown kind "' + kind + '"');
    this.s = { mx: 0, my: 0, lx: 0, ly: 0, hover: 0, boost: 0, rot: 0, T: 0, pat: 0, prev: -1, mt: 1, blink: 0, nb: 1.5 + Math.random() * 3, charge: 0, waves: [], parts: [], bub: [], rings: [], drops: [] };
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.vis = true; this.lt = 0; this.raf = 0;
    this.io = new IntersectionObserver(([e]) => { this.vis = e.isIntersecting; if (this.vis) this.start(); }, { rootMargin: '100px' });
    this.io.observe(canvas);
    this.target = opts.interactTarget || canvas;
    this.onMove = e => { const r = canvas.getBoundingClientRect(), cl = v => Math.max(-1, Math.min(1, v)); this.s.mx = cl(((e.clientX - r.left) / r.width - .5) * 2); this.s.my = cl(((e.clientY - r.top) / r.height - .5) * 2); this.s.hover = 1; };
    this.onLeave = () => { this.s.mx = 0; this.s.my = 0; this.s.hover = 0; };
    this.onClick = () => this.trigger();
    this.target.addEventListener('pointermove', this.onMove);
    this.target.addEventListener('pointerleave', this.onLeave);
    if (opts.clickable !== false) this.target.addEventListener('click', this.onClick);
    this.start();
  }
  start() { if (!this.raf) this.raf = requestAnimationFrame(this.frame); }
  frame = t => {
    this.raf = 0;
    const dt = Math.min(50, t - (this.lt || t)) / 1000; this.lt = t;
    const x = this.fit(), s = this.s, k = this.k, ts = t / 1000;
    if (k === 'd') this.fxSphere(x, s, dt, ts); else if (k === 'e') this.fxLava(x, s, dt, ts); else this.fxEye(x, s, dt, ts, k);
    if (this.vis && !this.reduced) this.start(); else this.lt = 0;
  };
  fit() {
    const c = this.c, r = c.getBoundingClientRect(), d = dpr() * ((r.width || W) / W);
    const w = Math.round(W * d), h = Math.round(H * d);
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
    const x = c.getContext('2d'); x.setTransform(w / W, 0, 0, h / H, 0, 0); return x;
  }
  /** Click / programmatic hit: spin-up (eye), next pattern (kaleidoscope), shockwave (ripple), boost (sphere), eruption (shuriken). */
  trigger() {
    const s = this.s; s.boost = 1;
    if (this.k === 'b') { s.prev = s.pat; s.pat = (s.pat + 1) % 4; s.mt = 0; }
    if (this.k === 'c') s.waves.push(0);
    if (this.k === 'e') for (let i = 0; i < 80; i++) { const a = Math.random() * 6.283, v = 120 + Math.random() * 340; s.parts.push({ x: 260, y: 190, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, dec: .6 + Math.random() * .8, sz: 1.5 + Math.random() * 2.5 }); }
    this.start();
  }
  /** Kaleidoscope only: jump to pattern 0–3 (use from a scroll observer). */
  setPattern(n) { const s = this.s, p = ((n % 4) + 4) % 4; if (p === s.pat) return; s.prev = s.pat; s.pat = p; s.mt = 0; this.start(); }
  /** Sphere: force the hover-charge state (e.g. while a CTA is hovered). */
  setCharged(on) { this.s.hover = on ? 1 : 0; this.start(); }
  destroy() {
    cancelAnimationFrame(this.raf); this.io.disconnect();
    this.target.removeEventListener('pointermove', this.onMove);
    this.target.removeEventListener('pointerleave', this.onLeave);
    this.target.removeEventListener('click', this.onClick);
  }
  layer(key, w, h, draw) {
    this.layers = this.layers || {}; if (this.layers[key]) return this.layers[key];
    const d = dpr(), c = document.createElement('canvas'); c.width = w * d; c.height = h * d;
    const x = c.getContext('2d'); x.scale(d, d); draw(x); return (this.layers[key] = c);
  }
  back(t) { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
  tomoe(x, a, rr, sz, dir) {
    const N = 18, L = 1.05, o = [], n = [];
    for (let i = 0; i <= N; i++) { const k = i / N, th = a - dir * k * L, rad = rr + k * sz * 1.1, w = sz * Math.pow(1 - k, 1.3) * .95, c = Math.cos(th), s = Math.sin(th); o.push(c * (rad + w), s * (rad + w)); n.push(c * (rad - w), s * (rad - w)); }
    x.beginPath(); x.moveTo(o[0], o[1]); for (let i = 2; i < o.length; i += 2) x.lineTo(o[i], o[i + 1]); for (let i = n.length - 2; i >= 0; i -= 2) x.lineTo(n[i], n[i + 1]); x.closePath(); x.fill();
    x.beginPath(); x.arc(Math.cos(a) * rr, Math.sin(a) * rr, sz, 0, 6.283); x.fill();
  }
  patTomoe(x, R, rot, sc, boost) {
    const ga = x.globalAlpha; x.save(); x.scale(sc, sc);
    x.beginPath(); x.arc(0, 0, R * .56, 0, 6.283); x.lineWidth = 2.5; x.strokeStyle = 'rgba(12,0,0,.75)'; x.stroke();
    x.fillStyle = '#0b0203';
    const blur = boost > .3 ? 4 : 0;
    for (let g = blur; g >= 0; g--) { x.globalAlpha = ga * (g ? .18 : 1); for (let i = 0; i < 3; i++) this.tomoe(x, rot - g * .09 + i * 2.0944, R * .56, R * .12, 1); }
    x.globalAlpha = ga;
    x.beginPath(); x.arc(0, 0, R * (.2 - boost * .05), 0, 6.283); x.fill();
    x.restore();
  }
  pattern(x, R, i, rot, sc) {
    if (i === 0) return this.patTomoe(x, R, rot, sc, 0);
    const P = 6.283; x.save(); x.rotate(rot); x.scale(sc, sc); x.fillStyle = '#0b0203'; x.strokeStyle = '#0b0203';
    if (i === 1) {
      for (let j = 0; j < 4; j++) { x.save(); x.rotate(j * Math.PI / 2); x.beginPath(); x.moveTo(-R * .08, -R * .16); x.bezierCurveTo(R * .35, -R * .72, R * .9, -R * .48, R * .98, R * .04); x.bezierCurveTo(R * .72, -R * .16, R * .38, -R * .06, R * .1, R * .16); x.closePath(); x.fill(); x.restore(); }
      x.beginPath(); x.arc(0, 0, R * .24, 0, P); x.fill(); x.fillStyle = '#c8121c'; x.beginPath(); x.arc(0, 0, R * .14, 0, P); x.fill(); x.fillStyle = '#0b0203'; x.beginPath(); x.arc(0, 0, R * .07, 0, P); x.fill();
    }
    if (i === 2) {
      x.beginPath(); x.arc(0, 0, R * .9, 0, P); x.lineWidth = R * .06; x.stroke();
      for (let j = 0; j < 5; j++) { x.save(); x.rotate(j * 1.2566); x.fillStyle = '#0b0203'; x.beginPath(); x.ellipse(R * .44, 0, R * .44, R * .14, 0, 0, P); x.fill(); x.fillStyle = '#d3121f'; x.beginPath(); x.ellipse(R * .5, 0, R * .22, R * .045, 0, 0, P); x.fill(); x.restore(); }
      x.fillStyle = '#0b0203'; x.beginPath(); x.arc(0, 0, R * .16, 0, P); x.fill();
    }
    if (i === 3) {
      x.lineWidth = R * .09; for (let j = 0; j < 3; j++) { const a = j * 2.0944; x.beginPath(); x.arc(Math.cos(a) * R * .32, Math.sin(a) * R * .32, R * .5, 0, P); x.stroke(); }
      x.beginPath(); x.arc(0, 0, R * .15, 0, P); x.fill();
    }
    x.restore();
  }
  patRipple(x, R, s, ts, dt) {
    s.rot += dt * (.3 + s.boost * s.boost * 6);
    for (let i = 0; i < 6; i++) { const r = R * (.17 + i * .135), w = Math.max(0, Math.sin(ts * 2.4 - i * .85)); x.beginPath(); x.arc(0, 0, r, 0, 6.283); x.lineWidth = 2.6 + w * 1.6; x.strokeStyle = `rgba(14,0,6,${.55 + w * .4})`; x.stroke(); }
    x.fillStyle = '#0b0206';
    [2, 3, 4].forEach((ri, j) => { const rr = R * (.17 + ri * .135), dir = j % 2 ? -1 : 1; for (let i = 0; i < 3; i++) this.tomoe(x, dir * s.rot * (1 + j * .25) + i * 2.0944 + j * .6, rr, R * .052, dir); });
    x.beginPath(); x.arc(0, 0, R * .1, 0, 6.283); x.fill();
  }
  fxEye(x, s, dt, ts, k) {
    const W = 520, H = 380, cx = 260, cy = 190, R = 92, P = 6.283;
    s.nb -= dt; if (s.nb <= 0) { s.blink = 1; s.nb = 3 + Math.random() * 4; }
    s.blink = Math.max(0, s.blink - dt * 5);
    const open = 1 - Math.sin(s.blink * Math.PI) * .97;
    const f = Math.min(1, dt * 7); s.lx += (s.mx * 30 - s.lx) * f; s.ly += (s.my * 16 - s.ly) * f;
    s.boost = Math.max(0, s.boost - dt * .8);
    const pal = k === 'c' ? ['#ff5a6a', '#b8122f', '#4d0420', 'rgba(170,30,90,.28)'] : ['#ff4a3a', '#c8121c', '#5c0308', 'rgba(200,20,20,.26)'];
    x.clearRect(0, 0, W, H);
    x.drawImage(this.layer('glow' + k, W, H, l => { const g = l.createRadialGradient(cx, cy, 10, cx, cy, 280); g.addColorStop(0, pal[3]); g.addColorStop(1, 'rgba(0,0,0,0)'); l.fillStyle = g; l.fillRect(0, 0, W, H); }), 0, 0, W, H);
    let g;
    const ew = 215, eh = 112 * open;
    const eye = () => { x.beginPath(); x.moveTo(cx - ew, cy); x.bezierCurveTo(cx - ew * .45, cy - eh * 1.3, cx + ew * .5, cy - eh * 1.3, cx + ew, cy - 6 * open); x.bezierCurveTo(cx + ew * .45, cy + eh * 1.05, cx - ew * .45, cy + eh * 1.05, cx - ew, cy); x.closePath(); };
    x.save(); eye(); x.clip();
    x.drawImage(this.layer('sclera', W, H, l => { const g = l.createRadialGradient(cx, cy, 20, cx, cy, ew); g.addColorStop(0, '#efe5d8'); g.addColorStop(.7, '#cbbfb0'); g.addColorStop(1, '#6e6257'); l.fillStyle = g; l.fillRect(0, 0, W, H); }), 0, 0, W, H);
    x.save(); x.translate(cx + s.lx, cy + s.ly);
    x.drawImage(this.layer('iris' + (k === 'c' ? 'c' : 'a'), R * 2, R * 2, l => {
      l.translate(R, R); const g = l.createRadialGradient(0, 0, R * .08, 0, 0, R); g.addColorStop(0, pal[0]); g.addColorStop(.55, pal[1]); g.addColorStop(.9, pal[2]); g.addColorStop(1, '#170103');
      l.beginPath(); l.arc(0, 0, R, 0, P); l.fillStyle = g; l.fill(); l.clip();
      l.strokeStyle = 'rgba(30,0,0,.2)'; l.lineWidth = 1; l.beginPath();
      for (let i = 0; i < 96; i++) { const a = i / 96 * P + Math.sin(i * 7.3) * .03; l.moveTo(Math.cos(a) * R * .28, Math.sin(a) * R * .28); l.lineTo(Math.cos(a) * R * .97, Math.sin(a) * R * .97); }
      l.stroke();
    }), -R, -R, R * 2, R * 2);
    x.save(); x.beginPath(); x.arc(0, 0, R, 0, P); x.clip();
    if (k === 'a') { s.rot += dt * (.55 + s.boost * s.boost * 16); this.patTomoe(x, R, s.rot, 1, s.boost); }
    if (k === 'b') {
      s.rot += dt * (.35 + s.boost * s.boost * 10); s.mt = Math.min(1, s.mt + dt * 1.6);
      const e = 1 - Math.pow(1 - s.mt, 3);
      if (s.prev >= 0 && s.mt < 1) { x.globalAlpha = 1 - e; this.pattern(x, R, s.prev, s.rot + e * 2, 1 - e * .8); x.globalAlpha = 1; }
      this.pattern(x, R, s.pat, s.rot, s.prev < 0 ? 1 : this.back(s.mt));
    }
    if (k === 'c') this.patRipple(x, R, s, ts, dt);
    x.restore();
    x.beginPath(); x.arc(0, 0, R, 0, P); x.lineWidth = 5; x.strokeStyle = 'rgba(8,0,0,.9)'; x.stroke();
    x.fillStyle = 'rgba(255,255,255,.8)'; x.beginPath(); x.ellipse(-R * .36, -R * .44, R * .14, R * .08, -.6, 0, P); x.fill();
    x.fillStyle = 'rgba(255,255,255,.3)'; x.beginPath(); x.arc(R * .38, R * .36, R * .05, 0, P); x.fill();
    x.restore();
    x.drawImage(this.layer('lid', W, H, l => { let g = l.createLinearGradient(0, cy - 123, 0, cy + 10); g.addColorStop(0, 'rgba(0,0,0,.6)'); g.addColorStop(1, 'rgba(0,0,0,0)'); l.fillStyle = g; l.fillRect(0, 0, W, H); g = l.createRadialGradient(cx, cy, ew * .55, cx, cy, ew * 1.05); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.55)'); l.fillStyle = g; l.fillRect(0, 0, W, H); }), 0, 0, W, H);
    x.restore();
    eye(); x.lineJoin = 'round'; x.lineWidth = 7; x.strokeStyle = '#040303'; x.stroke();
    x.beginPath(); x.moveTo(cx - ew * .78, cy - eh * 1.02 - 12); x.bezierCurveTo(cx - ew * .3, cy - eh * 1.5 - 16, cx + ew * .35, cy - eh * 1.5 - 16, cx + ew * .86, cy - eh * .9 - 12); x.lineWidth = 3; x.strokeStyle = 'rgba(245,234,216,.14)'; x.stroke();
    if (k === 'c') {
      s.waves = s.waves.map(a => a + dt * .9).filter(a => a < 1);
      for (const a of s.waves) { const r = R + a * 330; x.beginPath(); x.arc(cx + s.lx, cy + s.ly, r, 0, P); x.lineWidth = 6 * (1 - a) + 1; x.strokeStyle = `rgba(220,60,120,${(1 - a) * .7})`; x.stroke(); x.beginPath(); x.arc(cx + s.lx, cy + s.ly, r * .8, 0, P); x.lineWidth = 2; x.strokeStyle = `rgba(255,200,220,${(1 - a) * .35})`; x.stroke(); }
    }
  }
  fxSphere(x, s, dt, ts) {
    const W = 520, H = 380, P = 6.283, N = 16;
    if (!s.st) { s.st = Array.from({ length: 96 }, () => { const tx = (Math.random() - .5) * 2.8, tz = Math.random() * P; return { r: .28 + Math.random() * .8, cx: Math.cos(tx), sx: Math.sin(tx), cz: Math.cos(tz), sz: Math.sin(tz), ph: Math.random() * P, sp: 2.4 + Math.random() * 3.4, len: .7 + Math.random() * 1.7, w: .7 + Math.random() * 2.1, blue: Math.random() < .45 }; }); s.buf = new Float32Array((N + 1) * 3); }
    s.charge += (s.hover - s.charge) * Math.min(1, dt * 2.5);
    s.boost = Math.max(0, s.boost - dt * .8);
    s.T += dt * (1 + s.charge * .8 + s.boost * 1.5);
    const T = s.T, cx = 260, cy = 186 + Math.sin(ts * 1.3) * 5, S = 76 + s.charge * 14 + Math.sin(ts * 7) * 1.2;
    x.clearRect(0, 0, W, H);
    x.globalCompositeOperation = 'lighter';
    const gl = this.layer('sglow', 520, 520, l => { const g = l.createRadialGradient(260, 260, 15, 260, 260, 240); g.addColorStop(0, 'rgba(90,170,255,.42)'); g.addColorStop(.4, 'rgba(60,120,255,.14)'); g.addColorStop(1, 'rgba(40,80,255,0)'); l.fillStyle = g; l.fillRect(0, 0, 520, 520); });
    const gs = S / 85; x.drawImage(gl, cx - 260 * gs, cy - 260 * gs, 520 * gs, 520 * gs); let g;
    x.save(); x.translate(cx, 342); x.scale(1, .16); g = x.createRadialGradient(0, 0, 0, 0, 0, 170); g.addColorStop(0, `rgba(110,180,255,${.35 + s.charge * .2})`); g.addColorStop(1, 'rgba(110,180,255,0)'); x.fillStyle = g; x.beginPath(); x.arc(0, 0, 170, 0, P); x.fill(); x.restore();
    g = x.createRadialGradient(cx, cy, 0, cx, cy, S * 1.05); g.addColorStop(0, 'rgba(170,220,255,.18)'); g.addColorStop(.85, 'rgba(90,160,255,.16)'); g.addColorStop(.97, 'rgba(160,210,255,.22)'); g.addColorStop(1, 'rgba(160,210,255,0)'); x.fillStyle = g; x.beginPath(); x.arc(cx, cy, S * 1.05, 0, P); x.fill();
    x.lineCap = 'round'; const b = s.buf;
    for (const q of s.st) {
      for (let i = 0; i <= N; i++) { const th = q.ph + T * q.sp - (i / N) * q.len, px = Math.cos(th) * q.r * S, py = Math.sin(th) * q.r * S, y2 = py * q.cx; b[i * 3] = cx + px * q.cz - y2 * q.sz; b[i * 3 + 1] = cy + px * q.sz + y2 * q.cz; b[i * 3 + 2] = Math.sin(th) * q.sx; }
      const depth = .35 + .65 * (b[2] + 1) / 2, col = q.blue ? '120,190,255' : '230,246,255';
      for (let seg = 0; seg < 2; seg++) { const i0 = seg ? 6 : 0, i1 = seg ? N : 6; x.beginPath(); x.moveTo(b[i0 * 3], b[i0 * 3 + 1]); for (let i = i0 + 1; i <= i1; i++) x.lineTo(b[i * 3], b[i * 3 + 1]); x.lineWidth = q.w * (1 - seg * .4) * (.6 + depth * .6); x.strokeStyle = `rgba(${col},${depth * (seg ? .32 : .9)})`; x.stroke(); }
    }
    const br = 1 + Math.sin(ts * 9) * .04;
    g = x.createRadialGradient(cx, cy, 0, cx, cy, S * .75 * br); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.3, 'rgba(225,245,255,.95)'); g.addColorStop(.65, 'rgba(120,190,255,.35)'); g.addColorStop(1, 'rgba(80,150,255,0)'); x.fillStyle = g; x.beginPath(); x.arc(cx, cy, S * .75 * br, 0, P); x.fill();
    x.lineWidth = 3; x.strokeStyle = 'rgba(255,255,255,.55)';
    for (let i = 0; i < 6; i++) { const a = T * 9 + i * 1.047, rr = S * (.18 + (i % 3) * .07); x.beginPath(); x.arc(cx, cy, rr, a, a + 1.5); x.stroke(); }
    if (Math.random() < dt * (8 + s.charge * 40)) s.parts.push({ a: Math.random() * P, d: S * (1.4 + Math.random() * .8), w: 2 + Math.random() * 2, life: 1 });
    for (const p of s.parts) { p.a += p.w * dt * (1 + s.charge); p.d -= dt * 70; p.life -= dt * .9; x.fillStyle = `rgba(200,235,255,${Math.max(0, p.life) * .9})`; x.beginPath(); x.arc(cx + Math.cos(p.a) * p.d, cy + Math.sin(p.a) * p.d * .55, 1.6, 0, P); x.fill(); }
    s.parts = s.parts.filter(p => p.life > 0 && p.d > S * .6);
    x.globalCompositeOperation = 'source-over';
  }
  fxLava(x, s, dt, ts) {
    const W = 520, H = 380, cx = 260, cy = 190, P = 6.283;
    s.boost = Math.max(0, s.boost - dt * .7);
    s.T += dt * (1 + s.boost * 1.6); const T = s.T, rot = T * 6.5, C = 54 + Math.sin(ts * 5) * 1.5;
    if (!s.blobs) s.blobs = Array.from({ length: 9 }, (_, i) => ({ ph: i * .7, sp: (.4 + Math.random() * .6) * (i % 2 ? 1 : -1), d: .25 + Math.random() * .55, r: .18 + Math.random() * .2 }));
    x.clearRect(0, 0, W, H);
    x.globalCompositeOperation = 'lighter';
    x.globalAlpha = Math.min(1, .62 + s.boost * .38); x.drawImage(this.layer('lglow', W, H, l => { const g = l.createRadialGradient(cx, cy, 20, cx, cy, 250); g.addColorStop(0, 'rgba(255,120,30,.8)'); g.addColorStop(.5, 'rgba(200,50,10,.26)'); g.addColorStop(1, 'rgba(120,20,0,0)'); l.fillStyle = g; l.fillRect(0, 0, W, H); }), 0, 0, W, H); x.globalAlpha = 1; let g;
    g = x.createRadialGradient(cx, cy, C, cx, cy, 175); g.addColorStop(0, 'rgba(255,180,90,.1)'); g.addColorStop(.85, 'rgba(255,150,70,.12)'); g.addColorStop(1, 'rgba(255,150,70,0)'); x.fillStyle = g; x.beginPath(); x.arc(cx, cy, 175, 0, P); x.fill();
    x.lineCap = 'round';
    for (let i = 0; i < 18; i++) { const rr = 70 + ((i * 37) % 100), a = rot * (1.1 - (i % 3) * .15) + i * 1.9; x.beginPath(); x.arc(cx, cy, rr, a, a + .5 + (i % 4) * .25); x.lineWidth = 1 + (i % 3); x.strokeStyle = `rgba(255,${200 + (i % 3) * 20},150,${.12 + (i % 4) * .06})`; x.stroke(); }
    x.globalCompositeOperation = 'source-over';
    const blade = () => { x.beginPath(); x.moveTo(26, -30); x.quadraticCurveTo(105, -46, 180, 0); x.quadraticCurveTo(118, 8, 44, 30); x.quadraticCurveTo(18, 0, 26, -30); x.closePath(); };
    x.save(); x.translate(cx, cy);
    g = x.createRadialGradient(0, 0, 0, 0, 0, 182); g.addColorStop(0, '#fff3b0'); g.addColorStop(.28, '#ffb02e'); g.addColorStop(.55, '#ff5a0a'); g.addColorStop(.82, '#a3170a'); g.addColorStop(1, '#2e0502');
    for (let k = 3; k >= 0; k--) {
      x.globalAlpha = k ? .2 * (1 - k / 4) : 1;
      for (let i = 0; i < 4; i++) {
        x.save(); x.rotate(rot - k * .13 + i * Math.PI / 2); blade(); x.fillStyle = g; x.fill();
        if (!k) {
          x.fillStyle = 'rgba(45,6,2,.6)'; [[95, -14, 9], [130, -4, 6], [70, 8, 7], [150, 2, 4]].forEach(([a, b2, r]) => { x.beginPath(); x.arc(a, b2, r * (1 + Math.sin(ts * 3 + a) * .15), 0, P); x.fill(); });
          x.strokeStyle = 'rgba(255,215,120,.85)'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(60, -4); x.lineTo(95, -2); x.lineTo(120, -10); x.lineTo(160, 0); x.stroke();
          blade(); x.strokeStyle = 'rgba(255,190,90,.7)'; x.lineWidth = 1.5; x.stroke();
        }
        x.restore();
      }
    }
    x.globalAlpha = 1;
    g = x.createRadialGradient(0, 0, 0, 0, 0, C); g.addColorStop(0, '#fff8d0'); g.addColorStop(.35, '#ffc43c'); g.addColorStop(.72, '#ff6a10'); g.addColorStop(1, '#6e1005');
    x.beginPath(); x.arc(0, 0, C, 0, P); x.fillStyle = g; x.fill();
    x.save(); x.clip();
    for (const bl of s.blobs) { const a = bl.ph + T * bl.sp, d = bl.d * C + Math.sin(ts * 1.7 + bl.ph) * 6; x.fillStyle = 'rgba(70,10,3,.5)'; x.beginPath(); x.arc(Math.cos(a) * d, Math.sin(a) * d, bl.r * C * (1 + Math.sin(ts * 2.3 + bl.ph) * .2), 0, P); x.fill(); }
    if (Math.random() < dt * (22 + s.boost * 40)) { const a = Math.random() * P, d = Math.sqrt(Math.random()) * C * .85; s.bub.push({ x: Math.cos(a) * d, y: Math.sin(a) * d, m: 3 + Math.random() * 7, age: 0, life: .5 + Math.random() * .7 }); }
    const bubG = s.bubG || (s.bubG = (() => { const q = x.createRadialGradient(-.3, -.3, 0, 0, 0, 1); q.addColorStop(0, '#fffbe0'); q.addColorStop(.6, '#ffd04a'); q.addColorStop(1, '#ff7a14'); return q; })());
    for (const b of s.bub) {
      b.age += dt; const k = Math.min(1, b.age / b.life), r = Math.max(.1, b.m * Math.sin(k * Math.PI * .5));
      x.save(); x.translate(b.x, b.y); x.scale(r, r); x.fillStyle = bubG; x.beginPath(); x.arc(0, 0, 1, 0, P); x.fill(); x.restore();
      x.beginPath(); x.arc(b.x, b.y, r, 0, P); x.lineWidth = 1.2; x.strokeStyle = 'rgba(80,12,2,.65)'; x.stroke();
      if (k >= 1) { b.dead = 1; s.rings.push({ x: b.x, y: b.y, r, a: 1 }); for (let j = 0; j < 3; j++) { const aa = Math.random() * P, v = 40 + Math.random() * 90; s.drops.push({ x: cx + b.x, y: cy + b.y, vx: Math.cos(aa) * v, vy: Math.sin(aa) * v - 60, life: 1, sz: 1.5 + Math.random() * 2.5 }); } }
    }
    s.bub = s.bub.filter(b => !b.dead);
    for (const r of s.rings) { r.a -= dt * 3; r.r += dt * 30; x.lineWidth = 1.5; x.strokeStyle = `rgba(255,230,150,${Math.max(0, r.a)})`; x.beginPath(); x.arc(r.x, r.y, r.r, 0, P); x.stroke(); }
    s.rings = s.rings.filter(r => r.a > 0);
    x.restore();
    x.globalCompositeOperation = 'lighter';
    x.lineWidth = 3; x.strokeStyle = 'rgba(255,170,60,.5)'; x.beginPath(); x.arc(0, 0, C, 0, P); x.stroke();
    x.lineWidth = 2.5; x.strokeStyle = 'rgba(255,240,190,.45)';
    for (let i = 0; i < 5; i++) { const a = -T * 8 + i * 1.256; x.beginPath(); x.arc(0, 0, C * (.4 + .1 * (i % 3)), a, a + 1.2); x.stroke(); }
    x.restore();
    x.globalCompositeOperation = 'lighter';
    const rate = dt * (40 + s.boost * 120);
    for (let i = 0; i < 4; i++) if (Math.random() < rate / 4) { const a = rot + i * Math.PI / 2, v = 160 + Math.random() * 160; s.parts.push({ x: cx + Math.cos(a) * 176, y: cy + Math.sin(a) * 176, vx: -Math.sin(a) * v + Math.cos(a) * 40, vy: Math.cos(a) * v + Math.sin(a) * 40, life: 1, dec: .8 + Math.random() * .9, sz: 1 + Math.random() * 2 }); }
    for (const p of s.parts) { p.vx *= 1 - dt * 1.2; p.vy = p.vy * (1 - dt * 1.2) - dt * 60; p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt * p.dec; const l = Math.max(0, p.life); x.fillStyle = `rgba(255,${(120 + l * 120) | 0},${(40 + l * 60) | 0},${l})`; x.beginPath(); x.arc(p.x, p.y, p.sz * (.5 + l * .5), 0, P); x.fill(); }
    s.parts = s.parts.filter(p => p.life > 0);
    for (const d of s.drops) { d.vy += 380 * dt; d.x += d.vx * dt; d.y += d.vy * dt; d.life -= dt * 1.3; const l = Math.max(0, d.life); x.fillStyle = `rgba(255,${(140 + l * 90) | 0},60,${l})`; x.beginPath(); x.arc(d.x, d.y, d.sz, 0, P); x.fill(); }
    s.drops = s.drops.filter(d => d.life > 0);
    x.globalCompositeOperation = 'source-over';
  }
}

export function mountFx(canvas, kind, opts) { return new Engine(canvas, kind, opts); }
export const FX_KINDS = Object.keys(KEYS);
