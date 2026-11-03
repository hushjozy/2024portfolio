# Joseph Osho — Portfolio

Personal portfolio built with **Vite + React + Tailwind CSS v4**, with **Lenis** smooth scrolling and **GSAP ScrollTrigger** for parallax and scroll-driven animation.

## Scripts

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → build/
npm run preview   # serve the production build
```

## Where things live

- `src/data.js` — all content (projects, experience, stack, links). Edit this to update the site.
- `src/lib/motion.js` — Lenis + ScrollTrigger setup and the `data-*` scroll effects
  (`data-speed`, `data-parallax-img`, `data-split`, `data-read`, `data-rise`, `data-line`, `data-count`).
- `src/components/` — one component per section.
- `src/styles.css` — Tailwind theme tokens (`@theme`) and bespoke component styles.
- `public/Joseph-Osho-Resume-2026.pdf` — the CV linked across the site.

Motion respects `prefers-reduced-motion`: smooth scroll, the loader and scrubbed effects are skipped.
