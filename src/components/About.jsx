import portrait from "../media/about.jpg?w=480;900;1200&format=avif;webp;jpg&as=picture";
import Picture from "./Picture";
import { stats } from "../data";
import Chapter from "./Chapter";
import Split from "./Split";

const About = () => (
  <section className="section about" id="about">
    <Chapter no="01" title="The short version" />

    <div className="about__grid">
      <div className="about__art">
        <figure className="about__frame" data-speed="0.12">
          <Picture
            src={portrait}
            alt="Joseph Osho in a black suit by a window in Lagos"
            sizes="(max-width: 899px) min(92vw, 420px), 36vw"
            data-parallax-img
          />
        </figure>
        <span className="about__caption" data-speed="-0.3">
          Suited up, <span className="em">Lagos.</span>
        </span>
        <div className="about__shape about__shape--a" data-speed="0.6" aria-hidden="true" />
        <div className="about__shape about__shape--b" data-speed="-0.4" aria-hidden="true" />
      </div>

      <div className="about__copy">
        <Split
          as="p"
          mode="read"
          className="about__lead"
          text="I'm Joseph, a fullstack engineer from Lagos who turns messy organisational problems into products people actually use. Real-time game engines, escrow payments, procurement apps on the App Store, and now AI platforms where *agents* parse, screen and draft while *humans* still sign off."
        />
        <p className="about__body" data-rise>
          Over eight years I've moved between frontend, backend, mobile and DevOps across gaming,
          logistics, property tech and heavy industry. Today I lead AI-native builds at TeKnowledge
          on Azure: Next.js, Cosmos DB, Kubernetes, Entra ID and Azure OpenAI.
        </p>
      </div>
    </div>

    <ul className="stats">
      {stats.map((s, i) => (
        <li key={s.label} className="stats__item" data-rise={i * 0.08}>
          <span className="stats__value">
            <span data-count={s.value}>{s.value}</span>
            <span className="em">{s.suffix}</span>
          </span>
          <span className="stats__label">{s.label}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default About;
