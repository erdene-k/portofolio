import { NavLink } from "react-router-dom";
import ToggleButton from "./ToggleButton";
const Navbar = () => {
  return (
    <header className="header">
      {/* <NavLink to="/" className="">
        <p className=''>EK</p>
        </NavLink> */}
      <nav className="">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <div className="animation start-home"></div>
      </nav>
      <ToggleButton/>
    </header>
  );
};

export default Navbar;
