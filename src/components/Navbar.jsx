import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <header className='header'>
        {/* <NavLink to="/" className="">
        <p className=''>EK</p>
        </NavLink> */}
        <nav className=''>
        <NavLink to='/' >
            Home
        </NavLink>
        <NavLink to='/about' >
            About
        </NavLink>
        <NavLink to='/contact' >
            Contact
        </NavLink>
        <NavLink to='/projects' >
            Projects
        </NavLink>
        <div className="animation start-home"></div>
        </nav>
    </header>
  )
}

export default Navbar