import { useState } from "react";
import { experience, learning, profile } from "../data";
import { ScrollTrigger } from "../lib/motion";
import Chapter from "./Chapter";

const Role = ({ job, open, onToggle }) => (
  <li className={`role${open ? " is-open" : ""}`}>
    <span className="role__rule" data-line />
    <button className="role__head" onClick={onToggle} aria-expanded={open}>
      <span className="role__period">{job.period}</span>
      <span className="role__company">{job.company}</span>
      <span className="role__title">{job.role}</span>
      <span className="role__plus" aria-hidden="true" />
    </button>
    <div className="role__body" onTransitionEnd={(e) => e.target === e.currentTarget && ScrollTrigger.refresh()}>
      <div className="role__inner">
        <span className="role__place">{job.place}</span>
        <ul>
          {job.points.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </div>
    </div>
  </li>
);

const Experience = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="section experience is-light" id="experience">
      <Chapter no="03" title="The *record*" aside="2018 — today" />

      <div className="experience__grid">
        <aside className="experience__side">
          <div className="experience__sticky">
            <p className="experience__note" data-rise>
              Seven teams across gaming, logistics, property and heavy industry. Tap a role for the details,
              or take the whole thing with you.
            </p>
            <a className="btn btn--dark" href={profile.cv} target="_blank" rel="noreferrer">
              Download CV <span>↓</span>
            </a>

            <div className="learning">
              <span className="eyebrow">Learning</span>
              <ul>
                {learning.map((l) => (
                  <li key={l.title}>
                    <strong>{l.title}</strong>
                    <span>{l.org} · {l.year}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <ol className="roles">
          {experience.map((job, i) => (
            <Role key={job.company} job={job} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
