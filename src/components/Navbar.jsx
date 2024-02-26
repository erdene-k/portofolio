import ToggleButton from "./ToggleButton";
import { HashLink as Link } from "react-router-hash-link";
import MenuSVG from "../assets/images/menu.svg?react";
const Navbar = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="#gg">
              <p className="noselect"> ___Erdene_K._</p> 
            </Link>
          </li>
          <li>
            <Link to="#gg">
              <span className="noselect">About</span>
            </Link>
          </li>
          <li>
            <Link to="#gg">Project</Link>
          </li>
          <li>
            <Link to="#gg">Works</Link>
          </li>
          <li>
            <Link to="#gg">Contact</Link>
          </li>
          <li>
            <a href="#">
              <MenuSVG />
            </a>
          </li>
          <li>
            <ToggleButton />
          </li>
        </ul>
        <ul className="sidebar">
          <li>
            <Link to="#gg">Home</Link>
          </li>
          <li>
            <Link to="#gg">About</Link>
          </li>
          <li>
            <Link to="#gg">Project</Link>
          </li>
          <li>
            <Link to="#gg">Contact</Link>
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
//   <div className="animation start-home"></div>
