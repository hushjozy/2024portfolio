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
  (`data-speed`, `data-parallax-img`, `data-split`, `data-read`, `data-rise`, `data-line`, `data-count`, `data-stamp`).
- `src/fx/` — the Shinobi canvas effects (`<ShinobiFx kind="sphere | kaleidoscope | ripple | eye | shuriken" />`).
  One canvas per screen: sphere in the loader, golden spheres as the O's of "Osho" under the hero, shuriken on the gallery, kaleidoscope eye in Process
  (scroll changes its pattern), ripple eye when the email is copied, searching eye on the 404 page.
  `src/fx/rain.js` draws the rain over the contact section's dusk sky.
- `404.html` + `src/notfound.jsx` — the not-found page, built as a second Vite entry.
- `src/components/` — one component per section. In `Split` text, `*word*` sets the accent face and `~word~` brushes a word.
- `src/styles.css` — Tailwind theme tokens (`@theme`) and bespoke component styles.
- `public/Joseph-Osho-Resume-2026.pdf` — the CV linked across the site.

Motion respects `prefers-reduced-motion`: smooth scroll, the loader and scrubbed effects are skipped, and canvases render a single still frame.
The loader plays once per browser session, is capped at 2s and can be skipped.
