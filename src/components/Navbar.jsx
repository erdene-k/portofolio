import { NavLink } from "react-router-dom";
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
      <div className="toggle-button">
      <button
          className="container"
          aria-label="Toggle color mode"
          title="Toggle color mode"
        >
          <div className="sun visible"></div>
          <div className="moon">
            <div className="star"></div>
            <div className="star small"></div>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
