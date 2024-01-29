import { useEffect } from "react";
import HeaderImage from "../../media/Joseph.JPG";
import data from "./data";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../components/css/components/header/header.css";

const Header = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <header id="header">
      <div className="container header__container">
        <div className="header__profile" data-aos="fade-in">
          <img
            src={HeaderImage}
            alt="Header Portait"
            style={{ width: "288px", height: "352px", objectFit: "contain" }}
          />
        </div>
        <h3 data-aos="fade-up">Joseph Osho</h3>
        <p data-aos="fade-up">
          You are a click away from building your dream website, mobile app or
          web app. Send me the details of your project for a modern, mobile
          responsive, highly performant website today!
        </p>
        <div className="header__cta" data-aos="fade-up">
          <a href="#contact" className="btn primary">
            Let's Talk
          </a>
          <a href="#portfolio" className="btn light">
            My Work
          </a>
        </div>
        <div className="header__socials">
          {data?.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item?.icon}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
