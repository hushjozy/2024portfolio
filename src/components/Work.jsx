import { useEffect, useLayoutEffect, useRef } from "react";
import { gallery, sites, work } from "../data";
import { gsap } from "../lib/motion";
import Chapter from "./Chapter";
import Picture from "./Picture";
import Split from "./Split";

// Projects without screenshots get a generated cover in the site palette.
const Cover = ({ item, index }) => (
  <div className={`cover cover--${item.tone} cover--v${index % 3}`}>
    <span className="cover__mark em">{item.mark}</span>
    <span className="cover__client">{item.client}</span>
    <span className="cover__year">{item.year}</span>
  </div>
);

const Project = ({ item, index }) => {
  const Tag = item.link ? "a" : "div";
  const linkProps = item.link ? { href: item.link, target: "_blank", rel: "noreferrer", "data-cursor": "Visit" } : {};

  return (
    <article className={`project${index % 2 ? " is-flip" : ""}`}>
      <Tag className="project__media" {...linkProps}>
        <div className="project__frame">
          {item.image ? (
            <div className={`project__shot${item.fit === "cover" ? " is-full" : ""}`}>
              <Picture
                src={item.image}
                alt={`${item.title} screenshot`}
                sizes={item.fit === "cover" ? "(max-width: 899px) 92vw, 52vw" : "280px"}
                data-parallax-img
              />
            </div>
          ) : (
            <div className="project__gen" data-parallax-img>
              <Cover item={item} index={index} />
            </div>
          )}
        </div>
      </Tag>

      <div className="project__info">
        <div className="project__head">
          <span className="project__no">{String(index + 1).padStart(2, "0")}</span>
          <span className="project__status"><i className="dot" />{item.status}</span>
        </div>
        <Split as="h3" className="project__title" text={item.title} />
        <p className="project__client" data-rise>{item.client} · {item.role}</p>
        <p className="project__desc" data-rise>{item.desc}</p>
        <ul className="tags" data-rise>
          {item.tags.map((t) => <li key={t}>{t}</li>)}
        </ul>
        {item.link && (
          <a className="link-arrow" href={item.link} target="_blank" rel="noreferrer">
            View project <span>↗</span>
          </a>
        )}
      </div>
    </article>
  );
};

// Muted loop that only downloads and plays while it's on screen.
const LazyVideo = ({ src, poster, label }) => {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { rootMargin: "0px 200px" }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video ref={ref} src={src} poster={poster} aria-label={`${label} screen recording`} muted loop playsInline preload="none" />
  );
};

const Gallery = () => {
  const ref = useRef(null);

  // Pinned horizontal track on wide screens; native swipe on small ones.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const track = ref.current.querySelector(".gallery__track");
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray(".gallery__img img, .gallery__img video").forEach((img) => {
          gsap.fromTo(img, { xPercent: -8 }, {
            xPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          });
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className="gallery" ref={ref}>
      <div className="gallery__track">
        <div className="gallery__intro">
          <span className="eyebrow">Also shipped</span>
          <Split as="h3" className="gallery__title" text="Apps, sites & *side quests.*" />
          <p>Drag your scroll sideways through earlier mobile and web work.</p>
        </div>
        {gallery.map((g, i) => {
          const Tag = g.link ? "a" : "div";
          return (
            <Tag
              key={g.title}
              className={`gallery__card${g.tall ? " is-tall" : ""}`}
              {...(g.link ? { href: g.link, target: "_blank", rel: "noreferrer", "data-cursor": "Visit" } : {})}
            >
              <div className="gallery__img">
                {g.video ? (
                  <LazyVideo src={g.video} poster={g.poster} label={g.title} />
                ) : (
                  <Picture src={g.image} alt={g.title} sizes={g.tall ? "(max-width: 899px) 60vw, 360px" : "(max-width: 899px) 78vw, 560px"} />
                )}
              </div>
              <div className="gallery__cap">
                <span className="em">{String(i + 1).padStart(2, "0")}</span>
                <strong>{g.title}</strong>
                <span>{g.note}</span>
              </div>
            </Tag>
          );
        })}
      </div>
    </div>
  );
};

const Work = () => (
  <section className="section work" id="work">
    <Chapter no="02" title="Selected *work*" aside={`${work.length} projects`} />
    <div className="work__list">
      {work.map((item, i) => <Project key={item.title} item={item} index={i} />)}
    </div>

    <Gallery />

    <div className="sites">
      <span className="eyebrow">Live on the web</span>
      <ul className="sites__list">
        {sites.map((s) => (
          <li key={s.href}>
            <a href={s.href} target="_blank" rel="noreferrer" data-cursor="Open">
              <span className="sites__title">{s.title}</span>
              <span className="sites__note">{s.note}</span>
              <span className="sites__arrow">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Work;
