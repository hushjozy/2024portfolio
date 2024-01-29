import Logo from "../../media/avatar.png";
import data from "../services/data";
import { IoIosColorPalette } from "react-icons/io";
import { useModalContext } from "../../context/modal-context";
import "../../components/css/components/navbar/navbar.css";

const Navbar = () => {
  const { showModalHandler } = useModalContext();
  return (
    <nav>
      <div className="container nav__container">
        <a href="index.html" className="nav__logo">
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "40px", height: "40px" }}
          />
        </a>
        <ul className="nav__menu">
          {data.map((item) => (
            <li key={item.id}>
              <a href={item.link}>{item.title}</a>
            </li>
          ))}
        </ul>
        <button id="theme__icon" onClick={showModalHandler}>
          <IoIosColorPalette />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
