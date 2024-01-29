import "../../components/css/components/contact/contact.css";
import skills from "./data";

const Skills = () => {
  return (
    <section id="contact">
      <h2>Skills Used</h2>
      <p>Here are a couple of skills i've utilized.</p>
      <div
        className="container skill__container"
        data-aos="fade-in"
        style={{ flexWrap: "wrap" }}
      >
        {skills.map((skill, i) => (
          <button key={i} target="_blank" rel="noopener noreferrer">
            {skill}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Skills;
