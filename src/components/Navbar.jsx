import ToggleButton from "./ToggleButton";
import {HashLink as Link} from 'react-router-hash-link'
const Navbar = () => {
  return (
    <header className="header">
      <nav >
        <ul>
        <li> <Link to="#gg">Home</Link></li>
        <li> <Link to="#gg">About</Link></li>
        <li> <Link to="#gg">Project</Link></li>
        <li> <Link to="#gg">Contact</Link></li>
        <li><ToggleButton/></li>
        </ul>
    
        <ul className="sidebar">
        <li> <Link to="#gg">Home</Link></li>
        <li> <Link to="#gg">About</Link></li>
        <li> <Link to="#gg">Project</Link></li>
        <li> <Link to="#gg">Contact</Link></li>
        <li><ToggleButton/></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
//   <div className="animation start-home"></div>