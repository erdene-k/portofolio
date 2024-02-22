import ToggleButton from "./ToggleButton";
import {HashLink as Link} from 'react-router-hash-link'
const Navbar = () => {
  return (
    <header className="header">
      {/* <NavLink to="/" className="">
        <p className=''>EK</p>
        </NavLink> */}
      <nav className="">
        <Link to="#gg">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/projects">Projects</Link>
        <div className="animation start-home"></div>
      </nav>
      <ToggleButton/>
    </header>
  );
};

export default Navbar;
